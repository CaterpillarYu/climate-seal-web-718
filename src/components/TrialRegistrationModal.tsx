import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface TrialRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrialRegistrationModal: React.FC<TrialRegistrationModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    
    // Step 2: Company Info
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    
    // Step 3: Product Requirements
    useCase: '',
    productsCount: '',
    currentSolution: '',
    timeline: '',
    
    // Step 4: Additional Info
    budget: '',
    additionalRequirements: '',
    marketingConsent: false
  });

  // 验证步骤1是否完整
  const isStep1Valid = formData.firstName.trim() !== '' && 
                       formData.lastName.trim() !== '' && 
                       formData.email.trim() !== '' && 
                       formData.phone.trim() !== '' && 
                       formData.position.trim() !== '';
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // 这里处理最终提交逻辑
    console.log('Trial registration submitted:', formData);
    alert('注册成功！我们会尽快与您联系。');
    onClose();
    // 重置表单
    setCurrentStep(1);
    setFormData({
      firstName: '', lastName: '', email: '', phone: '', position: '',
      companyName: '', companySize: '', industry: '', website: '',
      useCase: '', productsCount: '', currentSolution: '', timeline: '',
      budget: '', additionalRequirements: '', marketingConsent: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <h2 className="text-2xl font-bold mb-2">开始免费试用</h2>
          <p className="text-emerald-100">14天免费试用，无需信用卡</p>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step <= currentStep
                    ? 'bg-white text-emerald-600'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                {step < currentStep ? <Check className="h-5 w-5" /> : step}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">个人信息</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="请输入您的名字"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓氏 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="请输入您的姓氏"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    企业邮箱 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="your.name@company.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手机号码 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="+86 138 0000 0000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  职位 <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">请选择您的职位</option>
                  <option value="ceo">CEO/总裁</option>
                  <option value="cto">CTO/技术总监</option>
                  <option value="sustainability">可持续发展总监</option>
                  <option value="environmental">环境经理</option>
                  <option value="product">产品经理</option>
                  <option value="engineer">工程师</option>
                  <option value="consultant">咨询顾问</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Company Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">公司信息</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公司名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="请输入公司名称"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公司规模 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">请选择公司规模</option>
                    <option value="1-10">1-10人</option>
                    <option value="11-50">11-50人</option>
                    <option value="51-200">51-200人</option>
                    <option value="201-1000">201-1000人</option>
                    <option value="1000+">1000人以上</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    行业 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">请选择行业</option>
                    <option value="manufacturing">制造业</option>
                    <option value="technology">科技</option>
                    <option value="automotive">汽车</option>
                    <option value="electronics">电子</option>
                    <option value="textile">纺织</option>
                    <option value="food">食品饮料</option>
                    <option value="chemical">化工</option>
                    <option value="consulting">咨询服务</option>
                    <option value="other">其他</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公司网站
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="https://www.company.com"
                />
              </div>
            </div>
          )}

          {/* Step 3: Product Requirements */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">产品需求</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  主要使用场景 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.useCase}
                  onChange={(e) => handleInputChange('useCase', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">请选择使用场景</option>
                  <option value="compliance">法规合规</option>
                  <option value="supply-chain">供应链管理</option>
                  <option value="reporting">可持续发展报告</option>
                  <option value="carbon-tax">碳税计算</option>
                  <option value="product-passport">产品数字护照</option>
                  <option value="certification">产品认证</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    预计产品数量 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.productsCount}
                    onChange={(e) => handleInputChange('productsCount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">请选择产品数量</option>
                    <option value="1-5">1-5个产品</option>
                    <option value="6-20">6-20个产品</option>
                    <option value="21-100">21-100个产品</option>
                    <option value="100+">100个以上</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    实施时间 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">请选择时间</option>
                    <option value="immediate">立即开始</option>
                    <option value="1-3months">1-3个月内</option>
                    <option value="3-6months">3-6个月内</option>
                    <option value="6months+">6个月以后</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  当前解决方案
                </label>
                <select
                  value={formData.currentSolution}
                  onChange={(e) => handleInputChange('currentSolution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">请选择当前方案</option>
                  <option value="none">暂无解决方案</option>
                  <option value="manual">手动计算</option>
                  <option value="excel">Excel表格</option>
                  <option value="consultant">外包咨询</option>
                  <option value="software">其他软件</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">补充信息</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  预算范围
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">请选择预算范围</option>
                  <option value="under-10k">1万以下</option>
                  <option value="10k-50k">1-5万</option>
                  <option value="50k-100k">5-10万</option>
                  <option value="100k+">10万以上</option>
                  <option value="not-decided">暂未确定</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  其他需求或问题
                </label>
                <textarea
                  value={formData.additionalRequirements}
                  onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={4}
                  placeholder="请描述您的具体需求或问题..."
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="marketing-consent"
                  checked={formData.marketingConsent}
                  onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="marketing-consent" className="text-sm text-gray-700">
                  我同意接收Climate Seal AI的产品更新和营销信息。您可以随时取消订阅。
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            步骤 {currentStep} / 4
          </div>
          
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                上一步
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={currentStep === 1 && !isStep1Valid}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                  currentStep === 1 && !isStep1Valid
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                下一步
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
              >
                提交申请
                <Check className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialRegistrationModal;