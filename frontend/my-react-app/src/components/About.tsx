import React from 'react';
import { BookOpen, Globe, Lightbulb, Trophy } from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Over 200 undergraduate and graduate programs across diverse fields of study.',
      stats: '200+ Programs'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'International partnerships with leading universities and research institutions worldwide.',
      stats: '50+ Countries'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Cutting-edge research facilities and entrepreneurship programs for future innovators.',
      stats: '$100M+ Research'
    },
    {
      icon: Trophy,
      title: 'Distinguished Alumni',
      description: 'Our graduates lead in technology, business, arts, and public service globally.',
      stats: '500K+ Alumni'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Prestige University
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded in 1885, Prestige University has been at the forefront of higher education, 
            research, and innovation for over a century. We cultivate leaders who shape the future.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"
                alt="University Campus"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-university-blue/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Beautiful Campus</h3>
                <p className="text-gray-200">Historic architecture meets modern facilities</p>
              </div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -top-8 -right-8 bg-white rounded-xl shadow-xl p-6 border">
              <div className="text-center">
                <div className="text-3xl font-bold text-university-blue mb-1">137</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Empowering Minds, Shaping Futures
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At Prestige University, we believe in the transformative power of education. 
                Our commitment to academic excellence, groundbreaking research, and student 
                success has established us as a leader in higher education.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With state-of-the-art facilities, world-renowned faculty, and a vibrant 
                campus community, we provide an environment where students can explore 
                their passions, challenge themselves, and prepare for meaningful careers.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border">
                <div className="text-3xl font-bold text-university-blue mb-2">98%</div>
                <div className="text-gray-600">Graduation Rate</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border">
                <div className="text-3xl font-bold text-university-gold mb-2">15:1</div>
                <div className="text-gray-600">Student-Faculty Ratio</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-university-blue to-university-light-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-university-blue mb-2">
                  {feature.stats}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Vision Statement */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-university-blue to-university-light-blue rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              "To be the world's leading university in creating knowledge, educating students, 
              and serving society through innovation, excellence, and impact."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};