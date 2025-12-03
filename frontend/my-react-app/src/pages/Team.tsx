// import React from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Linkedin, Twitter, Award, BookOpen, Globe } from 'lucide-react';
// import youssef from '../assets/arc_air_peple/IMG_3660.jpeg';
// import im from '../assets/arc_air_peple/IMG_3682.jpeg';
// import ranya from '../assets/arc_air_peple/IMG_3678.jpeg';
// import hocine from '../assets/arc_air_peple/IMG_3697.jpeg';
// import mrwan from '../assets/arc_air_peple/IMG_3700.jpeg';
// import farhan from '../assets/arc_air_peple/IMG_3707.jpeg';
// import abderhman from '../assets/arc_air_peple/IMG_3714.jpeg';
// import me from '../assets/arc_air_peple/IMG_3717.jpeg';
// import anas from '../assets/arc_air_peple/IMG_3721.jpeg';
// import meryem from '../assets/arc_air_peple/IMG_3736.jpeg';
// import abdelaziz from '../assets/arc_air_peple/IMG_3742.jpeg';
// import clement from '../assets/arc_air_peple/IMG_3748.jpeg';
// import qabori from '../assets/arc_air_peple/IMG_3756.jpeg';
// import iman from '../assets/arc_air_peple/IMG_3759.jpeg';
// import naima from '../assets/arc_air_peple/IMG_3768.jpeg';
// import oumaima from '../assets/arc_air_peple/IMG_3804.jpeg';
// import khawla from '../assets/arc_air_peple/IMG_3787.jpeg';
// import wahid from '../assets/arc_air_peple/IMG_3797.jpeg';
// import nada from '../assets/arc_air_peple/IMG_3828.jpeg';
// import rafik from '../assets/arc_air_peple/photos1.jpg';
// import alae from '../assets/arc_air_peple/alae.jpeg';
// import anas_melah from '../assets/arc_air_peple/anas_malah.jpeg';
// export const Team: React.FC = () => {
//   const leadership = [
//     {
//       name: 'Dr. Wahid Mellouki',
//       role: 'Director',
//       image: wahid,
//       bio: 'Leading atmospheric scientist with 15+ years of experience in air quality research.',
//       interests: ['Atmospheric Chemistry', 'Air Quality Modeling', 'Policy Development'],
//       email: 'a.hassan@arcair.um6p.ma',
//       linkedin: '#',
//       // twitter: '#'
//     },
//     // {
//     //   name: 'Prof. Kwame Asante',
//     //   role: 'Deputy Director',
//     //   image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg',
//     //   bio: 'Climate scientist specializing in African climate systems and variability.',
//     //   interests: ['Climate Modeling', 'Paleoclimatology', 'Climate Adaptation'],
//     //   email: 'k.asante@arcair.um6p.ma',
//     //   linkedin: '#',
//     //   twitter: '#'
//     // }
//   ];

//   const researchers = [
//     {
//       name: 'Youssef El Hassan',
//       role: 'PhD Student  ',
//       image: youssef,
//       bio: 'Detecting synergies in hybrid systems and integrating green thermal energy into thermochemical process for waste valorisation and bioenergy production',
//       interests: ['Water-Energy-Food Nexus', 'Circular Economy'
//         , 'Thermodynamics', 'Fluid Mechanics', 'Renewable Energies', 'Energy Management', 'Optimization and Control' 
//       ],
//       email: 'Youssef.ELHASSAN@um6p.ma ',
      
//       linkedin:'https://www.linkedin.com/in/youssefelhassan/'
//     },
//      {
//       name: 'Oumaima Oulasri',
//       role: 'PhD Student',
//       image: oumaima,
//       bio: 'Environmental Engineer and PhD Researcher specializing in Life Cycle Assessment (LCA), Waste-to-Energy systems, and environmental impact analysis.',
//       interests: ['Waste Management', 'Waste-to-Energy (WtE)', 'Life Cycle Assessment (LCA)','Environmental Impact Assessment (EIA)','Circular Economy','Sustainable Development'],
//       email: 'oumaima.oulasri@um6p.ma',
//       linkedin:' www.linkedin.com/in/oulasri-oumaima'
//     },
//      {
//       name: 'Maryem Mercha',
//       role: 'PhD Student',
//       image: meryem,
//       bio: 'As a data scientist, my doctoral research focuses on analyzing the impacts of climate change on water resources through the integration of artificial intelligence and spatial technologies.',
//       interests: ['Hydrology', 'Climate change', 'Machine Learning','Water management','Remote sensing'],
//       email: 'maryem.mercha@um6p.ma',
//       linkedin: 'www.linkedin.com/in/maryemmercha' 
//     },
//     {
//       name: 'Oumaima ZGA',
//       role: 'PhD Student',
//       image: im,
//       bio: 'Researcher specializing in sustainable construction, focusing on Life Cycle Assessment (LCA) and Building Information Modeling (BIM).',
//       interests: ['Life Cycle Assessment', 'Building Information Modeling', 'Environmental Modeling', 'Circular Economy'],
//       email: 'oumaima.zga@um6p.ma',
//       linkedin:'(https://www.linkedin.com/in/zga-oumaima-aa520a270/)'
//     },
//     {
//       name: 'Dr. Houceine BOUYA',
//       role: 'Postdoctoral researcher',
//       image: hocine,
//       bio: 'tmospheric chemist with over 4 years of experience in the degradation of pollutants and the study of VOCs, SVOCs and BVOC in atmospheric environments. Specialized in oxidation kinetics, secondary organic aerosol formation and electrochemical remediation.',
//       interests: ['Atmospheric Chemistry', 'Air Quality Modeling', 'Policy Development', 'Wastewater Treatment' ],
//       email: 'Houceine.bouya@um6p.ma',
//       linkedin:'https://www.linkedin.com/in/houceine-bouya-9529b643/'
//     },
//     {
//       name: 'Dr. Farhan Mustafa',
//       role: 'Assistant Professor',
//       image: farhan,
//       bio: 'Assistant Professor at UM6P. Before this, he was a Postdoctoral Fellow at the Hong Kong University of Science and Technology. He earned his Ph.D. in Atmospheric Remote Sensing in 2022 from Nanjing University of Information Science and Technology. His research focuses on the active and passive remote sensing of greenhouse gases, machine learning and deep learning applications in atmospheric science, climate change, and atmospheric modeling.',
//       interests: ['Remote sensing of greenhouse gases', 'Machine/deep learning applications in atmospheric science', 'Climate change','Air quality','Atmospheric modeling'],
//       email: 'mustafa.farhan@um6p.ma',
//       linkedin: 'https://www.linkedin.com/in/4han/',
//     },
   
//     {
//       name: 'Abdelaziz Motiaa',
//       role: 'Phd Student',
//       image: abdelaziz,
//       bio: 'Quantifying regional CO₂ and CH₄ fluxes in Morocco through in-situ measurements and atmospheric modeling.',
//       interests: ['Greenhouse gas fluxes (CO₂, CH₄),','Atmospheric inversion modeling', 'AMV high-altitude station', 'Hotspots'],
//       email: 'j.mensah@arcair.um6p.ma',
//       linkedin:'#'
//     },
//     {
//       name: 'Anas Sabri',
//       role: 'PhD Student',
//       image: anas,
//       bio: 'PhD researcher specializing in remote sensing and GIS for sustainable urban planning, focusing on air quality, GHG modeling, and territorial regeneration using urban agriculture solutions.',
//       interests: ['Remote Sensing', 'Climate Policy', 'Sustainability'],
//       email: 'j.mensah@arcair.um6p.ma',
//       linkedin:'#'
//     },
//     {
//       name: 'Nongma Kabore',
//       role: 'PhD Student',
//       image: qabori,
//       bio: 'Specializing in atmospheric science, with focus on air quality, particulate pollution and its impact on human health.',
//       interests: [ 'Atmospheric Pollution', 'Human Health', 'Atmospheric Chemistry', 'Air Quality monitoring', 'Atmospheric inputs to the Ocean'],
//       email: 'Nongma.KABORE@um6p.ma',
//       linkedin:'[https://www.linkedin.com/in/nongma-kaboré-598707209]'
//     },
//     {
//       name: 'Imane Qadiri',
//       role: 'PhD Student',
//       image: iman,
//       bio: 'Environmental and air quality researcher specializing in atmospheric ammonia (NH₃), with expertise in ground-based measurements and satellite observations.',
//       interests: ['Atmospheric Chemistry', ' Air Quality Monitoring', 'Climate Impacts','Environmental Policy'],
//       email: 'Imane.QADIRI@um6p.ma',
//       linkedin:'Imane QADIRI'
//     },
   
//      {
//       name: 'Khawla EL HADRI',
//       role: 'PhD Student',
//       image: khawla,
//       bio: 'Researching the energy performance and environmental quality of urban buildings in semi-arid climates..',
//       interests: ['Zero Energy Buildings', 'Energy Performance', 'Urban Sustainability','Environmental Quality'],
//       email: 'Khawla.ELHADRI@um6p.ma',
//       linkedin:'https://www.linkedin.com/in/khawla-el-hadri-b41738225/'
//     },
//     {
//       name: 'Alaa Houwayji',
//       role: ' PhD Student',
//       image: alae,
//       bio: ' Cotutelle PhD student between UM6P (Morocco) and ULCO (France), working on field measurements and the use of rovibrational spectroscopy for pesticide detection in the atmosphere.',
//       interests: ['Air Quality', 'Atmospheric Chemistry', 'Molecular Spectroscopy', 'Rotational Spectroscopy'],
//       email: 'Alaa.houwayji@um6p.ma',
//       linkedin: 'Alaa Houwayji'
//     },
//     {
//       name: 'Hajar Morchid ',
//       role: 'Research Engineer',
//       image: alae,
//       bio: 'Supports the transition to sustainable living through energy-efficient and environmentally responsible solutions.',
//       interests: ['Environmental Economics', 'Climate Policy', 'Sustainability'],
//       email: 'j.mensah@arcair.um6p.ma',
//       linkedin: 'https://www.linkedin.com/in/hajar-morchid-b7a016233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
//     },
//      {
//       name: 'Dr.Anas Malah ',
//       role: 'Doctor of Philosophy (Ph.D.)',
//       image: anas_melah,
//       bio: 'Territorial sustainability specialist with a PhD in Remote sensing, GIS and sustainable territories, also contributor to environmental policy frameworks',
//       interests: ['Territorial Governance', 'Composite Indicators', 'Spatial Sustainability Assessment','Territorial Planning'],
//       email: 'anass.malah@um6p.ma',
//       linkedin: 'https://ma.linkedin.com/in/anass-malah-2ba640142'
//     }
//   ];

//   const technicalStaff = [
//     {
//       name: 'Nada',
//       role: 'Project Manager',
//       image: nada,
//       bio: 'Technical specialist managing laboratory operations and equipment.',
//       interests: ['Laboratory Management', 'Quality Control', 'Instrumentation'],
//       email: '#',
//       linkedin:'#'
//     },
//     {
//       name: 'Ranya',
//       role: 'Laboratory Manager',
//       image: ranya,
//       bio: 'Technical specialist managing laboratory operations and equipment.',
//       interests: ['Laboratory Management', 'Quality Control', 'Instrumentation'],
//       email: '#',
//       linkedin:'#'
//     },
//     {
//       name: 'Merouan',
//       role: 'Data Manager',
//       image: mrwan,
//       bio: 'Data scientist managing research databases and analysis systems.',
//       interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
//       email: '#',
//       linkedin:'#'
//     },
//     {
//       name: 'Abderhman',
//       role: 'Data Manager',
//       image: abderhman,
//       bio: 'Data scientist managing research databases and analysis systems.',
//       interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
//       email: '#',
//       linkedin:'#'
//     },
//      {
//       name: 'Reda Bouissali',
//       role: 'Software Engineer',
//       image: me,
//       bio: 'Data scientist managing research databases and analysis systems.',
//       interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
//       email: '#',
//       linkedin:'#'
//     },
//     {
//       name: 'Clement',
//       role: 'Electric',
//       image: clement,
//       bio: 'Data scientist managing research databases and analysis systems.',
//       interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
//       email: '#',
//       linkedin:'#'
//     },
//     {
//       name: 'Naima',
//       role: 'Data scientist',
//       image: naima,
//       bio: 'Data scientist managing research databases and analysis systems.',
//       interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
//       email: '#',
//       linkedin:'#'
//     },
//     {
//       name: 'Dr. Rafik Abdellatif',
//       role: 'UM6P–CNRS Program / International Postdoctoral Researcher',
//       image: rafik,
//       bio: 'Research scientist in water–soil–atmosphere sciences with expertise in climate and hydrological modeling, remote sensing, and water isotopes. Actively engaged in several research projects across Europe, USA, Middle East, and Africa.',
//       interests: ['Water–Soil–Atmosphere Interactions', 'Climate Change', 'Air Quality and Water Resources Management','Atmospheric Chemistry (Ammonia)'],
//       email: 'abdellatif.rafik@um6p.ma ',
//       linkedin:'#'
//     }
//   ];


//   const TeamSection = ({ title, members, showSocial = false }: { 
//     title: string; 
//     members: any[]; 
//     showSocial?: boolean; 
//   }) => (
//     <section className="mb-16">
//       <motion.h2
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-3xl font-bold text-text-primary dark:text-dark-text mb-8 text-center"
//       >
//         {title}
//       </motion.h2>
//       {/* <div > </div> */}
//       <div className={`grid ${members.length <= 2 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
      
//         {members.map((member, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             className="group bg-white dark:bg-dark-surface rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
//           >
//             <div className="relative h-64 overflow-hidden">
              
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//               <div className="absolute bottom-4 left-4 text-white">
//                 <h3 className="text-xl font-bold">{member.name}</h3>
//                 <p className="text-primary font-medium">{member.role}</p>
//               </div>
//             </div>
            
//             <div className="p-6">
//               {/* <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
//                 {member.bio}
//               </p> */}
              
//               <div className="mb-4">
//                 <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-2">
//                   Interests:
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {member.interests.map((interest: string, i: number) => (
//                     <span
//                       key={i}
//                       className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
//                     >
//                       {interest}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   {member.email && (
//                     <a
//                       href={`mailto:${member.email}`}
//                       className="text-gray-400 hover:text-primary transition-colors"
//                     >
//                       <Mail className="h-4 w-4" />
//                       {/* <Linkedin className="h-4 w-4" /> */}
//                     </a>
//                   )}
//                   { member.linkedin && (
//                     <a
//                       href={member.linkedin}
//                       className="text-gray-400 hover:text-primary transition-colors"
//                     >
//                       <Linkedin className="h-4 w-4" />
//                     </a>
//                   )}
//                   {showSocial && member.twitter && (
//                     <a
//                       href={member.twitter}
//                       className="text-gray-400 hover:text-primary transition-colors"
//                     >
//                       <Twitter className="h-4 w-4" />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );

//   return (
//     <div className="min-h-screen pt-16">
//       {/* Hero Section with Background Image */}
//       <section 
//         className="py-24 bg-containet bg-center bg-fixed relative cover"
//         // style={{
//         //   backgroundImage: 'url(https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg)'
//         // }}
//       >
//         {/* <img src='url(https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg)'/> */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80"></div>
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center text-white"
//           >
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Our People
//             </h1>
//             <p className="text-xl max-w-4xl mx-auto leading-relaxed">
//               Meet the dedicated researchers, scientists, and technical staff who drive 
//               our mission to advance air quality and climate research across Africa.
//             </p>
//           </motion.div>
//         </div>
//       </section>

// {/* I add this to put all the team image */}
// {/* Full Team Photo Section */}


// {/* 
// <section className="relative py-20 bg-white dark:bg-dark-surface">
//   <motion.div
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.8 }}
//     className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//   >
//     <div className="relative overflow-hidden rounded-2xl shadow-lg">
//       <img
//         src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
//         alt="Our Full Team"
//         className="w-full h-[500px] object-cover"
//       />
//       <div className="absolute inset-0 bg-black/40 z-10 rounded-2xl" />
//       <div className="absolute bottom-6 left-6 z-20 text-white">
//         <h3 className="text-3xl md:text-4xl font-bold">Meet Our team</h3>
//       </div>
//     </div>
//   </motion.div>
// </section> */}

//       {/* Team Stats */}
//       <section className="py-16 bg-background dark:bg-dark-bg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             {[
//               { icon: Award, number: '30+', label: 'Team Members' },
//               { icon: BookOpen, number: '40+', label: 'Publications' },
//               { icon: Globe, number: '8+', label: 'Countries' },
//               // { icon: Award, number: '25+', label: 'Awards' },
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg border dark:border-gray-700"
//               >
//                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <stat.icon className="h-6 w-6 text-primary" />
//                 </div>
//                 <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
//                 <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Sections */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           {/* <img
//                 src={me}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               /> */}
//         <TeamSection title="Leadership" members={leadership} showSocial={true} />
//         <TeamSection title="Research Scientists" members={researchers} />
//         <TeamSection title="Technical Staff" members={technicalStaff} />
//       </div>


//       {/* Join Our Team */}
//       <section className="py-24 bg-gradient-to-r from-primary to-accent">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//               Want to Join Our Team ?
//             </h2>
//             <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//               We're always looking for talented researchers and technical staff 
//               to join our mission of advancing environmental science in Africa.
//             </p>
//             <a
//               href="/recruitment"
//               className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
//             >
//               View Open Positions
//             </a>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };




import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, Linkedin, Twitter, Award, BookOpen, Globe, Users } from 'lucide-react';
import youssef from '../assets/arc_air_peple/IMG_3660.jpeg';
import im from '../assets/arc_air_peple/IMG_3682.jpeg';
import ranya from '../assets/arc_air_peple/IMG_3678.jpeg';
import hocine from '../assets/arc_air_peple/IMG_3697.jpeg';
import mrwan from '../assets/arc_air_peple/IMG_3700.jpeg';
import farhan from '../assets/arc_air_peple/IMG_3707.jpeg';
import abderhman from '../assets/arc_air_peple/IMG_3714.jpeg';
import me from '../assets/arc_air_peple/IMG_3717.jpeg';
import anas from '../assets/arc_air_peple/IMG_3721.jpeg';
import meryem from '../assets/arc_air_peple/IMG_3736.jpeg';
import abdelaziz from '../assets/arc_air_peple/IMG_3742.jpeg';
import clement from '../assets/arc_air_peple/IMG_3748.jpeg';
import qabori from '../assets/arc_air_peple/IMG_3756.jpeg';
import iman from '../assets/arc_air_peple/IMG_3759.jpeg';
import naima from '../assets/arc_air_peple/IMG_3768.jpeg';
import oumaima from '../assets/arc_air_peple/IMG_3804.jpeg';
import khawla from '../assets/arc_air_peple/IMG_3787.jpeg';
import wahid from '../assets/arc_air_peple/IMG_3797.jpeg';
import nada from '../assets/arc_air_peple/IMG_3828.jpeg';
import rafik from '../assets/arc_air_peple/photos1.jpg';
import alae from '../assets/arc_air_peple/alae.jpeg';
import anas_melah from '../assets/arc_air_peple/anas_malah.jpeg';
import team from '../assets/team.jpeg';

export const Team: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const leadership = [
    {
      name: 'Dr. Wahid Mellouki',
      role: 'Director',
      image: wahid,
      bio: 'Leading atmospheric scientist with 15+ years of experience in air quality research.',
      interests: ['Atmospheric Chemistry', 'Air Quality Modeling', 'Policy Development'],
      email: 'a.hassan@arcair.um6p.ma',
      linkedin: '#',
      category: 'leadership'
    },
  ];

  const researchers = [
    {
      name: 'Youssef El Hassan',
      role: 'PhD Student',
      image: youssef,
      bio: 'Detecting synergies in hybrid systems and integrating green thermal energy into thermochemical process for waste valorisation and bioenergy production',
      interests: ['Water-Energy-Food Nexus', 'Circular Economy', 'Thermodynamics', 'Fluid Mechanics', 'Renewable Energies', 'Energy Management', 'Optimization and Control'],
      email: 'Youssef.ELHASSAN@um6p.ma',
      linkedin: 'https://www.linkedin.com/in/youssefelhassan/',
      category: 'researchers'
    },
    {
      name: 'Oumaima Oulasri',
      role: 'PhD Student',
      image: oumaima,
      bio: 'Environmental Engineer and PhD Researcher specializing in Life Cycle Assessment (LCA), Waste-to-Energy systems, and environmental impact analysis.',
      interests: ['Waste Management', 'Waste-to-Energy (WtE)', 'Life Cycle Assessment (LCA)', 'Environmental Impact Assessment (EIA)', 'Circular Economy', 'Sustainable Development'],
      email: 'oumaima.oulasri@um6p.ma',
      linkedin: 'www.linkedin.com/in/oulasri-oumaima',
      category: 'researchers'
    },
    {
      name: 'Maryem Mercha',
      role: 'PhD Student',
      image: meryem,
      bio: 'As a data scientist, my doctoral research focuses on analyzing the impacts of climate change on water resources through the integration of artificial intelligence and spatial technologies.',
      interests: ['Hydrology', 'Climate change', 'Machine Learning', 'Water management', 'Remote sensing'],
      email: 'maryem.mercha@um6p.ma',
      linkedin: 'www.linkedin.com/in/maryemmercha',
      category: 'researchers'
    },
    {
      name: 'Oumaima ZGA',
      role: 'PhD Student',
      image: im,
      bio: 'Researcher specializing in sustainable construction, focusing on Life Cycle Assessment (LCA) and Building Information Modeling (BIM).',
      interests: ['Life Cycle Assessment', 'Building Information Modeling', 'Environmental Modeling', 'Circular Economy'],
      email: 'oumaima.zga@um6p.ma',
      linkedin: '(https://www.linkedin.com/in/zga-oumaima-aa520a270/)',
      category: 'researchers'
    },
    {
      name: 'Dr. Houceine BOUYA',
      role: 'Postdoctoral researcher',
      image: hocine,
      bio: 'Atmospheric chemist with over 4 years of experience in the degradation of pollutants and the study of VOCs, SVOCs and BVOC in atmospheric environments.',
      interests: ['Atmospheric Chemistry', 'Air Quality Modeling', 'Policy Development', 'Wastewater Treatment'],
      email: 'Houceine.bouya@um6p.ma',
      linkedin: 'https://www.linkedin.com/in/houceine-bouya-9529b643/',
      category: 'researchers'
    },
    {
      name: 'Dr. Farhan Mustafa',
      role: 'Assistant Professor',
      image: farhan,
      bio: 'Assistant Professor at UM6P. Before this, he was a Postdoctoral Fellow at the Hong Kong University of Science and Technology.',
      interests: ['Remote sensing of greenhouse gases', 'Machine/deep learning applications in atmospheric science', 'Climate change', 'Air quality', 'Atmospheric modeling'],
      email: 'mustafa.farhan@um6p.ma',
      linkedin: 'https://www.linkedin.com/in/4han/',
      category: 'researchers'
    },
    {
      name: 'Abdelaziz Motiaa',
      role: 'PhD Student',
      image: abdelaziz,
      bio: 'Quantifying regional CO₂ and CH₄ fluxes in Morocco through in-situ measurements and atmospheric modeling.',
      interests: ['Greenhouse gas fluxes (CO₂, CH₄)', 'Atmospheric inversion modeling', 'AMV high-altitude station', 'Hotspots'],
      email: 'j.mensah@arcair.um6p.ma',
      linkedin: '#',
      category: 'researchers'
    },
    {
      name: 'Anas Sabri',
      role: 'PhD Student',
      image: anas,
      bio: 'PhD researcher specializing in remote sensing and GIS for sustainable urban planning, focusing on air quality, GHG modeling, and territorial regeneration.',
      interests: ['Remote Sensing', 'Climate Policy', 'Sustainability'],
      email: 'j.mensah@arcair.um6p.ma',
      linkedin: '#',
      category: 'researchers'
    },
    {
      name: 'Nongma Kabore',
      role: 'PhD Student',
      image: qabori,
      bio: 'Specializing in atmospheric science, with focus on air quality, particulate pollution and its impact on human health.',
      interests: ['Atmospheric Pollution', 'Human Health', 'Atmospheric Chemistry', 'Air Quality monitoring', 'Atmospheric inputs to the Ocean'],
      email: 'Nongma.KABORE@um6p.ma',
      linkedin: '[https://www.linkedin.com/in/nongma-kaboré-598707209]',
      category: 'researchers'
    },
    {
      name: 'Imane Qadiri',
      role: 'PhD Student',
      image: iman,
      bio: 'Environmental and air quality researcher specializing in atmospheric ammonia (NH₃), with expertise in ground-based measurements and satellite observations.',
      interests: ['Atmospheric Chemistry', 'Air Quality Monitoring', 'Climate Impacts', 'Environmental Policy'],
      email: 'Imane.QADIRI@um6p.ma',
      linkedin: 'Imane QADIRI',
      category: 'researchers'
    },
    {
      name: 'Khawla EL HADRI',
      role: 'PhD Student',
      image: khawla,
      bio: 'Researching the energy performance and environmental quality of urban buildings in semi-arid climates.',
      interests: ['Zero Energy Buildings', 'Energy Performance', 'Urban Sustainability', 'Environmental Quality'],
      email: 'Khawla.ELHADRI@um6p.ma',
      linkedin: 'https://www.linkedin.com/in/khawla-el-hadri-b41738225/',
      category: 'researchers'
    },
    {
      name: 'Alaa Houwayji',
      role: 'PhD Student',
      image: alae,
      bio: 'Cotutelle PhD student between UM6P (Morocco) and ULCO (France), working on field measurements and the use of rovibrational spectroscopy for pesticide detection.',
      interests: ['Air Quality', 'Atmospheric Chemistry', 'Molecular Spectroscopy', 'Rotational Spectroscopy'],
      email: 'Alaa.houwayji@um6p.ma',
      linkedin: 'Alaa Houwayji',
      category: 'researchers'
    },
    {
      name: 'Hajar Morchid',
      role: 'Research Engineer',
      image: alae,
      bio: 'Supports the transition to sustainable living through energy-efficient and environmentally responsible solutions.',
      interests: ['Environmental Economics', 'Climate Policy', 'Sustainability'],
      email: 'j.mensah@arcair.um6p.ma',
      linkedin: 'https://www.linkedin.com/in/hajar-morchid-b7a016233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      category: 'researchers'
    },
    {
      name: 'Dr.Anas Malah',
      role: 'Doctor of Philosophy (Ph.D.)',
      image: anas_melah,
      bio: 'Territorial sustainability specialist with a PhD in Remote sensing, GIS and sustainable territories, also contributor to environmental policy frameworks',
      interests: ['Territorial Governance', 'Composite Indicators', 'Spatial Sustainability Assessment', 'Territorial Planning'],
      email: 'anass.malah@um6p.ma',
      linkedin: 'https://ma.linkedin.com/in/anass-malah-2ba640142',
      category: 'researchers'
    }
  ];

  const technicalStaff = [
    {
      name: 'Nada',
      role: 'Project Manager',
      image: nada,
      bio: 'Technical specialist managing laboratory operations and equipment.',
      interests: ['Laboratory Management', 'Quality Control', 'Instrumentation'],
      email: '#',
      linkedin: '#',
      category: 'technical'
    },
    {
      name: 'Ranya',
      role: 'Laboratory Manager',
      image: ranya,
      bio: 'Technical specialist managing laboratory operations and equipment.',
      interests: ['Laboratory Management', 'Quality Control', 'Instrumentation'],
      email: '#',
      linkedin: '#',
      category: 'technical'
    },
    {
      name: 'Merouan',
      role: 'Data Manager',
      image: mrwan,
      bio: 'Data scientist managing research databases and analysis systems.',
      interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
      email: '#',
      linkedin: '#',
      category: 'technical'
    },
    {
      name: 'Abderhman',
      role: 'Data Manager',
      image: abderhman,
      bio: 'Data scientist managing research databases and analysis systems.',
      interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
      email: '#',
      linkedin: '#',
      category: 'technical'
    },
    {
      name: 'Reda Bouissali',
      role: 'Software Engineer',
      image: me,
      bio: 'Data scientist managing research databases and analysis systems.',
      interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
      email: '#',
      linkedin: '#',
      category: 'technical'
    },
    {
      name: 'Clement',
      role: 'Electric',
      image: clement,
      bio: 'Data scientist managing research databases and analysis systems.',
      interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
      email: '#',
      linkedin: '#',
      category: 'technical'
    },
    {
      name: 'Naima',
      role: 'Data scientist',
      image: naima,
      bio: 'Data scientist managing research databases and analysis systems.',
      interests: ['Data Management', 'Statistical Analysis', 'Database Systems'],
      email: '#',
      linkedin: '#',
      category: 'technical'
    },
    {
      name: 'Dr. Rafik Abdellatif',
      role: 'UM6P–CNRS Program / International Postdoctoral Researcher',
      image: rafik,
      bio: 'Research scientist in water–soil–atmosphere sciences with expertise in climate and hydrological modeling, remote sensing, and water isotopes.',
      interests: ['Water–Soil–Atmosphere Interactions', 'Climate Change', 'Air Quality and Water Resources Management', 'Atmospheric Chemistry (Ammonia)'],
      email: 'abdellatif.rafik@um6p.ma',
      linkedin: '#',
      category: 'technical'
    }
  ];

  const allMembers = [...leadership, ...researchers, ...technicalStaff];

  const filteredMembers = activeFilter === 'all' 
    ? allMembers 
    : allMembers.filter(member => member.category === activeFilter);

  const categories = [
    { id: 'all', label: 'All Team', icon: Users },
    { id: 'leadership', label: 'Leadership', icon: Award },
    { id: 'researchers', label: 'Researchers', icon: BookOpen },
    { id: 'technical', label: 'Technical Staff', icon: Globe }
  ];


  const TeamCard = ({ member, index }: { member: any; index: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    // const [locked, setLocked] = useState<boolean>(false);

    const handleOnHover = (start: boolean) => {
      setIsFlipped(start);
      // console.log({ start });
      // setTimeout(() => {
      //   if (!locked) {
      //     setIsFlipped(start);
      //     setLocked(true);
      //   } else {
      //     if (!start) {
      //       setIsFlipped(start);
      //       // setLocked(false);
      //     } else {
      //       setIsFlipped(start);
      //       setLocked(false);
      //     }
      //   }
      // }, 100);
    }

    return (
      <motion.div
  layout
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{ duration: 0.5, delay: index * 0.05 }}
  className="perspective-1000 flex justify-center items-center"
  onHoverStart={() => handleOnHover(true)}
  onHoverEnd={() => handleOnHover(false)}
>
  <motion.div
    animate={{ 
      y: isFlipped ? -10 : 0,
      rotateY: isFlipped ? 180 : 0,
    }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="relative preserve-3d group h-full"
    style={{ transformStyle: 'preserve-3d' }}
    // onHoverStart={() => handleOnHover(true)}
    // onHoverEnd={() => handleOnHover(false)}
  >
    {/* Front of card */}
    <motion.div
      className="h-full backface-hidden bg-white dark:bg-dark-surface rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-shadow duration-500"
      style={{ 
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <motion.div 
          className="absolute bottom-4 left-4 text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold drop-shadow-lg dark:drop-shadow-[0_0_15px_rgba(255,106,0,0.5)]">
            {member.name}
          </h3>
          <p className="text-primary font-medium drop-shadow-md">{member.role}</p>
        </motion.div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-2 dark:drop-shadow-[0_0_8px_rgba(255,106,0,0.3)]">
            Interests:
          </h4>
          <div className="flex flex-wrap gap-2">
            {member.interests.slice(0, 3).map((interest: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {interest}
              </motion.span>
            ))}
            {member.interests.length > 3 && (
              <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                +{member.interests.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* <div className="flex items-center space-x-3">
          {member.email && member.email !== '#' && (
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href={`mailto:${member.email}`}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
            </motion.a>
          )}
          {member.linkedin && member.linkedin !== '#' && (
            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              href={member.linkedin}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </motion.a>
          )}
        </div> */}
      </div>
    </motion.div>

    {/* Back of card */}
    <motion.div
      className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary/90 to-accent/90 rounded-2xl shadow-lg p-6 flex flex-col justify-center"
      style={{ 
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)'
      }}
    >
      <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">{member.name}</h3>
      <p className="text-white/90 text-sm leading-relaxed mb-4">{member.bio}</p>
      <div className="space-y-2">
        <h4 className="text-white font-semibold text-sm">All Interests:</h4>
        <div className="flex flex-wrap gap-2">
          {member.interests.map((interest: string, i: number) => (
            <span
              key={i}
              className="px-2 py-1 bg-white/20 backdrop-blur text-white text-xs rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          {member.email && member.email !== '#' && (
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href={`mailto:${member.email}`}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
            </motion.a>
          )}
          {member.linkedin && member.linkedin !== '#' && (
            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              href={member.linkedin}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
</motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Scroll Progress Bar */}
      {/* <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
        style={{ scaleX }}
      /> */}

      {/* Parallax Hero Section */}
   <motion.section
  className="relative overflow-hidden w-full"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  {/* Full-width Background Image */}
  <motion.div
    className="absolute inset-0 z-0 w-full h-full"
    style={{
      backgroundImage: `url(${team})`,
      backgroundSize: 'cover',      // make it cover full area
      backgroundPosition: 'center', // center the image
      backgroundRepeat: 'no-repeat',
      y: useTransform(scrollYProgress, [0, 1], [0, 300])
    }}
  />

  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80 z-10"></div>

  {/* Content */}
  <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="text-center text-white mb-24"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl"
        animate={{
          textShadow: [
            "0 0 20px rgba(255,255,255,0.5)",
            "0 0 40px rgba(255,255,255,0.8)",
            "0 0 20px rgba(255,255,255,0.5)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Our People
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        Meet the dedicated researchers, scientists, and technical staff who drive 
        our mission to advance air quality and climate research across Africa.
      </motion.p>
    </motion.div>

    {/* Stats */}
    <div className="grid md:grid-cols-3 gap-8 text-center">
      {[
        { icon: Award, number: 30, label: 'Team Members', suffix: '+' },
        { icon: BookOpen, number: 40, label: 'Publications', suffix: '+' },
        { icon: Globe, number: 8, label: 'Countries', suffix: '+' },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: index * 0.2,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{
            scale: 1.05,
            rotate: [0, -2, 2, 0],
            transition: { duration: 0.3 }
          }}
          className="cursor-pointer"
        >
          <motion.div
            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <stat.icon className="h-8 w-8 text-primary" />
          </motion.div>

          <motion.div
            className="text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
            >
              {stat.number}{stat.suffix}
            </motion.span>
          </motion.div>

          <div className="text-white font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>




      {/* Filter Section */}
      <motion.section
          className="py-12 bg-white dark:bg-dark-surface sticky top-16 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
               <motion.button
          key={category.id}
          onClick={() => setActiveFilter(category.id)}
          className={`relative flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
            activeFilter === category.id
              ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md scale-105'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow'
          }`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{category.label}</span>

          {/* Animated underline for active */}
          {activeFilter === category.id && (
            <motion.div
              layoutId="activeCategoryUnderline"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-white/90 rounded-full"
            />
          )}
        </motion.button>
            ))}
          </div>
        </div>
      </motion.section>
      
 {/* <category.icon className="h-5 w-5" /> */}
      {/* Team Grid */}
      <motion.section 
        className="py-16 bg-background dark:bg-dark-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredMembers.map((member, index) => (
              <TeamCard key={`${member.name}-${index}`} member={member} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="relative py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent"></div>
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 40px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Want to Join Our Team?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              We're always looking for talented researchers and technical staff 
              to join our mission of advancing environmental science in Africa.
            </motion.p>
            <motion.a
              href="/recruitment"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Join Button */}
      <motion.a
        href="/recruitment"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-accent text-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-2 z-50 hover:shadow-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -5, 5, -5, 0],
          transition: { duration: 0.5 }
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Users className="h-5 w-5" />
        <span className="font-semibold">Join Us</span>
      </motion.a>

      {/* Custom Styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        @media (prefers-color-scheme: dark) {
          .dark\:drop-shadow-glow {
            filter: drop-shadow(0 0 15px rgba(255, 106, 0, 0.5));
          }
        }
      `}</style>
    </div>
  );
};