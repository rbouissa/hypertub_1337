import React from 'react';
import { MapPin, Wifi, Coffee, Dumbbell, Book, Home } from 'lucide-react';

export const Campus: React.FC = () => {
  const facilities = [
    {
      icon: Book,
      title: 'Central Library',
      description: 'State-of-the-art research facility with over 2 million books and digital resources.',
      image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg'
    },
    {
      icon: Dumbbell,
      title: 'Recreation Center',
      description: 'Modern fitness facilities, swimming pools, and indoor courts for all sports.',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg'
    },
    {
      icon: Home,
      title: 'Student Housing',
      description: 'Comfortable and safe residence halls with modern amenities and community spaces.',
      image: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg'
    },
    {
      icon: Coffee,
      title: 'Student Union',
      description: 'The heart of campus social life with dining, entertainment, and student services.',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg'
    }
  ];

  const campusStats = [
    { number: '450', label: 'Acres', icon: MapPin },
    { number: '85', label: 'Buildings', icon: Home },
    { number: '100%', label: 'WiFi Coverage', icon: Wifi },
    { number: '24/7', label: 'Security', icon: Book },
  ];

  return (
    <section id="campus" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Campus Life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience a vibrant campus community with world-class facilities, 
            diverse activities, and countless opportunities for personal growth.
          </p>
        </div>

        {/* Campus Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {campusStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg border hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-university-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-university-blue mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Campus Showcase */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
              alt="Campus Overview"
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Beautiful Historic Campus</h3>
              <p className="text-lg opacity-90 max-w-2xl">
                Our 450-acre campus blends historic architecture with modern facilities, 
                creating an inspiring environment for learning and personal growth.
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <facility.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-university-blue transition-colors">
                  {facility.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Student Life Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              More Than Just Education
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Campus life at Prestige University extends far beyond the classroom. 
              Join over 400 student organizations, participate in intramural sports, 
              attend cultural events, and build lifelong friendships.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-university-blue rounded-full"></div>
                <span className="text-gray-700">400+ Student Organizations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-university-gold rounded-full"></div>
                <span className="text-gray-700">25 Intercollegiate Sports Teams</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-university-light-blue rounded-full"></div>
                <span className="text-gray-700">Year-round Cultural Events</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Community Service Programs</span>
              </div>
            </div>

            <button className="bg-university-blue hover:bg-university-dark-blue text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Explore Student Life
            </button>
          </div>

          {/* Right Column - Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg"
                alt="Students studying"
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg"
                alt="Campus events"
                className="w-full h-32 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img
                src="https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg"
                alt="Student activities"
                className="w-full h-32 object-cover rounded-xl shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg"
                alt="Campus life"
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};