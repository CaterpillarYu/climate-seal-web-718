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
    { name: '需求调研', status: 'completed', icon: '✓' },
    { name: '法规匹配', status: 'completed', icon: '✓' },
    { name: '数据收集', status: workStageIndex >= 2 ? (workStageIndex === 2 ? 'current' : 'completed') : 'pending', icon: workStageIndex >= 2 ? (workStageIndex === 2 ? '⏳' : '✓') : '○' },
    { name: '计算', status: workStageIndex >= 3 ? (workStageIndex === 3 ? 'current' : 'completed') : 'pending', icon: workStageIndex >= 3 ? (workStageIndex === 3 ? '⏳' : '✓') : '○' },
    { name: '风险分析', status: workStageIndex >= 4 ? (workStageIndex === 4 ? 'current' : 'completed') : 'pending', icon: workStageIndex >= 4 ? (workStageIndex === 4 ? '⏳' : '✓') : '○' },
    { name: '报告', status: workStageIndex >= 5 ? (workStageIndex === 5 ? 'current' : 'completed') : 'pending', icon: workStageIndex >= 5 ? (workStageIndex === 5 ? '⏳' : '✓') : '○' }
  ];

  const bomData = [
    { material: '铝合金', desc: '外壳材料', weight: '45g', usage: '1', unit: 'pcs', factor: '8.24', source: 'Ecoinvent', confidence: '92%' },
    { material: '锂电池', desc: '电源组件', weight: '28g', usage: '1', unit: 'pcs', factor: '12.6', source: 'Ecoinvent', confidence: '94%' },
    { material: '玻璃', desc: '屏幕材料', weight: '15g', usage: '1', unit: 'pcs', factor: '1.35', source: 'Ecoinvent', confidence: '91%' },
    { material: '塑料ABS', desc: '内部组件', weight: '12g', usage: '1', unit: 'pcs', factor: '3.2', source: 'Ecoinvent', confidence: '93%' },
    { material: '稀土元素', desc: '电子元件', weight: '2g', usage: '1', unit: 'pcs', factor: '45.8', source: 'Ecoinvent', confidence: '90%' },
    { material: '铜', desc: '导线材料', weight: '8g', usage: '1', unit: 'pcs', factor: '4.1', source: 'Ecoinvent', confidence: '95%' },
    { material: '硅芯片', desc: '处理器芯片', weight: '3g', usage: '1', unit: 'pcs', factor: '15.2', source: 'Ecoinvent', confidence: '96%' },
    { material: '钢材', desc: '内部框架', weight: '18g', usage: '1', unit: 'pcs', factor: '2.8', source: 'Ecoinvent', confidence: '94%' },
    { material: '陶瓷', desc: '电容器材料', weight: '4g', usage: '1', unit: 'pcs', factor: '6.7', source: 'Ecoinvent', confidence: '89%' },
    { material: '银', desc: '电路连接', weight: '0.5g', usage: '1', unit: 'pcs', factor: '28.4', source: 'Ecoinvent', confidence: '97%' },
    { material: '聚合物薄膜', desc: '屏幕保护层', weight: '2g', usage: '1', unit: 'pcs', factor: '5.3', source: 'Ecoinvent', confidence: '88%' }
  ];

  const dataQualityMetrics = [
    { name: '数据完整性', score: '92%' },
    { name: '时间相关性', score: '88%' },
    { name: '地理相关性', score: '85%' },
    { name: '技术相关性', score: '90%' },
    { name: '精度不确定性', score: '87%' }
  ];

  const riskMetrics = [
    { name: '参数不确定性', value: '15%' },
    { name: '模型不确定性', value: '12%' },
    { name: '情景不确定性', value: '18%' },
    { name: '数据质量不确定性', value: '10%' }
  ];

  // Get chat messages from translation
  const chatMessages = [
    {
      type: 'ai',
      content: '您好！我是Climate Seal AI助手。我已经根据您的产品基础信息为您匹配了适用的法规标准：ISO 14040/14067。接下来我们要进入数据收集阶段。'
    },
    {
      type: 'user',
      content: '请你继续。'
    },
    {
      type: 'ai',
      content: '好的，我们需要您提供原材料的相关信息，如果您有BOM表格并上传，这对于碳排放的核算有非常大的帮助。'
    },
    {
      type: 'user',
      content: '已上传BOM表格'
    },
    {
      type: 'ai',
      content: '收到您的BOM表格，完整度很高，我们将继续完成生产制造阶段的一些信息采集，然后我将为你执行计算，可以吗'
    }
  ].map((msg: any, index: number) => ({
    ...msg,
    stage: '原材料获取',
    delay: 1000 + index * 500,
    ...(index === 2 && { triggerBom: true }),
    ...(index === 4 && { triggerStageChange: '生产制造' }),
    ...(index === 6 && { triggerStageChange: '运输配送', triggerWorkStage: 3 }),
    ...(index === 7 && { triggerStageChange: '使用阶段' }),
    ...(index === 8 && { triggerStageChange: '废弃处理', triggerWorkStage: 4 }),
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
    setActiveTab('原材料获取');
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
    '原材料获取',
    '生产制造',
    '运输配送',
    '使用阶段',
    '废弃处理'
  ];

  return (
    <div className="w-full bg-gray-900 text-white rounded-2xl overflow-hidden" style={{ height: '700px' }}>
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">产品碳足迹平台</h3>
          
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
              {isLooping ? '循环模式' : '单次模式'}
            </button>
            <button
              onClick={toggleAutoPlay}
              className={`px-3 py-1 text-xs rounded ${
                isAutoPlaying 
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isAutoPlaying ? '暂停演示' : '继续演示'}
            </button>
            <button
              onClick={resetDemo}
              className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              重新开始
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
            <h4 className="text-emerald-400 font-medium text-sm mb-3">工作阶段</h4>
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
            <h4 className="text-emerald-400 font-medium text-sm mb-3">风险评估与质量评分</h4>
            
            {/* 数据质量评分 */}
            <div className="mb-4">
              <h5 className="text-white font-medium text-xs mb-2">数据质量评分</h5>
              <div className="space-y-1">
                {dataQualityMetrics.map((metric, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-gray-300">{metric.name}</span>
                    <span className="text-emerald-400 font-medium text-xs">{metric.score}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-600">
                <div className="flex justify-between">
                  <span className="text-white font-medium text-xs">综合质量评分</span>
                  <span className="text-emerald-400 font-bold text-sm">88分</span>
                </div>
              </div>
            </div>

            {/* 不确定性风险 */}
            <div>
              <h5 className="text-white font-medium text-xs mb-2">不确定性风险</h5>
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
                  <span className="text-white font-medium text-xs">综合风险等级</span>
                  <span className="text-yellow-400 font-bold text-xs">中等</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中间区域 - 基础信息和生命周期分析 */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* 基础信息 */}
          <div className="p-6 border-b border-gray-700 bg-gray-800">
            <h4 className="text-emerald-400 font-medium text-sm mb-3">基础信息</h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">产品名称</label>
                <input 
                  type="text" 
                  value="智能手机" 
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">销售区域</label>
                <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs">
                  <option>全球</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">适配法规</label>
                <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs">
                  <option>ISO 14040/14067</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">数据收集周期</label>
                <input 
                  type="text" 
                  value="2023年度" 
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">生命周期范围</label>
                <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs">
                  <option>摇篮到坟墓</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 text-xs">披露等级</label>
                <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs">
                  <option>认证级</option>
                </select>
              </div>
            </div>
          </div>

          {/* 产品碳足迹生命周期分析 */}
          <div className="flex-1 p-4">
            <h4 className="text-emerald-400 font-medium text-sm mb-3">产品碳足迹生命周期分析</h4>
            
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
              {showBomAnimation && activeTab === '原材料获取' && (
                <div className="absolute inset-0 bg-emerald-600/20 rounded-lg flex items-center justify-center z-10 animate-pulse">
                  <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    📊 BOM表格上传中...
                  </div>
                </div>
              )}
              
              {activeTab === '原材料获取' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">原材料获取</h5>
                  <div className="mb-3">
                    <h6 className="text-emerald-400 text-xs font-medium mb-2">BOM信息</h6>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left py-1 text-gray-400 text-xs">材料名称</th>
                            <th className="text-left py-1 text-gray-400 text-xs">描述</th>
                            <th className="text-left py-1 text-gray-400 text-xs">重量</th>
                            <th className="text-left py-1 text-gray-400 text-xs">使用量</th>
                            <th className="text-left py-1 text-gray-400 text-xs">单位</th>
                            <th className="text-left py-1 text-gray-400 text-xs">排放因子</th>
                            <th className="text-left py-1 text-gray-400 text-xs">因子来源</th>
                            <th className="text-left py-1 text-gray-400 text-xs">置信度</th>
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
              
              {activeTab === '生产制造' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">生产制造</h5>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">电力消耗 (kWh)</label>
                        <input type="text" value="12.5" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">天然气 (m³)</label>
                        <input type="text" value="2.3" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">工业用水 (L)</label>
                        <input type="text" value="45" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">蒸汽消耗 (kg)</label>
                        <input type="text" value="8.2" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">压缩空气 (m³)</label>
                        <input type="text" value="15.6" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">废水处理 (L)</label>
                        <input type="text" value="38" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">生产效率 (%)</label>
                        <input type="text" value="92.5" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">废品率 (%)</label>
                        <input type="text" value="3.2" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '运输配送' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">运输配送</h5>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">海运距离 (km)</label>
                        <input type="text" value="8000" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">公路运输 (km)</label>
                        <input type="text" value="500" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">铁路运输 (km)</label>
                        <input type="text" value="1200" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">航空运输 (km)</label>
                        <input type="text" value="0" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">包装重量 (g)</label>
                        <input type="text" value="85" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">载重利用率 (%)</label>
                        <input type="text" value="78" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">仓储时间 (天)</label>
                        <input type="text" value="15" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">最后一公里 (km)</label>
                        <input type="text" value="25" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '使用阶段' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">使用阶段</h5>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">年均用电量 (kWh)</label>
                        <input type="text" value="15.6" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">使用寿命 (年)</label>
                        <input type="text" value="3" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">待机功率 (W)</label>
                        <input type="text" value="0.8" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">工作功率 (W)</label>
                        <input type="text" value="3.2" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">充电效率 (%)</label>
                        <input type="text" value="85" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">日均使用 (h)</label>
                        <input type="text" value="4.5" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">维护频次 (次/年)</label>
                        <input type="text" value="2" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">软件更新 (次/年)</label>
                        <input type="text" value="12" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '废弃处理' && (
                <div>
                  <h5 className="text-white font-medium text-xs mb-2">废弃处理</h5>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">回收率 (%)</label>
                        <input type="text" value="75" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">焚烧率 (%)</label>
                        <input type="text" value="20" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">填埋率 (%)</label>
                        <input type="text" value="5" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">拆解效率 (%)</label>
                        <input type="text" value="88" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">贵金属回收 (%)</label>
                        <input type="text" value="92" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">塑料回收 (%)</label>
                        <input type="text" value="65" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">运输到回收点 (km)</label>
                        <input type="text" value="35" className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1 text-xs">处理能耗 (kWh)</label>
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
          
          <div className="flex-1 p-3 overflow-y-auto flex flex-col">
            <div className="space-y-3 flex-1">
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
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="输入消息..." 
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                  disabled
                />
                <button className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
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