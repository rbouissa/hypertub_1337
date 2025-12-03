import React from 'react';
import { ArrowRight, Star, Users, Award } from 'lucide-react';
import { ThreeScene } from './ThreeScene';

export const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with Three.js Scene */}
      <div className="absolute inset-0 bg-gradient-to-br from-university-blue via-university-dark-blue to-indigo-900">
        <div className="absolute inset-0 opacity-30">
          <ThreeScene />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-university-gold" />
              <span className="text-sm font-medium">Ranked #1 University</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
              Shape Your
              <span className="block text-university-gold">Future</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed animate-slide-up">
              Join a community of innovators, scholars, and leaders. Experience world-class education with cutting-edge research opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => scrollToSection('admissions')}
                className="group bg-university-gold hover:bg-yellow-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => scrollToSection('about')}
                className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-university-gold mr-2" />
                </div>
                <div className="text-2xl font-bold">25,000+</div>
                <div className="text-sm text-gray-300">Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-university-gold mr-2" />
                </div>
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-gray-300">Programs</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-university-gold mr-2" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-gray-300">Job Placement</div>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Visual */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-university-gold/20 to-university-light-blue/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 bg-university-gold rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Excellence in Education</div>
                      <div className="text-sm text-gray-300">World-class faculty and facilities</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 bg-university-light-blue rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Global Community</div>
                      <div className="text-sm text-gray-300">Students from 100+ countries</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Research Innovation</div>
                      <div className="text-sm text-gray-300">Leading breakthrough discoveries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-university-gold/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-32 h-32 bg-university-light-blue/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute top-1/2 right-1/4 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};