import React, { useState } from 'react';
import { Check, X, ArrowRight, Zap, Building, Crown, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TrialRegistrationModal from './TrialRegistrationModal';

interface PricingProps {
  onStartTrial?: () => void;
  onContactSales?: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartTrial, onContactSales }) => {
  const { t } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const [needInvoice, setNeedInvoice] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);

  // Helper function to get array from translation
  const getTranslationArray = (key: string): any[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  const plans = [
    {
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      description: t('pricing.plans.free.description'),
      features: getTranslationArray('pricing.plans.free.features'),
      notIncluded: getTranslationArray('pricing.plans.free.notIncluded'),
      popular: false,
      icon: Zap,
      color: 'emerald',
      cta: t('pricing.plans.free.cta')
    },
    {
      name: 'PaidVersion',
      price: 70,
      yearlyPrice: 756,
      description: t('pricing.plans.paid.description'),
      features: getTranslationArray('pricing.plans.paid.features'),
      notIncluded: getTranslationArray('pricing.plans.paid.notIncluded'),
      popular: true,
      icon: Building,
      color: 'emerald',
      cta: t('pricing.plans.paid.cta')
    },
    {
      name: 'Customizing',
      price: 'Custom',
      yearlyPrice: 'Custom',
      description: t('pricing.plans.enterprise.description'),
      features: getTranslationArray('pricing.plans.enterprise.features'),
      notIncluded: getTranslationArray('pricing.plans.enterprise.notIncluded'),
      popular: false,
      icon: Crown,
      color: 'emerald',
      cta: t('pricing.plans.enterprise.cta')
    }
  ];

  const addons = getTranslationArray('pricing.addons.items');

  // 如果翻译数据获取失败，使用硬编码数据作为备用
  const addonsData = addons.length > 0 ? addons : [
    {
      name: t('pricing.addons.items.0.name') || '更多排放因子匹配',
      description: t('pricing.addons.items.0.description') || '100次排放因子匹配',
      price: t('pricing.addons.items.0.price') || '¥280'
    },
    {
      name: t('pricing.addons.items.1.name') || '自定义集成',
      description: t('pricing.addons.items.1.description') || '与您现有的ERP、PLM或其他系统和数据库连接',
      price: t('pricing.addons.items.1.price') || '联系销售'
    },
    {
      name: t('pricing.addons.items.2.name') || '专业服务',
      description: t('pricing.addons.items.2.description') || '专家咨询和实施支持',
      price: t('pricing.addons.items.2.price') || '联系销售'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('pricing.subtitle')}
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              {t('pricing.billing.monthly')}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-emerald-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              {t('pricing.billing.annual')}
            </span>
            {isAnnual && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                {t('pricing.billing.save')}
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-md border-2 transition-all duration-300 hover:shadow-lg flex flex-col h-full ${
                plan.popular 
                  ? 'border-emerald-500 ring-2 ring-emerald-200' 
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-emerald-600 text-white shadow-lg">
                    <Users className="w-4 h-4 mr-1" />
                    {t('pricing.popular')}
                  </span>
                </div>
              )}
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-4">
                  <plan.icon className={`w-8 h-8 text-${plan.color}-600 mr-3`} />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.name === 'Customizing' ? t('pricing.plans.enterprise.name') : 
                     plan.name === 'Free' ? t('pricing.plans.free.name') : 
                     t('pricing.plans.paid.name')}
                  </h3>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    {typeof plan.price === 'number' ? (
                      <>
                        <span className="text-4xl font-bold text-gray-900">
                          ${isAnnual && typeof plan.yearlyPrice === 'number' ? Math.round(plan.yearlyPrice / 12) : plan.price}
                        </span>
                        <span className="text-lg text-gray-500 ml-1">{t('pricing.month')}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg font-bold text-gray-900">定制ETL\业务系统对接\超级知识库\全托管模式等</span>
                        <span className="text-lg text-gray-500 ml-1 opacity-0">{t('pricing.month')}</span>
                      </>
                    )}
                  </div>
                  {isAnnual && typeof plan.price === 'number' && plan.price > 0 && typeof plan.yearlyPrice === 'number' ? (
                    <p className="text-sm text-gray-500 mt-1">
                      ${plan.yearlyPrice}{t('pricing.year')} ({t('pricing.save')} ${(plan.price * 12) - plan.yearlyPrice})
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">
                      {plan.name === 'PaidVersion' && !isAnnual ? '按年付费折扣更多' : ''}
                      {plan.name !== 'PaidVersion' && (
                        <span className="opacity-0">
                          ${plan.price === 0 ? '0' : 'custom'}{t('pricing.year')} ({t('pricing.save')} $0)
                        </span>
                      )}
                    </p>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6 flex-grow">{plan.description}</p>
                
                <div className="mb-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.notIncluded.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {plan.notIncluded.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <X className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <button
                  onClick={plan.name === 'Customizing' ? onContactSales : () => setShowTrialModal(true)}
                  className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl mt-auto"
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhance Your Plan Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('pricing.addons.title')}</h2>
            <p className="text-lg text-gray-600">{t('pricing.addons.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {addonsData.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow flex flex-col h-full min-h-[200px]">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{addon.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{addon.description}</p>
                <div className="mt-auto">
                  <div className="text-2xl font-bold text-emerald-600 mb-3">{addon.price}</div>
                  <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                    添加到方案
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Choose Your Payment Method
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Side - Payment Options */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Options</h3>
                
                <div className="space-y-4">
                  {/* Credit Card Option */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors ${
                    selectedPaymentMethod === 'credit-card' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment-method" 
                      value="credit-card" 
                      className="sr-only" 
                      checked={selectedPaymentMethod === 'credit-card'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    />
                    <div className={`w-5 h-5 border-2 rounded-full mr-4 flex items-center justify-center ${
                      selectedPaymentMethod === 'credit-card' ? 'border-emerald-600' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'credit-card' && (
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                        <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                        <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
                      </div>
                      <span className="font-medium text-gray-900">Credit/Debit Card</span>
                    </div>
                  </label>

                  {/* WeChat Pay Option */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors ${
                    selectedPaymentMethod === 'wechat' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment-method" 
                      value="wechat" 
                      className="sr-only"
                      checked={selectedPaymentMethod === 'wechat'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    />
                    <div className={`w-5 h-5 border-2 rounded-full mr-4 flex items-center justify-center ${
                      selectedPaymentMethod === 'wechat' ? 'border-emerald-600' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'wechat' && (
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">微</span>
                      </div>
                      <span className="font-medium text-gray-900">WeChat Pay</span>
                    </div>
                  </label>

                  {/* Alipay Option */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors ${
                    selectedPaymentMethod === 'alipay' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment-method" 
                      value="alipay" 
                      className="sr-only"
                      checked={selectedPaymentMethod === 'alipay'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    />
                    <div className={`w-5 h-5 border-2 rounded-full mr-4 flex items-center justify-center ${
                      selectedPaymentMethod === 'alipay' ? 'border-emerald-600' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'alipay' && (
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">支</span>
                      </div>
                      <span className="font-medium text-gray-900">Alipay</span>
                    </div>
                  </label>

                  {/* PayPal Option */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors ${
                    selectedPaymentMethod === 'paypal' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment-method" 
                      value="paypal" 
                      className="sr-only"
                      checked={selectedPaymentMethod === 'paypal'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    />
                    <div className={`w-5 h-5 border-2 rounded-full mr-4 flex items-center justify-center ${
                      selectedPaymentMethod === 'paypal' ? 'border-emerald-600' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'paypal' && (
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">PP</span>
                      </div>
                      <span className="font-medium text-gray-900">PayPal</span>
                    </div>
                  </label>
                </div>

                <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 text-emerald-600 mt-0.5">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-800">Secure Payment</p>
                      <p className="text-sm text-emerald-700">Your payment information is encrypted and secure. We never store your card details.</p>
                    </div>
                  </div>
                </div>

                {/* Request Invoice Section */}
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <input 
                      type="checkbox" 
                      id="need-invoice" 
                      checked={needInvoice}
                      onChange={(e) => setNeedInvoice(e.target.checked)}
                      className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label htmlFor="need-invoice" className="text-sm font-medium text-gray-900 cursor-pointer">
                        Request Invoice / 申请发票
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        We'll send you an official invoice for your records and tax purposes.
                      </p>
                    </div>
                  </div>

                  {needInvoice && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Type / 发票类型</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                            <option>VAT Invoice / 增值税</option>
                            <option>Regular Invoice / 普通发票</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Title / 发票抬头</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID / 纳税人识别号</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Tax Identification Number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address / 开票地址</label>
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            rows={3}
                            placeholder="Complete billing address"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Payment Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h3>
                
                {/* Credit Card Form */}
                {selectedPaymentMethod === 'credit-card' && (
                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Billing Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="123 Main Street"
                      />
                    </div>

                    {/* City and ZIP Code */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="ZIP Code"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* WeChat Pay QR Code */}
                {selectedPaymentMethod === 'wechat' && (
                  <div className="text-center">
                    <div className="bg-gray-50 rounded-lg p-8 mb-6">
                      <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg mx-auto flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">微</span>
                          </div>
                          <div className="space-y-2">
                            <div className="grid grid-cols-8 gap-1">
                              {Array.from({ length: 64 }, (_, i) => (
                                <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}></div>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-4">WeChat Pay QR Code</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900 mb-2">Scan with WeChat</p>
                        <p className="text-sm text-gray-600">Open WeChat app and scan the QR code to pay</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Alipay QR Code */}
                {selectedPaymentMethod === 'alipay' && (
                  <div className="text-center">
                    <div className="bg-gray-50 rounded-lg p-8 mb-6">
                      <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg mx-auto flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">支</span>
                          </div>
                          <div className="space-y-2">
                            <div className="grid grid-cols-8 gap-1">
                              {Array.from({ length: 64 }, (_, i) => (
                                <div key={i} className={`w-2 h-2 ${Math.random() > 0.4 ? 'bg-black' : 'bg-white'} rounded-sm`}></div>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-4">Alipay QR Code</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900 mb-2">Scan with Alipay</p>
                        <p className="text-sm text-gray-600">Open Alipay app and scan the QR code to pay</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal */}
                {selectedPaymentMethod === 'paypal' && (
                  <div className="text-center">
                    <div className="bg-gray-50 rounded-lg p-8 mb-6">
                      <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg mx-auto flex items-center justify-center mb-4">
                        <div className="text-center">
                          <div className="w-20 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">PayPal</span>
                          </div>
                          <div className="space-y-2">
                            <div className="grid grid-cols-8 gap-1">
                              {Array.from({ length: 64 }, (_, i) => (
                                <div key={i} className={`w-2 h-2 ${Math.random() > 0.6 ? 'bg-black' : 'bg-white'} rounded-sm`}></div>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-4">PayPal QR Code</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900 mb-2">Pay with PayPal</p>
                        <p className="text-sm text-gray-600">Scan the QR code or you'll be redirected to PayPal</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">PaidVersion Plan (Annual)</span>
                      <span className="font-medium">$756.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Discount (10%)</span>
                      <span className="font-medium text-emerald-600">-$84.00</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-emerald-600">$672.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Complete Payment Button */}
                <button className="w-full mt-6 py-3 px-6 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  {selectedPaymentMethod === 'credit-card' ? 'Complete Payment' : 
                   selectedPaymentMethod === 'wechat' ? 'Waiting for WeChat Payment' :
                   selectedPaymentMethod === 'alipay' ? 'Waiting for Alipay Payment' :
                   'Continue with PayPal'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('pricing.faq.title')}
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {getTranslationArray('pricing.faq.items').map((faq: any, index: number) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Trial Registration Modal */}
      <TrialRegistrationModal 
        isOpen={showTrialModal} 
        onClose={() => setShowTrialModal(false)} 
      />
    </div>
  );
};

export default Pricing;