// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Search, MapPin, Clock, DollarSign, Users, FileText, ExternalLink, Filter } from 'lucide-react';

// export const Recruitment: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('all');

//   const departments = [
//     { id: 'all', name: 'All Departments' },
//     { id: 'research', name: 'Research' },
//     { id: 'technical', name: 'Technical' },
//     { id: 'administration', name: 'Administration' },
//     { id: 'postdoc', name: 'Postdoctoral' },
//   ];

//   const positions = [
//     {
//       id: 1,
//       title: 'Senior Research Scientist - Air Quality Modeling',
//       department: 'research',
//       type: 'Full-time',
//       location: 'Ben Guerir, Morocco',
//       salary: 'Competitive',
//       posted: '2024-01-15',
//       deadline: '2024-02-28',
//       description: 'We are seeking a Senior Research Scientist to lead air quality modeling research projects and develop innovative monitoring solutions for African urban environments.',
//       requirements: [
//         'PhD in Atmospheric Sciences, Environmental Engineering, or related field',
//         '5+ years of experience in air quality modeling',
//         'Proficiency in atmospheric modeling software (WRF-Chem, CMAQ, etc.)',
//         'Strong publication record in peer-reviewed journals',
//         'Experience with satellite remote sensing data',
//         'Fluency in English and French preferred'
//       ],
//       responsibilities: [
//         'Lead air quality modeling research projects',
//         'Develop and validate atmospheric models for African conditions',
//         'Supervise PhD students and postdoctoral researchers',
//         'Collaborate with international research partners',
//         'Publish research findings in high-impact journals',
//         'Present research at international conferences'
//       ],
//       benefits: [
//         'Competitive salary and benefits package',
//         'Research funding and equipment support',
//         'International collaboration opportunities',
//         'Professional development programs',
//         'Relocation assistance available'
//       ]
//     },
//     {
//       id: 2,
//       title: 'Postdoctoral Fellow - Climate Data Analysis',
//       department: 'postdoc',
//       type: 'Fixed-term',
//       location: 'Ben Guerir, Morocco',
//       salary: '€35,000 - €45,000',
//       posted: '2024-01-10',
//       deadline: '2024-03-15',
//       description: 'Exciting opportunity for a postdoctoral researcher to work on climate data analysis and machine learning applications in environmental science.',
//       requirements: [
//         'PhD in Climate Science, Statistics, Computer Science, or related field',
//         'Experience with climate data analysis and statistical methods',
//         'Proficiency in Python, R, or similar programming languages',
//         'Knowledge of machine learning techniques',
//         'Strong analytical and problem-solving skills',
//         'Excellent written and verbal communication skills'
//       ],
//       responsibilities: [
//         'Analyze large climate datasets using statistical and ML methods',
//         'Develop predictive models for climate variables',
//         'Collaborate with interdisciplinary research teams',
//         'Contribute to grant proposals and research publications',
//         'Mentor graduate students',
//         'Participate in outreach and knowledge transfer activities'
//       ],
//       benefits: [
//         'Competitive postdoctoral fellowship',
//         'Access to high-performance computing resources',
//         'Training and professional development opportunities',
//         'International research network access',
//         'Conference travel support'
//       ]
//     },
//     {
//       id: 3,
//       title: 'Laboratory Technician - Environmental Monitoring',
//       department: 'technical',
//       type: 'Full-time',
//       location: 'Ben Guerir, Morocco',
//       salary: 'MAD 8,000 - 12,000',
//       posted: '2024-01-08',
//       deadline: '2024-02-20',
//       description: 'Join our technical team to support environmental monitoring operations and maintain state-of-the-art analytical equipment.',
//       requirements: [
//         'Bachelor\'s degree in Chemistry, Environmental Science, or related field',
//         '2+ years of laboratory experience',
//         'Experience with analytical instruments (GC-MS, HPLC, etc.)',
//         'Knowledge of quality control procedures',
//         'Attention to detail and strong organizational skills',
//         'Ability to work independently and as part of a team'
//       ],
//       responsibilities: [
//         'Operate and maintain analytical instruments',
//         'Conduct sample preparation and analysis',
//         'Maintain laboratory quality control standards',
//         'Document experimental procedures and results',
//         'Support field sampling campaigns',
//         'Assist with equipment calibration and maintenance'
//       ],
//       benefits: [
//         'Stable employment with growth opportunities',
//         'Technical training and certification programs',
//         'Health insurance and social benefits',
//         'Annual leave and professional development time',
//         'Modern laboratory facilities'
//       ]
//     },
//     {
//       id: 4,
//       title: 'Research Associate - Atmospheric Chemistry',
//       department: 'research',
//       type: 'Full-time',
//       location: 'Ben Guerir, Morocco',
//       salary: 'Competitive',
//       posted: '2024-01-05',
//       deadline: '2024-03-01',
//       description: 'Research Associate position focusing on atmospheric chemistry research with emphasis on African atmospheric processes and pollution sources.',
//       requirements: [
//         'PhD in Atmospheric Chemistry, Physical Chemistry, or related field',
//         'Experience with atmospheric measurement techniques',
//         'Knowledge of photochemical processes and kinetics',
//         'Proficiency in data analysis software and programming',
//         'Strong publication record',
//         'Ability to work in multicultural environment'
//       ],
//       responsibilities: [
//         'Conduct atmospheric chemistry research',
//         'Design and execute field measurement campaigns',
//         'Analyze atmospheric composition data',
//         'Develop chemical mechanisms and models',
//         'Collaborate with national and international partners',
//         'Contribute to research proposals and publications'
//       ],
//       benefits: [
//         'Excellent research environment',
//         'Access to advanced instrumentation',
//         'International collaboration opportunities',
//         'Competitive compensation package',
//         'Career advancement pathways'
//       ]
//     },
//     {
//       id: 5,
//       title: 'Data Manager - Environmental Database Systems',
//       department: 'technical',
//       type: 'Full-time',
//       location: 'Ben Guerir, Morocco',
//       salary: 'MAD 15,000 - 20,000',
//       posted: '2024-01-03',
//       deadline: '2024-02-15',
//       description: 'Manage and develop environmental database systems to support research activities and data sharing initiatives across Africa.',
//       requirements: [
//         'Master\'s degree in Computer Science, Information Systems, or related field',
//         'Experience with database management systems (PostgreSQL, MySQL)',
//         'Knowledge of data visualization tools and techniques',
//         'Programming skills in Python, SQL, and web technologies',
//         'Understanding of environmental data standards',
//         'Experience with GIS and spatial databases preferred'
//       ],
//       responsibilities: [
//         'Design and maintain environmental databases',
//         'Develop data management protocols and standards',
//         'Create data visualization dashboards',
//         'Support researchers with data access and analysis',
//         'Implement data quality control procedures',
//         'Coordinate with international data networks'
//       ],
//       benefits: [
//         'Dynamic work environment',
//         'Professional development opportunities',
//         'Modern IT infrastructure',
//         'Flexible working arrangements',
//         'Comprehensive benefits package'
//       ]
//     },
//     {
//       id: 6,
//       title: 'Administrative Coordinator - Research Programs',
//       department: 'administration',
//       type: 'Full-time',
//       location: 'Ben Guerir, Morocco',
//       salary: 'MAD 10,000 - 15,000',
//       posted: '2024-01-01',
//       deadline: '2024-02-10',
//       description: 'Coordinate research programs and support administrative functions for ARC Air\'s research activities and international collaborations.',
//       requirements: [
//         'Bachelor\'s degree in Business Administration or related field',
//         '3+ years of administrative experience in research environment',
//         'Excellent organizational and communication skills',
//         'Proficiency in office software and project management tools',
//         'Fluency in English, French, and Arabic',
//         'Experience with grant administration preferred'
//       ],
//       responsibilities: [
//         'Coordinate research project administration',
//         'Support grant proposal preparation and submission',
//         'Manage research program budgets and reporting',
//         'Organize conferences and workshops',
//         'Facilitate international collaborations',
//         'Maintain research program documentation'
//       ],
//       benefits: [
//         'Stable career opportunity',
//         'Professional development programs',
//         'International work environment',
//         'Comprehensive benefits package',
//         'Work-life balance support'
//       ]
//     }
//   ];

//   const filteredPositions = positions.filter(position => {
//     const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          position.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment = selectedDepartment === 'all' || position.department === selectedDepartment;
//     return matchesSearch && matchesDepartment;
//   });

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   const getDaysUntilDeadline = (deadline: string) => {
//     const today = new Date();
//     const deadlineDate = new Date(deadline);
//     const diffTime = deadlineDate.getTime() - today.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

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
//               Join Our Team
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
//               Be part of groundbreaking research that's shaping the future of environmental 
//               science and climate action across Africa. Explore exciting career opportunities 
//               at ARC Air.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Search and Filter */}
//       <section className="py-12 bg-background dark:bg-dark-bg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row gap-4 mb-8">
//             {/* Search */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="text"
//                 placeholder="Search positions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text"
//               />
//             </div>

//             {/* Department Filter */}
//             <div className="flex flex-wrap gap-2">
//               {departments.map((dept) => (
//                 <button
//                   key={dept.id}
//                   onClick={() => setSelectedDepartment(dept.id)}
//                   className={`px-4 py-3 rounded-lg font-medium transition-colors ${
//                     selectedDepartment === dept.id
//                       ? 'bg-primary text-white'
//                       : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
//                   }`}
//                 >
//                   {dept.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Results Count */}
//           <p className="text-gray-600 dark:text-gray-300 mb-8">
//             Showing {filteredPositions.length} of {positions.length} positions
//           </p>
//         </div>
//       </section>

//       {/* Job Listings */}
//       <section className="py-12 bg-background dark:bg-dark-bg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="space-y-6">
//             {filteredPositions.map((position, index) => (
//               <motion.div
//                 key={position.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="p-8">
//                   <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-3 mb-2">
//                         <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text">
//                           {position.title}
//                         </h3>
//                         <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
//                           {position.department.charAt(0).toUpperCase() + position.department.slice(1)}
//                         </span>
//                       </div>
                      
//                       <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-4">
//                         <div className="flex items-center">
//                           <MapPin className="h-4 w-4 mr-1 text-primary" />
//                           <span className="text-sm">{position.location}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="h-4 w-4 mr-1 text-primary" />
//                           <span className="text-sm">{position.type}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <DollarSign className="h-4 w-4 mr-1 text-primary" />
//                           <span className="text-sm">{position.salary}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//                         Posted: {formatDate(position.posted)}
//                       </div>
//                       <div className="text-sm font-medium">
//                         <span className={`${
//                           getDaysUntilDeadline(position.deadline) <= 7 
//                             ? 'text-red-600 dark:text-red-400' 
//                             : 'text-gray-600 dark:text-gray-300'
//                         }`}>
//                           Deadline: {formatDate(position.deadline)}
//                         </span>
//                       </div>
//                       {getDaysUntilDeadline(position.deadline) <= 7 && (
//                         <div className="text-xs text-red-600 dark:text-red-400 font-medium">
//                           {getDaysUntilDeadline(position.deadline)} days left
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
//                     {position.description}
//                   </p>

//                   <div className="grid md:grid-cols-3 gap-6 mb-6">
//                     <div>
//                       <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
//                         Key Requirements:
//                       </h4>
//                       <ul className="space-y-1">
//                         {position.requirements.slice(0, 3).map((req, i) => (
//                           <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
//                             <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
//                             {req}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
//                         Responsibilities:
//                       </h4>
//                       <ul className="space-y-1">
//                         {position.responsibilities.slice(0, 3).map((resp, i) => (
//                           <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
//                             <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
//                             {resp}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
//                         Benefits:
//                       </h4>
//                       <ul className="space-y-1">
//                         {position.benefits.slice(0, 3).map((benefit, i) => (
//                           <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
//                             <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
//                             {benefit}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <button className="flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
//                       <FileText className="h-4 w-4" />
//                       <span>Apply Now</span>
//                     </button>
//                     <button className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-lg font-medium transition-colors">
//                       <ExternalLink className="h-4 w-4" />
//                       <span>View Details</span>
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {filteredPositions.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-600 dark:text-gray-300 text-lg">
//                 No positions found matching your search criteria.
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Why Join Us */}
//       <section className="py-24 bg-gray-50 dark:bg-dark-surface">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
//               Why Join ARC Air?
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//               Be part of a dynamic research community that's making a real impact 
//               on environmental science and sustainable development in Africa.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: Users,
//                 title: 'Collaborative Environment',
//                 description: 'Work with leading researchers from around the world in a supportive, multicultural environment.'
//               },
//               {
//                 icon: FileText,
//                 title: 'Cutting-edge Research',
//                 description: 'Access to state-of-the-art facilities and equipment to conduct groundbreaking research.'
//               },
//               {
//                 icon: ExternalLink,
//                 title: 'Career Development',
//                 description: 'Professional development opportunities, training programs, and clear career advancement paths.'
//               }
//             ].map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 className="bg-white dark:bg-dark-bg rounded-xl p-8 shadow-lg border dark:border-gray-700 text-center"
//               >
//                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <benefit.icon className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-4">
//                   {benefit.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                   {benefit.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Application Process */}
//       <section className="py-24 bg-gradient-to-r from-primary to-accent">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//               Ready to Apply?
//             </h2>
//             <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//               Submit your application today and take the first step toward 
//               joining our world-class research team.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//                 Application Guidelines
//               </button>
//               <button className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-white/10">
//                 Contact HR
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };













//here i get the data from my backend


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, FileText, ExternalLink, Users, Search } from 'lucide-react';
import axios from 'axios';

interface JobPosition {
  id: number;
  title: string;
  description: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  deadline: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

interface Department {
  id: string;
  name: string;
}

export const Recruitment = () => {
  const [positions, setPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments: Department[] = [
    { id: 'all', name: 'All Departments' },
    { id: 'research', name: 'Research' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'climate', name: 'Climate' },
    { id: 'admin', name: 'Administration' },
  ];

const fetchJobs = async () => {
  try {
    const token = localStorage.getItem('accessToken'); // if needed for auth on POST or others

    const response = await axios.get(
      'http://localhost:8000/api/jobs/',
      {
        headers: {
          // you can skip Authorization if GET is allowed for any
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    setPositions(response.data);
  } catch (err) {
    console.error(err);
    setError('Failed to fetch job positions.');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchJobs();
}, []);


  const filteredPositions = positions.filter(position => {
    const matchesSearch =
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'all' || position.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return <div className="text-center py-12 text-lg">Loading job positions...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

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
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Be part of groundbreaking research that's shaping the future of environmental 
              science and climate action across Africa. Explore exciting career opportunities 
              at ARC Air.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    selectedDepartment === dept.id
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Showing {filteredPositions.length} of {positions.length} positions
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text">
                          {position.title}
                        </h3>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {position.department.charAt(0).toUpperCase() + position.department.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-primary" />
                          <span className="text-sm">{position.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-primary" />
                          <span className="text-sm">{position.type}</span>
                        </div>
                        {/* <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-primary" />
                          <span className="text-sm">{position.salary}</span>
                        </div> */}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Posted: {formatDate(position.posted)}
                      </div>
                      <div className="text-sm font-medium">
                        <span className={`${
                          getDaysUntilDeadline(position.deadline) <= 7 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-gray-600 dark:text-gray-300'
                        }`}>
                          Deadline: {formatDate(position.deadline)}
                        </span>
                      </div>
                      {getDaysUntilDeadline(position.deadline) <= 7 && (
                        <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                          {getDaysUntilDeadline(position.deadline)} days left
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {position.description}
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
                        Key Requirements:
                      </h4>
                      <ul className="space-y-1">
                        {position.requirements.slice(0, 3).map((req, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
                        Responsibilities:
                      </h4>
                      <ul className="space-y-1">
                        {position.responsibilities.slice(0, 3).map((resp, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
                        Benefits:
                      </h4>
                      <ul className="space-y-1">
                        {position.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                      <FileText className="h-4 w-4" />
                      <span>Apply Now</span>
                    </button>
                    {/* <button className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-lg font-medium transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      <span>View Details</span>
                    </button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No positions found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* You can keep the rest (Why Join Us, Apply section...) unchanged */}
    </div>
  );
};
