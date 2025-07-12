import React from 'react';
import { Target, Users, Globe, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="relative">
              <img
                src="/image copy.png"
                alt="Polar bear family in Arctic environment"
                className="rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-3xl"></div>
              
              {/* 浮动装饰元素 */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full opacity-30 animate-bounce"></div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-sky-500 rounded-full"></div>
              <div className="bg-gradient-to-r from-emerald-50 via-white to-sky-50 p-8 rounded-2xl border border-emerald-100 shadow-lg backdrop-blur-sm">
                <p className="text-gray-700 leading-relaxed font-medium text-lg">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600 font-bold text-xl">我们相信</span> 通过技术创新可以让碳足迹计算变得简单、准确、可负担，助力全球实现碳中和目标。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-sky-800 bg-clip-text text-transparent mb-6 leading-tight">
                关于我们
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                致力于推动全球碳中和进程
              </p>
            </div>

            <div className="grid gap-6">
              {[
                {
                  icon: Target,
                  title: "数字化MRV体系",
                  description: "建立完整的数字化监测、报告和核查体系，确保碳数据的准确性和可追溯性。",
                  gradient: "from-emerald-500 to-teal-500",
                  bgGradient: "from-emerald-50 to-teal-50",
                  borderGradient: "from-emerald-200 to-teal-200"
                },
                {
                  icon: Users,
                  title: "分层保证体系",
                  description: "提供多层次的质量保证机制，从自我声明到第三方认证，满足不同需求。",
                  gradient: "from-sky-500 to-blue-500",
                  bgGradient: "from-sky-50 to-blue-50",
                  borderGradient: "from-sky-200 to-blue-200"
                },
                {
                  icon: Globe,
                  title: "共享数据库",
                  description: "构建全球共享的碳排放因子数据库，提高计算效率和数据一致性。",
                  gradient: "from-purple-500 to-indigo-500",
                  bgGradient: "from-purple-50 to-indigo-50",
                  borderGradient: "from-purple-200 to-indigo-200"
                },
                {
                  icon: TrendingUp,
                  title: "嵌入式API",
                  description: "提供易于集成的API接口，让碳足迹计算能力无缝嵌入到各种业务系统中。",
                  gradient: "from-orange-500 to-red-500",
                  bgGradient: "from-orange-50 to-red-50",
                  borderGradient: "from-orange-200 to-red-200"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${item.bgGradient} p-6 rounded-2xl border border-transparent bg-clip-padding hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden`}
                  style={{
                    backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, var(--tw-gradient-stops))`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  {/* 悬停时的背景光效 */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="flex items-start space-x-4 relative z-10">
                    <div className={`bg-gradient-to-br ${item.gradient} p-3 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 flex-shrink-0`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* 装饰性元素 */}
                  <div className={`absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;