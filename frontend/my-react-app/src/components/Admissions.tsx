import React from 'react';
import { Calendar, FileText, DollarSign, Award, CheckCircle, ArrowRight } from 'lucide-react';

export const Admissions: React.FC = () => {
  const applicationSteps = [
    {
      icon: FileText,
      title: 'Submit Application',
      description: 'Complete your online application with personal information and academic history.',
      deadline: 'Rolling Admissions'
    },
    {
      icon: Award,
      title: 'Academic Records',
      description: 'Submit official transcripts, test scores, and letters of recommendation.',
      deadline: 'Within 30 days'
    },
    {
      icon: DollarSign,
      title: 'Financial Aid',
      description: 'Apply for scholarships, grants, and financial assistance programs.',
      deadline: 'Priority: March 1'
    },
    {
      icon: CheckCircle,
      title: 'Admission Decision',
      description: 'Receive your admission decision and enrollment information.',
      deadline: '2-4 weeks'
    }
  ];

  const requirements = [
    'High School Diploma or Equivalent',
    'Minimum 3.0 GPA',
    'SAT/ACT Scores',
    'Two Letters of Recommendation',
    'Personal Statement Essay',
    'Extracurricular Activities Record'
  ];

  const scholarships = [
    {
      name: 'Presidential Scholarship',
      amount: 'Full Tuition',
      criteria: 'Academic excellence, leadership, and community service',
      color: 'bg-university-gold'
    },
    {
      name: 'Merit Scholarship',
      amount: 'Up to $15,000',
      criteria: 'Outstanding academic achievement and potential',
      color: 'bg-university-blue'
    },
    {
      name: 'Need-Based Aid',
      amount: 'Varies',
      criteria: 'Demonstrated financial need and academic standing',
      color: 'bg-university-light-blue'
    }
  ];

  return (
    <section id="admissions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Admissions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Begin your journey at Prestige University. We're committed to making 
            higher education accessible through comprehensive support and financial aid.
          </p>
        </div>

        {/* Key Information Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-university-blue to-university-dark-blue text-white rounded-xl p-8 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Application Deadline</h3>
            <p className="text-lg opacity-90">Rolling Admissions</p>
            <p className="text-sm opacity-75 mt-2">Apply anytime throughout the year</p>
          </div>
          
          <div className="bg-gradient-to-br from-university-gold to-yellow-500 text-white rounded-xl p-8 text-center">
            <DollarSign className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Tuition & Fees</h3>
            <p className="text-lg opacity-90">$45,000/year</p>
            <p className="text-sm opacity-75 mt-2">Financial aid available</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-8 text-center">
            <Award className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Acceptance Rate</h3>
            <p className="text-lg opacity-90">65%</p>
            <p className="text-sm opacity-75 mt-2">Selective but accessible</p>
          </div>
        </div>

        {/* Application Process */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Application Process
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-university-blue rounded-lg flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-xs font-medium text-university-blue">
                      {step.deadline}
                    </span>
                  </div>
                </div>
                
                {/* Connection Line */}
                {index < applicationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Requirements and Scholarships */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Requirements */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Admission Requirements
            </h3>
            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
            <button className="mt-8 w-full bg-university-blue hover:bg-university-dark-blue text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
              <span>Download Requirements Guide</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Scholarships */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Scholarships & Financial Aid
            </h3>
            <div className="space-y-4">
              {scholarships.map((scholarship, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border">
                  <div className="flex items-start space-x-4">
                    <div className={`w-3 h-3 ${scholarship.color} rounded-full mt-2 flex-shrink-0`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">{scholarship.name}</h4>
                        <span className="text-lg font-bold text-university-blue">
                          {scholarship.amount}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {scholarship.criteria}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-university-light-blue/10 rounded-lg p-4">
              <p className="text-sm text-university-blue font-medium">
                💡 Over 85% of our students receive some form of financial assistance
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-university-blue to-university-light-blue rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Take the first step toward your future. Our admissions team is here to help 
              you through every step of the application process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-university-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <span>Apply Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="border-2 border-white/30 hover:border-white/60 px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-white/10">
                Schedule Campus Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};