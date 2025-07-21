import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface TrialRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrialRegistrationModal: React.FC<TrialRegistrationModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // 步骤1：个人信息
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    
    // 步骤2：公司信息
    companyName: '',
    companySize: '',
    industry: '',
    
    // 步骤3：产品需求
    useCase: '',
    productQuantity: '',
    implementationTime: ''
  });

  // 验证步骤1是否完整
  const isStep1Valid = formData.firstName.trim() && 
                      formData.lastName.trim() && 
                      formData.email.trim() && 
                      formData.phone.trim() && 
                      formData.position.trim();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // 这里可以添加提交逻辑
    console.log('提交表单数据:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">开始免费试用</h2>
            <p className="text-gray-600 mt-1">步骤 {currentStep} / 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* 进度条 */}
        <div className="px-6 py-4">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 表单内容 */}
        <div className="px-6 pb-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">个人信息</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    名字<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入您的名字"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓氏<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入您的姓氏"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  企业邮箱<span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="请输入您的企业邮箱"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  手机号码<span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="请输入您的手机号码"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  职位<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="请输入您的职位"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">公司信息</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公司名称<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="请输入公司名称"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公司规模<span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  行业<span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">请选择行业</option>
                  <option value="technology">科技</option>
                  <option value="finance">金融</option>
                  <option value="healthcare">医疗健康</option>
                  <option value="education">教育</option>
                  <option value="retail">零售</option>
                  <option value="manufacturing">制造业</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">产品需求</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  主要使用场景<span className="text-red-600">*</span>
                </label>
                <textarea
                  value={formData.useCase}
                  onChange={(e) => handleInputChange('useCase', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="请描述您的主要使用场景"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  预计产品数量<span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.productQuantity}
                  onChange={(e) => handleInputChange('productQuantity', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">请选择产品数量</option>
                  <option value="1-10">1-10个</option>
                  <option value="11-50">11-50个</option>
                  <option value="51-100">51-100个</option>
                  <option value="100+">100个以上</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  实施时间<span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.implementationTime}
                  onChange={(e) => handleInputChange('implementationTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">请选择实施时间</option>
                  <option value="immediately">立即开始</option>
                  <option value="1-month">1个月内</option>
                  <option value="3-months">3个月内</option>
                  <option value="6-months">6个月内</option>
                  <option value="later">6个月后</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            上一步
          </button>

          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              disabled={currentStep === 1 && !isStep1Valid}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                currentStep === 1 && !isStep1Valid
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              下一步
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              提交申请
              <Check className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialRegistrationModal;