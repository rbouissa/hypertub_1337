import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, Globe, TrendingUp, Microscope, BookOpen } from 'lucide-react';
import { ThreeScene } from '../components/ThreeScene';
// import journey_img from '../assets/journey.jpeg';
import reda from '../assets/reda_labo.jpeg';
import group from '../assets/group.jpeg';
import wahid_background from '../assets/wahid_bakcground.jpeg';
import youssef from '../assets/arc_air_peple/backround_youssed.jpeg';
import { AnimatedNumber } from './AnimatedNumber'; 

export const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background slideshow images
  const backgroundImages = [
    youssef,
    wahid_background,
    group,
    // 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg',
    // 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
    reda,  
  ];

  // Auto-change background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const stats = [
    { icon: Users, value: 20, label: 'Researchers' },
    // { icon: Microscope, value: 25, label: 'Active Projects' },
    { icon: Globe, value: 20, label: 'Partners' },
    { icon: Award, value: 40, label: 'Publications' },
  ];

  const highlights = [
    {
      title: 'Air Quality Monitoring',
      description: 'Advanced monitoring systems for real-time air quality assessment across Africa',
      date: 'Ongoing',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg'
    },
    {
      title: 'Climate Research',
      description: 'Comprehensive climate studies addressing African environmental challenges',
      date: 'Year-round',
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg'
    },
    {
      title: 'Capacity Building',
      description: 'Training programs for the next generation of African environmental scientists',
      date: 'Continuous',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg'
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section with Dynamic Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Dynamic Background Images */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Color overlay */}
          {/* Color overlay with white and orange gradient */}
          {/* <div className="absolute inset-0 bg-orange-400/30 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent mix-blend-screen"></div> */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-accent/70 to-text-primary/80"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Three.js Scene Overlay */}
        <div className="absolute inset-0 opacity-20">
          <ThreeScene theme="air" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
               className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-md rounded-full px-4 py-2 mb-6 shadow-md"

              >
                <Microscope className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">African Research Centre on Air Quality and Climate</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              >
                ARC Air
                <span className="block text-primary">Research Centre</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
              >
                Advancing atmospheric sciences and environmental research to address 
                Africa's air quality and climate challenges through innovation and collaboration.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link
                  to="/research"
                  className="group bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2 animate-pulse-glow"
                >
                  <span>Explore Research</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/about"
                  className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div 
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1 }}
  className="grid grid-cols-2 md:grid-cols-4 gap-6"
>
  {stats.map((stat, index) => (
    <div key={index} className="text-center">
      <div className="flex items-center justify-center mb-2">
        <stat.icon className="h-6 w-6 text-primary mr-2" />
      </div>
      <div className="text-2xl font-bold text-white">
        <AnimatedNumber value={stat.value} />+
      </div>
      <div className="text-sm text-gray-300">{stat.label}</div>
    </div>
  ))}
</motion.div>
            </motion.div>

            {/* Right Column - Enhanced Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Microscope className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Air Quality Monitoring</div>
                        <div className="text-sm text-gray-300">Real-time environmental data</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Climate Research</div>
                        <div className="text-sm text-gray-300">Advanced climate modeling</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Global Impact</div>
                        <div className="text-sm text-gray-300">International collaborations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>

        {/* Slideshow Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-24 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text mb-6">
              Research Focus Areas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our multidisciplinary approach addresses critical environmental challenges 
              through cutting-edge research and innovative solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-white dark:bg-dark-surface rounded-2xl shadow-lg border dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                      {highlight.date}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-3 group-hover:text-primary transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              to="/research"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <span>View All Research</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-gray-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-dark-text mb-6 tracking-tight leading-snug">
              Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-medium tracking-wide">
                At <span className="text-primary font-semibold">ARC_AIR</span>, we are committed to advancing scientific discovery and pioneering innovative solutions to improve air quality and combat climate change across Africa and beyond.  
              <br className="hidden sm:block" />
                Through cutting-edge research, regional capacity-building, and global collaboration, we empower communities and decision-makers with high-quality data and tailored technological tools—driving real-world impact through evidence-based policies and interdisciplinary science.
              </p>
              {/* <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Through innovative research, capacity building, and international collaboration, 
                we strive to provide scientific evidence for policy-making and contribute to 
                sustainable development across the African continent.
              </p> */}
              {/* <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span className="text-gray-600 dark:text-gray-300">Atmospheric sciences research</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span className="text-gray-600 dark:text-gray-300">Environmental monitoring systems</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span className="text-gray-600 dark:text-gray-300">Capacity building programs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                  <span className="text-gray-600 dark:text-gray-300">International partnerships</span>
                </div>
              </div> */}
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={group}
                alt="Research facility"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">State-of-the-art Facilities</h3>
                <p className="text-white/90">Advanced laboratories and monitoring equipment</p>
              </div>
            </motion.div> */}
          <motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative w-full max-w-5xl mx-auto"
>
  {/* Background Image */}
  <img
    src={group}
    alt="Research facility"
    className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
  />

  {/* Dim Overlay */}
  <div className="absolute inset-0 bg-black/40 rounded-2xl z-0 shadow-lg" />
 <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent rounded-2xl"></div>
  {/* Badge (top-left) */}
  {/* <div className="absolute top-6 left-6 w-24 h-24 bg-[#0097a7] rounded-full flex flex-col items-center justify-center text-white z-20 shadow-lg">
    {/* Icon */}
    {/* <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg> */}
    {/* Text */}
    {/* <span className="text-sm font-bold text-center leading-tight">
      200+<br />projets
    </span> */}
  {/* </div> */} 

  {/* Foreground Image Overlap (bottom-left) */}
  <div className="absolute -bottom-12 left-6 w-[350px] border-8 border-white rounded-2xl shadow-xl z-30 bg-white shadow-lg">
    <img
      src={youssef}
      alt="Foreground detail"
      className="w-full h-auto object-cover rounded-xl shadow-lg"
    />
  </div>
  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent rounded-2xl"></div>
</motion.div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Research Community
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of groundbreaking research that's shaping the future of 
              environmental science and climate action in Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/recruitment"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Opportunities
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-white/10"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};