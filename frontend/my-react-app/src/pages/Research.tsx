import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Users, MapPin, ExternalLink, Wind, Thermometer, Droplets, Zap } from 'lucide-react';
import { ThreeScene } from '../components/ThreeScene';

export const Research: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects', icon: Wind },
    { id: 'air-quality', name: 'Air Quality', icon: Wind },
    { id: 'climate', name: 'Climate Change', icon: Thermometer },
    { id: 'water', name: 'Water Resources', icon: Droplets },
    { id: 'energy', name: 'Renewable Energy', icon: Zap },
  ];

  const projects = [
    {
      id: 1,
      title: 'COMPOLA - Conference on Pollution and Air Quality',
      category: 'air-quality',
      status: 'ongoing',
      duration: '2023-2025',
      lead: 'Dr. Amina Hassan',
      location: 'Morocco, Ghana, Kenya',
      description: 'International conference series bringing together researchers, policymakers, and industry experts to address air pollution challenges across Africa.',
      objectives: [
        'Foster international collaboration in air quality research',
        'Share latest research findings and methodologies',
        'Develop policy recommendations for African governments',
        'Build capacity among young researchers'
      ],
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
      tags: ['Conference', 'Policy', 'Collaboration', 'Capacity Building']
    },
    {
      id: 2,
      title: 'POPNet - Persistent Organic Pollutants Network',
      category: 'air-quality',
      status: 'ongoing',
      duration: '2022-2026',
      lead: 'Prof. Kwame Asante',
      location: 'West Africa',
      description: 'Comprehensive monitoring network for persistent organic pollutants across West African countries, focusing on agricultural and industrial sources.',
      objectives: [
        'Establish monitoring stations across West Africa',
        'Develop standardized measurement protocols',
        'Train local technicians and researchers',
        'Create regional pollution database'
      ],
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg',
      tags: ['Monitoring', 'Network', 'Pollutants', 'Database']
    },
    {
      id: 3,
      title: 'AQC - Air Quality and Climate Interactions',
      category: 'climate',
      status: 'ongoing',
      duration: '2023-2027',
      lead: 'Dr. Sarah Okonkwo',
      location: 'North Africa',
      description: 'Investigating the complex interactions between air quality and climate change in North African urban environments.',
      objectives: [
        'Study aerosol-climate interactions',
        'Develop integrated assessment models',
        'Analyze urban heat island effects',
        'Assess health co-benefits of climate policies'
      ],
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
      tags: ['Climate', 'Urban', 'Modeling', 'Health']
    },
    {
      id: 4,
      title: 'SATVA - Satellite-based Air Quality Validation',
      category: 'air-quality',
      status: 'planning',
      duration: '2024-2028',
      lead: 'Dr. Mohamed El-Fassi',
      location: 'Pan-African',
      description: 'Validation of satellite-based air quality measurements using ground-based monitoring networks across Africa.',
      objectives: [
        'Validate satellite air quality products',
        'Develop correction algorithms for African conditions',
        'Create high-resolution air quality maps',
        'Support policy decision-making'
      ],
      image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
      tags: ['Satellite', 'Validation', 'Remote Sensing', 'Mapping']
    },
    {
      id: 5,
      title: 'Climate Resilience in Sahel Communities',
      category: 'climate',
      status: 'ongoing',
      duration: '2023-2026',
      lead: 'Dr. Grace Mwangi',
      location: 'Sahel Region',
      description: 'Building climate resilience in Sahel communities through integrated adaptation strategies and early warning systems.',
      objectives: [
        'Develop community-based adaptation strategies',
        'Implement early warning systems',
        'Build local capacity for climate monitoring',
        'Support sustainable livelihood practices'
      ],
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg',
      tags: ['Adaptation', 'Community', 'Early Warning', 'Sustainability']
    },
    {
      id: 6,
      title: 'Renewable Energy Integration Study',
      category: 'energy',
      status: 'completed',
      duration: '2021-2023',
      lead: 'Dr. Ahmed Benali',
      location: 'Morocco',
      description: 'Assessment of renewable energy integration potential and its impact on air quality in Morocco.',
      objectives: [
        'Assess renewable energy potential',
        'Model air quality improvements',
        'Analyze economic benefits',
        'Develop integration roadmap'
      ],
      image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg',
      tags: ['Renewable Energy', 'Integration', 'Economic Analysis', 'Roadmap']
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'planning': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30">
          <div className="absolute inset-0 opacity-20">
            <ThreeScene theme="research" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary dark:text-dark-text mb-6">
              Research Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover our cutting-edge research initiatives addressing Africa's most 
              pressing environmental challenges through innovative science and collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {project.lead}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{project.location}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-2">
                      Key Objectives:
                    </h4>
                    <ul className="space-y-1">
                      {project.objectives.slice(0, 2).map((objective, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* <button className="w-full flex items-center justify-center space-x-2 bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-colors">
                    <span>View Details</span>
                    <ExternalLink className="h-4 w-4" />
                  </button> */}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No projects found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Research Impact */}
      <section className="py-24 bg-gray-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
              Research Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our research contributes to scientific knowledge, policy development, 
              and sustainable solutions for Africa's environmental challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Scientific Publications',
                value: '150+',
                description: 'Peer-reviewed articles in top-tier journals',
                icon: Wind
              },
              {
                title: 'Policy Recommendations',
                value: '25+',
                description: 'Evidence-based policy briefs for governments',
                icon: Thermometer
              },
              {
                title: 'Capacity Building',
                value: '500+',
                description: 'Researchers and technicians trained',
                icon: Users
              }
            ].map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-dark-bg rounded-xl p-8 shadow-lg border dark:border-gray-700 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <impact.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{impact.value}</div>
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-2">
                  {impact.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{impact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};