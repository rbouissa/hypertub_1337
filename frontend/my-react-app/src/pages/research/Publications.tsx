import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ExternalLink, Download, Calendar, Users, Award, BookOpen } from 'lucide-react';

export const Publications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const publicationStats = [
    { icon: BookOpen, number: '150+', label: 'Total Publications' },
    { icon: Award, number: '85%', label: 'Q1 Journals' },
    { icon: Users, number: '200+', label: 'Co-authors' },
    { icon: Calendar, number: '2024', label: 'Latest Year' },
  ];
  

  const publications = [
    {
      title: 'Ground ozone rise during the 2022 Shanghai lockdown caused by the unfavorable emission reduction ratio of nitrogen oxides and volatile organic compounds',
      authors: ['Qian Wang',
    'Yuewu Li.',
    'Fangqian Zhong.',
    'Wanqi Wu',
    'Hongliang Zhang.',
    'Rong Wang.',
    'Yusen Duan',
    'Qingyan Fu',
    'Qing Li',
    'Lin Wang',
    'Shaocai Yu',
    'Abdewahid Mellouki ',
    'David C.Wong',
    'Jianmin Chen'],
      journal: 'Atmospheric Environment',
      year: 2025,
      volume: '340',
      pages: '120851',
      doi: '10.1016/j.atmosenv.2024.120851',
      type: 'Journal Article',
      impact: 5.2,
      citations: 0,
      abstract: 'This study investigates the mechanisms behind the increase in ground-level ozone concentrations during the 2022 COVID-19 lockdown in Shanghai. Using observational data and chemical transport models, the authors demonstrate that an unfavorable reduction ratio between nitrogen oxides (NOx) and volatile organic compounds (VOCs), coupled with adverse meteorological conditions, led to elevated ozone levels. The findings emphasize the need for well-balanced VOC and NOx emission control strategies to effectively mitigate urban ozone pollution.',
      keywords: ['Ozone Pollution',
    'Shanghai',
    'COVID-19 Lockdown',
    'Volatile Organic Compounds (VOCs)',
    'Nitrogen Oxides (NOx)',
    'Air Quality',
    'Atmospheric Chemistry'
],
      openAccess: false,
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S1352231024005260?via%3Dihub'
    },
    // {
    //   title: 'Satellite-based Validation of Ground-level PM2.5 Measurements Across Africa',
    //   authors: ['El-Fassi, M.', 'Mwangi, G.', 'Benali, A.'],
    //   journal: 'Remote Sensing of Environment',
    //   year: 2024,
    //   volume: '301',
    //   pages: '113-128',
    //   doi: '10.1016/j.rse.2024.113128',
    //   type: 'Journal Article',
    //   impact: 11.1,
    //   citations: 8,
    //   abstract: 'We present a novel approach for validating satellite-based PM2.5 retrievals using ground-based measurements from monitoring networks across Africa.',
    //   keywords: ['Satellite Remote Sensing', 'PM2.5', 'Validation', 'Africa'],
    //   openAccess: false
    // },
    // {
    //   title: 'Climate Change Impacts on Air Quality in the Sahel Region',
    //   authors: ['Asante, K.', 'Hassan, A.', 'Zahra, F.'],
    //   journal: 'Climate Dynamics',
    //   year: 2023,
    //   volume: '61',
    //   pages: '2845-2862',
    //   doi: '10.1007/s00382-023-06789-1',
    //   type: 'Journal Article',
    //   impact: 4.6,
    //   citations: 23,
    //   abstract: 'This research investigates the complex interactions between climate change and air quality in the Sahel region, focusing on dust storms and biomass burning.',
    //   keywords: ['Climate Change', 'Sahel', 'Dust Storms', 'Biomass Burning'],
    //   openAccess: true
    // },
    // {
    //   title: 'Development of Low-cost Air Quality Monitoring Networks for African Cities',
    //   authors: ['Okonkwo, S.', 'Alami, H.', 'Kone, A.'],
    //   journal: 'Environmental Science & Technology',
    //   year: 2023,
    //   volume: '57',
    //   pages: '15234-15245',
    //   doi: '10.1021/acs.est.3c04567',
    //   type: 'Journal Article',
    //   impact: 11.4,
    //   citations: 31,
    //   abstract: 'We describe the development and deployment of low-cost sensor networks for air quality monitoring in resource-limited settings across Africa.',
    //   keywords: ['Low-cost Sensors', 'Air Quality Monitoring', 'Africa', 'Environmental Technology'],
    //   openAccess: true
    // },
    // {
    //   title: 'Proceedings of COMPOLA 2023: Advances in African Air Quality Research',
    //   authors: ['Hassan, A. (Ed.)', 'Asante, K. (Ed.)'],
    //   journal: 'Conference Proceedings',
    //   year: 2023,
    //   volume: 'Vol. 1',
    //   pages: '1-450',
    //   doi: '10.5194/acp-2023-compola',
    //   type: 'Conference Proceedings',
    //   impact: null,
    //   citations: 12,
    //   abstract: 'Comprehensive proceedings from the 2023 Conference on Pollution and Air Quality, featuring 45 research papers from African and international researchers.',
    //   keywords: ['Conference', 'Air Quality', 'Africa', 'Research'],
    //   openAccess: true
    // },
    // {
    //   title: 'Machine Learning Applications in African Air Quality Prediction',
    //   authors: ['Benali, A.', 'Kone, A.', 'El-Fassi, M.'],
    //   journal: 'Artificial Intelligence in Environmental Science',
    //   year: 2023,
    //   volume: '12',
    //   pages: '78-92',
    //   doi: '10.1016/j.aies.2023.078092',
    //   type: 'Journal Article',
    //   impact: 3.8,
    //   citations: 19,
    //   abstract: 'This study explores the application of machine learning techniques for predicting air quality in African cities using meteorological and emission data.',
    //   keywords: ['Machine Learning', 'Air Quality Prediction', 'Africa', 'Artificial Intelligence'],
    //   openAccess: false
    // }
  ];

  const years = ['all', '2024', '2023', '2022', '2021', '2020'];
  const types = ['all', 'Journal Article', 'Conference Proceedings', 'Book Chapter', 'Review'];

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         pub.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
    const matchesType = selectedType === 'all' || pub.type === selectedType;
    return matchesSearch && matchesYear && matchesType;
  });

  const getImpactColor = (impact: number | null) => {
    if (!impact) return 'text-gray-500';
    if (impact >= 10) return 'text-green-600';
    if (impact >= 5) return 'text-blue-600';
    return 'text-orange-600';
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
              Publications
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore our comprehensive collection of research publications, conference proceedings, 
              and scientific contributions to atmospheric and environmental sciences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Publication Stats */}
      <section className="py-16 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {publicationStats.map((stat, index) => (
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

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Showing {filteredPublications.length} of {publications.length} publications
          </p>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-16 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {filteredPublications.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-surface rounded-xl shadow-lg border dark:border-gray-700 p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-text-primary dark:text-dark-text">
                        {publication.title}
                      </h3>
                      {publication.openAccess && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                          Open Access
                        </span>
                      )}
                    </div>
                    
                    <div className="text-gray-600 dark:text-gray-300 mb-2">
                      <span className="font-medium">Authors:</span> {publication.authors.join(', ')}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <span><strong>Journal:</strong> {publication.journal}</span>
                      <span><strong>Year:</strong> {publication.year}</span>
                      <span><strong>Volume:</strong> {publication.volume}</span>
                      <span><strong>Pages:</strong> {publication.pages}</span>
                      {publication.impact && (
                        <span className={`font-medium ${getImpactColor(publication.impact)}`}>
                          <strong>IF:</strong> {publication.impact}
                        </span>
                      )}
                      <span><strong>Citations:</strong> {publication.citations}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {publication.type}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {publication.abstract}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {publication.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t dark:border-gray-700">
                  <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                    <strong>DOI:</strong> {publication.doi}
                  </div>
                  <div className="flex gap-2">
                    <a
  href={publication.url}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors"
>
  <ExternalLink className="h-4 w-4" />
  <span>View</span>
</a>

                    {publication.openAccess && (
                      null
                      // <button className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-lg transition-colors">
                      //   <Download className="h-4 w-4" />
                      //   <span>PDF</span>
                      // </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No publications found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Publication Guidelines */}
      {/* <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Collaborate with Us
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Interested in collaborating on research or citing our work? 
              Contact us to discuss partnership opportunities and access to our publications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Collaboration Guidelines
              </button>
              <button className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-white/10">
                Contact Researchers
              </button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};