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
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 全自动零门槛工具链 */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-emerald-600 rounded-full mr-3"></div>
                全自动零门槛工具链
              </h3>
              <div className="space-y-2">
                <div className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 leading-tight text-sm">法规匹配：0查找和理解法规、0专业背景、自动完成多法规匹配</span>
                </div>
                <div className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 leading-tight text-sm">最少量数据：法规允许的背景数据自动补充、仅需最少量实景数据</span>
                </div>
                <div className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 leading-tight text-sm">建模计算：0手动建模和0手动计算、无需任何碳专业背景</span>
                </div>
                <div className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 leading-tight text-sm">因子匹配：高精度AI因子匹配算法，准确率超过95%，0人工辅助</span>
                </div>
                <div className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 leading-tight text-sm">风险分析：核验级风险和可信评估，90%+认证核验通过率</span>
                </div>
                <div className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 leading-tight text-sm">热点和报告：自动排放热点分析和多语言报告，准确支持减排与合规</span>
                </div>
              </div>
            </div>

            {/* 认证级的可信排放结果 */}
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-sky-600 rounded-full mr-3"></div>
                认证级的可信排放结果
              </h3>
              <div className="space-y-2">
                <div className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-sky-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 leading-tight text-sm">多产品和法规：支持不同类型产品、不同地区、不同法规要求（ISO/CBAM/CSRD/DPP/PEF/EU battery）</span>
                </div>
                <div className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-sky-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 leading-tight text-sm">各类碳业务类：贯穿披露、碳税、绿色供应链采购、碳资产、碳金融、碳标签、产品数字护照、电池护照</span>
                </div>
                <div className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-sky-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 leading-tight text-sm">支持主流认证：BSI、BV、TUV、SGS、及本地区认证机构</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 第二部分：价值对比分析 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">价值对比分析</h2>
            <p className="text-lg text-gray-600">传统方案 vs Climate Seal AI方案</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-3 divide-x divide-gray-200">
              {/* 时间投入对比 */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">时间投入</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">传统方案</h4>
                    <p className="text-gray-700 text-sm mb-2">2-3个月完成一份报告</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 外包咨询：用户投入1周+，总周期2-3个月</li>
                      <li>• 采购软件：用户投入2周-1个月，总周期2周-1个月</li>
                      <li>• 认证核验：用户投入1周+，总周期1.5个月</li>
                      <li>• 绿色供应链：用户投入长期，总周期长期</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">Climate Seal AI</h4>
                    <p className="text-emerald-700 text-sm mb-2">数小时完成一份报告</p>
                    <ul className="text-xs text-emerald-600 space-y-1">
                      <li>• 计算：无需外包咨询、手动检索资料和法规</li>
                      <li>• 认证：无需补充和修改认证文审</li>
                      <li>• 供应链：无需供应链培训/专业支持</li>
                      <li>• 数据质量高度可信（AI agent支持供应商）</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 资金投入对比 */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">资金投入</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">传统方案</h4>
                    <p className="text-gray-700 text-sm mb-2">4-7万/报告+供应链管理50万+</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 外包咨询：报告费用+配合咨询沟通成本（3-6万+）</li>
                      <li>• 采购软件：软件费用+内部碳专家成本（3-6万+）</li>
                      <li>• 认证核验：配合补充/修改/沟通成本（1万+）</li>
                      <li>• 绿色供应链：软件+培训+管理投入（50万+）</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">Climate Seal AI</h4>
                    <p className="text-emerald-700 text-sm mb-2">500元/1-3报告+供应链管理0</p>
                    <ul className="text-xs text-emerald-600 space-y-1">
                      <li>• 计算：无需外包咨询、手动检索资料和法规</li>
                      <li>• 认证：无需补充和修改认证文审</li>
                      <li>• 供应链：无需供应链培训/专业支持</li>
                      <li>• 供应商负担500元/合规对象</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 销售影响对比 */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">销售影响</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">传统方案</h4>
                    <p className="text-gray-700 text-sm mb-2">合规风险影响销售，资源被算碳占用</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• ISO14067、数字护照、碳税等要求影响销售</li>
                      <li>• 减碳材料溢价并紧缺</li>
                      <li>• 减碳项目资产开发和绿色贷款资源被占用</li>
                      <li>• 可带来更多收入但计算占用资源</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">Climate Seal AI</h4>
                    <p className="text-emerald-700 text-sm mb-2">释放减碳资源，专注业务增长</p>
                    <ul className="text-xs text-emerald-600 space-y-1">
                      <li>• 相同预算下，更多资金和人力投入减排项目</li>
                      <li>• 更多时间争取低碳订单/采购、低碳补贴</li>
                      <li>• 专注低碳金融、碳资产开发</li>
                      <li className="ml-4">• 绿色供应链金融贴现机会</li>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">业务流程对比</h2>
            <p className="text-lg text-gray-600">三种方案的工作流程详细对比</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* AI Agent方案 - 4步 */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-800">AI Agent方案</h3>
                <p className="text-sm text-emerald-600">4步完成，报告数小时完成&认证周期减半</p>
              </div>
              
              <div className="space-y-4">
                {[
                  { step: 1, title: "提供最少量数据" },
                  { step: 2, title: "确认信息" },
                  { step: 3, title: "递送核验机构" },
                  { step: 4, title: "核验发证" }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center group">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 group-hover:scale-110 transition-transform">{item.step}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="flex justify-start ml-4">
                        <div className="w-0.5 h-6 bg-emerald-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
                
            {/* 购买软件+内部专家 - 11步 */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-800">软件+内部专家</h3>
                <p className="text-sm text-amber-600">11步流程，2-4个月</p>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[
                  { step: 1, title: "使用培训" },
                  { step: 2, title: "资料查找法规对比" },
                  { step: 3, title: "数据收集清单" },
                  { step: 4, title: "数据整理和清洗" },
                  { step: 5, title: "手动补录缺口" },
                  { step: 6, title: "建立计算模型" },
                  { step: 7, title: "手动因子匹配" },
                  { step: 8, title: "递送核验机构" },
                  { step: 9, title: "预审反馈问题清单" },
                  { step: 10, title: "信息补充和纠正" },
                  { step: 11, title: "核验发证" }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center group">
                      <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 group-hover:scale-110 transition-transform">{item.step}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-xs">{item.title}</h4>
                      </div>
                    </div>
                    {index < 10 && (
                      <div className="flex justify-start ml-3">
                        <div className="w-0.5 h-3 bg-amber-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 外包咨询顾问 - 12步 */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">外包咨询顾问</h3>
                <p className="text-sm text-slate-600">12步流程，3-6个月</p>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[
                  { step: 1, title: "启动和培训" },
                  { step: 2, title: "资料查找法规对比" },
                  { step: 3, title: "数据清单制作" },
                  { step: 4, title: "数据清洗和访谈" },
                  { step: 5, title: "计算模型" },
                  { step: 6, title: "因子匹配和计算" },
                  { step: 7, title: "Draft 报告" },
                  { step: 8, title: "内部审核再改版" },
                  { step: 9, title: "递送核验机构" },
                  { step: 10, title: "预审反馈问题清单" },
                  { step: 11, title: "信息补充和纠正" },
                  { step: 12, title: "核验发证" }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center group">
                      <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 group-hover:scale-110 transition-transform">{item.step}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-xs">{item.title}</h4>
                      </div>
                    </div>
                    {index < 11 && (
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