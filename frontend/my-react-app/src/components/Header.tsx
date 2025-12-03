import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  const handleLogout = async () => {
    await logout();
    // navigate('/login');
    navigate('/arcair-backoffice/5h2n9t3v8q/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    {
      label: 'About',
      path: '/about',
      dropdown: [
        { label: 'Our People', path: '/team' },
        { label: 'About ARC Air', path: '/about' },
        // { label: 'Visions and Goals', path: '/about#vision' },
        // { label: 'About UM6P', path: '/about-um6p' },
        { label: 'ARC Air & UM6P ', path: '/about-um6p#partnership' },
      ]
    },
    {
      label: 'Research',
      path: '/research',
      dropdown: [
        // { label: 'Our Resources', path: '/research/Resources' },
        { label: 'Laboratory', path: '/research/Laboratory' },
        { label: 'Publications', path: '/research/Publications' },
      ]
    },
    {
      label: 'Events',
      path: '/events',
      // dropdown: [
      //   { label: 'Past Events', path: '/events?filter=past' },
      //   { label: 'Upcoming Events', path: '/events?filter=upcoming' },
      // ]
    },
    { label: 'Recruitment', path: '/recruitment' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Contact', path: '/contact' },
  ];

  const navTextColor = isHomePage
    ? (isScrolled ? 'text-black dark:text-white' : 'text-white')
    : (isDark ? 'text-white' : 'text-black');

  const navBgClass = isHomePage
    ? (isScrolled
        ? 'bg-gradient-to-r from-white via-orange-100 to-orange-400 dark:from-black dark:via-gray-900 dark:to-orange-600 border-b border-orange-500/20 shadow-md'
        : 'bg-transparent border-none shadow-none')
    : (isDark
        ? 'bg-gradient-to-r from-black via-gray-900 to-orange-600 border-b border-orange-500/20 shadow-md'
        : 'bg-gradient-to-r from-white via-orange-100 to-orange-400 border-b border-orange-500/20 shadow-md');

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center space-x-2">
              <img src="/UM6P.svg" alt="UM6P" className="h-5 w-auto" />
              <span className="text-primary font-light text-lg">|</span>
              <img src="/arc_air_logo.png" alt="ARC Air" className="h-8 w-auto drop-shadow-md" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <button
                    className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 hover:scale-105 relative group ${navTextColor}`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-all duration-200 hover:scale-105 relative group ${navTextColor}`}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark-surface rounded-lg shadow-xl border dark:border-gray-700 py-2 z-50"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-3 text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right: Theme + User + Mobile */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${navTextColor}`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Auth */}
            {/* {user ? (
              <>
                <Link to="/admin-panel" className={`p-2 rounded-lg ${navTextColor}`}>
                  <User className="h-5 w-5" />
                </Link>
                <button onClick={handleLogout} className={`p-2 rounded-lg ${navTextColor}`}>
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Login
              </Link>
            )} */}
            {user ? (
  <>
    <Link to="/admin-panel" className={`p-2 rounded-lg ${navTextColor}`}>
      <User className="h-5 w-5" />
    </Link>
    <button onClick={handleLogout} className={`p-2 rounded-lg ${navTextColor}`}>
      <LogOut className="h-5 w-5" />
    </button>
  </>
) : null}


            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-md ${navTextColor}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-gray-800/95 dark:bg-gray-700/95 backdrop-blur-md mt-2 rounded-lg shadow-lg overflow-hidden"
            >
              <nav className="flex flex-col space-y-2 p-4">
                {navItems.map((item) => (
                  <div key={item.path}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => setActiveDropdown(item.label === activeDropdown ? null : item.label)}
                          className="w-full text-left flex items-center justify-between py-2 px-4 rounded-md text-white"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {activeDropdown === item.label && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                                className="block py-2 px-4 rounded-md text-sm text-white hover:text-primary"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 rounded-md text-white hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};


// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext';
// import { useAuth } from '../contexts/AuthContext';
// import { motion, AnimatePresence } from 'framer-motion';

// export const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const { isDark, toggleTheme } = useTheme();
//   const { user, logout } = useAuth();
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { label: 'Home', path: '/' },
//     {
//       label: 'About',
//       path: '/about',
//       dropdown: [
//         { label: 'Our People', path: '/team' },
//         { label: 'About ARC Air', path: '/about' },
//         { label: 'Visions and Goals', path: '/about#vision' },
//         { label: 'About UM6P', path: '/about-um6p' },
//         { label: 'ARC Air & UM6P Relation', path: '/about-um6p#partnership' },
//       ]
//     },
//     { label: 'Research', path: '/research' },
//     {
//       label: 'Events',
//       path: '/events',
//       dropdown: [
//         { label: 'Past Events', path: '/events?filter=past' },
//         { label: 'Upcoming Events', path: '/events?filter=upcoming' },
//       ]
//     },
//     { label: 'Recruitment', path: '/recruitment' },
//     { label: 'Contact', path: '/contact' },
//   ];

//   const handleDropdownToggle = (label: string) => {
//     setActiveDropdown(activeDropdown === label ? null : label);
//   };

//   const handleMouseEnter = (label: string) => {
//     setActiveDropdown(label);
//   };

//   const handleMouseLeave = () => {
//     setActiveDropdown(null);
//   };

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-700 dark:border-gray-600'
//           : 'bg-transparent'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo Section */}
//          <Link to="/" className="flex items-center space-x-3 group">
//   <div className="flex items-center space-x-2">
//     {/* UM6P Logo */}
//     <img 
//       src={isScrolled || isDark ? '/UM6P.svg' : '/UM6P.svg'} 
//       alt="UM6P Logo" 
//       className="h-5 w-auto transition-all duration-300" 
//     />

//     {/* Thin "|" Separator in Orange */}
//     <span className="text-primary font-light text-lg">|</span>

//     {/* ARC Air Logo with subtle shadow */}
//     <img 
//       src="/arc_air_logo.png" 
//       alt="ARC Air Logo" 
//       className="h-8 w-auto transition-all duration-300 drop-shadow-md" 
//     />
//   </div>
// </Link>


//           {/* Add the rest of your navigation code here (unchanged) */}
//         </div>
//       </div>
//     </motion.header>
//   );
// };
