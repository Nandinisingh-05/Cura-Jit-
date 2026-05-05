import React from 'react';
import { Rocket, Globe, Mail, MessageSquare } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const sections = [
    {
      title: 'Product',
      links: ['Features', 'Integrations', 'Pricing', 'Changelog'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Contact', 'Blog'],
    },
    {
      title: 'Support',
      links: ['Documentation', 'Help Center', 'API Status', 'Security'],
    },
  ];

  return (
    <footer className="bg-white border-t border-surface-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white">
                <Rocket size={18} />
              </div>
              <span className="text-xl font-bold text-surface-900">CuraJit</span>
            </div>
            <p className="text-surface-500 max-w-sm mb-6 leading-relaxed">
              Designing the future of healthcare technology with clean, 
              minimalist interfaces and powerful back-end solutions.
            </p>
            <div className="flex gap-4">
              {[Globe, Mail, MessageSquare].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-surface-50 rounded-lg text-surface-400 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-surface-900 mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-surface-500 hover:text-primary-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-surface-50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-surface-400">
          <p>© {currentYear} CuraJit Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
