// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, Users, Calendar } from 'lucide-react';

// export const Contact: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//     inquiryType: 'general'
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//     // In a real application, you would send the form data to your backend
//     setTimeout(() => setIsSubmitted(false), 3000);
//   };

//   const contactInfo = [
//     {
//       icon: MapPin,
//       title: 'Address',
//       details: [
//         'African Research Centre on Air Quality and Climate',
//         'Mohammed VI Polytechnic University',
//         'Lot 660, Hay Moulay Rachid',
//         'Ben Guerir 43150, Morocco'
//       ],
//       color: 'bg-primary'
//     },
//     {
//       icon: Phone,
//       title: 'Phone',
//       details: [
//         'Main Office: +212 5XX-XXXXXX',
//         'Research Dept: +212 5XX-XXXXXX',
//         'Administration: +212 5XX-XXXXXX'
//       ],
//       color: 'bg-accent'
//     },
//     {
//       icon: Mail,
//       title: 'Email',
//       details: [
//         'General: info@arcair.um6p.ma',
//         'Research: research@arcair.um6p.ma',
//         'Partnerships: partnerships@arcair.um6p.ma',
//         'Media: media@arcair.um6p.ma'
//       ],
//       color: 'bg-blue-500'
//     },
//     {
//       icon: Clock,
//       title: 'Office Hours',
//       details: [
//         'Monday - Friday: 8:00 AM - 6:00 PM',
//         'Saturday: 9:00 AM - 1:00 PM',
//         'Sunday: Closed',
//         'GMT+1 (Morocco Time)'
//       ],
//       color: 'bg-green-500'
//     }
//   ];

//   const inquiryTypes = [
//     { value: 'general', label: 'General Information' },
//     { value: 'research', label: 'Research Collaboration' },
//     { value: 'partnership', label: 'Partnership Opportunities' },
//     { value: 'media', label: 'Media Inquiries' },
//     { value: 'recruitment', label: 'Career Opportunities' },
//     { value: 'events', label: 'Events & Conferences' },
//   ];

//   const quickActions = [
//     {
//       icon: Users,
//       title: 'Research Collaboration',
//       description: 'Explore partnership opportunities with our research teams.',
//       action: 'Learn More',
//       color: 'bg-primary'
//     },
//     {
//       icon: Calendar,
//       title: 'Schedule a Visit',
//       description: 'Visit our facilities and meet our research teams.',
//       action: 'Book Visit',
//       color: 'bg-accent'
//     },
//     {
//       icon: MessageSquare,
//       title: 'Media Inquiries',
//       description: 'Press releases, interviews, and media resources.',
//       action: 'Media Kit',
//       color: 'bg-blue-500'
//     }
//   ];

//   return (
//     <div className="min-h-screen pt-16">
//       {/* Hero Section */}
//       <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl md:text-6xl font-bold text-text-primary dark:text-dark-text mb-6">
//               Contact Us
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
//               Get in touch with our team for research collaborations, partnership 
//               opportunities, or any questions about our work in air quality and climate research.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Quick Actions */}
//       {/* <section className="py-16 bg-background dark:bg-dark-bg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-8">
//             {quickActions.map((action, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg border dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 text-center"
//               >
//                 <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
//                   <action.icon className="h-8 w-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-3">
//                   {action.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
//                   {action.description}
//                 </p>
//                 <button className="bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium transition-colors">
//                   {action.action}
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* Contact Information */}
//       {/* <section className="py-16 bg-gray-50 dark:bg-dark-surface">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text mb-4">
//               Get in Touch
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-300">
//               Multiple ways to reach our team
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {contactInfo.map((info, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-white dark:bg-dark-bg rounded-xl p-6 shadow-lg border dark:border-gray-700"
//               >
//                 <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center mb-4`}>
//                   <info.icon className="h-6 w-6 text-white" />
//                 </div>
//                 <h3 className="text-lg font-bold text-text-primary dark:text-dark-text mb-3">
//                   {info.title}
//                 </h3>
//                 <div className="space-y-1">
//                   {info.details.map((detail, detailIndex) => (
//                     <p key={detailIndex} className="text-sm text-gray-600 dark:text-gray-300">
//                       {detail}
//                     </p>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* Contact Form and Map */}
//       <section className="py-16 bg-background dark:bg-dark-bg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Contact Form */}
//             {/* <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-lg border dark:border-gray-700"
//             >
//               <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-6">
//                 Send Us a Message
//               </h3>
              
//               {isSubmitted ? (
//                 <div className="text-center py-12">
//                   <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//                   <h4 className="text-xl font-bold text-text-primary dark:text-dark-text mb-2">
//                     Message Sent Successfully!
//                   </h4>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     Thank you for your message. We'll get back to you within 24 hours.
//                   </p>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         required
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
//                         placeholder="Your full name"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         required
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
//                         placeholder="your.email@example.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="phone" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
//                         placeholder="+212 5XX-XXXXXX"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="inquiryType" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
//                         Inquiry Type
//                       </label>
//                       <select
//                         id="inquiryType"
//                         name="inquiryType"
//                         value={formData.inquiryType}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
//                       >
//                         {inquiryTypes.map((type) => (
//                           <option key={type.value} value={type.value}>
//                             {type.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="subject" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
//                       Subject *
//                     </label>
//                     <input
//                       type="text"
//                       id="subject"
//                       name="subject"
//                       required
//                       value={formData.subject}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
//                       placeholder="Brief subject of your inquiry"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="message" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
//                       Message *
//                     </label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       rows={6}
//                       required
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
//                       placeholder="Please provide details about your inquiry..."
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-primary hover:bg-primary/90 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
//                   >
//                     <Send className="h-5 w-5" />
//                     <span>Send Message</span>
//                   </button>
//                 </form>
//               )}
//             </motion.div> */}
//             <motion.div
//   initial={{ opacity: 0, x: -50 }}
//   whileInView={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.8 }}
//   className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-lg border dark:border-gray-700"
// >
//   <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-6">
//     Contact Information
//   </h3>

//   <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
//     For any inquiries related to research collaborations, partnerships, or events, 
//     please reach out to our team using the contact information below. 
//     We’ll be happy to connect you with the right department.
//   </p>

//   <div className="space-y-4">
//     <div className="flex items-start space-x-4">
//       <Mail className="h-6 w-6 text-primary mt-1" />
//       <div>
//         <h4 className="font-semibold text-text-primary dark:text-dark-text">Email</h4>
//         <p className="text-gray-600 dark:text-gray-300">
//           info@arcair.um6p.ma
//         </p>
//       </div>
//     </div>

//     <div className="flex items-start space-x-4">
//       <Phone className="h-6 w-6 text-primary mt-1" />
//       <div>
//         <h4 className="font-semibold text-text-primary dark:text-dark-text">Phone</h4>
//         <p className="text-gray-600 dark:text-gray-300">
//           +212 5XX-XXXXXX
//         </p>
//       </div>
//     </div>

//     <div className="flex items-start space-x-4">
//       <MapPin className="h-6 w-6 text-primary mt-1" />
//       <div>
//         <h4 className="font-semibold text-text-primary dark:text-dark-text">Office</h4>
//         <p className="text-gray-600 dark:text-gray-300">
//           Mohammed VI Polytechnic University, Ben Guerir, Morocco
//         </p>
//       </div>
//     </div>

//     <div className="flex items-start space-x-4">
//       <Clock className="h-6 w-6 text-primary mt-1" />
//       <div>
//         <h4 className="font-semibold text-text-primary dark:text-dark-text">Office Hours</h4>
//         <p className="text-gray-600 dark:text-gray-300">
//           Monday – Friday: 8:00 AM – 6:00 PM
//         </p>
//         <p className="text-gray-600 dark:text-gray-300">
//           Saturday: 9:00 AM – 1:00 PM
//         </p>
//       </div>
//     </div>
//   </div>

//   <div className="mt-8">
//     <p className="text-sm text-gray-500 dark:text-gray-400 italic">
//       You can also visit our campus or contact us directly through the provided channels.
//     </p>
//   </div>
// </motion.div>


//             {/* Map and Additional Info */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="space-y-8"
//             >
//               {/* Campus Location */}
//               <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-lg border dark:border-gray-700">
//                 <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-6">
//                   Visit Our Campus
//                 </h3>
//                 <div className="aspect-w-16 aspect-h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
//                   <img
//                     src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"
//                     alt="UM6P Campus"
//                     className="w-full h-64 object-cover"
//                   />
//                   <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
//                     <div className="text-center text-primary">
//                       <MapPin className="h-12 w-12 mx-auto mb-2" />
//                       <p className="font-semibold">Mohammed VI Polytechnic University</p>
//                       <p className="text-sm">Ben Guerir, Morocco</p>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-colors">
//                   Get Directions
//                 </button>
//               </div>

//               {/* Research Partnerships */}
//               <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-8">
//                 <h3 className="text-2xl font-bold mb-4">
//                   Research Partnerships
//                 </h3>
//                 <p className="mb-6 opacity-90">
//                   Interested in collaborating with our research teams? We welcome 
//                   partnerships with universities, research institutions, and organizations 
//                   worldwide.
//                 </p>
//                 <div className="space-y-3 mb-6">
//                   <div className="flex items-center space-x-3">
//                     <CheckCircle className="h-5 w-5 text-white/80" />
//                     <span>Joint research projects</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <CheckCircle className="h-5 w-5 text-white/80" />
//                     <span>Student exchange programs</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <CheckCircle className="h-5 w-5 text-white/80" />
//                     <span>Equipment and facility sharing</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <CheckCircle className="h-5 w-5 text-white/80" />
//                     <span>Funding opportunities</span>
//                   </div>
//                 </div>
//                 <button className="w-full bg-white text-primary py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//                   Partnership Information
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };











import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { useState, useEffect } from "react";
import {  AnimatePresence } from "framer-motion";
import um6p1 from '../assets/um6p/um6p_area1.png';
import um6p2 from '../assets/um6p/um6p_area2.jpg';
import um6p3 from '../assets/um6p/um6p_area3.jpg';
import um6p4 from '../assets/um6p/um6p_area4.jpg';
import um6p5 from '../assets/um6p/um6p_area5.jpg';
 
export const Contact: React.FC = () => {


const images = [um6p1, um6p2, um6p3, um6p4, um6p5];
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 4000); // 4 seconds per image
  return () => clearInterval(interval);
}, [images.length]);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'African Research Centre on Air Quality and Climate',
        'Mohammed VI Polytechnic University',
        'Lot 660, Hay Moulay Rachid',
        'Ben Guerir 43150, Morocco'
      ],
      color: 'bg-primary'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: [
        'Main Office: +212 5XX-XXXXXX',
        'Research Dept: +212 5XX-XXXXXX',
        'Administration: +212 5XX-XXXXXX'
      ],
      color: 'bg-accent'
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'General: info@arcair.um6p.ma',
        'Research: research@arcair.um6p.ma',
        'Partnerships: partnerships@arcair.um6p.ma',
        'Media: media@arcair.um6p.ma'
      ],
      color: 'bg-blue-500'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Monday - Friday: 8:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 1:00 PM',
        'Sunday: Closed',
        'GMT+1 (Morocco Time)'
      ],
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary dark:text-dark-text mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Get in touch with our team for research collaborations, partnership 
              opportunities, or any questions about our work in air quality and climate research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-lg border dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-6">
                Contact Information
              </h3>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                For any inquiries related to research collaborations, partnerships, or events, 
                please reach out to our team using the contact information below. 
                We'll be happy to connect you with the right department.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-primary dark:text-dark-text">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      info@arcair.um6p.ma
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-primary dark:text-dark-text">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      +212 5XX-XXXXXX
                    </p>
                  </div>
                </div> */}

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-primary dark:text-dark-text">Office</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Mohammed VI Polytechnic University, Ben Guerir, Morocco
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-primary dark:text-dark-text">Office Hours</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday – Friday: 8:00 AM – 6:00 PM
                    </p>
                    {/* <p className="text-gray-600 dark:text-gray-300">
                      Saturday: 9:00 AM – 1:00 PM
                    </p> */}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  You can also visit our campus or contact us directly through the provided channels.
                </p>
              </div>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Campus Location */}
              <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-lg border dark:border-gray-700">
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-6">
                  Visit Our Campus
                </h3>
                {/* <div className="aspect-w-16 aspect-h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                  <img
                    src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"
                    alt="UM6P Campus"
                    className="w-full h-64 object-cover"
                  /> */}



                  <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4">
                 <AnimatePresence>
                    <motion.img
                      key={images[currentIndex]}
                      src={images[currentIndex]}
                      alt="UM6P Campus"
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                  <div className="text-center text-primary">
      {/* <MapPin className="h-12 w-12 mx-auto mb-2" />
      <p className="font-semibold">Mohammed VI Polytechnic University</p>
      <p className="text-sm">Ben Guerir, Morocco</p> */}
                  </div>
                  </div>
                  {/* <div className="absolute inset-0 bg-primary/10 flex items-center justify-center"> */}
                    {/* <div className="text-center text-primary">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-semibold">Mohammed VI Polytechnic University</p>
                      <p className="text-sm">Ben Guerir, Morocco</p>
                    </div> */}
                  </div>
                </div>
                {/* <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-colors">
                  Get Directions
                </button> */}
              {/* </div> */}

              {/* Research Partnerships */}
              <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-8 shadow-lg">
  <h3 className="text-2xl font-bold mb-4">Research Partnerships</h3>
  <p className="mb-6 opacity-90">
    Interested in collaborating with our research teams? We welcome 
    partnerships with universities, research institutions, and organizations 
    worldwide.
  </p>

  <div className="space-y-3 mb-6">
    {[
      "Joint research projects",
      "Student exchange programs",
      "Equipment and facility sharing",
      "Funding opportunities",
    ].map((item, i) => (
      <div key={i} className="flex items-center space-x-3">
        <CheckCircle className="h-5 w-5 text-white/80" />
        <span>{item}</span>
      </div>
    ))}
  </div>

  {/* <button className="w-full bg-white text-primary py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
    Partnership Information
  </button> */}
</div>

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};