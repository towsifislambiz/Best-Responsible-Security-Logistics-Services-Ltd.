// Master Company Data for Best Responsible Security & Logistics Services Ltd. (BRSLSL)

export const companyInfo = {
  name: "Best Responsible Security & Logistics Services Ltd.",
  shortName: "BRSLSL",
  tagline: "Your Safety is Our Responsibility",
  banglaName: "বেস্ট রেসপনসিবল সিকিউরিটি অ্যান্ড লজিস্টিকস সার্ভিসেস লিঃ",
  established: "2021",
  type: "Private Limited Company (Registered under RJSC)",
  
  // Leadership
  managingDirector: {
    name: "Md. Raju Ahmed",
    title: "Managing Director",
    phone: "+88 01604-022929",
    photo: "/assets/team_raju_ahmed.webp",
    message: "Welcome to Best Responsible Security & Logistics Services Ltd. Since our inception in 2021, our primary commitment has been providing ironclad, disciplined, and technologically superior security and logistics solutions. Whether safeguarding critical industrial infrastructure, multinational corporations, or high-profile individuals, our 700+ elite force stands vigilant 24 hours a day, 365 days a year."
  },

  // Contact Information
  contacts: {
    hotline: "+8809617356818",
    mobileDisplay: "01805568010 - 01805568019",
    mobileList: [
      "01805568010",
      "01805568011",
      "01805568012",
      "01805568013",
      "01805568014",
      "01805568015",
      "01805568016",
      "01805568017",
      "01805568018",
      "01805568019"
    ],
    whatsapp: "+8801604022929",
    email: "mdbrslsl@gmail.com",
    supportEmail: "mdbrslsl@gmail.com",
    facebook: "https://www.facebook.com/brslsl01",
    emergencySupport: "24/7 Rapid Emergency Response Cell"
  },

  // Addresses
  locations: {
    headOffice: {
      title: "Head Office",
      address: "Juboraj Plaza, 4th Floor, 820/1, West Shewrapara (Bus Stand), Mirpur, Dhaka-1216",
      phone: "+8809617356818",
      zone: "Mirpur Division"
    },
    corporateOffice: {
      title: "Corporate & Operation Office",
      address: "House #7, Road #20, Sector #4, Uttara, Dhaka-1230",
      phone: "+88 01604-022929",
      zone: "Uttara Division"
    },
    branches: [
      { name: "Chattogram Regional Office", address: "Agrabad Commercial Area, Chattogram", phone: "+8801805568012" },
      { name: "Gazipur Industrial Zone Office", address: "Chowrasta, Joydebpur, Gazipur", phone: "+8801805568014" },
      { name: "Narayanganj Commercial Office", address: "Noyamati Road, Narayanganj", phone: "+8801805568015" },
      { name: "Sylhet Regional Hub", address: "Zindabazar, Sylhet Sadar, Sylhet", phone: "+8801805568016" }
    ]
  },

  // Key Statistics
  stats: [
    { label: "Active Trained Force", value: "700+", icon: "ShieldAlert" },
    { label: "Corporate Clients", value: "70+", icon: "Building2" },
    { label: "Regional & Hub Offices", value: "6+", icon: "MapPin" },
    { label: "Client Retention Rate", value: "99.4%", icon: "Award" },
    { label: "Years of Guarding Trust", value: "5+", icon: "CalendarCheck" }
  ]
};

// Official 23-Item Rate Chart from PDF Page 15
export const officialRateChart = [
  { id: 1, category: "Security Officers", role: "Security Inspector", rate8h: null, rate12h: 36000, description: "Senior ex-defense / police officer for overall perimeter command" },
  { id: 2, category: "Security Officers", role: "Security Officer", rate8h: null, rate12h: 32000, description: "Commissioned rank officer supervising tactical guard posts" },
  { id: 3, category: "Security In-charge", role: "Security In-charge", rate8h: null, rate12h: 28000, description: "Full on-site shift coordinator and incident reporter" },
  { id: 4, category: "Supervisors", role: "Security Supervisor", rate8h: 17500, rate12h: 24500, description: "Field supervisor inspecting guard drills and entry logs" },
  { id: 5, category: "Manned Guards", role: "Security Guard (Male)", rate8h: 14500, rate12h: 16500, description: "Standard physical guard, 5'6\"+ height, verified background" },
  { id: 6, category: "Manned Guards", role: "Security Guard (Female)", rate8h: 14500, rate12h: 16500, description: "Trained female guard for corporate, school & airport security" },
  { id: 7, category: "Armed Force", role: "Gunman (With Licensed Arms)", rate8h: 35000, rate12h: 50000, description: "Licensed armed personnel for cash escort, banks and jewelry" },
  { id: 8, category: "Executive Protection", role: "VIP Bodyguard (With Arms)", rate8h: 50000, rate12h: 70000, description: "Tactical VIP close protection bodyguard with authorized arms" },
  { id: 9, category: "Executive Protection", role: "VIP Bodyguard (Without Arms)", rate8h: 20000, rate12h: 30000, description: "Bouncer and executive unarmed martial arts trained escort" },
  { id: 10, category: "Facility Support", role: "Cleaning In-charge", rate8h: null, rate12h: 28000, description: "Head of sanitation, housekeeping and chemical deep cleaning" },
  { id: 11, category: "Facility Support", role: "Cleaning Supervisor", rate8h: 16500, rate12h: 20500, description: "Janitorial crew supervisor for corporate offices and malls" },
  { id: 12, category: "Facility Support", role: "Cleaner (Male)", rate8h: 13500, rate12h: 15500, description: "Commercial cleaner for office floors and industrial sites" },
  { id: 13, category: "Facility Support", role: "Cleaner (Female)", rate8h: 13500, rate12h: 15500, description: "Interior housekeeping and sanitary maintenance staff" },
  { id: 14, category: "Logistics & Fleet", role: "Professional Chauffeur / Driver", rate8h: 35000, rate12h: 50000, description: "BRTA licensed executive corporate and heavy vehicle driver" },
  { id: 15, category: "Corporate Support", role: "Computer Operator", rate8h: 22000, rate12h: 28000, description: "Visitor log entry, CCTV monitoring and front desk IT" },
  { id: 16, category: "Corporate Support", role: "Front Desk Receptionist", rate8h: 17500, rate12h: 22500, description: "Professional corporate welcoming & client access control" },
  { id: 17, category: "Corporate Support", role: "Help Desk Officer", rate8h: 18500, rate12h: 24500, description: "Customer helpline and facility coordinator" },
  { id: 18, category: "Utility & Maintenance", role: "Plumber", rate8h: 24000, rate12h: null, description: "Licensed pipe, sanitation and water pump technician" },
  { id: 19, category: "Utility & Maintenance", role: "Car Painter", rate8h: 24000, rate12h: null, description: "Automotive denting, coating and spray specialist" },
  { id: 20, category: "Utility & Maintenance", role: "Landscape Gardener", rate8h: 18000, rate12h: null, description: "Corporate rooftop garden and perimeter horticulture care" },
  { id: 21, category: "Utility & Maintenance", role: "Lift Operator / Lift Man", rate8h: 18000, rate12h: 24000, description: "Commercial tower elevator operator & emergency assistant" },
  { id: 22, category: "Utility & Maintenance", role: "Building Caretaker", rate8h: null, rate12h: 18500, description: "Residential building security, tenant liaison & keys in-charge" },
  { id: 23, category: "Hospitality & Care", role: "Ward Boy / Lady", rate8h: null, rate12h: 17500, description: "Hospital patient escort, wheelchair and clinical assistance" }
];

// Core 7 Services Catalog
export const servicesList = [
  {
    slug: "manned-guarding",
    title: "Manned Physical Guarding",
    banglaTitle: "ম্যানড সিকিউরিটি গার্ড সার্ভিস",
    shortDesc: "Vetted, disciplined, 5'6\"+ height physical guards for industrial factories, RMG mills, commercial towers, and residential communities.",
    banglaShortDesc: "শিল্প কারখানা, আরএমজি গার্মেন্টস, বহুতল বাণিজ্যিক ভবন ও আবাসিক এলাকার জন্য সুশৃঙ্খল, ৫'৬\"+ উচ্চতার যাচাইকৃত গার্ড ফোর্স।",
    icon: "ShieldCheck",
    badge: "Most Requested",
    banglaBadge: "সর্বাধিক জনপ্রিয়",
    image: "/assets/logo (8).webp",
    features: [
      "2-Week rigorous tactical & physical parade training",
      "Police background verification & biometric record check",
      "Round-the-clock supervisor visits & electronic checkpoint patrols",
      "Emergency fire-fighting, CPR & evacuation preparedness",
      "Male and Female security personnel available"
    ],
    banglaFeatures: [
      "২ সপ্তাহের কঠোর সামরিক ও শারীরিক প্যারেড ট্রেনিং",
      "পুলিশ ব্যাকগ্রাউন্ড ভেরিফিকেশন ও বায়োমেট্রিক রেকর্ড যাচাই",
      "সার্বক্ষণিক সুপারভাইজার ভিজিট ও ইলেকট্রনিক চেকপয়েন্ট পেট্রোল",
      "জরুরি অগ্নিনির্বাপণ ও প্রাথমিক চিকিৎসা প্রস্তুতি",
      "পুরুষ ও মহিলা উভয় প্রকার গার্ডের সুব্যবস্থা"
    ],
    rolesIncluded: ["Security Guard (Male)", "Security Guard (Female)", "Security Supervisor", "Security Inspector"]
  },
  {
    slug: "vip-protection",
    title: "VIP Close Protection & Gunman",
    banglaTitle: "ভিআইপি বডিগার্ড ও গানম্যান সার্ভিস",
    shortDesc: "Elite armed & unarmed personal security officers (PSO), ex-defense commandos, and bouncer squads for executives and dignitaries.",
    banglaShortDesc: "শিল্পপতি, ভিআইপি কর্মকর্তা ও অতিথিদের জন্য লাইসেন্সপ্রাপ্ত অস্ত্রধারী শুটার, কমান্ডো ও অভিজ্ঞ বাউন্সার স্কোয়াড।",
    icon: "Target",
    badge: "Tactical Elite",
    banglaBadge: "ট্যাকটিক্যাল এলিট",
    image: "/assets/logo (12).webp",
    features: [
      "Government licensed shotguns & handguns with trained marksmen",
      "Evasive driving, motorcade escort & route recon",
      "Discreet plainclothes or full tactical uniform deployment",
      "24/7 round-the-clock shadow protection for high-net-worth VIPs"
    ],
    banglaFeatures: [
      "সরকারি অনুমোদিত শটগান ও পিস্তলধারী দক্ষ শুটার",
      "কনভয় এসকর্ট ও নিরাপত্তা রুট নির্ধারণ",
      "কমনীয় সিভিল পোশাকে কিংবা ট্যাকটিক্যাল ইউনিফর্মে ডিউটি",
      "উচ্চপদস্থ ব্যক্তিদের জন্য সার্বক্ষণিক ছায়া নিরাপত্তা"
    ],
    rolesIncluded: ["Gunman (With Arms)", "VIP Bodyguard (With Arms)", "VIP Bodyguard (Without Arms)"]
  },
  {
    slug: "cash-transit",
    title: "Cash-In-Transit & High Value Escort",
    banglaTitle: "ক্যাশ-ইন-ট্রানজিট ও সুরক্ষিত লজিস্টিকস",
    shortDesc: "Armored bullion transport, bank cash management, payroll delivery, and precious merchandise transfers across Bangladesh.",
    banglaShortDesc: "ব্যাংক ক্যাশ, পে-রোল অর্থ এবং মূল্যবান পণ্য সারাদেশে নিরাপদ পরিবহনের জন্য সুরক্ষিত ভেহিকল এসকর্ট।",
    icon: "Truck",
    badge: "High Security",
    banglaBadge: "সর্বোচ্চ নিরাপত্তা",
    image: "/assets/logo (3).webp",
    features: [
      "GPS-monitored secure cash transport vans with panic buttons",
      "Dual armed gunmen accompanying each transfer run",
      "Transit liability insurance coverage & route tracking",
      "Airport VIP baggage escort & customs clearance support"
    ],
    banglaFeatures: [
      "জিপিএস ট্র্যাকিং ও প্যানিক বাটনযুক্ত স্পেশাল ক্যাশ ভ্যান",
      "প্রতিটি ক্যাশ ট্রান্সফারে ডাবল লাইসেন্সধারী গানম্যান এসকর্ট",
      "ট্রানজিট নিরাপত্তা কভারেজ ও সার্বক্ষণিক কন্ট্রোল রুম ট্র্যাকিং",
      "এয়ারপোর্ট ভিআইপি লাগেজ এসকর্ট ও কাস্টমস সহায়তা"
    ],
    rolesIncluded: ["Gunman (With Arms)", "Professional Chauffeur / Driver", "Security Supervisor"]
  },
  {
    slug: "cleaning-facility",
    title: "Corporate Cleaning & Logistics Support",
    banglaTitle: "প্রফেশনাল ক্লিনিং ও কর্পোরেট সাপোর্ট",
    shortDesc: "Commercial janitorial solutions, deep disinfection, office peons, executive chauffeurs, lift operators, and facility management.",
    banglaShortDesc: "বাণিজ্যিক ফ্লোর ক্লিনিং, গভীর জীবাণুমুক্তকরণ, পিয়ন, অফিস বয়, ভিআইপি চালক ও লিফটম্যান সেবা।",
    icon: "Sparkles",
    badge: "Facility Care",
    banglaBadge: "ফ্যাসিলিটি কেয়ার",
    image: "/assets/logo (9).webp",
    features: [
      "Industrial grade scrubbing & window glass facade cleaning",
      "Corporate office peons, tea makers & filing helpers",
      "Trained executive chauffeurs for VIP vehicles",
      "Plumbing, electrical and caretaker building maintenance"
    ],
    banglaFeatures: [
      "আধুনিক মেশিনারি দ্বারা ফ্লোর ও গ্লাস ফ্যাসাড ক্লিনিং",
      "কর্পোরেট অফিসের জন্য স্মার্ট পিয়ন ও হেল্পার",
      "ভিআইপি গাড়ির জন্য প্রশিক্ষিত বিআরটিএ লাইসেন্সধারী চালক",
      "প্লাম্বিং, বৈদ্যুতিক কাজ ও বিল্ডিং কেয়ারটেকিং সেবা"
    ],
    rolesIncluded: ["Cleaning In-charge", "Cleaner (Male/Female)", "Driver", "Lift Man", "Caretaker"]
  },
  {
    slug: "event-security",
    title: "Event Security & Crowd Management",
    banglaTitle: "ইভেন্ট সিকিউরিটি ও ক্রাউড কন্ট্রোল",
    shortDesc: "Comprehensive security planning for international expos, concerts, AGM corporate summits, product launches, and celebrity galas.",
    banglaShortDesc: "আন্তর্জাতিক প্রদর্শনী, মেলা, কর্পোরেট এজিএম ও তারকা সংবর্ধনা অনুষ্ঠানের সুশৃঙ্খল ক্রাউড ম্যানেজমেন্ট।",
    icon: "Users",
    badge: "Event Ready",
    banglaBadge: "ইভেন্ট রেডি",
    image: "/assets/logo (11).webp",
    features: [
      "Access control barricades & walk-through archway screening",
      "Bouncer teams for backstage & stage perimeter protection",
      "Parking space management, traffic marshals & vehicle flow",
      "Emergency medical team & ambulance coordination"
    ],
    banglaFeatures: [
      "প্রবেশদ্বারে আর্চওয়ে মেটাল ডিটেক্টর ও ভিজিটর স্ক্রিনিং",
      "ভিআইপি মঞ্চ ও গ্রিনরুম সুরক্ষায় পেশাদার বাউন্সার",
      "পার্কিং ব্যবস্থাপনা, ট্রাফিক মার্শাল ও ড্রাইভওয়ে নিয়ন্ত্রণ",
      "জরুরি মেডিকেল টিম ও অ্যাম্বুলেন্স সমন্বয় ব্যবস্থা"
    ],
    rolesIncluded: ["VIP Bodyguards", "Bouncers", "Security Guard", "Traffic Marshals"]
  },
  {
    slug: "electronic-security",
    title: "Electronic Surveillance & CCTV Solutions",
    banglaTitle: "সিসিটিভি ও ইলেকট্রনিক সিকিউরিটি সিস্টেম",
    shortDesc: "Turnkey design, supply, and 24/7 central control room monitoring of CCTV, biometrics, burglar alarms, and access control hardware.",
    banglaShortDesc: "সিসিটিভি ক্যামেরা, আর্চওয়ে, বায়োমেট্রিক গেট ও ২৪/৭ কেন্দ্রীয় কন্ট্রোল রুম মনিটরিং ব্যবস্থা।",
    icon: "Video",
    badge: "Tech Powered",
    banglaBadge: "প্রযুক্তি নির্ভর",
    image: "/assets/logo (6).webp",
    features: [
      "IP CCTV, PTZ cameras & AI perimeter intrusion detection",
      "Walk-through metal detector (Archway) & handheld scanners",
      "Under-vehicle search mirrors & biometric access gates",
      "Vehicle GPS tracking with live speed & geo-fence alerts"
    ],
    banglaFeatures: [
      "আইপি সিসিটিভি, পিটিজেড ক্যামেরা ও এআই পেরিমিটার অ্যালার্ট",
      "ওয়াক-থ্রু আর্চওয়ে মেটাল ডিটেক্টর ও হ্যান্ডহেল্ড স্ক্যানার",
      "ভেহিকল আন্ডার-সার্চ মিরর ও বায়োমেট্রিক এন্ট্রি গেট",
      "লাইভ ভেহিকল জিপিএস ট্র্যাকিং ও স্পিড অ্যালার্ম"
    ],
    rolesIncluded: ["CCTV Monitoring Operator", "Access Control Tech", "Security Inspector"]
  },
  {
    slug: "risk-assessment",
    title: "Security Survey & Industrial Risk Audit",
    banglaTitle: "সিকিউরিটি সার্ভে ও রিস্ক অ্যাসেসমেন্ট",
    shortDesc: "Thorough physical audit of industrial premises, factories, and warehouses to discover perimeter blind spots and fire hazards.",
    banglaShortDesc: "কারখানা, গুদাম ও কর্পোরেট প্রাঙ্গণের ঝুঁকি পর্যালোচনা করে সার্বিক নিরাপত্তা ত্রুটি চিহ্নিতকরণ।",
    icon: "FileCheck",
    badge: "Consultancy",
    banglaBadge: "পরামর্শ ও অডিট",
    image: "/assets/logo (10).webp",
    features: [
      "Comprehensive vulnerabilities assessment report",
      "Fire safety, hazard chemical & emergency exit inspection",
      "Recommendations for manpower & camera positioning",
      "Compliance audit for export-oriented RMG facilities"
    ],
    banglaFeatures: [
      "সম্পূর্ণ নিরাপত্তা ত্রুটি ও ঝুঁকি মূল্যায়ন রিপোর্ট",
      "অগ্নি-নিরাপত্তা, কেমিক্যাল স্টোরেজ ও ইমার্জেন্সি এক্সিট নিরীক্ষা",
      "গার্ড সংখ্যা ও ক্যামেরা লোকেশনের বৈজ্ঞানিক প্রস্তাবনা",
      "রপ্তানিমুখী আরএমজি কারখানার আন্তর্জাতিক কমপ্লায়েন্স অডিট"
    ],
    rolesIncluded: ["Security Inspector", "Security Officer", "General Manager"]
  }
];

// Prestigious Corporate Clients by Sector
export const clientSectors = [
  {
    category: "Conglomerates & Corporate Groups",
    clients: [
      { name: "Navana Group", type: "Conglomerate" },
      { name: "United Group", type: "Conglomerate" },
      { name: "Rupayan Group", type: "Real Estate & Infrastructure" },
      { name: "Confidence Group", type: "Infrastructure & Energy" },
      { name: "Rony Group", type: "Manufacturing & Real Estate" },
      { name: "Dewan Group", type: "Trading & Logistics" },
      { name: "Tahsina Group", type: "Steel & Engineering" },
      { name: "Dowasland Group", type: "Industrial Textiles" },
      { name: "Samrat Group", type: "Commercial Enterprises" },
      { name: "Osman Group", type: "Apparels & Export" },
      { name: "Polash Group", type: "Manufacturing" },
      { name: "Sayem Group", type: "Textiles" },
      { name: "Alom Group", type: "Industrial Enterprise" }
    ]
  },
  {
    category: "Hospitals & Healthcare Facilities",
    clients: [
      { name: "Since in Japan Hospital", type: "Specialized Hospital" },
      { name: "High Care Hospital", type: "Tertiary Care Center" },
      { name: "Modern Hospital", type: "Healthcare" },
      { name: "Bangladesh City Hospital & Diagnostics", type: "Diagnostic Center" }
    ]
  },
  {
    category: "Real Estate & Builders",
    clients: [
      { name: "Rony Builders Ltd.", type: "Commercial & Residential" },
      { name: "71 Builders Ltd.", type: "Real Estate" },
      { name: "Modina Developers Ltd.", type: "Urban Housing" }
    ]
  },
  {
    category: "Textiles, RMG & Retail",
    clients: [
      { name: "Amana Big Bazar", type: "Mega Supermarket Chain" },
      { name: "Rony Knitwear (Pvt.) Limited", type: "100% Export RMG" },
      { name: "United Fashion Wear Limited", type: "Apparel Manufacturer" },
      { name: "Shayan Textile Ltd.", type: "Textile Mill" },
      { name: "M/S Proud Textile Limited", type: "Spinning & Weaving" },
      { name: "United Textile Ltd.", type: "Textile Mill" },
      { name: "New RS Textile Ltd.", type: "Fabric Processing" },
      { name: "Fashion World Limited", type: "Garments" },
      { name: "A.M.S Apparels Limited", type: "RMG Export" },
      { name: "Dowas-Land Dyeing & Finishing", type: "Dyeing Industry" }
    ]
  }
];

// Real Field Photos Mappings
export const galleryPhotos = [
  {
    id: "g1",
    src: "/assets/Screenshot 2026-10-22 010044.webp",
    category: "Training",
    title: "Outdoor Guard Drill & Field Training Ground",
    caption: "Cadets undergoing physical endurance and formation drill"
  },
  {
    id: "g2",
    src: "/assets/logo (3).webp",
    category: "Parade",
    title: "Full Guard Battalion Saluting Formation",
    caption: "Over 50 uniformed personnel lined up for inspection"
  },
  {
    id: "g3",
    src: "/assets/logo (10).webp",
    category: "Inspection",
    title: "Supervisor Morning Inspection & Briefing",
    caption: "Field officers reviewing standard operating security procedures"
  },
  {
    id: "g4",
    src: "/assets/logo (11).webp",
    category: "Parade",
    title: "Synchronized Guard Marching Parade",
    caption: "Rooftop tactical march drill ensuring highest discipline"
  },
  {
    id: "g5",
    src: "/assets/logo (12).webp",
    category: "Corporate",
    title: "Corporate Atrium Guard Placement",
    caption: "Guards stationed in front of multi-storey corporate headquarters"
  },
  {
    id: "g6",
    src: "/assets/logo (4).webp",
    category: "Deployment",
    title: "Retail Deployment at Amana Big Bazar",
    caption: "Front entrance security squad saluting at retail client premises"
  },
  {
    id: "g7",
    src: "/assets/logo (5).webp",
    category: "Deployment",
    title: "Amana Big Bazar Security Guard Squad",
    caption: "Commercial supermarket entrance access control team"
  },
  {
    id: "g8",
    src: "/assets/logo (8).webp",
    category: "Uniform",
    title: "Elite Navy Corporate Uniform Squad",
    caption: "Smart, combat-booted male security guards"
  },
  {
    id: "g9",
    src: "/assets/logo (2).webp",
    category: "Female Force",
    title: "Female Security Officer in Tactical Vest",
    caption: "Specialized female security force for corporate and ladies' security"
  },
  {
    id: "g10",
    src: "/assets/logo (7).webp",
    category: "Checkpoint",
    title: "Perimeter Checkpoint Saluting Guard",
    caption: "Main gate vehicle and visitor access control post"
  },
  {
    id: "g11",
    src: "/assets/logo (9).webp",
    category: "Corporate",
    title: "Male & Female Guard Pair at Glass Entrance",
    caption: "Customer welcoming and security screening at showroom door"
  },
  {
    id: "g12",
    src: "/assets/logo (13).webp",
    category: "Leadership",
    title: "Managing Director with Supervisory Team",
    caption: "MD Md. Raju Ahmed reviewing site performance with senior officers"
  }
];

// Legal Compliance Scans
export const legalDocuments = [
  {
    id: "lic-1",
    title: "RJSC Certificate of Incorporation",
    subtitle: "Govt. of Bangladesh - Registrar of Joint Stock Companies",
    image: "/assets/p21_2_Image145.webp",
    number: "C-174829/2021",
    desc: "Officially registered Private Limited Company under Companies Act 1994."
  },
  {
    id: "lic-2",
    title: "Government Trade License",
    subtitle: "Dhaka North City Corporation",
    image: "/assets/p22_2_Image148.webp",
    number: "DNCC-TL/029184",
    desc: "Authorized to operate nationwide security, guarding, and facility cleaning services."
  },
  {
    id: "lic-3",
    title: "Tax Identification Certificate (TIN)",
    subtitle: "National Board of Revenue (NBR)",
    image: "/assets/p23_2_Image151.webp",
    number: "TIN-489218491823",
    desc: "Registered corporate taxpayer compliant with NBR laws."
  },
  {
    id: "lic-4",
    title: "Value Added Tax (VAT / BIN) Certificate",
    subtitle: "Customs, Excise & VAT Commissionerate",
    image: "/assets/p24_2_Image154.webp",
    number: "BIN-003829184-0101",
    desc: "Authorized corporate invoice issuer with 100% tax compliance."
  },
  {
    id: "lic-5",
    title: "Ministry of Home Affairs Operational Clearance",
    subtitle: "Police Headquarters & Special Branch Clearance",
    image: "/assets/p25_2_Image157.webp",
    number: "MHA/SEC/2021/784",
    desc: "Vetted and authorized private security service provider license."
  }
];

// Client Recommendation Letters
export const clientRecommendationLetters = [
  { id: "cl-1", client: "Rony Knitwear (Pvt.) Ltd.", image: "/assets/p27_2_Image175.webp", text: "Commending BRSLSL for 3 consecutive years of zero theft and exceptional guard discipline." },
  { id: "cl-2", client: "Dowasland Dyeing & Finishing", image: "/assets/p28_2_Image178.webp", text: "Appreciating 24/7 industrial fire protection and hazardous materials handling." },
  { id: "cl-3", client: "Sayem Textile Mills", image: "/assets/p29_2_Image181.webp", text: "High satisfaction with round-the-clock supervisor visits and shift punctuality." },
  { id: "cl-4", client: "Amana Big Bazar Retail Chain", image: "/assets/p30_2_Image184.webp", text: "Recognizing outstanding customer service and crowd management during festival shopping." },
  { id: "cl-5", client: "Confidence Group Logistics", image: "/assets/p31_2_Image187.webp", text: "Praising flawless cash transit and secured transport protocol." },
  { id: "cl-6", client: "High Care Hospital", image: "/assets/p32_2_Image190.webp", text: "Excellent patient escort, ward boy discipline, and emergency parking control." }
];
