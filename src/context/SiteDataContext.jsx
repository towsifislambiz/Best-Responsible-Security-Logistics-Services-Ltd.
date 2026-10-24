import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, doc, onSnapshot, setDoc, addDoc, 
  deleteDoc, updateDoc, serverTimestamp 
} from 'firebase/firestore';
import { officialRateChart, clientSectors, companyInfo, legalDocuments } from '../data/companyData';

const SiteDataContext = createContext();

// Default 6 Key Officers of Management Team
export const initialManagementTeam = [
  {
    id: "tm-1",
    name: "Md. Raju Ahmed",
    nameBn: "মো. রাজু আহমেদ",
    role: "Founder & Managing Director",
    roleBn: "প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক",
    phone: "01604022929",
    photo: "/assets/team_raju_ahmed.png",
    order: 1,
    bioBn: "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লিমিটেডের প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক। আধুনিক ও প্রযুক্তিভিত্তিক নিরাপত্তা সেবার সুদূরপ্রসারী নেতৃত্ব।"
  },
  {
    id: "tm-2",
    name: "Md. Saiful Islam",
    nameBn: "মোঃ সাইফুল ইসলাম",
    role: "Manager - Operations",
    roleBn: "ম্যানেজার অপারেশন",
    phone: "01604022934",
    photo: "/assets/team_saiful_islam.png",
    order: 2,
    bioBn: "সারাদেশে ফিল্ড অপারেশন, জরুরি সিকিউরিটি ফোর্স মোতায়েন ও সুপারভাইজার কমান্ডের প্রধান সমন্বয়কারী।"
  },
  {
    id: "tm-3",
    name: "Md. Ali Akbar",
    nameBn: "মোঃ আলী আকবর",
    role: "Deputy General Manager (DGM)",
    roleBn: "ডি জি এম (উপ-মহাব্যবস্থাপক)",
    phone: "01604022932",
    photo: "/assets/team_ali_akbar.png",
    order: 3,
    bioBn: "কর্পোরেট ক্লায়েন্ট রিলেশন্স, পলিসি ম্যানেজমেন্ট ও প্রাতিষ্ঠানিক প্রশাসনিক কমান্ড প্রধান।"
  },
  {
    id: "tm-4",
    name: "Md. Kamal Hossain Mazumder",
    nameBn: "মোঃ কামাল হোসেন মজুমদার",
    role: "Marketing Manager",
    roleBn: "ম্যানেজার মার্কেটিং",
    phone: "01604022930",
    photo: "/assets/team_kamal_hossain.png",
    order: 4,
    bioBn: "নতুন শিল্প প্রতিষ্ঠান ও করপোরেট ক্লায়েন্টদের সাথে সিকিউরিটি চুক্তি ও ব্যবসায়িক সম্পর্ক উন্নয়ন প্রধান।"
  },
  {
    id: "tm-5",
    name: "CPLC Md. Mijanur Rahman (Retd.)",
    nameBn: "সিপিএলসি মোঃ মিজানুর রহমান (অব.)",
    role: "Chief Training Officer",
    roleBn: "চিফ অফ ট্রেনিং অফিসার",
    phone: "01805568016",
    photo: "/assets/team_mijanur_rahman.png",
    order: 5,
    bioBn: "সামরিক বাহিনীর অভিজ্ঞ প্রশিক্ষক। গার্ডদের মার্চপাস্ট ড্রিল, ফায়ার ফাইটিং ও জরুরি কমব্যাট ট্রেনিং প্রধান।"
  },
  {
    id: "tm-6",
    name: "Sergeant (Retd.) Hafiz Uddin",
    nameBn: "সার্জেন্ট (অব.) হাফিজ উদ্দিন",
    role: "Area Manager",
    roleBn: "এরিয়া ম্যানেজার",
    phone: "01805568017",
    photo: "/assets/team_hafiz_uddin.png",
    order: 6,
    bioBn: "বাংলাদেশ সেনাবাহিনীর অবসরপ্রাপ্ত সার্জেন্ট। গুরুত্বপূর্ণ ইন্ডাস্ট্রিয়াল ও কমার্শিয়াল জোনের সার্বক্ষণিক নিরাপত্তা তদারকিকারী।"
  }
];

// Default initial staff list if storage and firestore are empty
export const initialStaffList = [
  {
    id: 'st-1',
    name: 'Md. Nazrul Islam',
    role: 'Security Supervisor',
    badgeNo: 'BRS-SP-014',
    phone: '01805568012',
    bloodGroup: 'B+',
    status: 'Active (On-Duty)',
    photo: '/assets/logo (8).png'
  },
  {
    id: 'st-2',
    name: 'Mrs. Fatema Begum',
    role: 'Female Security Officer',
    badgeNo: 'BRS-FS-008',
    phone: '01805568015',
    bloodGroup: 'O+',
    status: 'Active (On-Duty)',
    photo: '/assets/logo (2).png'
  },
  {
    id: 'st-3',
    name: 'Md. Al-Amin Hossain',
    role: 'Senior Gunman (Arms)',
    badgeNo: 'BRS-GM-021',
    phone: '01805568013',
    bloodGroup: 'A+',
    status: 'Active (Cash Escort)',
    photo: '/assets/logo (12).png'
  },
  {
    id: 'st-4',
    name: 'Md. Jahangir Alam',
    role: 'Field Inspection Officer',
    badgeNo: 'BRS-IN-003',
    phone: '01805568010',
    bloodGroup: 'AB+',
    status: 'Night Patrol Duty',
    photo: '/assets/logo (10).png'
  }
];

export const exportToCSV = (data, filename, headers) => {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }
  const keys = Object.keys(headers);
  const headerLabels = Object.values(headers);
  
  const csvRows = [
    headerLabels.join(','),
    ...data.map(row => 
      keys.map(k => {
        let val = row[k] ?? '';
        if (typeof val === 'string') {
          val = `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(',')
    )
  ];
  
  const blob = new Blob(["\ufeff" + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const SiteDataProvider = ({ children }) => {
  // 1. Live Rates State
  const [rates, setRates] = useState(() => {
    try {
      const saved = localStorage.getItem('brslsl_rates_custom');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return officialRateChart;
  });

  // 2. Live Clients Directory
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem('brslsl_clients_custom');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return clientSectors.flatMap(s => s.clients.map(c => ({ ...c, category: s.category })));
  });

  // 3. Live Site Settings
  const [siteSettings, setSiteSettings] = useState(() => {
    const defaults = {
      hotline: companyInfo.contacts.hotline,
      mobileDisplay: companyInfo.contacts.mobileDisplay,
      mdPhone: companyInfo.managingDirector.phone,
      whatsapp: companyInfo.contacts.whatsapp,
      email: companyInfo.contacts.email,
      facebook: companyInfo.contacts.facebook,
      headOfficeAddress: companyInfo.locations.headOffice.address,
      corporateOfficeAddress: companyInfo.locations.corporateOffice.address,
      announcementNotice: "24/7 Rapid Emergency Response Cell on standby nationwide."
    };
    try {
      const saved = localStorage.getItem('brslsl_site_settings');
      if (saved) return { ...defaults, ...JSON.parse(saved) };
    } catch (_) {}
    return defaults;
  });

  // 4. Live Staff List
  const [staffList, setStaffList] = useState(() => {
    try {
      const saved = localStorage.getItem('brslsl_staff_list');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return initialStaffList;
  });

  // 5. Live Management Team
  const [managementTeam, setManagementTeam] = useState(() => {
    try {
      const saved = localStorage.getItem('brslsl_management_team');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return initialManagementTeam;
  });

  // 6. Live Government Licenses & Legal Documents
  const [licenses, setLicenses] = useState(() => {
    try {
      const saved = localStorage.getItem('brslsl_licenses_custom');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return legalDocuments;
  });

  // =========================================================================
  // FIRESTORE REAL-TIME SYNCHRONIZATION
  // =========================================================================

  // Sync Rates from Firestore
  useEffect(() => {
    try {
      const docRef = doc(db, 'settings', 'rates');
      const unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data.rates) && data.rates.length > 0) {
            setRates(data.rates);
            try {
              localStorage.setItem('brslsl_rates_custom', JSON.stringify(data.rates));
            } catch (_) {}
          }
        }
      }, (err) => {
        console.warn('Firestore rates listener notice:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase error for rates:', e);
    }
  }, []);

  // Sync Clients from Firestore
  useEffect(() => {
    try {
      const docRef = doc(db, 'settings', 'clients');
      const unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data.clients) && data.clients.length > 0) {
            setClients(data.clients);
            try {
              localStorage.setItem('brslsl_clients_custom', JSON.stringify(data.clients));
            } catch (_) {}
          }
        }
      }, (err) => {
        console.warn('Firestore clients listener notice:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase error for clients:', e);
    }
  }, []);

  // Sync Site Settings from Firestore
  useEffect(() => {
    try {
      const docRef = doc(db, 'settings', 'site_config');
      const unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setSiteSettings(prev => {
            const updated = { ...prev, ...data };
            try {
              localStorage.setItem('brslsl_site_settings', JSON.stringify(updated));
            } catch (_) {}
            return updated;
          });
        }
      }, (err) => {
        console.warn('Firestore site settings listener notice:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase error for site settings:', e);
    }
  }, []);

  // Sync Staff from Firestore
  useEffect(() => {
    try {
      const colRef = collection(db, 'staff');
      const unsubscribe = onSnapshot(colRef, (snap) => {
        if (!snap.empty) {
          const list = [];
          snap.forEach(d => list.push({ id: d.id, ...d.data() }));
          setStaffList(list);
          try {
            localStorage.setItem('brslsl_staff_list', JSON.stringify(list));
          } catch (_) {}
        }
      }, (err) => {
        console.warn('Firestore staff listener notice:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase error for staff:', e);
    }
  }, []);

  // Sync Management Team from Firestore
  useEffect(() => {
    try {
      const colRef = collection(db, 'management_team');
      const unsubscribe = onSnapshot(colRef, (snap) => {
        if (!snap.empty) {
          const list = [];
          snap.forEach(d => list.push({ id: d.id, ...d.data() }));
          // Sort by order ascending
          list.sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99));
          setManagementTeam(list);
          try {
            localStorage.setItem('brslsl_management_team', JSON.stringify(list));
          } catch (_) {}
        }
      }, (err) => {
        console.warn('Firestore management team listener notice:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase error for management team:', e);
    }
  }, []);

  // Sync Licenses from Firestore
  useEffect(() => {
    try {
      const docRef = doc(db, 'settings', 'licenses');
      const unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data.licenses) && data.licenses.length > 0) {
            setLicenses(data.licenses);
            try {
              localStorage.setItem('brslsl_licenses_custom', JSON.stringify(data.licenses));
            } catch (_) {}
          }
        }
      }, (err) => {
        console.warn('Firestore licenses listener notice:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase error for licenses:', e);
    }
  }, []);

  // =========================================================================
  // ACTIONS & MUTATIONS
  // =========================================================================

  // Save Rates to Firestore & localStorage
  const saveRates = async (updatedRates) => {
    setRates(updatedRates);
    try {
      localStorage.setItem('brslsl_rates_custom', JSON.stringify(updatedRates));
    } catch (_) {}
    try {
      await setDoc(doc(db, 'settings', 'rates'), { rates: updatedRates, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn('Firestore save rates fallback to local:', err);
    }
  };

  const resetRates = async () => {
    setRates(officialRateChart);
    try {
      localStorage.removeItem('brslsl_rates_custom');
    } catch (_) {}
    try {
      await setDoc(doc(db, 'settings', 'rates'), { rates: officialRateChart, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn('Firestore reset rates fallback:', err);
    }
  };

  // Add Client
  const addClient = async (newClient) => {
    const updated = [newClient, ...clients];
    setClients(updated);
    try {
      localStorage.setItem('brslsl_clients_custom', JSON.stringify(updated));
    } catch (_) {}
    try {
      await setDoc(doc(db, 'settings', 'clients'), { clients: updated, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn('Firestore add client fallback:', err);
    }
  };

  // Delete Client
  const deleteClient = async (name) => {
    const updated = clients.filter(c => c.name !== name);
    setClients(updated);
    try {
      localStorage.setItem('brslsl_clients_custom', JSON.stringify(updated));
    } catch (_) {}
    try {
      await setDoc(doc(db, 'settings', 'clients'), { clients: updated, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn('Firestore delete client fallback:', err);
    }
  };

  // Update Site Settings
  const updateSiteSettings = async (newConfig) => {
    setSiteSettings(prev => {
      const merged = { ...prev, ...newConfig };
      try {
        localStorage.setItem('brslsl_site_settings', JSON.stringify(merged));
      } catch (_) {}
      return merged;
    });
    try {
      await setDoc(doc(db, 'settings', 'site_config'), { ...newConfig, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn('Firestore update settings fallback:', err);
    }
  };

  // Add Staff Member
  const addStaff = async (staffData) => {
    const id = staffData.id || ('st-' + Date.now());
    const item = { ...staffData, id };
    setStaffList(prev => {
      const updated = [item, ...prev];
      try {
        localStorage.setItem('brslsl_staff_list', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
    try {
      await setDoc(doc(db, 'staff', id), { ...item, createdAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn('Firestore add staff fallback:', err);
    }
    return item;
  };

  // Delete Staff Member
  const deleteStaff = async (id) => {
    setStaffList(prev => {
      const updated = prev.filter(s => s.id !== id);
      try {
        localStorage.setItem('brslsl_staff_list', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
    try {
      await deleteDoc(doc(db, 'staff', id));
    } catch (err) {
      console.warn('Firestore delete staff fallback:', err);
    }
  };

  // Update Staff Member
  const updateStaff = async (id, fields) => {
    setStaffList(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...fields } : s);
      try {
        localStorage.setItem('brslsl_staff_list', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
    try {
      await updateDoc(doc(db, 'staff', id), { ...fields, updatedAt: serverTimestamp() });
    } catch (err) {
      console.warn('Firestore update staff fallback:', err);
    }
  };

  // =========================================================================
  // MANAGEMENT TEAM ACTIONS
  // =========================================================================

  const addTeamMember = async (memberData) => {
    const id = memberData.id || ('tm-' + Date.now());
    const order = Number(memberData.order) || (managementTeam.length + 1);
    const item = { ...memberData, id, order };
    
    setManagementTeam(prev => {
      const updated = [...prev, item].sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99));
      try {
        localStorage.setItem('brslsl_management_team', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    try {
      await setDoc(doc(db, 'management_team', id), { 
        ...item, 
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp() 
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore add team member fallback to local:', err);
    }
    return item;
  };

  const updateTeamMember = async (id, fields) => {
    setManagementTeam(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, ...fields } : m)
        .sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99));
      try {
        localStorage.setItem('brslsl_management_team', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    try {
      await setDoc(doc(db, 'management_team', id), { 
        ...fields, 
        updatedAt: serverTimestamp() 
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore update team member fallback:', err);
    }
  };

  const deleteTeamMember = async (id) => {
    setManagementTeam(prev => {
      const updated = prev.filter(m => m.id !== id);
      try {
        localStorage.setItem('brslsl_management_team', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    try {
      await deleteDoc(doc(db, 'management_team', id));
    } catch (err) {
      console.warn('Firestore delete team member fallback:', err);
    }
  };

  const resetManagementTeam = async () => {
    setManagementTeam(initialManagementTeam);
    try {
      localStorage.removeItem('brslsl_management_team');
    } catch (_) {}
    // Seed default team into firestore
    try {
      for (const m of initialManagementTeam) {
        await setDoc(doc(db, 'management_team', m.id), { ...m, updatedAt: serverTimestamp() }, { merge: true });
      }
    } catch (err) {
      console.warn('Firestore reset management team fallback:', err);
    }
  };

  // =========================================================================
  // GOVERNMENT LICENSES & LEGAL DOCUMENTS ACTIONS
  // =========================================================================

  const saveLicenses = async (updatedLicenses) => {
    setLicenses(updatedLicenses);
    try {
      localStorage.setItem('brslsl_licenses_custom', JSON.stringify(updatedLicenses));
    } catch (_) {}
    try {
      await setDoc(doc(db, 'settings', 'licenses'), { 
        licenses: updatedLicenses, 
        updatedAt: serverTimestamp() 
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore save licenses fallback:', err);
    }
  };

  const addLicense = async (licenseData) => {
    const id = licenseData.id || ('lic-' + Date.now());
    const item = { ...licenseData, id };
    const updated = [...licenses, item];
    await saveLicenses(updated);
    return item;
  };

  const updateLicense = async (id, fields) => {
    const updated = licenses.map(l => l.id === id ? { ...l, ...fields } : l);
    await saveLicenses(updated);
  };

  const deleteLicense = async (id) => {
    const updated = licenses.filter(l => l.id !== id);
    await saveLicenses(updated);
  };

  const resetLicenses = async () => {
    setLicenses(legalDocuments);
    try {
      localStorage.removeItem('brslsl_licenses_custom');
    } catch (_) {}
    try {
      await setDoc(doc(db, 'settings', 'licenses'), { 
        licenses: legalDocuments, 
        updatedAt: serverTimestamp() 
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore reset licenses fallback:', err);
    }
  };

  return (
    <SiteDataContext.Provider value={{
      rates,
      saveRates,
      resetRates,
      clients,
      addClient,
      deleteClient,
      siteSettings,
      updateSiteSettings,
      staffList,
      addStaff,
      deleteStaff,
      updateStaff,
      managementTeam,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      resetManagementTeam,
      licenses,
      saveLicenses,
      addLicense,
      updateLicense,
      deleteLicense,
      resetLicenses,
      exportToCSV
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
