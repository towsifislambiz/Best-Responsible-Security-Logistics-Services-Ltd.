// Utility for Monthly Data Retention, 5-Day End-of-Month Warning, and Cloud Auto-Pruning
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export const BENGALI_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

export const ENGLISH_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Parses any date format from Firestore Timestamp, string or millis
 */
export function getRecordDate(record) {
  if (!record) return null;
  if (record.serverTime?.toDate) return record.serverTime.toDate();
  if (record.createdAt?.toDate) return record.createdAt.toDate();
  if (record.serverTime?.seconds) return new Date(record.serverTime.seconds * 1000);
  if (record.createdAt?.seconds) return new Date(record.createdAt.seconds * 1000);
  if (record.submittedAt) {
    const d = new Date(record.submittedAt);
    if (!isNaN(d.getTime())) return d;
  }
  if (record.createdAt) {
    const d = new Date(record.createdAt);
    if (!isNaN(d.getTime())) return d;
  }
  if (record.date) {
    const d = new Date(record.date);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
}

/**
 * Returns month status and whether we are within the final 5-6 days of the month
 */
export function getMonthEndInfo(refDate = new Date()) {
  const currentYear = refDate.getFullYear();
  const currentMonth = refDate.getMonth();
  const currentDay = refDate.getDate();
  
  // Total days in current month (last day)
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysLeft = lastDay - currentDay;
  
  // Warning triggers during the final 5-6 days (e.g. 25th-31st in a 31-day month)
  const isWarningPeriod = daysLeft <= 6;

  const monthBn = BENGALI_MONTHS[currentMonth];
  const monthEn = ENGLISH_MONTHS[currentMonth];

  return {
    currentYear,
    currentMonth,
    currentDay,
    lastDay,
    daysLeft: Math.max(0, daysLeft),
    isWarningPeriod,
    monthBn,
    monthEn,
    fullLabel: `${monthBn} ${currentYear} (${monthEn})`
  };
}

/**
 * Checks if a record was created in the current month
 */
export function isCurrentMonth(date, refDate = new Date()) {
  const d = date instanceof Date ? date : getRecordDate({ createdAt: date });
  if (!d) return true; // If no date, treat as current to avoid accidental deletion
  return d.getFullYear() === refDate.getFullYear() && d.getMonth() === refDate.getMonth();
}

/**
 * Checks if a record was created in a previous month (older than current month)
 */
export function isPreviousMonth(date, refDate = new Date()) {
  const d = date instanceof Date ? date : getRecordDate({ createdAt: date });
  if (!d) return false;
  
  const recYear = d.getFullYear();
  const recMonth = d.getMonth();
  const curYear = refDate.getFullYear();
  const curMonth = refDate.getMonth();

  if (recYear < curYear) return true;
  if (recYear === curYear && recMonth < curMonth) return true;
  return false;
}

/**
 * Automatically cleans up / deletes records from previous months from Firestore and LocalStorage
 * to ensure database storage never gets full.
 */
export async function autoPrunePreviousMonths(db, force = false) {
  if (!db) return { prunedTotal: 0 };

  const lastPruneKey = 'brslsl_last_prune_date';
  const todayStr = new Date().toISOString().split('T')[0];
  const lastPrune = localStorage.getItem(lastPruneKey);

  // Run at most once per day unless forced
  if (!force && lastPrune === todayStr) {
    return { prunedTotal: 0, skipped: true };
  }

  const collectionsToPrune = ['requisitions', 'recruitment', 'inquiries'];
  let prunedTotal = 0;
  const prunedSummary = {};

  for (const colName of collectionsToPrune) {
    try {
      const snap = await getDocs(collection(db, colName));
      let count = 0;

      for (const docSnap of snap.docs) {
        const data = docSnap.data();
        const recordDate = getRecordDate(data);

        // If the record is older than the current month, delete from Firestore
        if (recordDate && isPreviousMonth(recordDate)) {
          try {
            await deleteDoc(doc(db, colName, docSnap.id));
            count++;
          } catch (delErr) {
            console.warn(`Failed to delete old record ${docSnap.id} in ${colName}:`, delErr);
          }
        }
      }

      prunedSummary[colName] = count;
      prunedTotal += count;
    } catch (err) {
      console.warn(`Error scanning ${colName} for monthly prune:`, err.message);
    }
  }

  // Also prune local caches for old records
  try {
    const pruneLocal = (storageKey) => {
      const cached = localStorage.getItem(storageKey);
      if (!cached) return;
      try {
        const items = JSON.parse(cached);
        if (Array.isArray(items)) {
          const fresh = items.filter(item => {
            const d = getRecordDate(item);
            return !d || !isPreviousMonth(d);
          });
          localStorage.setItem(storageKey, JSON.stringify(fresh));
        }
      } catch (_) {}
    };

    pruneLocal('brslsl_requisitions');
    pruneLocal('brslsl_recruitment');
    pruneLocal('brslsl_inquiries_cache');
    pruneLocal('brslsl_inquiries');
  } catch (_) {}

  localStorage.setItem(lastPruneKey, todayStr);
  console.info(`[Monthly Storage Prune] Removed ${prunedTotal} records from previous months:`, prunedSummary);

  return { prunedTotal, prunedSummary };
}

/**
 * Universal PDF/Print generator for monthly reports
 */
export function exportMonthlyPDF({
  type = 'requisitions', // 'requisitions' | 'recruitment' | 'inquiries' | 'all'
  title = 'মাসিক প্রতিবেদন',
  monthLabel = '',
  data = []
}) {
  const printWindow = window.open('', '_blank', 'width=1000,height=800');
  if (!printWindow) {
    alert('পপআপ ব্লক করা আছে! অনুগ্রহ করে ব্রাউজারের পপআপ পারমিশন এলাউ করুন যাতে PDF প্রিন্ট উইন্ডো খুলতে পারে।');
    return;
  }

  const generatedDate = new Date().toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let tableContent = '';

  if (type === 'requisitions') {
    tableContent = `
      <thead>
        <tr style="background:#0f274a; color:#ffffff;">
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:center;">#</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">তারিখ</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">ক্লায়েন্ট / প্রতিষ্ঠান</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">মোবাইল</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">পদবী ও শিফট</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:center;">সংখ্যা</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:right;">মাসিক বিল (টাকা)</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:center;">স্ট্যাটাস</th>
        </tr>
      </thead>
      <tbody>
        ${data.map((item, idx) => `
          <tr style="background:${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}; font-size:12px;">
            <td style="padding:8px; border:1px solid #cbd5e1; text-align:center; font-weight:bold;">${idx + 1}</td>
            <td style="padding:8px; border:1px solid #cbd5e1;">${item.formattedDate || (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A')}</td>
            <td style="padding:8px; border:1px solid #cbd5e1; font-weight:bold;">
              ${item.clientName || 'N/A'}
              ${item.address ? `<div style="font-size:10px; color:#64748b; font-weight:normal;">📍 ${item.address}</div>` : ''}
            </td>
            <td style="padding:8px; border:1px solid #cbd5e1; font-family:monospace;">${item.phone || 'N/A'}</td>
            <td style="padding:8px; border:1px solid #cbd5e1;">
              <span style="font-weight:600;">${item.role || 'Security Guard'}</span>
              <div style="font-size:10px; color:#475569;">${item.shift || '12h Shift'}</div>
            </td>
            <td style="padding:8px; border:1px solid #cbd5e1; text-align:center; font-weight:bold;">${item.quantity || 1} জন</td>
            <td style="padding:8px; border:1px solid #cbd5e1; text-align:right; font-weight:bold; color:#0f766e;">
              ${item.monthlyTotal ? `৳${Number(item.monthlyTotal).toLocaleString('en-US')}` : 'আলোচনা সাপেক্ষে'}
            </td>
            <td style="padding:8px; border:1px solid #cbd5e1; text-align:center;">
              <span style="display:inline-block; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:bold; background:${item.status === 'confirmed' ? '#dcfce7; color:#15803d;' : '#fef3c7; color:#b45309;'}">
                ${item.status || 'Pending'}
              </span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
  } else if (type === 'recruitment') {
    tableContent = `
      <thead>
        <tr style="background:#0f274a; color:#ffffff;">
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:center;">#</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">আবেদনের তারিখ</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">প্রার্থীর নাম</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">আবেদিত পদ</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">মোবাইল নম্বর</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">জেলা / ঠিকানা</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">শিক্ষাগত যোগ্যতা / অভিজ্ঞতা</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:center;">স্ট্যাটাস</th>
        </tr>
      </thead>
      <tbody>
        ${data.map((item, idx) => `
          <tr style="background:${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}; font-size:12px;">
            <td style="padding:8px; border:1px solid #cbd5e1; text-align:center; font-weight:bold;">${idx + 1}</td>
            <td style="padding:8px; border:1px solid #cbd5e1;">${item.formattedDate || (item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'N/A')}</td>
            <td style="padding:8px; border:1px solid #cbd5e1; font-weight:bold;">${item.name || 'N/A'}</td>
            <td style="padding:8px; border:1px solid #cbd5e1; font-weight:600; color:#0f766e;">${item.role || 'Security Guard'}</td>
            <td style="padding:8px; border:1px solid #cbd5e1; font-family:monospace;">${item.phone || 'N/A'}</td>
            <td style="padding:8px; border:1px solid #cbd5e1;">${item.district || item.address || 'N/A'}</td>
            <td style="padding:8px; border:1px solid #cbd5e1;">${item.education || item.experience || 'সাধারণ'}</td>
            <td style="padding:8px; border:1px solid #cbd5e1; text-align:center;">
              <span style="display:inline-block; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:bold; background:${item.status === 'approved' ? '#dcfce7; color:#15803d;' : '#fef3c7; color:#b45309;'}">
                ${item.status || 'New'}
              </span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
  } else if (type === 'inquiries') {
    tableContent = `
      <thead>
        <tr style="background:#0f274a; color:#ffffff;">
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:center;">#</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">তারিখ</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">প্রেরক</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">যোগাযোগ</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">বার্তা / অনুসন্ধান বিবরণ</th>
          <th style="padding:10px; border:1px solid #cbd5e1; text-align:center;">স্ট্যাটাস</th>
        </tr>
      </thead>
      <tbody>
        ${data.map((item, idx) => `
          <tr style="background:${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}; font-size:12px;">
            <td style="padding:8px; border:1px solid #cbd5e1; text-align:center; font-weight:bold;">${idx + 1}</td>
            <td style="padding:8px; border:1px solid #cbd5e1;">${item.formattedDate || 'Recent'}</td>
            <td style="padding:8px; border:1px solid #cbd5e1; font-weight:bold;">${item.name || 'N/A'}</td>
            <td style="padding:8px; border:1px solid #cbd5e1; font-family:monospace;">
              ${item.phone || ''}
              ${item.email ? `<div style="font-size:10px; color:#64748b;">${item.email}</div>` : ''}
            </td>
            <td style="padding:8px; border:1px solid #cbd5e1; max-width:350px;">${item.message || item.subject || 'N/A'}</td>
            <td style="padding:8px; border:1px solid #cbd5e1; text-align:center;">
              <span style="display:inline-block; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:bold; background:${item.status === 'Replied' ? '#dcfce7; color:#15803d;' : '#fef3c7; color:#b45309;'}">
                ${item.status || 'Pending'}
              </span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <title>${title} - ${monthLabel}</title>
      <style>
        @page {
          size: A4 landscape;
          margin: 15mm 10mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hind Siliguri", sans-serif;
          margin: 0;
          padding: 20px;
          color: #1e293b;
          background: #ffffff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #0f274a;
          padding-bottom: 12px;
          margin-bottom: 15px;
        }
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .company-title {
          font-size: 18px;
          font-weight: 900;
          color: #0f274a;
          text-transform: uppercase;
        }
        .company-sub {
          font-size: 11px;
          color: #475569;
          margin-top: 2px;
        }
        .report-badge {
          text-align: right;
        }
        .badge-title {
          font-size: 16px;
          font-weight: 800;
          color: #b45309;
        }
        .badge-meta {
          font-size: 11px;
          color: #64748b;
          margin-top: 2px;
        }
        .stats-bar {
          display: flex;
          gap: 15px;
          background: #f1f5f9;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 12px;
          border-left: 4px solid #f59e0b;
        }
        .stats-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .stats-val {
          font-weight: bold;
          color: #0f274a;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .footer {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 20px;
          font-size: 11px;
          color: #475569;
        }
        .sig-box {
          text-align: center;
          border-top: 1px dashed #94a3b8;
          padding-top: 6px;
          width: 200px;
          font-weight: bold;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; background:#fef3c7; padding:10px 15px; border-radius:8px; border:1px solid #fde047;">
        <span style="font-size:13px; font-weight:bold; color:#854d0e;">
          🖨️ PDF প্রিন্ট উইন্ডো প্রস্তুত। প্রিন্ট ডায়ালগে "Destination: Save as PDF" সিলেক্ট করে ফাইলটি সেভ করুন।
        </span>
        <button onclick="window.print()" style="padding:6px 16px; background:#0f274a; color:#ffffff; font-weight:bold; border:none; border-radius:6px; cursor:pointer;">
          PDF প্রিন্ট / সেভ করুন
        </button>
      </div>

      <div class="header">
        <div class="logo-wrap">
          <img src="/assets/company-logo.webp" alt="Logo" style="width:48px; height:48px; object-fit:contain;" />
          <div>
            <div class="company-title">Best Responsible Security & Logistics Services Ltd.</div>
            <div class="company-sub">RJSC Reg: C-173617 | Dhaka City Corporation Trade License: TRAD/DSCC/000213/2021</div>
            <div class="company-sub">📞 Central Hotline: 01604-022934, 01777-183004 | ✉️ info@bestresponsiblesecurity.com</div>
          </div>
        </div>
        <div class="report-badge">
          <div class="badge-title">${title}</div>
          <div class="badge-meta">মাসিক মেয়াদ: <strong>${monthLabel}</strong></div>
          <div class="badge-meta">আর্কাইভের তারিখ: ${generatedDate}</div>
        </div>
      </div>

      <div class="stats-bar">
        <div class="stats-item">মোট রেকর্ড: <span class="stats-val">${data.length} টি</span></div>
        <div class="stats-item">ডাটাবেজ স্ট্যাটাস: <span class="stats-val" style="color:#0f766e;">আর্কাইভকৃত (Pre-Purge Backup)</span></div>
        <div class="stats-item">সংরক্ষণ মেয়াদ: <span class="stats-val">চলতি মাস শেষে ডাটাবেজ খালি করার নোটিশ প্রযোজ্য</span></div>
      </div>

      <table>
        ${tableContent}
      </table>

      ${data.length === 0 ? `
        <div style="text-align:center; padding:30px; color:#64748b; font-size:13px; border:1px dashed #cbd5e1; border-radius:8px;">
          এই মাসের জন্য কোনো ডাটা পাওয়া যায়নি।
        </div>
      ` : ''}

      <div class="footer">
        <div>
          <div>* এটি একটি সিস্টেম-জেনারেটেড অফিশিয়াল ক্লাউড ডাটাবেজ ব্যাকআপ রেকর্ড।</div>
          <div>* মাস শেষ হওয়ার পর ডাটাবেজ খালি করার স্বার্থে পূর্বের মাসের রেকর্ড সার্ভার থেকে মুছে ফেলা হয়।</div>
        </div>
        <div style="display:flex; gap:30px;">
          <div class="sig-box">
            অপারেশন্স ডেস্ক ইন-চার্জ<br>
            <span style="font-size:9px; font-weight:normal; color:#64748b;">BRSLSL Central Command</span>
          </div>
          <div class="sig-box">
            ব্যবস্থাপনা পরিচালক / সিইও<br>
            <span style="font-size:9px; font-weight:normal; color:#64748b;">Best Responsible Security</span>
          </div>
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
