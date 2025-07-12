import React, { useState } from 'react';
import { ArrowLeft, Calculator, FileText, TrendingDown, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductTrial1Props {
  onBack: () => void;
}

const ProductTrial1: React.FC<ProductTrial1Props> = ({ onBack }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    productName: '',
    productType: '',
    annualProduction: '',
    materials: '',
    energy: '',
    transportation: ''
  });

  const steps = [
    { title: '产品信息', icon: <FileText className="h-5 w-5" /> },
    { title: '材料数据', icon: <Calculator className="h-5 w-5" /> },
    { title: '能源消耗', icon: <Zap className="h-5 w-5" /> },
    { title: '计算结果', icon: <TrendingDown className="h-5 w-5" /> }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              返回首页
            </button>
            <h1 className="text-2xl font-bold text-gray-900">产品碳足迹计算器</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index <= currentStep 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-emerald-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">产品基本信息</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    产品名称
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="例如：智能手机"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    产品类型
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => handleInputChange('productType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">选择产品类型</option>
                    <option value="electronics">电子产品</option>
                    <option value="automotive">汽车零部件</option>
                    <option value="textile">纺织品</option>
                    <option value="food">食品</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    年产量
                  </label>
                  <input
                    type="number"
                    value={formData.annualProduction}
                    onChange={(e) => handleInputChange('annualProduction', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="例如：100000"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">材料信息</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主要材料及重量 (kg)
                  </label>
                  <textarea
                    value={formData.materials}
                    onChange={(e) => handleInputChange('materials', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="例如：&#10;铝合金: 0.5kg&#10;塑料: 0.2kg&#10;玻璃: 0.1kg&#10;电子元件: 0.1kg"
                  />
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-emerald-800">提示</p>
                      <p className="text-sm text-emerald-700">
                        请尽可能详细地列出所有主要材料及其重量，这将影响计算的准确性。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">能源与运输</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    生产能耗 (kWh/单位)
                  </label>
                  <input
                    type="number"
                    value={formData.energy}
                    onChange={(e) => handleInputChange('energy', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="例如：15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    运输距离 (km)
                  </label>
                  <input
                    type="number"
                    value={formData.transportation}
                    onChange={(e) => handleInputChange('transportation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="例如：500"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">计算结果</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 rounded-xl p-6 text-center">
                  <TrendingDown className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-emerald-600 mb-2">12.5</div>
                  <div className="text-sm text-gray-600">kg CO₂e/单位</div>
                  <div className="text-xs text-gray-500 mt-1">总碳足迹</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">8.2</div>
                  <div className="text-sm text-gray-600">kg CO₂e/单位</div>
                  <div className="text-xs text-gray-500 mt-1">材料阶段</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 text-center">
                  <Zap className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-orange-600 mb-2">4.3</div>
                  <div className="text-sm text-gray-600">kg CO₂e/单位</div>
                  <div className="text-xs text-gray-500 mt-1">生产阶段</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">详细分析</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">原材料获取</span>
                    <span className="font-medium">6.8 kg CO₂e</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">生产制造</span>
                    <span className="font-medium">3.2 kg CO₂e</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">运输配送</span>
                    <span className="font-medium">1.8 kg CO₂e</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">包装</span>
                    <span className="font-medium">0.7 kg CO₂e</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-gray-900">总计</span>
                      <span className="text-emerald-600">12.5 kg CO₂e</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              上一步
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                下一步
              </button>
            ) : (
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                生成报告
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTrial1;