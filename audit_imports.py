import os
import re

src_dir = r"C:\Users\User\.gemini\antigravity\scratch\best-responsible-security\src"

known_components = {
    'Link', 'Route', 'Routes', 'Outlet', 'Navigate', 'ScrollToTop', 
    'HeroSlider', 'QuoteCalculator', 'Navbar', 'Footer', 'WhatsAppButton', 
    'PhotoCropper', 'PublicLayout', 'IconComponent', 'Icon', 'App',
    'HomePage', 'AboutPage', 'LeadershipPage', 'OrganogramPage', 'LicensesPage',
    'TrainingPage', 'ServicesPage', 'ServiceDetailPage', 'PricingPage',
    'HireGuardPage', 'ClientsPage', 'RecommendationsPage', 'SectorsPage',
    'GalleryPage', 'CareerPage', 'ContactPage', 'AdminLogin', 'AdminLayout',
    'AdminDashboard', 'AdminStaff', 'AdminClients', 'AdminRequisitions',
    'AdminRecruitment', 'AdminRates', 'AdminSettings'
}

for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith('.jsx'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fp:
                code = fp.read()
            
            # Find all imported symbols
            imported_symbols = set()
            import_lines = re.findall(r'import\s+(?:\{([^}]+)\}|(\w+))\s+from', code)
            for named, default in import_lines:
                if named:
                    for s in named.split(','):
                        s = s.strip().split(' as ')[-1].strip()
                        if s: imported_symbols.add(s)
                if default:
                    imported_symbols.add(default.strip())

            # Find all JSX opening tags
            tags = set(re.findall(r'<([A-Z][a-zA-Z0-9]+)', code))
            for tag in tags:
                if tag not in known_components and tag not in imported_symbols:
                    print(f"[{f}] Warning: <{tag}> might be missing import!")

print("Audit complete!")
