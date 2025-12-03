






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// interface Project {
//   id: number;
//   title: string;
//   type: string;
//   date: string;
//   time: string;
//   location: string;
//   venue: string;
//   image: string;
//   attendees: string;
//   status: string;
//   registration_link: string;
//   highlights: string[];
// }

// type FormProject = Omit<Project, 'id' | 'image'> & { image: File | null };

// const getStatusColor = (status: string) => {
//   switch (status.toLowerCase()) {
//     case 'planning': return 'bg-yellow-100 text-yellow-800';
//     case 'in-progress': return 'bg-blue-100 text-blue-800';
//     case 'completed': return 'bg-green-100 text-green-800';
//     case 'on-hold': return 'bg-gray-200 text-gray-800';
//     case 'upcoming': return 'bg-purple-100 text-purple-800';
//     case 'past': return 'bg-red-100 text-red-800';
//     default: return 'bg-gray-100 text-gray-800';
//   }
// };

// const ProjectManager: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [form, setForm] = useState<FormProject>({
//     title: '',
//     type: '',
//     date: '',
//     time: '',
//     location: '',
//     venue: '',
//     image: null,
//     attendees: '',
//     status: '',
//     registration_link: '',
//     highlights: [],
//   });
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const token = localStorage.getItem('accessToken');

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get('http://localhost:8000/api/events/', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleChange = (key: keyof FormProject, value: string | string[] | File | null) => {
//     setForm({ ...form, [key]: value });
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setForm({
//       title: '',
//       type: '',
//       date: '',
//       time: '',
//       location: '',
//       venue: '',
//       image: null,
//       attendees: '',
//       status: '',
//       registration_link: '',
//       highlights: [],
//     });
//     setErrorMsg(null);
//   };

//   const submitForm = async () => {
//     try {
//       const formData = new FormData();

//       Object.entries(form).forEach(([key, value]) => {
//         if (key === 'highlights') {
//           (value as string[]).forEach((item, index) => {
//             formData.append(`highlights[${index}]`, item);
//           });
//         } else if (key === 'image' && value) {
//           formData.append('image', value);
//         } else if (value !== null) {
//           formData.append(key, value as string);
//         }
//       });

//       const url = editingId
//         ? `http://localhost:8000/api/events/${editingId}/`
//         : 'http://localhost:8000/api/events/';
//       const method = editingId ? 'put' : 'post';

//       const res = await axios({
//         method,
//         url,
//         data: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (editingId) {
//         setProjects(projects.map(p => (p.id === editingId ? res.data : p)));
//       } else {
//         setProjects([...projects, res.data]);
//       }

//       resetForm();
//     } catch (err: any) {
//       const message =
//         err?.response?.data?.detail ||
//         err?.response?.data?.message ||
//         JSON.stringify(err?.response?.data) ||
//         'Something went wrong. Please check your input.';
//       setErrorMsg(message);
//     }
//   };

//   const deleteProject = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/events/${id}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(projects.filter(p => p.id !== id));
//     } catch (err) {
//       console.error('Delete error:', err);
//     }
//   };

//   const startEdit = (project: Project) => {
//     setEditingId(project.id);
//     setForm({ ...project, image: null });
//     setErrorMsg(null);
//   };

//   return (
//     <div className="min-h-screen pt-16 bg-background dark:bg-dark-bg px-6">
//       <section className="text-center py-10">
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl font-bold text-text-primary dark:text-dark-text"
//         >
//           Event Management Panel
//         </motion.h1>

//         {errorMsg && (
//           <div className="mt-6 max-w-2xl mx-auto">
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//               <strong className="font-bold">Error: </strong>
//               <span>{errorMsg}</span>
//               <span
//                 onClick={() => setErrorMsg(null)}
//                 className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
//               >
//                 <svg className="fill-current h-6 w-6 text-red-500" viewBox="0 0 20 20">
//                   <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.586 8.586l-2.934 2.934a1 1 0 101.414 1.414L10 9.828l2.934 2.934a1 1 0 001.414-1.414L11.414 8.586l2.934-2.934z" />
//                 </svg>
//               </span>
//             </div>
//           </div>
//         )}
//       </section>

//       <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//         {Object.entries(form).map(([key, value]) => {
//           if (key === 'highlights') {
//             return (
//               <textarea
//                 key={key}
//                 placeholder="Enter highlights separated by commas"
//                 value={(value as string[]).join(', ')}
//                 onChange={(e) => handleChange('highlights', e.target.value.split(',').map(h => h.trim()))}
//                 className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg md:col-span-2"
//               ></textarea>
//             );
//           } else if (key === 'image') {
//             return (
//               <input
//                 key={key}
//                 type="file"
//                 onChange={(e) => handleChange('image', e.target.files?.[0] || null)}
//                 className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
//               />
//             );
//           } else if (key === 'type') {
//             return (
//               <select
//                 key={key}
//                 value={value as string}
//                 onChange={(e) => handleChange('type', e.target.value)}
//                 className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
//               >
//                 <option value="">Select Type</option>
//                 <option value="conference">Conference</option>
//                 <option value="workshop">Workshop</option>
//                 <option value="seminar">Seminar</option>
//                 <option value="webinar">Webinar</option>
//                 <option value="training">Training</option>
//                 <option value="other">Other</option>
//               </select>
//             );
//           } else if (key === 'status') {
//             return (
//               <select
//                 key={key}
//                 value={value as string}
//                 onChange={(e) => handleChange('status', e.target.value)}
//                 className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
//               >
//                 <option value="">Select Status</option>
//                 <option value="upcoming">Upcoming</option>
//                 <option value="past">Past</option>
//               </select>
//             );
//           } else {
//             return (
//               <input
//                 key={key}
//                 type="text"
//                 placeholder={key.replace('_', ' ')}
//                 value={value as string}
//                 onChange={(e) => handleChange(key as keyof FormProject, e.target.value)}
//                 className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
//               />
//             );
//           }
//         })}
//         <div className="md:col-span-2 flex gap-4 justify-end">
//           <button
//             onClick={submitForm}
//             className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90"
//           >
//             {editingId ? 'Update' : 'Create'} Event
//           </button>
//           {editingId && (
//             <button
//               onClick={resetForm}
//               className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </section>

//       {/* Events Grid */}
//       <section className={`grid ${projects.length <= 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
//         {projects.map((project, index) => (
//           <motion.div
//             key={project.id}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             className="group bg-white dark:bg-dark-surface rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
//           >
//             <div className="relative h-64 overflow-hidden">
//               <img
//                 src={project.image}
//                 alt={project.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//               <div className="absolute bottom-4 left-4 text-white">
//                 <h3 className="text-xl font-bold">{project.title}</h3>
//                 <p className="text-primary font-medium">{project.type}</p>
//               </div>
//             </div>
//             <div className="p-6">
//               <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
//                 {project.venue} - {project.date} at {project.time}
//               </p>
//               <div className="mb-4">
//                 <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-2">
//                   Highlights:
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {project.highlights.map((h, i) => (
//                     <span
//                       key={i}
//                       className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
//                     >
//                       {h}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => startEdit(project)}
//                   className="flex-1 px-4 py-2 border text-blue-700 border-blue-500 rounded hover:bg-blue-50"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteProject(project.id)}
//                   className="flex-1 px-4 py-2 border text-red-600 border-red-500 rounded hover:bg-red-50"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default ProjectManager;
















import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Edit3, Trash2, Plus, X, CheckCircle } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  attendees: string;
  status: string;
  registration_link: string;
  highlights: string[];
}

type FormProject = Omit<Project, 'id' | 'image'> & { image: File | null };

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'planning': return 'bg-orange-100 text-orange-600 border-orange-300 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-500/30';
    case 'in-progress': return 'bg-orange-200 text-orange-700 border-orange-400 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-400/40';
    case 'completed': return 'bg-green-100 text-green-600 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-500/30';
    case 'on-hold': return 'bg-gray-200 text-gray-600 border-gray-400 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600/50';
    case 'upcoming': return 'bg-orange-100 text-orange-600 border-orange-300 dark:bg-orange-500/20 dark:text-orange-200 dark:border-orange-400/40';
    case 'past': return 'bg-gray-200 text-gray-500 border-gray-400 dark:bg-gray-900/50 dark:text-gray-400 dark:border-gray-500/50';
    default: return 'bg-gray-200 text-gray-600 border-gray-400 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600/50';
  }
};

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'conference': return '🎯';
    case 'workshop': return '🛠️';
    case 'seminar': return '📚';
    case 'webinar': return '💻';
    case 'training': return '🎓';
    default: return '📅';
  }
};

const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<FormProject>({
    title: '',
    type: '',
    date: '',
    time: '',
    location: '',
    venue: '',
    image: null,
    attendees: '',
    status: '',
    registration_link: '',
    highlights: [],
  });
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Get token from localStorage (from your original code)
  const token = localStorage.getItem('accessToken');

  // Fetch projects function (from your original code with error handling)
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/events/', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setErrorMsg('Failed to fetch events. Please check your connection.');
    }
  };

  // Load projects on component mount
  useEffect(() => {
    if (token) {
      fetchProjects();
    } else {
      setErrorMsg('No access token found. Please log in.');
    }
  }, [token]);

  const handleChange = (key: keyof FormProject, value: string | string[] | File | null) => {
    setForm({ ...form, [key]: value });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: '',
      type: '',
      date: '',
      time: '',
      location: '',
      venue: '',
      image: null,
      attendees: '',
      status: '',
      registration_link: '',
      highlights: [],
    });
    setErrorMsg(null);
    setShowForm(false);
  };

  // Submit form function (from your original code with FormData handling)
  const submitForm = async () => {
    if (!token) {
      setErrorMsg('No access token found. Please log in.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      // Add all form fields to FormData (from your original code)
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'highlights') {
          (value as string[]).forEach((item, index) => {
            formData.append(`highlights[${index}]`, item);
          });
        } else if (key === 'image' && value) {
          formData.append('image', value);
        } else if (value !== null && value !== '') {
          formData.append(key, value as string);
        }
      });

      const url = editingId
        ? `http://localhost:8000/api/events/${editingId}/`
        : 'http://localhost:8000/api/events/';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type for FormData, let browser set it
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (editingId) {
        setProjects(projects.map(p => (p.id === editingId ? responseData : p)));
      } else {
        setProjects([...projects, responseData]);
      }

      resetForm();
    } catch (err: any) {
      const message = err.message || 'Something went wrong. Please check your input.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  // Delete project function (from your original code)
  const deleteProject = async (id: number) => {
    if (!token) {
      setErrorMsg('No access token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/events/${id}/`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setErrorMsg('Failed to delete event. Please try again.');
    }
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({ ...project, image: null });
    setErrorMsg(null);
    setShowForm(true);
  };

  return (
     <div className="min-h-screen bg-background dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800 transition-colors duration-300">
      {/* Header Section */}
     <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-orange-500/20 pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-orange-100/10 dark:from-orange-600/10 dark:to-orange-400/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
            Event Management Hub
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Create, manage, and organize your events with style and efficiency
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <motion.button
              onClick={() => setShowForm(!showForm)}
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <motion.div
                  animate={{ rotate: showForm ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus className="w-5 h-5" />
                </motion.div>
                {showForm ? 'Close Form' : 'Create New Event'}
              </div>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>


      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Message */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="mb-8 max-w-2xl mx-auto"
            >
              <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-2xl relative shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <strong className="font-semibold">Error:</strong>
                  <span>{errorMsg}</span>
                </div>
                <motion.button
                  onClick={() => setErrorMsg(null)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Section */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 overflow-hidden"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-500/20 p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                  {editingId ? 'Update Event' : 'Create New Event'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(form).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={key === 'highlights' || key === 'registration_link' ? 'md:col-span-2' : ''}
                    >
                      {key === 'highlights' ? (
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-orange-400 capitalize">
                            {key.replace('_', ' ')}
                          </label>
                          <textarea
                            placeholder="Enter highlights separated by commas"
                            value={(value as string[]).join(', ')}
                            onChange={(e) => handleChange('highlights', e.target.value.split(',').map(h => h.trim()).filter(h => h))}
                            className="w-full p-4 bg-black/30 border border-orange-500/30 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 backdrop-blur-sm text-white placeholder-gray-400"
                            rows={3}
                          />
                        </div>
                      ) : key === 'image' ? (
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-orange-400">Event Image</label>
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleChange('image', e.target.files?.[0] || null)}
                              className="w-full p-4 bg-black/30 border border-orange-500/30 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 backdrop-blur-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500/20 file:text-orange-300 hover:file:bg-orange-500/30"
                            />
                          </div>
                        </div>
                      ) : key === 'type' || key === 'status' ? (
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-orange-400 capitalize">
                            {key.replace('_', ' ')}
                          </label>
                          <select
                            value={value as string}
                            onChange={(e) => handleChange(key as keyof FormProject, e.target.value)}
                            className="w-full p-4 bg-black/30 border border-orange-500/30 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 backdrop-blur-sm text-white"
                          >
                            <option value="">Select {key.replace('_', ' ')}</option>
                            {key === 'type' ? (
                              <>
                                <option value="conference">Conference</option>
                                <option value="workshop">Workshop</option>
                                <option value="seminar">Seminar</option>
                                <option value="webinar">Webinar</option>
                                <option value="training">Training</option>
                                <option value="other">Other</option>
                              </>
                            ) : (
                              <>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past</option>
                                <option value="planning">Planning</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on-hold">On Hold</option>
                              </>
                            )}
                          </select>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-orange-400 capitalize">
                            {key.replace('_', ' ')}
                          </label>
                          <input
                            type={key === 'date' ? 'date' : key === 'time' ? 'time' : 'text'}
                            placeholder={`Enter ${key.replace('_', ' ')}`}
                            value={value as string}
                            onChange={(e) => handleChange(key as keyof FormProject, e.target.value)}
                            className="w-full p-4 bg-black/30 border border-orange-500/30 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 backdrop-blur-sm text-white placeholder-gray-400"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex gap-4 justify-end mt-8">
                  <motion.button
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-800 text-gray-300 rounded-xl font-semibold hover:bg-gray-700 border border-gray-600 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={submitForm}
                    disabled={loading}
                    className="relative px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {editingId ? 'Update Event' : 'Create Event'}
                      </div>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events Grid */}
        <motion.div
          className={`grid ${projects.length <= 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}
          layout
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-500/20 overflow-hidden hover:shadow-2xl hover:border-orange-400/40 transition-all duration-500"
                whileHover={{ y: -8 }}
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={project.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </motion.div>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getTypeIcon(project.type)}</span>
                      <span className="text-blue-300 text-sm font-medium capitalize">{project.type}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        <span>{project.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-300" />
                        <span>{project.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <span className="truncate">{project.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-400" />
                        <span>{project.attendees} attendees</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.highlights.slice(0, 3).map((highlight, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-orange-600/30 text-orange-300 text-xs rounded-full border border-orange-500/30"
                            >
                              {highlight}
                            </motion.span>
                          ))}
                          {project.highlights.length > 3 && (
                            <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full border border-gray-600">
                              +{project.highlights.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <motion.button
                        onClick={() => startEdit(project)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-500/10 text-orange-300 rounded-xl font-semibold border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-400/50 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => deleteProject(project.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-300 rounded-xl font-semibold border border-red-500/30 hover:bg-red-500/20 hover:border-red-400/50 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {projects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-white mb-2">No events yet</h3>
              <p className="text-gray-400">Create your first event to get started!</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;