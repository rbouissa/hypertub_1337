import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Target, Eye, Globe, Users, Award } from 'lucide-react';
import journey_img from '../assets/journey.jpeg';
import um6p from '../assets/um6p_de_benguerir.jpg';
import wahid_background from '../assets/wahid_bakcground.jpeg';
import abdrehman from  '../assets/abderhman_lab.jpeg';
import satilit from '../assets/satellete.jpeg';

import labo from '../assets/lab.jpeg';
import { FileCheck2, Lightbulb, GraduationCap, Scale, Leaf } from 'lucide-react';
export const About: React.FC = () => {
 

const values = [
  {
    icon: FileCheck2,
    title: 'Scientific Integrity',
    description: 'We are committed to producing reliable, transparent, and reproducible research.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We foster interdisciplinary and international partnerships to amplify our impact.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace new technologies and approaches to tackle emerging environmental challenges.'
  },
  {
    icon: GraduationCap,
    title: 'Capacity Building',
    description: 'We invest in training and empowering the next generation of African researchers and environmental leaders.'
  },
  {
    icon: Scale,
    title: 'Equity and Inclusion',
    description: 'We value diversity and strive to ensu\re inclusive participation in all our activities.'
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Our work promotes long-term solutions that protect both people and the environment.'
  }
];


const achievements = [
    { number: '50+', label: 'Research Publications', icon: Award },
    { number: '25+', label: 'Active Projects', icon: Target },
    { number: '15+', label: 'Partner Countries', icon: Globe },
    { number: '100+', label: 'Researchers Trained', icon: Users },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Wind className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary dark:text-dark-text">
                About ARC Air
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The African Research Centre on Air Quality and Climate is a leading African research center focused on improving air quality and addressing climate challenges. Through innovation, collaboration, and data-driven research, we empower communities and inform policy for a healthier, more sustainable future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background dark:bg-dark-bg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-lg border dark:border-gray-700"
            >
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                To generate high-quality scientific knowledge that addresses air pollution and climate change across Africa. Through data-driven research, innovation, and cross-sector collaboration, we aim to develop sustainable solutions tailored to regional contexts—empowering communities, informing policy, and building climate-resilient systems for a healthier future.
              </p>
              {/* <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Advance data-driven research to tackle air pollution and climate change
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Develop sustainable solutions adapted to local and regional needs
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Empower communities through education and awarenes
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Support policy development with cutting-edge scientific insight
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Strengthen environmental resilience across the African continent
                </li>
              </ul> */}
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-white mr-3" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                To become the leading center of excellence in air quality and climate research across Africa—empowering the continent with the knowledge, tools, and partnerships needed to ensure a healthier, more sustainable, and climate-resilient future.
                and impact on environmental sustainability.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-white/90 font-medium">
                  "Empowering Africa with the knowledge and partnerships for a climate-resilient future."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide our research, collaboration, and commitment 
              to environmental sustainability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {values.map((value, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <value.icon className="h-8 w-8 text-primary" />
      </div>

      <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-3">
        {value.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {value.description}
      </p>
    </motion.div>
  ))}
</div>

        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Measuring our contribution to environmental science and sustainable development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
     <section className="py-24 bg-gray-50 dark:bg-dark-surface">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Left Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text mb-6">
          Our Journey
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Established as part of Mohammed VI Polytechnic University's commitment 
          to addressing Africa's environmental challenges, ARC Air has grown from 
          a small research initiative to a leading centre of excellence.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          Our multidisciplinary approach combines cutting-edge technology with 
          local knowledge, creating solutions that are both scientifically sound 
          and culturally appropriate.
        </p>
        <div className="space-y-4">
          {[
            "Founded within UM6P's research ecosystem",
            "Established international partnerships",
            "Launched major research initiatives",
            "Expanded across African continent"
          ].map((text, i) => (
            <div key={i} className="flex items-center">
              <div className="w-4 h-4 bg-primary rounded-full mr-4"></div>
              <span className="text-gray-600 dark:text-gray-300">{text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Image Section */}
     <motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative w-full"
>
  {/* Background Image */}
  <img
    src={labo}
    alt="Research facility"
    className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent rounded-2xl z-0" />

  {/* Bottom Text Overlay */}
  {/* <div className="absolute bottom-6 left-6 text-white z-10">
    <h3 className="text-2xl font-bold mb-2">State-of-the-art Facilities</h3>
    <p className="text-white/90">Advanced laboratories and monitoring equipment</p>
  </div> */}

  {/* Foreground Image in Bottom-Right */}
  <div className="absolute -top-10 left-0 w-[300px] border-4 border-white rounded-xl z-60 shadow-xl bg-white">
    <img
      src={abdrehman} // replace with another related image if needed
      alt="Lab detail"
      className="w-full h-auto object-cover rounded-lg"
    />
  </div>
</motion.div>

    </div>
  </div>
</section>

    </div>
  );
};