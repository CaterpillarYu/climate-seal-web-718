import React from 'react';
import { ArrowRight, TrendingDown, Shield, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onStartCalculator: () => void;
  onViewPricing: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartCalculator, onViewPricing }) => {
  const { t } = useLanguage();

  return (
    <section className="pt-20 relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/ChatGPT Image 2025年6月26日 21_44_09.png')`
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-xl lg:text-3xl font-bold text-white leading-tight">
                {t('hero.title')} 
                <span className="text-emerald-400 block">Climate Seal AI</span>
              </h1>
              <p className="text-sm lg:text-lg text-white/90 leading-relaxed max-w-xl">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStartCalculator}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all transform hover:scale-105 font-semibold flex items-center justify-center group shadow-lg text-xs"
              >
                {t('hero.tryProduct')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onViewPricing}
                className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-all font-semibold shadow-lg text-xs"
              >
                {t('hero.viewPricing')}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-lg">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <TrendingDown className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                <div className="text-xl font-bold text-white">40%</div>
                <div className="text-xs text-white/80">{t('hero.emissionReduction')}</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <Shield className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                <div className="text-xl font-bold text-white">100%</div>
                <div className="text-xs text-white/80">{t('hero.complianceRate')}</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <DollarSign className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                <div className="text-xl font-bold text-white">99%</div>
                <div className="text-xs text-white/80">{t('hero.costSaving')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;