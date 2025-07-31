import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProductDemo = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('原材料获取');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showBomAnimation, setShowBomAnimation] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [workStageIndex, setWorkStageIndex] = useState(2); // 从数据收集阶段开始
  const [isLooping, setIsLooping] = useState(true);

  // Helper function to get array from translation
  const getTranslationArray = (key: string): any[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  const workStages = [
    { name: 'Requirements Research', status: 'completed', icon: '✓' },
    { name: 'Regulation Matching', status: 'completed', icon: '✓' },
    { name: 'Data Collection', status: workStageIndex >= 2 ? (workStageIndex === 2 ? 'current' : 'completed') : 'pending', icon: workStageIndex >= 2 ? (workStageIndex === 2 ? '⏳' : '✓') : '○' },
    { name: 'Calculation', status: workStageIndex >= 3 ? (workStageIndex === 3 ? 'current' : 'completed') : 'pending', icon: workStageIndex >= 3 ? (workStageIndex === 3 ? '⏳' : '✓') : '○' },
    { name: 'Risk Analysis', status: workStageIndex >= 4 ? (workStageIndex === 4 ? 'current' : 'completed') : 'pending', icon: workStageIndex >= 4 ? (workStageIndex === 4 ? '⏳' : '✓') : '○' },
    { name: 'Report', status: workStageIndex >= 5 ? (workStageIndex === 5 ? 'current' : 'completed') : 'pending', icon: workStageIndex >= 5 ? (workStageIndex === 5 ? '⏳' : '✓') : '○' }
  ];

  const qualityMetrics = [
    { name: t('productDemo.riskAssessment.metrics.precision'), score: '87%' }
  ];

  const riskMetrics = [
    { name: 'Parameter Uncertainty', value: '15%' },
    { name: 'Model Uncertainty', value: '12%' },
    { name: 'Scenario Uncertainty', value: '18%' },
    { name: 'Data Quality Uncertainty', value: '10%' }
  ];

  const bomData = [
    { material: 'Aluminum Alloy', desc: 'Housing Material', weight: '45g', usage: '1', unit: 'pcs', factor: '8.24', source: 'Ecoinvent', confidence: '92%' },
    { material: 'Lithium Battery', desc: 'Power Component', weight: '28g', usage: '1', unit: 'pcs', factor: '12.6', source: 'Ecoinvent', confidence: '94%' },
    { material: 'Glass', desc: 'Screen Material', weight: '15g', usage: '1', unit: 'pcs', factor: '1.35', source: 'Ecoinvent', confidence: '91%' },
    { material: 'ABS Plastic', desc: 'Internal Components', weight: '12g', usage: '1', unit: 'pcs', factor: '3.2', source: 'Ecoinvent', confidence: '93%' },
    { material: 'Rare Earth Elements', desc: 'Electronic Components', weight: '2g', usage: '1', unit: 'pcs', factor: '45.8', source: 'Ecoinvent', confidence: '90%' },
    { material: 'Copper', desc: 'Wire Material', weight: '8g', usage: '1', unit: 'pcs', factor: '4.1', source: 'Ecoinvent', confidence: '95%' },
    { material: 'Silicon Chip', desc: 'Processor Chip', weight: '3g', usage: '1', unit: 'pcs', factor: '15.2', source: 'Ecoinvent', confidence: '96%' },
    { material: 'Steel', desc: 'Internal Frame', weight: '18g', usage: '1', unit: 'pcs', factor: '2.8', source: 'Ecoinvent', confidence: '94%' },
    { material: 'Ceramic', desc: 'Capacitor Material', weight: '4g', usage: '1', unit: 'pcs', factor: '6.7', source: 'Ecoinvent', confidence: '89%' },
    { material: 'Silver', desc: 'Circuit Connection', weight: '0.5g', usage: '1', unit: 'pcs', factor: '28.4', source: 'Ecoinvent', confidence: '97%' },
    { material: 'Polymer Film', desc: 'Screen Protection', weight: '2g', usage: '1', unit: 'pcs', factor: '5.3', source: 'Ecoinvent', confidence: '88%' }
  ];

  // Get chat messages from translation
  const chatMessages = [
    {
      type: 'ai',
      content: 'Hello! I am the Climate Seal AI assistant. I have matched the applicable regulatory standards for your product: ISO 14040/14067. Next, we need to enter the data collection phase.'
    },
    {
      type: 'user',
      content: 'Please continue.'
    },
    {
      type: 'ai',
      content: 'Great! We need you to provide raw material information. If you have a BOM table to upload, this will be very helpful for carbon emission accounting.'
    },
    {
      type: 'user',
      content: 'BOM table uploaded'
    },
    {
      type: 'ai',
      content: 'Received your BOM table with high completeness. We will continue with manufacturing phase data collection, then I will perform calculations for you.'
    }
  ].map((msg: any, index: number) => ({
    ...msg,
    stage: 'Raw Materials',
    delay: 1000 + index * 500,
    ...(index === 2 && { triggerBom: true }),
    ...(index === 4 && { triggerStageChange: 'Manufacturing' }),
    ...(index === 6 && { triggerStageChange: 'Transportation', triggerWorkStage: 3 }),
    ...(index === 7 && { triggerStageChange: 'Usage Phase' }),
    ...(index === 8 && { triggerStageChange: 'End of Life', triggerWorkStage: 4 }),
    ...(index === 9 && { triggerWorkStage: 5 }),
    ...(index === 10 && { triggerWorkStage: 6 })
  }));

  // 自动播放逻辑
  useEffect(() => {
    if (!isAutoPlaying) return;

    // 如果到达消息末尾且开启循环，重置演示
    if (currentMessageIndex >= chatMessages.length && isLooping) {
      const resetTimer = setTimeout(() => {
        resetDemo();
      }, 3000); // 等待3秒后重新开始
      return () => clearTimeout(resetTimer);
    }

    if (currentMessageIndex >= chatMessages.length) return;

    const currentMessage = chatMessages[currentMessageIndex];
    const timer = setTimeout(() => {
      // 添加新消息到显示列表
      setDisplayedMessages(prev => [...prev, currentMessage]);
      
      // 处理特殊触发器
      if (currentMessage.triggerBom) {
        setShowBomAnimation(true);
        setTimeout(() => setShowBomAnimation(false), 3000);
      }
      
      if (currentMessage.triggerStageChange) {
        setActiveTab(currentMessage.triggerStageChange);
      }
      
      if (currentMessage.triggerWorkStage) {
        setWorkStageIndex(currentMessage.triggerWorkStage);
      }
      
      setCurrentMessageIndex(prev => prev + 1);
    }, currentMessage.delay);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, isAutoPlaying, isLooping]);

  // 重置演示
  const resetDemo = () => {
    setCurrentMessageIndex(0);
    setDisplayedMessages([]);
    setActiveTab('Raw Materials');
    setWorkStageIndex(2);
    setShowBomAnimation(false);
    setIsAutoPlaying(true);
    setShowBomAnimation(false);
  };

  // 暂停/继续演示
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // 手动点击标签页时暂停自动播放
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsAutoPlaying(false);
  };

  const lifecycleTabs = [
    'Raw Materials',
    'Manufacturing',
    'Transportation',
    'Usage Phase',
    'End of Life'
  ];

  return (
    <div className="w-full bg-gray-900 text-white rounded-2xl overflow-hidden" style={{ height: '700px' }}>
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Climate Seal AI - Product Carbon Footprint Platform (Demo)</h3>
          
          {/* 演示控制按钮 */}
          <div className="flex space-x-2">
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`px-3 py-1 text-xs rounded ${
                isLooping 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {isLooping ? 'Loop Mode' : 'Single Mode'}
            </button>
            <button
              onClick={toggleAutoPlay}
              className={`px-3 py-1 text-xs rounded ${
                isAutoPlaying 
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isAutoPlaying ? 'Pause Demo' : 'Continue Demo'}
            </button>
            <button
              onClick={resetDemo}
              className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Restart
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - 三栏布局 */}
      <div className="flex h-full">
        {/* 左侧栏 - 工作阶段和风险评估 */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* 工作阶段 */}
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-emerald-400 font-medium text-sm mb-3">Work Stages</h4>
            <div className="space-y-2">
              {workStages.map((stage, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    stage.status === 'completed' ? 'bg-emerald-600 text-white' :
                    stage.status === 'current' ? 'bg-yellow-600 text-white' :
                    'bg-gray-600 text-gray-300'
                  }`}>
                    {stage.icon}
                  </div>
                  <span className={`text-xs ${
                    stage.status === 'completed' ? 'text-emerald-400' :
                    stage.status === 'current' ? 'text-yellow-400' :
                    'text-gray-400'
                  }`}>
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 风险评估与质量评分 */}
          <div className="flex-1 p-3 overflow-y-auto">
            <h4 className="text-emerald-400 font-medium text-sm mb-3">Risk Assessment & Quality Scoring</h4>
            
            {/* 数据质量评分 */}
            <div className="mb-4">
              <h5 className="text-white font-medium text-xs mb-2">Data Quality Score</h5>
              <div className="space-y-1">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-gray-300">{metric.name}</span>
                    <span className="text-emerald-400 font-medium text-xs">{metric.score}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-600">
                <div className="flex justify-between">
                  <span className="text-white font-medium text-xs">Overall Quality Score</span>
                  <span className="text-emerald-400 font-bold text-sm">88</span>
                </div>
              </div>
            </div>

            {/* 不确定性风险 */}
            <div>
              <h5 className="text-white font-medium text-xs mb-2">Uncertainty Risk</h5>
              <div className="space-y-1">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-gray-300">{metric.name}</span>
                    <span className="text-yellow-400 font-medium text-xs">{metric.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-600">
                <div className="flex justify-between">
                  <span className="text-white font-medium text-xs">Overall Risk Level</span>
                  <span className="text-yellow-400 font-bold text-xs">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中间区域 - 基础信息和生命周期分析 */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* 基础信息 */}
          <div className="p-6 border-b border-gray-700 bg-gray-800">
            <h4 className="text-emerald-400 font-medium text-sm mb-3">Basic Information</h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">Product Name</label>
                <input 
                  type="text" 
                  value="Smartphone" 
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">Sales Region</label>
                <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs">
                  <option>Global</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">Applicable Regulation</label>
                <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs">
                  <option>ISO 14040/14067</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">Data Collection Period</label>
                <input 
                  type="text" 
                  value="2023 Annual" 
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">Lifecycle Scope</label>
                <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs">
                  <option>Cradle to Grave</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">Disclosure Level</label>
                <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs">
                  <option>Certified Level</option>
                </select>
              </div>
            </div>
          </div>

          {/* 产品碳足迹生命周期分析 */}
          <div className="flex-1 p-4">
            <h4 className="text-emerald-400 font-medium text-sm mb-3">Product Carbon Footprint Lifecycle Analysis</h4>
            
            {/* 生命周期标签页 */}
            <div className="flex space-x-1 mb-3">
              {lifecycleTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-t-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 标签页内容 */}
            <div className="bg-gray-800 rounded-lg p-3 h-full overflow-y-auto relative">
              {/* BOM动画效果 */}
              {showBomAnimation && activeTab === 'Raw Materials' && (
                <div className="absolute inset-0 bg-emerald-600/20 rounded-lg flex items-center justify-center z-10 animate-pulse">
                  <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    📊 BOM Table Uploading...
                  </div>
                </div>
              )}
              
              {activeTab === 'Raw Materials' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">Raw Materials</h5>
                  <div className="mb-3">
                    <h6 className="text-emerald-400 text-xs font-medium mb-2">BOM Information</h6>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left py-1 text-gray-400 text-xs">Material Name</th>
                            <th className="text-left py-1 text-gray-400 text-xs">Description</th>
                            <th className="text-left py-1 text-gray-400 text-xs">Weight</th>
                            <th className="text-left py-1 text-gray-400 text-xs">Usage</th>
                            <th className="text-left py-1 text-gray-400 text-xs">Unit</th>
                            <th className="text-left py-1 text-gray-400 text-xs">Emission Factor</th>
                            <th className="text-left py-1 text-gray-400 text-xs">Factor Source</th>
                            <th className="text-left py-1 text-gray-400 text-xs">Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bomData.map((item, index) => (
                            <tr key={index} className="border-b border-gray-700">
                              <td className="py-1 text-white text-xs">{item.material}</td>
                              <td className="py-1 text-gray-300 text-xs">{item.desc}</td>
                              <td className="py-1 text-gray-300 text-xs">{item.weight}</td>
                              <td className="py-1 text-gray-300 text-xs">{item.usage}</td>
                              <td className="py-1 text-gray-300 text-xs">{item.unit}</td>
                              <td className="py-1 text-emerald-400 text-xs">{item.factor}</td>
                              <td className="py-1 text-blue-400 text-xs">{item.source}</td>
                              <td className="py-1 text-green-400 text-xs">{item.confidence}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'Manufacturing' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">Manufacturing</h5>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Electricity Consumption (kWh)</label>
                        <input type="text" value="12.5" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Natural Gas (m³)</label>
                        <input type="text" value="2.3" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Industrial Water (L)</label>
                        <input type="text" value="45" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Steam Consumption (kg)</label>
                        <input type="text" value="8.2" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Compressed Air (m³)</label>
                        <input type="text" value="15.6" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Wastewater Treatment (L)</label>
                        <input type="text" value="38" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Production Efficiency (%)</label>
                        <input type="text" value="92.5" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Waste Rate (%)</label>
                        <input type="text" value="3.2" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Transportation' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">Transportation</h5>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Sea Transport Distance (km)</label>
                        <input type="text" value="8000" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Road Transport (km)</label>
                        <input type="text" value="500" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Rail Transport (km)</label>
                        <input type="text" value="1200" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Air Transport (km)</label>
                        <input type="text" value="0" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Packaging Weight (g)</label>
                        <input type="text" value="85" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Load Utilization (%)</label>
                        <input type="text" value="78" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Storage Time (days)</label>
                        <input type="text" value="15" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Last Mile (km)</label>
                        <input type="text" value="25" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Usage Phase' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">Usage Phase</h5>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Annual Electricity (kWh)</label>
                        <input type="text" value="15.6" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Service Life (years)</label>
                        <input type="text" value="3" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Standby Power (W)</label>
                        <input type="text" value="0.8" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Active Power (W)</label>
                        <input type="text" value="3.2" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Charging Efficiency (%)</label>
                        <input type="text" value="85" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Daily Usage (h)</label>
                        <input type="text" value="4.5" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Maintenance Frequency (times/year)</label>
                        <input type="text" value="2" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Software Updates (times/year)</label>
                        <input type="text" value="12" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'End of Life' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">End of Life</h5>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Recycling Rate (%)</label>
                        <input type="text" value="75" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Incineration Rate (%)</label>
                        <input type="text" value="20" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Landfill Rate (%)</label>
                        <input type="text" value="5" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Disassembly Efficiency (%)</label>
                        <input type="text" value="88" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Precious Metal Recovery (%)</label>
                        <input type="text" value="92" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Plastic Recovery (%)</label>
                        <input type="text" value="65" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Transport to Recycling (km)</label>
                        <input type="text" value="35" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">Processing Energy (kWh)</label>
                        <input type="text" value="2.8" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧栏 - AI助手 */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col h-full">
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-emerald-400 font-medium text-sm flex items-center">
              💬 Climate Seal AI
            </h4>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto flex flex-col" style={{ minHeight: 0 }}>
            <div className="space-y-3 flex-1 overflow-y-auto">
              {displayedMessages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-2 rounded-lg text-xs ${
                    message.type === 'user' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-700 text-gray-200'
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}
              
              {/* 正在输入指示器 */}
              {isAutoPlaying && currentMessageIndex < chatMessages.length && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-200 p-2 rounded-lg text-xs">
                    ...
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat input area */}
            <div className="mt-3 pt-3 border-t border-gray-700 flex-shrink-0">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Type message..." 
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm h-10"
                  disabled
                />
                <button className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors h-10 w-10 flex items-center justify-center">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Chat input area */}
            <div className="mt-3 pt-3 border-t border-gray-700 flex-shrink-0">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Type message..." 
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm h-10"
                  disabled
                />
                <button className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors h-10 w-10 flex items-center justify-center">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDemo;