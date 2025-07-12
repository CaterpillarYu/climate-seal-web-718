import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, Clock, AlertTriangle, TrendingUp, Database, Zap, Truck, Recycle, MessageSquare, Send, GripVertical, X } from 'lucide-react';

interface ProductTrial2Props {
  onBack: () => void;
  isEmbedded?: boolean;
}

const ProductTrial2: React.FC<ProductTrial2Props> = ({ onBack, isEmbedded = false }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', content: '您好！我是Climate Seal AI助手。我已经根据您的产品基础信息为您匹配了适用的法规标准：ISO 14040/14067。接下来我们要进入数据收集阶段。' },
    { type: 'user', content: '请你继续。' },
    { type: 'ai', content: '好的，我们需要您提供原材料的相关信息，如果您有BOM表格并上传，这对于碳排放的核算有非常大的帮助。' },
    { type: 'user', content: '已上传BOM表格' },
    { type: 'ai', content: '收到您的BOM表格，完整度很高，我们将继续完成生产制造阶段的一些信息采集，然后我将为你执行计算，可以吗' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    
    // Company Info
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    country: '',
    
    // Use Case
    useCase: '',
    monthlyVolume: '',
    currentSolution: '',
    
    // Account Setup
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreeMarketing: false
  });

  const stages = [
    { name: '需求调研', status: 'completed' },
    { name: '法规匹配', status: 'completed' },
    { name: '数据收集', status: 'running' },
    { name: '计算', status: 'pending' },
    { name: '风险分析', status: 'pending' },
    { name: '报告', status: 'pending' }
  ];

  const lifecycleStages = [
    { name: '原材料获取', icon: <Database className="h-4 w-4" /> },
    { name: '生产制造', icon: <Zap className="h-4 w-4" /> },
    { name: '运输配送', icon: <Truck className="h-4 w-4" /> },
    { name: '使用阶段', icon: <TrendingUp className="h-4 w-4" /> },
    { name: '废弃处理', icon: <Recycle className="h-4 w-4" /> }
  ];

  // 模拟鼠标移动
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setMousePosition(prev => ({
          x: Math.max(50, Math.min(window.innerWidth - 50, prev.x + (Math.random() - 0.5) * 100)),
          y: Math.max(50, Math.min(window.innerHeight - 50, prev.y + (Math.random() - 0.5) * 100))
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  // 拖拽功能
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - dragPosition.x,
      y: e.clientY - dragPosition.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setDragPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStage(0);
    setActiveTab(0);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { type: 'user', content: newMessage }]);
      setNewMessage('');
      // 模拟AI回复
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          type: 'ai', 
          content: '我正在处理您的请求，请稍候...' 
        }]);
      }, 1000);
    }
  };

  const handleStartTrial = () => {
    setShowRegistration(true);
  };

  const handleRegistrationInputChange = (field: string, value: string | boolean) => {
    setRegistrationData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (registrationStep < 4) {
      setRegistrationStep(registrationStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
    }
  };

  const handleSubmitRegistration = () => {
    // 这里处理注册提交逻辑
    alert('注册成功！欢迎开始您的14天免费试用！');
    setShowRegistration(false);
  };

  return (
    <div className={`${isEmbedded ? 'h-[800px] w-full' : 'min-h-screen'} bg-gray-900 text-white relative`}>
      {/* 模拟鼠标指针 */}
      {isRunning && (
        <div 
          className="fixed w-4 h-4 bg-green-400 rounded-full pointer-events-none z-50 transition-all duration-1000"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Header */}
      {!isEmbedded && (
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              返回首页
            </button>
            <h1 className="text-xl font-semibold">Climate Seal AI - 产品碳足迹分析平台（示意）</h1>
            <div className="w-20"></div>
          </div>
        </div>
      )}
      
      {isEmbedded && (
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Climate Seal AI - 产品碳足迹分析平台（示意）</h1>
          </div>
        </div>
      )}

      {/* Main Content - 85% width, centered */}
      <div className="w-[85%] mx-auto p-4 flex gap-4 h-[calc(100vh-280px)]">
        {/* Left Sidebar - 240px width */}
        <div className="w-60 space-y-4 flex flex-col h-full">
          {/* Work Stages - Fixed height */}
          <div className="bg-gray-800 rounded-lg p-4 h-64">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">工作阶段</h3>
            <div className="space-y-3">
              {stages.map((stage, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {stage.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : stage.status === 'running' ? (
                    <Clock className="h-5 w-5 text-yellow-400 animate-spin" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-500 rounded-full" />
                  )}
                  <span className={`text-sm ${
                    stage.status === 'completed' ? 'text-green-400' :
                    stage.status === 'running' ? 'text-yellow-400' : 'text-gray-400'
                  }`}>
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment - Scrollable */}
          <div className="bg-gray-800 rounded-lg p-4 flex-1 overflow-y-auto min-h-0">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">风险评估与质量评分</h3>
            
            {/* Data Quality Score */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">数据质量评分</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">数据完整性</span>
                  <span className="text-green-400">92%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">时间相关性</span>
                  <span className="text-green-400">88%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">地理相关性</span>
                  <span className="text-yellow-400">85%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">技术相关性</span>
                  <span className="text-green-400">90%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">精度不确定性</span>
                  <span className="text-green-400">87%</span>
                </div>
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-white">综合质量评分</span>
                    <span className="text-emerald-400">88分</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Uncertainty Risk */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">不确定性风险</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">参数不确定性</span>
                  <span className="text-yellow-400">15%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">模型不确定性</span>
                  <span className="text-green-400">12%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">情景不确定性</span>
                  <span className="text-orange-400">18%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">数据质量不确定性</span>
                  <span className="text-green-400">10%</span>
                </div>
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-white">综合风险等级</span>
                    <span className="text-yellow-400">中等</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Flexible width */}
        <div className="flex-1 mx-3 space-y-4 flex flex-col h-full">
          {/* Basic Information Section */}
          <div className="bg-gray-800 rounded-lg p-4 h-64">
            <h3 className="text-lg font-semibold mb-3 text-emerald-400">基础信息</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">产品名称</label>
                <input 
                  type="text" 
                  defaultValue="智能手机"
                  className="w-full px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">销售区域</label>
                <select className="w-full px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white">
                  <option>全球</option>
                  <option>中国</option>
                  <option>欧洲</option>
                  <option>北美</option>
                  <option>亚太</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">适配法规</label>
                <select className="w-full px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white">
                  <option>ISO 14040/14067</option>
                  <option>PAS 2050</option>
                  <option>GHG Protocol</option>
                  <option>ILCD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">数据收集周期</label>
                <input 
                  type="text" 
                  defaultValue="2023年度"
                  className="w-full px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">生命周期范围</label>
                <select className="w-full px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white">
                  <option>摇篮到坟墓</option>
                  <option>摇篮到大门</option>
                  <option>大门到大门</option>
                  <option>大门到坟墓</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">披露等级</label>
                <select className="w-full px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-white">
                  <option>认证级</option>
                  <option>验证级</option>
                  <option>自我声明</option>
                  <option>内部使用</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Carbon Footprint Lifecycle Analysis */}
          <div className="bg-gray-800 rounded-lg p-4 flex-1 min-h-0 max-h-[calc(100%-272px)]">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">产品碳足迹生命周期分析</h3>
            
            {/* Lifecycle Stage Tabs */}
            <div className="flex space-x-1 mb-4 bg-gray-700 rounded-lg p-1">
              {lifecycleStages.map((stage, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                    activeTab === index
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-600'
                  }`}
                >
                  {stage.icon}
                  <span>{stage.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gray-700 rounded-lg p-4 overflow-y-auto" style={{ height: 'calc(100% - 100px)' }}>
              {activeTab === 0 && (
                <div>
                  <h4 className="text-sm font-medium text-emerald-400 mb-3">原材料获取阶段</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">BOM信息</h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-gray-400">
                              <th className="text-left p-1">材料名称</th>
                              <th className="text-left p-1">描述</th>
                              <th className="text-left p-1">重量</th>
                              <th className="text-left p-1">使用量</th>
                              <th className="text-left p-1">单位</th>
                              <th className="text-left p-1">排放因子</th>
                              <th className="text-left p-1">因子来源</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-300">
                            <tr>
                              <td className="p-1">铝合金</td>
                              <td className="p-1">外壳材料</td>
                              <td className="p-1">45g</td>
                              <td className="p-1">1</td>
                              <td className="p-1">件</td>
                              <td className="p-1">8.24</td>
                              <td className="p-1">Ecoinvent</td>
                            </tr>
                            <tr>
                              <td className="p-1">锂电池</td>
                              <td className="p-1">电源组件</td>
                              <td className="p-1">28g</td>
                              <td className="p-1">1</td>
                              <td className="p-1">件</td>
                              <td className="p-1">12.6</td>
                              <td className="p-1">Ecoinvent</td>
                            </tr>
                            <tr>
                              <td className="p-1">玻璃</td>
                              <td className="p-1">屏幕材料</td>
                              <td className="p-1">15g</td>
                              <td className="p-1">1</td>
                              <td className="p-1">件</td>
                              <td className="p-1">1.35</td>
                              <td className="p-1">Ecoinvent</td>
                            </tr>
                            <tr>
                              <td className="p-1">塑料ABS</td>
                              <td className="p-1">内部结构件</td>
                              <td className="p-1">32g</td>
                              <td className="p-1">1</td>
                              <td className="p-1">件</td>
                              <td className="p-1">3.45</td>
                              <td className="p-1">Ecoinvent</td>
                            </tr>
                            <tr>
                              <td className="p-1">稀土元素</td>
                              <td className="p-1">电子元件</td>
                              <td className="p-1">8g</td>
                              <td className="p-1">1</td>
                              <td className="p-1">件</td>
                              <td className="p-1">25.8</td>
                              <td className="p-1">IDEMAT</td>
                            </tr>
                            <tr>
                              <td className="p-1">铜</td>
                              <td className="p-1">电路板</td>
                              <td className="p-1">12g</td>
                              <td className="p-1">1</td>
                              <td className="p-1">件</td>
                              <td className="p-1">4.2</td>
                              <td className="p-1">Ecoinvent</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">材料采购信息</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">主要供应商地区</span>
                          <span className="text-white">中国华南地区</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">运输距离</span>
                          <span className="text-white">平均350km</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">包装材料</span>
                          <span className="text-white">纸箱+泡沫塑料</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">废料率</span>
                          <span className="text-yellow-400">5-8%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">回收材料比例</span>
                          <span className="text-green-400">铝合金30%, 塑料15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div>
                  <h4 className="text-sm font-medium text-emerald-400 mb-3">生产制造阶段</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">生产工艺与能耗</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">总电力消耗</span>
                          <span className="text-white">2.5 kWh/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">天然气消耗</span>
                          <span className="text-white">0.8 m³/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">工业用水</span>
                          <span className="text-white">15 L/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">压缩空气</span>
                          <span className="text-white">0.3 m³/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">生产周期</span>
                          <span className="text-white">2.5小时/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">设备利用率</span>
                          <span className="text-green-400">85%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">生产工序详情</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">注塑成型</span>
                          <span className="text-white">0.8 kWh/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">表面处理</span>
                          <span className="text-white">0.6 kWh/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">组装工序</span>
                          <span className="text-white">0.4 kWh/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">质量检测</span>
                          <span className="text-white">0.3 kWh/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">包装工序</span>
                          <span className="text-white">0.4 kWh/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">废料处理</span>
                          <span className="text-yellow-400">3% 总能耗</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <h4 className="text-sm font-medium text-emerald-400 mb-3">运输配送阶段</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">运输路径与方式</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">海运 (工厂→港口)</span>
                          <span className="text-white">8000 km, 集装箱船</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">公路运输 (港口→仓库)</span>
                          <span className="text-white">500 km, 重型卡车</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">最后一公里配送</span>
                          <span className="text-white">50 km, 轻型货车</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">仓储时间</span>
                          <span className="text-white">平均30天</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">包装重量</span>
                          <span className="text-white">180g/台</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">装载率</span>
                          <span className="text-green-400">海运95%, 陆运80%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">运输效率与燃料</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">海运燃料类型</span>
                          <span className="text-white">重油 (HFO)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">卡车燃料类型</span>
                          <span className="text-white">柴油 (Euro VI)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">配送车燃料</span>
                          <span className="text-white">汽油/电动混合</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">冷链运输比例</span>
                          <span className="text-yellow-400">0% (无需冷链)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">返程空载率</span>
                          <span className="text-orange-400">海运5%, 陆运25%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">运输损耗率</span>
                          <span className="text-green-400">0.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div>
                  <h4 className="text-sm font-medium text-emerald-400 mb-3">使用阶段</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">使用模式与能耗</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">年均用电量</span>
                          <span className="text-white">8.76 kWh/年</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">使用寿命</span>
                          <span className="text-white">3 年</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">日均使用时长</span>
                          <span className="text-white">6 小时/天</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">待机功耗</span>
                          <span className="text-white">0.5 W</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">使用功耗</span>
                          <span className="text-white">3.2 W</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">充电效率</span>
                          <span className="text-green-400">92%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">维护与升级</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">软件更新频次</span>
                          <span className="text-white">6 次/年</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">硬件维修率</span>
                          <span className="text-yellow-400">8% (3年内)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">电池更换</span>
                          <span className="text-orange-400">1次 (第2年)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">配件消耗</span>
                          <span className="text-white">充电线、保护壳</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">数据传输量</span>
                          <span className="text-white">2.5 GB/月</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">云服务使用</span>
                          <span className="text-white">存储+计算服务</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 4 && (
                <div>
                  <h4 className="text-sm font-medium text-emerald-400 mb-3">废弃处理阶段</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">废弃处理路径</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">正规回收渠道</span>
                          <span className="text-white">70%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">能量回收焚烧</span>
                          <span className="text-white">20%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">安全填埋</span>
                          <span className="text-white">10%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">收集运输距离</span>
                          <span className="text-white">平均25km</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">预处理工序</span>
                          <span className="text-white">拆解+分类</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">处理设施类型</span>
                          <span className="text-white">专业电子废料厂</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded p-3">
                      <h5 className="text-xs font-medium text-gray-300 mb-2">材料回收效率</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">铝合金回收率</span>
                          <span className="text-green-400">85%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">塑料回收率</span>
                          <span className="text-yellow-400">45%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">稀土元素回收率</span>
                          <span className="text-green-400">78%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">锂电池回收率</span>
                          <span className="text-green-400">92%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">玻璃回收率</span>
                          <span className="text-green-400">95%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">有害物质处理</span>
                          <span className="text-orange-400">专业无害化</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Assistant - 384px width, match left sidebar height */}
        <div className="w-96 bg-gray-800 rounded-lg flex flex-col h-full min-h-0">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-emerald-400">Climate Seal AI</h3>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-0">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input - Fixed at bottom of AI assistant area */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="输入消息..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">开始免费试用</h2>
                  <p className="text-emerald-100 mt-1">14天免费试用，无需信用卡</p>
                </div>
                <button
                  onClick={() => setShowRegistration(false)}
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center mt-6 space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= registrationStep 
                        ? 'bg-white text-emerald-600' 
                        : 'bg-emerald-500 text-emerald-100'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-8 h-0.5 mx-2 ${
                        step < registrationStep ? 'bg-white' : 'bg-emerald-500'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Step 1: Personal Information */}
              {registrationStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">个人信息</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          名字 *
                        </label>
                        <input
                          type="text"
                          value={registrationData.firstName}
                          onChange={(e) => handleRegistrationInputChange('firstName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                          placeholder="请输入您的名字"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          姓氏 *
                        </label>
                        <input
                          type="text"
                          value={registrationData.lastName}
                          onChange={(e) => handleRegistrationInputChange('lastName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                          placeholder="请输入您的姓氏"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          企业邮箱 *
                        </label>
                        <input
                          type="email"
                          value={registrationData.email}
                          onChange={(e) => handleRegistrationInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                          placeholder="your.name@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          手机号码 *
                        </label>
                        <input
                          type="tel"
                          value={registrationData.phone}
                          onChange={(e) => handleRegistrationInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                          placeholder="+86 138 0000 0000"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          职位 *
                        </label>
                        <select
                          value={registrationData.jobTitle}
                          onChange={(e) => handleRegistrationInputChange('jobTitle', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                        >
                          <option value="">请选择您的职位</option>
                          <option value="ceo">CEO/总裁</option>
                          <option value="cto">CTO/技术总监</option>
                          <option value="sustainability">可持续发展总监</option>
                          <option value="environmental">环境经理</option>
                          <option value="product">产品经理</option>
                          <option value="engineer">工程师</option>
                          <option value="analyst">分析师</option>
                          <option value="consultant">顾问</option>
                          <option value="other">其他</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Company Information */}
              {registrationStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">公司信息</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          公司名称 *
                        </label>
                        <input
                          type="text"
                          value={registrationData.companyName}
                          onChange={(e) => handleRegistrationInputChange('companyName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                          placeholder="请输入公司名称"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            公司规模 *
                          </label>
                          <select
                            value={registrationData.companySize}
                            onChange={(e) => handleRegistrationInputChange('companySize', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                          >
                            <option value="">请选择公司规模</option>
                            <option value="1-10">1-10人</option>
                            <option value="11-50">11-50人</option>
                            <option value="51-200">51-200人</option>
                            <option value="201-1000">201-1000人</option>
                            <option value="1001-5000">1001-5000人</option>
                            <option value="5000+">5000人以上</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            所在国家/地区 *
                          </label>
                          <select
                            value={registrationData.country}
                            onChange={(e) => handleRegistrationInputChange('country', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                          >
                            <option value="">请选择国家/地区</option>
                            <option value="china">中国</option>
                            <option value="usa">美国</option>
                            <option value="germany">德国</option>
                            <option value="uk">英国</option>
                            <option value="japan">日本</option>
                            <option value="singapore">新加坡</option>
                            <option value="other">其他</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          行业 *
                        </label>
                        <select
                          value={registrationData.industry}
                          onChange={(e) => handleRegistrationInputChange('industry', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                        >
                          <option value="">请选择行业</option>
                          <option value="manufacturing">制造业</option>
                          <option value="electronics">电子科技</option>
                          <option value="automotive">汽车行业</option>
                          <option value="textile">纺织服装</option>
                          <option value="food">食品饮料</option>
                          <option value="chemical">化工</option>
                          <option value="energy">能源</option>
                          <option value="construction">建筑建材</option>
                          <option value="consulting">咨询服务</option>
                          <option value="other">其他</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          公司网站
                        </label>
                        <input
                          type="url"
                          value={registrationData.website}
                          onChange={(e) => handleRegistrationInputChange('website', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="https://www.company.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Use Case */}
              {registrationStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">使用场景</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          主要使用场景 *
                        </label>
                        <select
                          value={registrationData.useCase}
                          onChange={(e) => handleRegistrationInputChange('useCase', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                        >
                          <option value="">请选择主要使用场景</option>
                          <option value="product-lca">产品生命周期评估</option>
                          <option value="carbon-footprint">产品碳足迹计算</option>
                          <option value="supply-chain">供应链碳管理</option>
                          <option value="esg-reporting">ESG报告</option>
                          <option value="regulatory-compliance">法规合规</option>
                          <option value="carbon-reduction">碳减排策略</option>
                          <option value="research">学术研究</option>
                          <option value="other">其他</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          预计月度分析量 *
                        </label>
                        <select
                          value={registrationData.monthlyVolume}
                          onChange={(e) => handleRegistrationInputChange('monthlyVolume', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                        >
                          <option value="">请选择月度分析量</option>
                          <option value="1-10">1-10个产品</option>
                          <option value="11-50">11-50个产品</option>
                          <option value="51-200">51-200个产品</option>
                          <option value="201-1000">201-1000个产品</option>
                          <option value="1000+">1000个以上</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          当前使用的解决方案
                        </label>
                        <select
                          value={registrationData.currentSolution}
                          onChange={(e) => handleRegistrationInputChange('currentSolution', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                        >
                          <option value="">请选择当前解决方案</option>
                          <option value="excel">Excel手工计算</option>
                          <option value="simapro">SimaPro</option>
                          <option value="gabi">GaBi</option>
                          <option value="openLCA">openLCA</option>
                          <option value="consultant">外部咨询</option>
                          <option value="none">暂无</option>
                          <option value="other">其他</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Account Setup */}
              {registrationStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">账户设置</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          设置密码 *
                        </label>
                        <input
                          type="password"
                          value={registrationData.password}
                          onChange={(e) => handleRegistrationInputChange('password', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                          placeholder="至少8位，包含字母和数字"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          确认密码 *
                        </label>
                        <input
                          type="password"
                          value={registrationData.confirmPassword}
                          onChange={(e) => handleRegistrationInputChange('confirmPassword', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                          placeholder="请再次输入密码"
                        />
                      </div>
                      
                      <div className="space-y-3 pt-4">
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={registrationData.agreeTerms}
                            onChange={(e) => handleRegistrationInputChange('agreeTerms', e.target.checked)}
                            className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            我已阅读并同意 <a href="#" className="text-emerald-600 hover:text-emerald-700">服务条款</a> 和 <a href="#" className="text-emerald-600 hover:text-emerald-700">隐私政策</a> *
                          </span>
                        </label>
                        
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={registrationData.agreeMarketing}
                            onChange={(e) => handleRegistrationInputChange('agreeMarketing', e.target.checked)}
                            className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            我同意接收产品更新、行业洞察和营销信息
                          </span>
                        </label>
                      </div>
                      
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-6">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-emerald-800">免费试用说明</p>
                            <ul className="text-sm text-emerald-700 mt-1 space-y-1">
                              <li>• 包含50次排放因子匹配</li>
                              <li>• 完整的碳足迹分析报告</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-between items-center">
              <div className="text-sm text-gray-500">
                步骤 {registrationStep} / 4
              </div>
              <div className="flex space-x-3">
                {registrationStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    上一步
                  </button>
                )}
                {registrationStep < 4 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    下一步
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitRegistration}
                    disabled={!registrationData.agreeTerms}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    开始免费试用
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trial Notice */}
      <div 
        className="fixed bg-white text-gray-900 px-6 py-4 rounded-xl shadow-2xl max-w-sm cursor-move border border-gray-200"
        style={{
          left: `${dragPosition.x}px`,
          top: `${dragPosition.y}px`
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">免费试用</span>
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            <ul className="space-y-1">
              <li>• 包含 50 次排放因子匹配</li>
              <li>• 完整的碳足迹分析报告</li>
            </ul>
          </div>
          
          <button 
            onClick={handleStartTrial}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            立即开始试用
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTrial2;