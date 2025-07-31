import React from 'react';
import { CheckCircle, Zap, Shield, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductDemo from './ProductDemo';

const Solutions = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <CheckCircle className="h-8 w-8 text-emerald-600" />,
      title: "Automated LCA Assessment",
      description: "AI-powered lifecycle assessment with automated data collection and analysis"
    },
    {
      icon: <Zap className="h-8 w-8 text-emerald-600" />,
      title: "Real-time Carbon Tracking",
      description: "Monitor your product's carbon footprint in real-time across all lifecycle stages"
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: "Compliance Management",
      description: "Ensure compliance with global environmental regulations and standards"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-emerald-600" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics for data-driven sustainability decisions"
    }
  ];

  return (
    <section id="solutions" className="py-20" style={{ backgroundColor: 'rgb(0, 52, 50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Our Solutions
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive carbon footprint management powered by AI and advanced analytics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-4">{solution.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
              <p className="text-gray-600">{solution.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Product Demo
          </h3>
          <ProductDemo />
        </div>
      </div>
    </section>
  );
};

export default Solutions;