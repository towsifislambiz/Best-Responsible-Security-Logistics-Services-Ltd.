import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, doc, onSnapshot, setDoc, addDoc, 
  deleteDoc, updateDoc, serverTimestamp 
} from 'firebase/firestore';
import { officialRateChart, clientSectors, companyInfo } from '../data/companyData';

const SiteDataContext = createContext();

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
