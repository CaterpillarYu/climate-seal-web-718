import React from 'react';
import { Leaf, Twitter, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Climate Seal</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.sections.solutions.title')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.solutions.links.carbonCredits')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.solutions.links.emissionReduction')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.solutions.links.sustainabilityReporting')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.solutions.links.climateStrategy')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.sections.company.title')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.company.links.aboutUs')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.company.links.careers')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.company.links.press')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.company.links.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.sections.resources.title')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.resources.links.documentation')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.resources.links.caseStudies')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.resources.links.webinars')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sections.resources.links.blog')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              {t('footer.copyright')}
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;