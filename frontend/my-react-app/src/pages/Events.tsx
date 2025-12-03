// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, MapPin, Users, Clock, ExternalLink, Filter, Search } from 'lucide-react';
// import { useLocation } from 'react-router-dom';

// export const Events: React.FC = () => {
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const location = useLocation();

//   // Check URL parameters for filter
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const filterParam = urlParams.get('filter');
//     if (filterParam && ['past', 'upcoming'].includes(filterParam)) {
//       setSelectedFilter(filterParam);
//     }
//   }, [location]);

//   const eventTypes = [
//     { id: 'all', name: 'All Events' },
//     { id: 'upcoming', name: 'Upcoming Events' },
//     { id: 'past', name: 'Past Events' },
//     { id: 'conference', name: 'Conferences' },
//     { id: 'workshop', name: 'Workshops' },
//     { id: 'seminar', name: 'Seminars' },
//     { id: 'training', name: 'Training' },
//   ];

//   const events = [
//     {
//       id: 1,
//       title: 'COMPOLA 2024 - International Conference on Pollution and Air Quality',
//       type: 'conference',
//       date: '2024-03-15',
//       endDate: '2024-03-17',
//       time: '09:00 AM',
//       location: 'Rabat, Morocco',
//       venue: 'Mohammed VI Polytechnic University',
//       description: 'The premier international conference bringing together researchers, policymakers, and industry experts to address air pollution challenges across Africa and beyond.',
//       image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
//       attendees: '300+',
//       status: 'upcoming',
//       registrationLink: '#',
//       highlights: [
//         'Keynote speakers from leading international institutions',
//         'Technical sessions on air quality monitoring',
//         'Policy roundtables with African governments',
//         'Networking opportunities with global experts'
//       ]
//     },
//     {
//       id: 2,
//       title: 'POPNet Annual Workshop',
//       type: 'workshop',
//       date: '2024-02-20',
//       endDate: '2024-02-22',
//       time: '10:00 AM',
//       location: 'Accra, Ghana',
//       venue: 'University of Ghana',
//       description: 'Annual workshop for the Persistent Organic Pollutants Network, focusing on capacity building and knowledge sharing among West African researchers.',
//       image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg',
//       attendees: '80+',
//       status: 'upcoming',
//       registrationLink: '#',
//       highlights: [
//         'Hands-on training in analytical techniques',
//         'Data sharing and quality assurance protocols',
//         'Regional collaboration planning',
//         'Equipment demonstration and maintenance'
//       ]
//     },
//     {
//       id: 3,
//       title: 'Climate Adaptation Strategies Seminar',
//       type: 'seminar',
//       date: '2024-01-25',
//       time: '02:00 PM',
//       location: 'Online',
//       venue: 'Virtual Event',
//       description: 'Expert seminar on climate adaptation strategies for African communities, featuring case studies and best practices from across the continent.',
//       image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
//       attendees: '150+',
//       status: 'past',
//       registrationLink: '#',
//       highlights: [
//         'Community-based adaptation case studies',
//         'Early warning system implementations',
//         'Financing mechanisms for adaptation',
//         'Technology transfer opportunities'
//       ]
//     },
//     {
//       id: 4,
//       title: 'SATVA Training Program - Satellite Data Analysis',
//       type: 'training',
//       date: '2024-04-10',
//       endDate: '2024-04-12',
//       time: '09:00 AM',
//       location: 'Nairobi, Kenya',
//       venue: 'University of Nairobi',
//       description: 'Intensive training program on satellite-based air quality data analysis and validation techniques for African researchers.',
//       image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
//       attendees: '40',
//       status: 'upcoming',
//       registrationLink: '#',
//       highlights: [
//         'Satellite data processing techniques',
//         'Ground-truth validation methods',
//         'Software tools and platforms',
//         'Hands-on data analysis sessions'
//       ]
//     },
//     {
//       id: 5,
//       title: 'Air Quality Monitoring Network Meeting',
//       type: 'workshop',
//       date: '2023-12-08',
//       time: '09:00 AM',
//       location: 'Lagos, Nigeria',
//       venue: 'University of Lagos',
//       description: 'Regional meeting to coordinate air quality monitoring efforts across West Africa and standardize measurement protocols.',
//       image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg',
//       attendees: '60+',
//       status: 'past',
//       registrationLink: '#',
//       highlights: [
//         'Network coordination and planning',
//         'Standardization of protocols',
//         'Equipment calibration procedures',
//         'Data sharing agreements'
//       ]
//     },
//     {
//       id: 6,
//       title: 'Young Researchers Climate Forum',
//       type: 'conference',
//       date: '2024-05-15',
//       endDate: '2024-05-16',
//       time: '09:00 AM',
//       location: 'Cape Town, South Africa',
//       venue: 'University of Cape Town',
//       description: 'Forum dedicated to supporting and showcasing the work of young researchers in climate and environmental sciences across Africa.',
//       image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg',
//       attendees: '120+',
//       status: 'upcoming',
//       registrationLink: '#',
//       highlights: [
//         'Student research presentations',
//         'Mentorship opportunities',
//         'Career development workshops',
//         'Networking with senior researchers'
//       ]
//     }
//   ];

//   const filteredEvents = events.filter(event => {
//     const matchesFilter = selectedFilter === 'all' || 
//                          event.status === selectedFilter || 
//                          event.type === selectedFilter;
//     const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'upcoming': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'past': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
//       case 'ongoing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
//     }
//   };

//   const formatDate = (dateString: string, endDateString?: string) => {
//     const date = new Date(dateString);
//     const options: Intl.DateTimeFormatOptions = { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     };
    
//     if (endDateString) {
//       const endDate = new Date(endDateString);
//       return `${date.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
//     }
    
//     return date.toLocaleDateString('en-US', options);
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
//               Events & Conferences
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
//               Join us at international conferences, workshops, and training programs 
//               that advance air quality and climate research across Africa.
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
//                 placeholder="Search events..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text"
//               />
//             </div>

//             {/* Filter */}
//             <div className="flex flex-wrap gap-2">
//               {eventTypes.map((type) => (
//                 <button
//                   key={type.id}
//                   onClick={() => setSelectedFilter(type.id)}
//                   className={`px-4 py-3 rounded-lg font-medium transition-colors ${
//                     selectedFilter === type.id
//                       ? 'bg-primary text-white'
//                       : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
//                   }`}
//                 >
//                   {type.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Results Count */}
//           <p className="text-gray-600 dark:text-gray-300 mb-8">
//             Showing {filteredEvents.length} of {events.length} events
//           </p>
//         </div>
//       </section>

//       {/* Events Grid */}
//       <section className="py-12 bg-background dark:bg-dark-bg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-8">
//             {filteredEvents.map((event, index) => (
//               <motion.div
//                 key={event.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={event.image}
//                     alt={event.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                   <div className="absolute top-4 left-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
//                       {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
//                     </span>
//                   </div>
//                   <div className="absolute top-4 right-4">
//                     <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium">
//                       {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-4">
//                     {event.title}
//                   </h3>

//                   <div className="space-y-3 mb-4">
//                     <div className="flex items-center text-gray-600 dark:text-gray-300">
//                       <Calendar className="h-4 w-4 mr-2 text-primary" />
//                       <span className="text-sm">{formatDate(event.date, event.endDate)}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-300">
//                       <Clock className="h-4 w-4 mr-2 text-primary" />
//                       <span className="text-sm">{event.time}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-300">
//                       <MapPin className="h-4 w-4 mr-2 text-primary" />
//                       <span className="text-sm">{event.location}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600 dark:text-gray-300">
//                       <Users className="h-4 w-4 mr-2 text-primary" />
//                       <span className="text-sm">{event.attendees} attendees</span>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
//                     {event.description}
//                   </p>

//                   <div className="mb-4">
//                     <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-2">
//                       Event Highlights:
//                     </h4>
//                     <ul className="space-y-1">
//                       {event.highlights.slice(0, 2).map((highlight, i) => (
//                         <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
//                           <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
//                           {highlight}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="flex gap-2">
//                     <button className="flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors">
//                       <span>
//                         {event.status === 'upcoming' ? 'Register' : 'View Details'}
//                       </span>
//                       <ExternalLink className="h-4 w-4" />
//                     </button>
//                     <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
//                       Share
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {filteredEvents.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-600 dark:text-gray-300 text-lg">
//                 No events found matching your search criteria.
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Upcoming Events Summary */}
//       <section className="py-24 bg-gradient-to-r from-primary to-accent">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//               Stay Updated on Our Events
//             </h2>
//             <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//               Subscribe to our newsletter to receive notifications about upcoming 
//               conferences, workshops, and training opportunities.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
//               />
//               <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//                 Subscribe
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Users, Clock, ExternalLink, Filter, Search
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const Events: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const location = useLocation();

  // Get filter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam && ['past', 'upcoming'].includes(filterParam)) {
      setSelectedFilter(filterParam);
    }
  }, [location]);
 const token = localStorage.getItem('accessToken');
 const API_EVENTS = import.meta.env.VITE_API_EVENTS;
  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
     try {
  const response = await axios.get(`${API_EVENTS}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  setEvents(response.data);
} catch (err) {
  console.error('Failed to load events:', err);
}

    };
    fetchEvents();
  }, []);

  const eventTypes = [
    { id: 'all', name: 'All Events' },
    { id: 'upcoming', name: 'Upcoming Events' },
    { id: 'past', name: 'Past Events' },
    { id: 'conference', name: 'Conferences' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'seminar', name: 'Seminars' },
    { id: 'training', name: 'Training' },
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter =
      selectedFilter === 'all' ||
      event.status === selectedFilter ||
      event.type === selectedFilter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'past': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatDate = (start: string, end?: string) => {
    const startDate = new Date(start);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    if (end) {
      const endDate = new Date(end);
      return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    }
    return startDate.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-text-primary dark:text-dark-text mb-6"
          >
            Events & Conferences
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join us at international conferences, workshops, and training programs that advance air quality and climate research across Africa.
          </p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-12 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {eventTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedFilter(type.id)}
                  className={`px-4 py-3 rounded-lg font-medium ${
                    selectedFilter === type.id
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 px-4">
          {filteredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white dark:bg-dark-surface rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden"
            >
              <div className="relative h-48">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-2">{event.title}</h3>
                <div className="text-gray-600 dark:text-gray-300 space-y-2 mb-4 text-sm">
                  <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-primary" />{formatDate(event.date, event.end_date)}</div>
                  <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-primary" />{event.time}</div>
                  <div className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary" />{event.location}</div>
                  <div className="flex items-center"><Users className="h-4 w-4 mr-2 text-primary" />{event.attendees} attendees</div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>

                {event.highlights && event.highlights.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Highlights</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      {event.highlights.slice(0, 3).map((highlight: string, i: number) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={event.registration_link}
                  className="inline-flex items-center justify-center mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  {event.status === 'upcoming' ? 'Register' : 'View Details'} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center col-span-full text-gray-600 dark:text-gray-300">
              No events found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
