import React from 'react';
import { Clock, DollarSign, Target, Globe, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Clock className="h-6 w-6 text-emerald-600" />,
      title: t('features.timeSavings'),
      description: t('features.timeSavings.desc')
    },
    {
      icon: <DollarSign className="h-6 w-6 text-emerald-600" />,
      title: t('features.costEfficiency'),
      description: t('features.costEfficiency.desc')
    },
    {
      icon: <Target className="h-6 w-6 text-emerald-600" />,
      title: t('features.decisionSupport'),
      description: t('features.decisionSupport.desc')
    },
    {
      icon: <Globe className="h-6 w-6 text-emerald-600" />,
      title: t('features.regulatoryAgility'),
      description: t('features.regulatoryAgility.desc')
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
      title: t('features.scalableROI'),
      description: t('features.scalableROI.desc')
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('features.title')}
              </h2>
            </div>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/image.png"
              alt="Product Carbon Footprint Life Cycle Analysis"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;