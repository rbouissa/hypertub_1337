import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About ARC Air', path: '/about' },
    { name: 'Research Projects', path: '/research' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Recruitment', path: '/recruitment' },
    { name: 'Contact', path: '/contact' },
  ];

  const researchAreas = [
    'Air Quality Monitoring',
    'Climate Change Research',
    'Environmental Sustainability',
    'Atmospheric Sciences',
    'Policy Development',
    'Community Engagement',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-accent dark:bg-dark-surface text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Wind className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">ARC Air</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              African Research Centre on Air Quality and Climate - Advancing research, 
              education, and innovation for a sustainable future in Africa.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300">Mohammed VI Polytechnic University, Morocco</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300">+212 5XX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300">info@arcair.um6p.ma</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Research Areas</h3>
            <ul className="space-y-3">
              {researchAreas.map((area, index) => (
                <li key={index}>
                  <span className="text-gray-300 text-sm">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest research updates and events.
            </p>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-text-primary dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-300">
              © 2024 ARC Air - African Research Centre on Air Quality and Climate. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <Link to="/about-um6p" className="hover:text-primary transition-colors">UM6P</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};