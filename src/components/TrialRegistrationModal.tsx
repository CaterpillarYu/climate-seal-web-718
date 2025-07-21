import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TrialRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrialRegistrationModal: React.FC<TrialRegistrationModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
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

  // 获取翻译数据
  const getTranslationArray = (key: string): any[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  const companySizeOptions = getTranslationArray('trialModal.companyInfo.companySizeOptions');
  const industryOptions = getTranslationArray('trialModal.companyInfo.industryOptions');
  const productQuantityOptions = getTranslationArray('trialModal.requirements.productQuantityOptions');
  const implementationTimeOptions = getTranslationArray('trialModal.requirements.implementationTimeOptions');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('trialModal.title')}</h2>
            <p className="text-gray-600 mt-1">{t('trialModal.stepIndicator')} {currentStep}{t('trialModal.of')}3</p>
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
              <h3 className="text-xl font-semibold text-gray-900">{t('trialModal.personalInfo.title')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('trialModal.personalInfo.firstName')}<span className="text-red-600">{t('trialModal.required')}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t('trialModal.personalInfo.placeholders.firstName')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('trialModal.personalInfo.lastName')}<span className="text-red-600">{t('trialModal.required')}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t('trialModal.personalInfo.placeholders.lastName')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('trialModal.personalInfo.email')}<span className="text-red-600">{t('trialModal.required')}</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t('trialModal.personalInfo.placeholders.email')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('trialModal.personalInfo.phone')}<span className="text-red-600">{t('trialModal.required')}</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t('trialModal.personalInfo.placeholders.phone')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('trialModal.personalInfo.position')}<span className="text-red-600">{t('trialModal.required')}</span>
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t('trialModal.personalInfo.placeholders.position')}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">{t('trialModal.companyInfo.title')}</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('trialModal.companyInfo.companyName')}<span className="text-red-600">{t('trialModal.required')}</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t('trialModal.companyInfo.placeholders.companyName')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('trialModal.companyInfo.companySize')}<span className="text-red-600">{t('trialModal.required')}</span>
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {companySizeOptions.map((option: any, index: number) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('trialModal.companyInfo.industry')}<span className="text-red-600">{t('trialModal.required')}</span>
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {industryOptions.map((option: any, index: number) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">{t('trialModal.requirements.title')}</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('trialModal.requirements.useCase')}<span className="text-red-600">{t('trialModal.required')}</span>
                </label>
                <textarea
                  value={formData.useCase}
                  onChange={(e) => handleInputChange('useCase', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t('trialModal.requirements.placeholders.useCase')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('trialModal.requirements.productQuantity')}<span className="text-red-600">{t('trialModal.required')}</span>
                </label>
                <select
                  value={formData.productQuantity}
                  onChange={(e) => handleInputChange('productQuantity', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {productQuantityOptions.map((option: any, index: number) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('trialModal.requirements.implementationTime')}<span className="text-red-600">{t('trialModal.required')}</span>
                </label>
                <select
                  value={formData.implementationTime}
                  onChange={(e) => handleInputChange('implementationTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {implementationTimeOptions.map((option: any, index: number) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
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
            {t('trialModal.buttons.previous')}
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
              {t('trialModal.buttons.next')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {t('trialModal.buttons.submit')}
              <Check className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialRegistrationModal;