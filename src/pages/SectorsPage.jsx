import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, Factory, ShoppingCart, Stethoscope, 
  Home, Anchor, Shield, ArrowRight, CheckCircle2
} from 'lucide-react';

export default function SectorsPage() {
  const sectors = [
    {
      icon: Factory,
      title: "RMG, Spinning & Export Textiles",
      subtitle: "Gazipur, Narayanganj, Savar & EPZ Zones",
      desc: "Tailored industrial gate security, biometric worker ingress, finished garment loss prevention, hazardous material patrol, and emergency fire evacuation drills.",
      clients: ["Rony Knitwear", "United Fashion", "Proud Textile", "Sayem Textile", "Dowasland Dyeing"]
    },
    {
      icon: ShoppingCart,
      title: "Supermarket & Retail Chains",
      subtitle: "High Footfall Commercial Complexes",
      desc: "Customer welcoming guards, shoplifting deterrence, cash counter armed protection, and parking traffic marshals.",
      clients: ["Amana Big Bazar Mega Supermarkets", "Commercial Malls"]
    },
    {
      icon: Stethoscope,
      title: "Hospitals & Specialized Healthcare",
      subtitle: "24/7 Clinical & Patient Security",
      desc: "Emergency ward de-escalation, ambulance bay clearance, wheelchair and patient escort, and ward boy/lady hygiene logistics.",
      clients: ["Since in Japan Hospital", "High Care Hospital", "Modern Hospital", "City Hospital"]
    },
    {
      icon: Building,
      title: "Corporate Towers & Banking HQs",
      subtitle: "Gulshan, Banani, Motijheel & Uttara",
      desc: "Access control turnstiles, visitor luggage metal scanning, front desk receptionists, elevator operators, and VIP escort.",
      clients: ["Navana Group Towers", "United Group Facilities", "Rupayan Group Real Estate"]
    },
    {
      icon: Home,
      title: "Residential Societies & Townships",
      subtitle: "Gated Communities & Apartment Blocks",
      desc: "24-hour perimeter night watch, intercom visitor verification, delivery parcel control, and building caretakers.",
      clients: ["Alam Garden Mirpur", "Rony Tower Noyamati", "Chairman House Narayanganj"]
    },
    {
      icon: Anchor,
      title: "Logistics, Seaport & River Cargo",
      subtitle: "Inland River Ports & Transit Depots",
      desc: "Bulk container seal verification, truck scale weighing security, night searchlight surveillance, and anti-smuggling vigilance.",
      clients: ["Inland Logistics Depots", "Confidence Group Hubs"]
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5 text-amber-600" />
            <span>Multi-Sector Versatility</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Industry Sectors We Guard & Serve
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every industry faces unique threats. We design customized Standard Operating Procedures (SOPs) tailored to each specific sector across Bangladesh.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sec, idx) => {
            const IconComponent = sec.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{sec.title}</h3>
                    <p className="text-amber-800 text-xs font-semibold">{sec.subtitle}</p>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                    Key Clients In This Sector:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sec.clients.map((c, cidx) => (
                      <span key={cidx} className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-md border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link 
            to="/hire-guard"
            className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-xl hover:scale-105 transition-all"
          >
            <span>Request Sector-Specific Security Audit</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
