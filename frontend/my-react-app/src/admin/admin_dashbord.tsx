// // src/components/AdminDashboard.tsx
// import React from 'react';
// import { Calendar, Users, Briefcase, UserCheck } from 'lucide-react';

// const AdminDashboard = () => {
//   const adminSections = [
//     {
//       icon: Calendar,
//       title: 'Event Management',
//       description: 'Create, schedule, and manage events with comprehensive tracking and analytics.',
//       color: 'bg-orange-500',
//       hoverColor: 'hover:bg-orange-600'
//     },
//     {
//       icon: UserCheck,
//       title: 'Recruitment',
//       description: 'Handle job postings, candidate applications, and streamline hiring processes.',
//       color: 'bg-black',
//       hoverColor: 'hover:bg-gray-800'
//     },
//     {
//       icon: Briefcase,
//       title: 'Project Management',
//       description: 'Oversee project timelines, resources, and team collaboration across departments.',
//       color: 'bg-orange-600',
//       hoverColor: 'hover:bg-orange-700'
//     },
//     {
//       icon: Users,
//       title: 'People Management',
//       description: 'Manage team members, roles, permissions, and organizational structure.',
//       color: 'bg-gray-900',
//       hoverColor: 'hover:bg-black'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
//       {/* Header */}
//       {/* <header className="bg-white shadow-sm border-b border-orange-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
//             <div className="flex items-center space-x-4">
//               <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
//                 <span className="text-sm font-medium text-white">A</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header> */}

//       {/* Hero Section */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-black mb-4">
//             Welcome to Your Admin Center
//           </h2>
//           <p className="text-lg text-gray-700 max-w-2xl mx-auto">
//             Manage your organization efficiently with our comprehensive admin tools. 
//             Access all your key functions from one centralized dashboard.
//           </p>
//         </div>

//         {/* Admin Sections Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {adminSections.map((section, index) => {
//             const IconComponent = section.icon;
//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
//               >
//                 <div className={`${section.color} ${section.hoverColor} p-6 text-white transition-colors duration-300`}>
//                   <IconComponent size={32} className="mb-4" />
//                   <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
//                 </div>
//                 <div className="p-6">
//                   <p className="text-gray-700 leading-relaxed">{section.description}</p>
//                   <div className="mt-4">
//                     <span className="inline-flex items-center text-sm font-medium text-black group-hover:text-orange-600 transition-colors duration-200">
//                       Access Module
//                       <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Quick Stats */}
//         <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
//           <h3 className="text-2xl font-bold text-black mb-6">Quick Overview</h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-orange-600 mb-2">24</div>
//               <div className="text-gray-700">Active Events</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-black mb-2">12</div>
//               <div className="text-gray-700">Open Positions</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-orange-500 mb-2">8</div>
//               <div className="text-gray-700">Active Projects</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-gray-800 mb-2">156</div>
//               <div className="text-gray-700">Team Members</div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;










import React from 'react';
import { Calendar, Users, Briefcase, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const adminSections = [
    {
      icon: Calendar,
      title: 'Event Management',
      description: 'Create, schedule, and manage events with comprehensive tracking and analytics.',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      path: '/admin-event',
    },
    {
      icon: UserCheck,
      title: 'Recruitment',
      description: 'Handle job postings, candidate applications, and streamline hiring processes.',
      color: 'bg-black dark:bg-orange-600',
      hoverColor: 'hover:bg-gray-800 dark:hover:bg-orange-700',
      path: '/admin-jobs',
    },
    // {
    //   icon: Briefcase,
    //   title: 'Project Management',
    //   description: 'Oversee project timelines, resources, and team collaboration across departments.',
    //   color: 'bg-orange-600',
    //   hoverColor: 'hover:bg-orange-700',
    //   path: '/admin-projects',
    // },
    // {
    //   icon: Users,
    //   title: 'People Management',
    //   description: 'Manage team members, roles, permissions, and organizational structure.',
    //   color: 'bg-gray-900 dark:bg-orange-700',
    //   hoverColor: 'hover:bg-black dark:hover:bg-orange-800',
    //   path: '/admin-people',
    // },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Welcome to Your Admin Center
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your organization efficiently with our comprehensive admin tools. 
            Access all your key functions from one centralized dashboard.
          </p>
        </div>

        {/* Admin Sections Grid */}
      <div className="flex justify-center gap-6">
  {adminSections.map((section, index) => {
    const IconComponent = section.icon;
    return (
      <Link to={section.path} key={index}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer w-72">
          <div className={`${section.color} ${section.hoverColor} p-6 text-white transition-colors duration-300`}>
            <IconComponent size={32} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{section.description}</p>
            <div className="mt-4">
              <span className="inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:text-orange-600 transition-colors duration-200">
                Access Module
                <svg
                  className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  })}
</div>



        {/* Quick Stats */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-black dark:text-white mb-6">Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24</div>
              <div className="text-gray-700 dark:text-gray-300">Active Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-white mb-2">12</div>
              <div className="text-gray-700 dark:text-gray-300">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">8</div>
              <div className="text-gray-700 dark:text-gray-300">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">156</div>
              <div className="text-gray-700 dark:text-gray-300">Team Members</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
