// import React from 'react';
// import { motion } from 'framer-motion';
// import { ExternalLink, Award, Users, Globe, BookOpen, Lightbulb, Target } from 'lucide-react';

// export const AboutUM6P: React.FC = () => {
//   const stats = [
//     { icon: Users, number: '4,000+', label: 'Students' },
//     { icon: BookOpen, number: '50+', label: 'Programs' },
//     { icon: Globe, number: '80+', label: 'Countries' },
//     { icon: Award, number: '200+', label: 'Research Projects' },
//   ];

//   const schools = [
//     {
//       name: 'School of Architecture, Planning and Design',
//       description: 'Innovative design and sustainable urban planning solutions.',
//       icon: Target
//     },
//     {
//       name: 'School of Collective Intelligence',
//       description: 'Interdisciplinary approaches to complex global challenges.',
//       icon: Lightbulb
//     },
//     {
//       name: 'School of Industrial Management',
//       description: 'Advanced manufacturing and industrial engineering.',
//       icon: Award
//     },
//     {
//       name: 'School of Mining and Energy',
//       description: 'Sustainable resource extraction and renewable energy.',
//       icon: Globe
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
//               Mohammed VI Polytechnic University
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
//               A world-class research university committed to Africa's sustainable development 
//               through innovation, excellence, and international collaboration.
//             </p>
//             <a
//               href="https://www.um6p.ma"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
//             >
//               <span>Visit UM6P Website</span>
//               <ExternalLink className="h-5 w-5" />
//             </a>
//           </motion.div>
//         </div>
//       </section>

//       {/* University Stats */}
//       <section className="py-16 bg-background dark:bg-dark-bg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="text-center bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg border dark:border-gray-700"
//               >
//                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <stat.icon className="h-8 w-8 text-primary" />
//                 </div>
//                 <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
//                 <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About UM6P */}
//       <section className="py-24 bg-background dark:bg-dark-bg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
//                 Leading African Innovation
//               </h2>
//               <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
//                 Mohammed VI Polytechnic University (UM6P) is an internationally oriented 
//                 institution committed to research and innovation in Africa and aimed at 
//                 the highest international standards.
//               </p>
//               <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
//                 Located in the green city of Ben Guerir, UM6P aspires to leave its mark 
//                 nationally, continentally, and globally through research and innovation.
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
//                   <span className="text-gray-600 dark:text-gray-300">Research-focused institution</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
//                   <span className="text-gray-600 dark:text-gray-300">International partnerships</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
//                   <span className="text-gray-600 dark:text-gray-300">Sustainable development focus</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
//                   <span className="text-gray-600 dark:text-gray-300">Innovation and entrepreneurship</span>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               <img
//                 src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"
//                 alt="UM6P Campus"
//                 className="w-full h-96 object-cover rounded-2xl shadow-lg"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent rounded-2xl"></div>
//               <div className="absolute bottom-6 left-6 text-white">
//                 <h3 className="text-2xl font-bold mb-2">Green Campus</h3>
//                 <p className="text-white/90">Sustainable and modern facilities</p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Schools and Programs */}
//       {/* <section className="py-24 bg-gray-50 dark:bg-dark-surface">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
//               Schools & Programs
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//               UM6P offers diverse academic programs across multiple schools, 
//               each focused on addressing Africa's development challenges.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-8">
//             {schools.map((school, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-white dark:bg-dark-bg rounded-xl p-8 shadow-lg border dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <school.icon className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-3">
//                       {school.name}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                       {school.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* Research Excellence */}
//       <section className="py-24 bg-background dark:bg-dark-bg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               <img
//                 src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg"
//                 alt="Research Laboratory"
//                 className="w-full h-96 object-cover rounded-2xl shadow-lg"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent rounded-2xl"></div>
//               <div className="absolute bottom-6 left-6 text-white">
//                 <h3 className="text-2xl font-bold mb-2">Research Excellence</h3>
//                 <p className="text-white/90">State-of-the-art laboratories and facilities</p>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
//                 Research & Innovation
//               </h2>
//               <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
//                 UM6P is committed to conducting high-impact research that addresses 
//                 Africa's most pressing challenges while contributing to global knowledge.
//               </p>
//               <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
//                 Our research centers, including ARC Air, work on cutting-edge projects 
//                 in areas such as sustainable agriculture, renewable energy, mining 
//                 innovation, and environmental sciences.
//               </p>
              
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="bg-white dark:bg-dark-surface rounded-lg p-4 shadow border dark:border-gray-700">
//                   <div className="text-2xl font-bold text-primary mb-1">15+</div>
//                   <div className="text-sm text-gray-600 dark:text-gray-300">Research Centers</div>
//                 </div>
//                 <div className="bg-white dark:bg-dark-surface rounded-lg p-4 shadow border dark:border-gray-700">
//                   <div className="text-2xl font-bold text-primary mb-1">500+</div>
//                   <div className="text-sm text-gray-600 dark:text-gray-300">Publications</div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Partnership with ARC Air */}
//       <section className="py-24 bg-gradient-to-r from-primary to-accent">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center text-white"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               ARC Air: A Center of Excellence
//             </h2>
//             <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
//               The African Research Centre on Air Quality and Climate operates within 
//               UM6P's ecosystem, leveraging the university's world-class infrastructure 
//               and international partnerships to advance environmental research.
//             </p>
//             <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
//                 <Globe className="h-8 w-8 text-white mx-auto mb-4" />
//                 <h3 className="text-lg font-bold mb-2">Global Partnerships</h3>
//                 <p className="text-white/80 text-sm">
//                   Collaborations with leading international institutions
//                 </p>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
//                 <Award className="h-8 w-8 text-white mx-auto mb-4" />
//                 <h3 className="text-lg font-bold mb-2">Research Excellence</h3>
//                 <p className="text-white/80 text-sm">
//                   Cutting-edge research in air quality and climate science
//                 </p>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
//                 <Users className="h-8 w-8 text-white mx-auto mb-4" />
//                 <h3 className="text-lg font-bold mb-2">Capacity Building</h3>
//                 <p className="text-white/80 text-sm">
//                   Training the next generation of African researchers
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };






import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Users, Globe, BookOpen, Lightbulb, Target } from 'lucide-react';
import um6p1 from '../assets/um6p/um6p_area1.png';
import um6p2 from '../assets/um6p/um6p_area2.jpg';
import um6p3 from '../assets/um6p/um6p_area3.jpg';
import um6p4 from '../assets/um6p/um6p_area4.jpg';
import um6p5 from '../assets/um6p/um6p_area5.jpg';

// import React, { useState, useEffect } from 'react';

export const AboutUM6P: React.FC = () => {
  const campusImages = [um6p1, um6p3, um6p4, um6p5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % campusImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Users, number: '4,000+', label: 'Students' },
    { icon: BookOpen, number: '50+', label: 'Programs' },
    { icon: Globe, number: '80+', label: 'Countries' },
    { icon: Award, number: '200+', label: 'Research Projects' },
  ];

  const schools = [
    {
      name: 'School of Architecture, Planning and Design',
      description: 'Innovative design and sustainable urban planning solutions.',
      icon: Target,
    },
    {
      name: 'School of Collective Intelligence',
      description: 'Interdisciplinary approaches to complex global challenges.',
      icon: Lightbulb,
    },
    {
      name: 'School of Industrial Management',
      description: 'Advanced manufacturing and industrial engineering.',
      icon: Award,
    },
    {
      name: 'School of Mining and Energy',
      description: 'Sustainable resource extraction and renewable energy.',
      icon: Globe,
    },
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
              Mohammed VI Polytechnic University
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              A world-class research university committed to Africa's sustainable development 
              through innovation, excellence, and international collaboration.
            </p>
            <a
              href="https://www.um6p.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <span>Visit UM6P Website</span>
              <ExternalLink className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* University Stats */}
      {/* <section className="py-16 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg border dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* About UM6P */}
      <section className="py-24 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
                Leading African Innovation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Mohammed VI Polytechnic University (UM6P) is an internationally oriented 
                institution committed to research and innovation in Africa and aimed at 
                the highest international standards.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Located in the green city of Ben Guerir, UM6P aspires to leave its mark 
                nationally, continentally, and globally through research and innovation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span className="text-gray-600 dark:text-gray-300">Research-focused institution</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span className="text-gray-600 dark:text-gray-300">International partnerships</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span className="text-gray-600 dark:text-gray-300">Sustainable development focus</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span className="text-gray-600 dark:text-gray-300">Innovation and entrepreneurship</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={campusImages[currentImageIndex]}
                alt="UM6P Campus"
               className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Green Campus</h3>
                <p className="text-white/90">Sustainable and modern facilities</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     

      {/* Partnership with ARC Air */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ARC Air: A Center of Excellence
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              The African Research Centre on Air Quality and Climate operates within 
              UM6P's ecosystem, leveraging the university's world-class infrastructure 
              and international partnerships to advance environmental research.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Globe className="h-8 w-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Global Partnerships</h3>
                <p className="text-white/80 text-sm">
                  Collaborations with leading international institutions
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Award className="h-8 w-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Research Excellence</h3>
                <p className="text-white/80 text-sm">
                  Cutting-edge research in air quality and climate science
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="h-8 w-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Capacity Building</h3>
                <p className="text-white/80 text-sm">
                  Training the next generation of African researchers
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};