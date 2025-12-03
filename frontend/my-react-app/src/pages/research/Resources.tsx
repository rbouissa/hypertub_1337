import React from 'react';
import { motion } from 'framer-motion';
import { Database, Download, ExternalLink, Search, Filter, FileText, Globe, BarChart3 } from 'lucide-react';

export const Resources: React.FC = () => {
  const resourceCategories = [
    {
      title: 'Datasets',
      icon: Database,
      description: 'Access comprehensive environmental datasets from across Africa',
      count: '150+ datasets',
      color: 'bg-blue-500'
    },
    {
      title: 'Software Tools',
      icon: BarChart3,
      description: 'Open-source tools for air quality analysis and modeling',
      count: '25+ tools',
      color: 'bg-green-500'
    },
    {
      title: 'Documentation',
      icon: FileText,
      description: 'Technical documentation, protocols, and guidelines',
      count: '100+ documents',
      color: 'bg-purple-500'
    },
    {
      title: 'Web Services',
      icon: Globe,
      description: 'APIs and web services for real-time data access',
      count: '15+ services',
      color: 'bg-primary'
    }
  ];

  const featuredResources = [
    {
      title: 'African Air Quality Database',
      type: 'Dataset',
      description: 'Comprehensive air quality measurements from monitoring stations across 15 African countries.',
      size: '2.5 GB',
      format: 'NetCDF, CSV',
      lastUpdated: '2024-01-15',
      downloads: '1,250',
      tags: ['Air Quality', 'PM2.5', 'NO2', 'O3']
    },
    {
      title: 'Climate Data Portal',
      type: 'Web Service',
      description: 'Real-time access to meteorological and climate data through RESTful API.',
      size: 'API',
      format: 'JSON, XML',
      lastUpdated: '2024-01-20',
      downloads: '5,000+',
      tags: ['Climate', 'Temperature', 'Precipitation', 'API']
    },
    {
      title: 'Atmospheric Chemistry Toolkit',
      type: 'Software',
      description: 'Python package for atmospheric chemistry analysis and visualization.',
      size: '45 MB',
      format: 'Python Package',
      lastUpdated: '2024-01-10',
      downloads: '850',
      tags: ['Python', 'Chemistry', 'Analysis', 'Visualization']
    },
    {
      title: 'Satellite Data Processing Guide',
      type: 'Documentation',
      description: 'Complete guide for processing satellite-based air quality data for African conditions.',
      size: '15 MB',
      format: 'PDF',
      lastUpdated: '2023-12-20',
      downloads: '2,100',
      tags: ['Satellite', 'Processing', 'Tutorial', 'Guide']
    },
    {
      title: 'Emission Inventory Africa',
      type: 'Dataset',
      description: 'Comprehensive emission inventory for major African cities and industrial areas.',
      size: '1.8 GB',
      format: 'NetCDF, GeoTIFF',
      lastUpdated: '2024-01-05',
      downloads: '680',
      tags: ['Emissions', 'Inventory', 'Cities', 'Industry']
    },
    {
      title: 'Air Quality Modeling Framework',
      type: 'Software',
      description: 'Integrated modeling framework for air quality prediction and analysis.',
      size: '120 MB',
      format: 'Docker Container',
      lastUpdated: '2024-01-12',
      downloads: '420',
      tags: ['Modeling', 'Prediction', 'Docker', 'Framework']
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Dataset': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Software': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Documentation': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Web Service': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

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
              Research Resources
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Access our comprehensive collection of datasets, software tools, documentation, 
              and web services for environmental research and air quality analysis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg border dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                  {category.description}
                </p>
                <div className="text-primary font-semibold">{category.count}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text">
                <option>All Types</option>
                <option>Datasets</option>
                <option>Software</option>
                <option>Documentation</option>
                <option>Web Services</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text mb-4">
              Featured Resources
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Most popular and recently updated resources from our collection
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-surface rounded-xl shadow-lg border dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-text-primary dark:text-dark-text">
                        {resource.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {resource.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Size:</span>
                    <span className="ml-2 text-text-primary dark:text-dark-text font-medium">{resource.size}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Format:</span>
                    <span className="ml-2 text-text-primary dark:text-dark-text font-medium">{resource.format}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Updated:</span>
                    <span className="ml-2 text-text-primary dark:text-dark-text font-medium">{resource.lastUpdated}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Downloads:</span>
                    <span className="ml-2 text-text-primary dark:text-dark-text font-medium">{resource.downloads}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-lg transition-colors">
                    <ExternalLink className="h-4 w-4" />
                    <span>Details</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Information */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Access to Restricted Resources?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Some datasets and tools require registration or collaboration agreements. 
              Contact us to discuss access to specialized resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Request Access
              </button>
              <button className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-white/10">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};