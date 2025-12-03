import React from 'react';
import { ArrowRight, BookOpen, Microscope, Calculator, Palette, Briefcase, Stethoscope } from 'lucide-react';

export const Programs: React.FC = () => {
  const programs = [
    {
      icon: Microscope,
      title: 'Science & Technology',
      description: 'Cutting-edge research in biology, chemistry, physics, and computer science.',
      courses: ['Computer Science', 'Biotechnology', 'Physics', 'Data Science'],
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg'
    },
    {
      icon: Briefcase,
      title: 'Business & Management',
      description: 'Develop leadership skills and business acumen for the global marketplace.',
      courses: ['MBA', 'Finance', 'Marketing', 'Entrepreneurship'],
      color: 'from-university-gold to-yellow-500',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      icon: Palette,
      title: 'Arts & Humanities',
      description: 'Explore creativity, culture, and human expression through diverse disciplines.',
      courses: ['Fine Arts', 'Literature', 'Philosophy', 'Music'],
      color: 'from-purple-500 to-purple-600',
      image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg'
    },
    {
      icon: Calculator,
      title: 'Engineering',
      description: 'Innovative engineering solutions for tomorrow\'s technological challenges.',
      courses: ['Mechanical', 'Electrical', 'Civil', 'Software'],
      color: 'from-green-500 to-green-600',
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg'
    },
    {
      icon: Stethoscope,
      title: 'Health Sciences',
      description: 'Comprehensive healthcare education and medical research programs.',
      courses: ['Medicine', 'Nursing', 'Public Health', 'Pharmacy'],
      color: 'from-red-500 to-red-600',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg'
    },
    {
      icon: BookOpen,
      title: 'Education',
      description: 'Prepare the next generation of educators and educational leaders.',
      courses: ['Teaching', 'Educational Psychology', 'Curriculum Design', 'Administration'],
      color: 'from-indigo-500 to-indigo-600',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg'
    }
  ];

  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Academic Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover world-class programs designed to prepare you for success in your chosen field. 
            Our comprehensive curriculum combines theoretical knowledge with practical experience.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-80`}></div>
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <program.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-university-blue transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {program.description}
                </p>

                {/* Course List */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {program.courses.map((course, courseIndex) => (
                      <span
                        key={courseIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className="group/btn w-full flex items-center justify-center space-x-2 bg-gray-50 hover:bg-university-blue text-gray-700 hover:text-white py-3 px-4 rounded-lg font-medium transition-all duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-university-blue to-university-light-blue rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Can't Find Your Program?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            We offer over 200 programs across all disciplines. Explore our complete catalog 
            or speak with an academic advisor to find the perfect fit for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-university-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View All Programs
            </button>
            <button className="border-2 border-white/30 hover:border-white/60 px-8 py-3 rounded-lg font-semibold transition-colors hover:bg-white/10">
              Contact Advisor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};