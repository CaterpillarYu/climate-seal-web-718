import React from 'react';
import { useState, useEffect } from 'react';
import { DollarSign, Shield, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductDemo from './ProductDemo';

interface SolutionsProps {
  onStartTrial?: () => void;
}

const Solutions: React.FC<SolutionsProps> = ({ onStartTrial }) => {
  const { t } = useLanguage();
  const [showTrialCard, setShowTrialCard] = useState(true);
  const [cardPosition, setCardPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Helper function to get array from translation
  const getTranslationArray = (key: string): any[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  // 检测是否在Solutions部分
  useEffect(() => {
    const handleScroll = () => {
      const solutionsElement = document.getElementById('solutions');
      if (solutionsElement) {
        const rect = solutionsElement.getBoundingClientRect();
        // 更严格的检测：只有当Solutions部分在视窗中占主要位置时才显示
        const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.3;
        setShowTrialCard(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 拖拽功能
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setCardPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const solutions = [
    {
      icon: <DollarSign className="h-8 w-8 text-emerald-600" />,
      title: t('solutions.cutCosts.title'),
      description: t('solutions.cutCosts.description'),
      features: [t('solutions.cutCosts.feature')]
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: t('solutions.credibility.title'),
      description: t('solutions.credibility.description'),
      features: [t('solutions.credibility.feature')]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-600" />,
      title: t('solutions.scale.title'),
      description: t('solutions.scale.description'),
      features: [t('solutions.scale.feature')]
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: t('solutions.support.title'),
      description: t('solutions.support.description'),
      features: [t('solutions.support.feature1'), t('solutions.support.feature2'), t('solutions.support.feature3')]
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('solutions.title')}
          </h2>
        </div>

        {/* Product Demo Section */}
        <div className="mb-20">
          <div className="bg-gray-50 rounded-2xl p-4">
            <ProductDemo />
          </div>
        </div>
        
        {/* 第一部分：核心功能介绍 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('solutions.coreFeatures.title')}</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 全自动零门槛工具链 */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-4 h-4 bg-emerald-600 rounded-full mr-4"></div>
                {t('solutions.coreFeatures.automation.title')}
              </h3>
              <div className="space-y-3">
                {getTranslationArray('solutions.coreFeatures.automation.features').map((feature: string, index: number) => (
                  <div key={index} className="flex items-start group hover:bg-white/50 p-3 rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-4 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 认证级的可信排放结果 */}
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-4 h-4 bg-sky-600 rounded-full mr-4"></div>
                {t('solutions.coreFeatures.credibility.title')}
              </h3>
              <div className="space-y-3">
                {getTranslationArray('solutions.coreFeatures.credibility.features').map((feature: string, index: number) => (
                  <div key={index} className="flex items-start group hover:bg-white/50 p-3 rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mr-4 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 第二部分：价值对比分析 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('solutions.valueComparison.title')}</h2>
            <p className="text-lg text-gray-600">{t('solutions.valueComparison.subtitle')}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-3 divide-x divide-gray-200">
              {/* 时间投入对比 */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t('solutions.valueComparison.timeInvestment.title')}</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{t('solutions.valueComparison.timeInvestment.traditional.title')}</h4>
                    <p className="text-gray-700 text-sm mb-3 font-medium">{t('solutions.valueComparison.timeInvestment.traditional.duration')}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {getTranslationArray('solutions.valueComparison.timeInvestment.traditional.details').map((detail: string, index: number) => (
                        <li key={index} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">{t('solutions.valueComparison.timeInvestment.climateSeal.title')}</h4>
                    <p className="text-emerald-700 text-sm mb-3 font-medium">{t('solutions.valueComparison.timeInvestment.climateSeal.duration')}</p>
                    <ul className="text-sm text-emerald-600 space-y-1">
                      {getTranslationArray('solutions.valueComparison.timeInvestment.climateSeal.details').map((detail: string, index: number) => (
                        <li key={index} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 资金投入对比 */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t('solutions.valueComparison.financialInvestment.title')}</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{t('solutions.valueComparison.financialInvestment.traditional.title')}</h4>
                    <p className="text-gray-700 text-sm mb-3 font-medium">{t('solutions.valueComparison.financialInvestment.traditional.cost')}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {getTranslationArray('solutions.valueComparison.financialInvestment.traditional.details').map((detail: string, index: number) => (
                        <li key={index} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">{t('solutions.valueComparison.financialInvestment.climateSeal.title')}</h4>
                    <p className="text-emerald-700 text-sm mb-3 font-medium">{t('solutions.valueComparison.financialInvestment.climateSeal.cost')}</p>
                    <ul className="text-sm text-emerald-600 space-y-1">
                      {getTranslationArray('solutions.valueComparison.financialInvestment.climateSeal.details').map((detail: string, index: number) => (
                        <li key={index} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 销售影响对比 */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t('solutions.valueComparison.salesImpact.title')}</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{t('solutions.valueComparison.salesImpact.traditional.title')}</h4>
                    <p className="text-gray-700 text-sm mb-3 font-medium">{t('solutions.valueComparison.salesImpact.traditional.impact')}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {getTranslationArray('solutions.valueComparison.salesImpact.traditional.details').map((detail: string, index: number) => (
                        <li key={index} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">{t('solutions.valueComparison.salesImpact.climateSeal.title')}</h4>
                    <p className="text-emerald-700 text-sm mb-3 font-medium">{t('solutions.valueComparison.salesImpact.climateSeal.impact')}</p>
                    <ul className="text-sm text-emerald-600 space-y-1">
                      {getTranslationArray('solutions.valueComparison.salesImpact.climateSeal.details').map((detail: string, index: number) => (
                        <li key={index} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 第三部分：业务流程对比 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('solutions.processComparison.title')}</h2>
            <p className="text-lg text-gray-600">{t('solutions.processComparison.subtitle')}</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* AI Agent方案 - 4步 */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-emerald-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-800">{t('solutions.processComparison.aiAgent.title')}</h3>
                <p className="text-sm text-emerald-600 mt-2">{t('solutions.processComparison.aiAgent.description')}</p>
              </div>
              
              <div className="space-y-4">
                {getTranslationArray('solutions.processComparison.aiAgent.steps').map((stepTitle: string, index: number) => (
                  <div key={index}>
                    <div className="flex items-center group">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 group-hover:scale-110 transition-transform">{index + 1}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{stepTitle}</h4>
                      </div>
                    </div>
                    {index < getTranslationArray('solutions.processComparison.aiAgent.steps').length - 1 && (
                      <div className="flex justify-start ml-4">
                        <div className="w-0.5 h-6 bg-emerald-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
                
            {/* 购买软件+内部专家 - 11步 */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-amber-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-800">{t('solutions.processComparison.softwareExpert.title')}</h3>
                <p className="text-sm text-amber-600 mt-2">{t('solutions.processComparison.softwareExpert.description')}</p>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getTranslationArray('solutions.processComparison.softwareExpert.steps').map((stepTitle: string, index: number) => (
                  <div key={index}>
                    <div className="flex items-center group">
                      <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 group-hover:scale-110 transition-transform">{index + 1}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{stepTitle}</h4>
                      </div>
                    </div>
                    {index < getTranslationArray('solutions.processComparison.softwareExpert.steps').length - 1 && (
                      <div className="flex justify-start ml-3">
                        <div className="w-0.5 h-3 bg-amber-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 外包咨询顾问 - 12步 */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">{t('solutions.processComparison.consultant.title')}</h3>
                <p className="text-sm text-slate-600 mt-2">{t('solutions.processComparison.consultant.description')}</p>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getTranslationArray('solutions.processComparison.consultant.steps').map((stepTitle: string, index: number) => (
                  <div key={index}>
                    <div className="flex items-center group">
                      <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 group-hover:scale-110 transition-transform">{index + 1}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{stepTitle}</h4>
                      </div>
                    </div>
                    {index < getTranslationArray('solutions.processComparison.consultant.steps').length - 1 && (
                      <div className="flex justify-start ml-3">
                        <div className="w-0.5 h-3 bg-slate-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 悬浮试用卡片 */}
      {showTrialCard && (
        <div
          className={`fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-64 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } transition-opacity duration-300`}
          style={{
            left: `${cardPosition.x}px`,
            top: `${cardPosition.y}px`,
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="text-center space-y-4">
            
            <h3 className="text-lg font-bold text-gray-900">{t('trial.card.title')}</h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>{t('trial.card.feature1')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>{t('trial.card.feature2')}</span>
              </div>
            </div>
            
            <button 
              onClick={onStartTrial}
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-lg text-sm"
            >
              {t('trial.card.button')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Solutions;