import React from 'react';
import ProductDemo from './ProductDemo';
import { useLanguage } from '../contexts/LanguageContext';

const Solutions = () => {
  const { t } = useLanguage();

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('solutions.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('solutions.subtitle')}
          </p>
        </div>
        
        <div className="mb-16">
          <ProductDemo />
        </div>
      </div>
    </section>
  );
};

export default Solutions;