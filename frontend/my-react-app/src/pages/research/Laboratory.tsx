import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Thermometer, Wind, Zap, Users, Award, Calendar, MapPin } from 'lucide-react';

export const Laboratory: React.FC = () => {
  const facilities = [
    {
      name: 'Atmospheric Chemistry Laboratory',
      icon: Microscope,
      description: 'State-of-the-art facility for analyzing atmospheric trace gases and aerosols.',
      equipment: [
        'Gas Chromatography-Mass Spectrometry (GC-MS)',
        'High Performance Liquid Chromatography (HPLC)',
        'Ion Chromatography System',
        'Particle Size Analyzer'
      ],
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
      area: '200 m²',
      established: '2020'
    },
    {
      name: 'Climate Monitoring Station',
      icon: Thermometer,
      description: 'Comprehensive meteorological and climate monitoring facility.',
      equipment: [
        'Automatic Weather Station',
        'Solar Radiation Sensors',
        'Wind Speed and Direction Monitors',
        'Precipitation Gauges'
      ],
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg',
      area: '50 m²',
      established: '2019'
    },
    {
      name: 'Air Quality Monitoring Lab',
      icon: Wind,
      description: 'Real-time monitoring and analysis of air pollutants and particulate matter.',
      equipment: [
        'PM2.5/PM10 Monitors',
        'NO2/NOx Analyzers',
        'Ozone Monitors',
        'SO2 Analyzers'
      ],
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
      area: '150 m²',
      established: '2021'
    },
    {
      name: 'Data Processing Center',
      icon: Zap,
      description: 'High-performance computing facility for climate modeling and data analysis.',
      equipment: [
        'High-Performance Computing Cluster',
        'Data Storage Systems (100TB)',
        'Satellite Data Processing Workstations',
        'Visualization Systems'
      ],
      image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
      area: '100 m²',
      established: '2020'
    }
  ];

  const capabilities = [
    {
      title: 'Chemical Analysis',
      description: 'Advanced analytical techniques for atmospheric chemistry research',
      techniques: [
        'Trace gas analysis (ppb-ppt levels)',
        'Aerosol composition analysis',
        'Isotope ratio measurements',
        'Organic compound identification'
      ]
    },
    {
      title: 'Environmental Monitoring',
      description: 'Comprehensive environmental parameter monitoring and assessment',
      techniques: [
        'Real-time air quality monitoring',
        'Meteorological data collection',
        'Emission source characterization',
        'Long-term trend analysis'
      ]
    },
    {
      title: 'Data Analysis & Modeling',
      description: 'Advanced computational methods for environmental data analysis',
      techniques: [
        'Statistical data analysis',
        'Machine learning applications',
        'Atmospheric modeling',
        'Satellite data processing'
      ]
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous quality control and assurance protocols',
      techniques: [
        'Instrument calibration',
        'Inter-laboratory comparisons',
        'Data validation procedures',
        'Uncertainty analysis'
      ]
    }
  ];

  const services = [
    {
      title: 'Sample Analysis',
      description: 'Professional analysis services for air, water, and soil samples',
      turnaround: '5-10 days',
      price: 'Contact for quote'
    },
    {
      title: 'Equipment Calibration',
      description: 'Calibration services for environmental monitoring equipment',
      turnaround: '2-3 days',
      price: 'From $200'
    },
    {
      title: 'Training Programs',
      description: 'Hands-on training for laboratory techniques and equipment operation',
      turnaround: '1-5 days',
      price: 'From $500/person'
    },
    {
      title: 'Consultation',
      description: 'Expert consultation on environmental monitoring and analysis',
      turnaround: 'Flexible',
      price: 'From $150/hour'
    }
  ];

  const stats = [
    { icon: Users, number: '25+', label: 'Lab Personnel' },
    { icon: Microscope, number: '50+', label: 'Instruments' },
    { icon: Award, number: '1000+', label: 'Samples/Year' },
    { icon: Calendar, number: '24/7', label: 'Monitoring' },
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
              Laboratory Facilities
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              State-of-the-art laboratory facilities equipped with advanced instrumentation 
              for atmospheric chemistry, air quality monitoring, and environmental research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lab Stats */}
      <section className="py-16 bg-background dark:bg-dark-bg">
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
      </section>

      {/* Laboratory Facilities */}
      <section className="py-24 bg-gray-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
              Our Facilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Modern laboratory facilities designed for cutting-edge environmental research
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-bg rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <facility.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{facility.name}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>{facility.area}</span>
                      <span>Est. {facility.established}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {facility.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-2">
                      Key Equipment:
                    </h4>
                    <ul className="space-y-1">
                      {facility.equipment.map((item, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* <button className="w-full bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-colors">
                    Request Access
                  </button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
              Laboratory Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive analytical and monitoring capabilities for environmental research
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-lg border dark:border-gray-700"
              >
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-4">
                  {capability.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {capability.description}
                </p>
                <ul className="space-y-3">
                  {capability.techniques.map((technique, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{technique}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      {/* <section className="py-24 bg-gray-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
              Laboratory Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional analytical services for research institutions and industry partners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-bg rounded-xl p-6 shadow-lg border dark:border-gray-700 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold text-text-primary dark:text-dark-text mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Turnaround:</span>
                    <span className="ml-2 font-medium text-text-primary dark:text-dark-text">{service.turnaround}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Price:</span>
                    <span className="ml-2 font-medium text-primary">{service.price}</span>
                  </div>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Request Quote
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact */}
      {/* <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Visit Our Laboratory
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Schedule a visit to see our facilities and discuss potential collaborations 
              or service requirements with our technical team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Visit
              </button>
              <button className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-white/10">
                Contact Lab Manager
              </button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};