import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

interface Translations {
  [key: string]: any;
}

const translations: Record<string, Translations> = {
  zh: {
    nav: {
      home: '首页',
      solutions: '解决方案',
      features: '功能特性',
      about: '关于我们',
      contact: '联系我们',
      pricing: '定价',
      trial: '免费试用'
    },
    hero: {
      title: '智能碳足迹计算平台',
      subtitle: '基于AI的产品碳足迹自动化计算解决方案',
      description: '通过先进的人工智能技术，为企业提供精准、高效的产品碳足迹计算服务，助力实现碳中和目标。',
      cta: '开始免费试用',
      learnMore: '了解更多',
      tryProduct: '产品试用',
      viewPricing: '查看定价',
      emissionReduction: '减排效果',
      complianceRate: '合规率',
      costSaving: '成本节约'
    },
    solutions: {
      title: '我们的解决方案',
      coreFeatures: {
        title: '核心功能介绍',
        automation: {
          title: '全自动零门槛工具链',
          features: [
            '法规匹配：0法规查找理解，0专业背景，自动多法规匹配',
            '最少数据：法规允许的自动后台数据补充，只需最少量真实数据',
            '建模&计算：0手动建模和0手动计算，无需碳专业知识',
            '因子匹配：高精度AI因子匹配算法，准确率95%以上，0人工辅助',
            '风险分析：核验级风险和可信度评估，90%+认证核验通过率',
            '热点&报告：自动排放热点分析和多语言报告，精准支撑减排和合规'
          ]
        },
        credibility: {
          title: '认证级的可信排放结果',
          features: [
            '多产品和法规：支持不同产品类型、地区和法规要求（ISO/CBAM/CSRD/DPP/PEF/EU电池）',
            '多种碳业务类型：横跨披露、碳税、绿色供应链采购、碳资产、碳金融、碳标签、产品数字护照、电池护照',
            '支持主流认证：BSI、BV、TUV、SGS和本地认证机构'
          ]
        }
      },
      valueComparison: {
        title: '价值对比分析',
        subtitle: '传统方案 vs Climate Seal AI方案',
        timeInvestment: {
          title: '时间投入',
          traditional: {
            title: '传统方案',
            duration: '2-3个月完成一份报告',
            details: [
              '• 外包咨询：用户投入1周+，总周期2-3个月',
              '• 软件采购：用户投入2周-1个月，总周期2周-1个月',
              '• 认证核验：用户投入1周+，总周期1.5个月',
              '• 绿色供应链：用户投入长期，总周期长期'
            ]
          },
          climateSeal: {
            title: 'Climate Seal AI',
            duration: '数小时完成一份报告',
            details: [
              '• 计算：无外包咨询，人工资源查找和法规',
              '• 认证：无认证文件审核的补充和修改',
              '• 供应链：无供应链培训/专业支持',
              '• 高数据质量可信度（AI agent支持供应商）'
            ]
          }
        },
        financialInvestment: {
          title: '资金投入',
          traditional: {
            title: '传统方案',
            cost: '4-7万/报告 + 供应链管理50万+',
            details: [
              '• 外包咨询：报告费用+协调咨询沟通成本（2.5-5万+）',
              '• 软件采购：软件费用+内部碳专家成本（2.5-5万+）',
              '• 认证核验：协调补充/修改/沟通成本（1万+）',
              '• 绿色供应链：软件+培训+管理投入（50万+）'
            ]
          },
          climateSeal: {
            title: 'Climate Seal AI',
            cost: '500元/1-3份报告 + 供应链管理0元',
            details: [
              '• 计算：无外包咨询，人工资源查找和法规',
              '• 认证：无认证文件审核的补充和修改',
              '• 供应链：无供应链培训/专业支持',
              '• 供应商负担500元/合规对象'
            ]
          }
        },
        salesImpact: {
          title: '销售影响',
          traditional: {
            title: '传统方案',
            impact: '合规风险影响销售，碳计算占用资源',
            details: [
              '• ISO14067、数字护照、碳税要求影响销售',
              '• 碳减排材料溢价和稀缺性',
              '• 碳减排项目资产开发和绿贷资源占用',
              '• 能带来更多收入但计算占用资源'
            ]
          },
          climateSeal: {
            title: 'Climate Seal AI',
            impact: '释放碳减排资源，专注业务增长',
            details: [
              '• 同样预算，更多资金和人力投入减排项目',
              '• 更多时间争取低碳订单/采购、低碳补贴',
              '• 专注低碳金融、碳资产开发',
              '    • 绿色供应链金融贴息机会'
            ]
          }
        }
      },
      processComparison: {
        title: '业务流程对比',
        subtitle: '三种方案的工作流程详细对比',
        aiAgent: {
          title: 'AI Agent方案',
          description: '4步完成，报告数小时完成&认证周期减半',
          steps: [
            '提供最少量数据',
            '确认信息',
            '递送核验机构',
            '核验发证'
          ]
        },
        softwareExpert: {
          title: '软件+内部专家',
          description: '11步流程，2-4个月',
          steps: [
            '使用培训',
            '资料查找法规对比',
            '数据收集清单',
            '数据整理和清洗',
            '手动补录缺口',
            '建立计算模型',
            '手动因子匹配',
            '递送核验机构',
            '预审反馈问题清单',
            '信息补充和纠正',
            '核验发证'
          ]
        },
        consultant: {
          title: '外包咨询顾问',
          description: '12步流程，3-6个月',
          steps: [
            '启动和培训',
            '资料查找法规对比',
            '数据清单制作',
            '数据清洗和访谈',
            '计算模型',
            '因子匹配和计算',
            'Draft 报告',
            '内部审核再改版',
            '递送核验机构',
            '预审反馈问题清单',
            '信息补充和纠正',
            '核验发证'
          ]
        }
      },
      cutCosts: {
        title: '大幅降低成本',
        description: '相比传统方案节省90%以上成本',
        feature: '从4-7万降至500元/报告'
      },
      credibility: {
        title: '提升可信度',
        description: '认证级别的计算结果，90%+核验通过率',
        feature: '支持主流认证机构核验'
      },
      scale: {
        title: '规模化应用',
        description: '零门槛工具链，支持大规模产品计算',
        feature: '数小时完成复杂计算'
      },
      support: {
        title: '专业支持',
        description: '全方位技术支持和咨询服务',
        feature1: '24/7技术支持',
        feature2: '专业咨询团队',
        feature3: '定制化解决方案'
      }
    },
    features: {
      title: '核心功能',
      subtitle: '为您提供全面的碳足迹计算解决方案',
      timeSavings: {
        title: '时间节省',
        desc: '自动化流程大幅减少数据收集和处理时间'
      },
      costEfficiency: {
        title: '成本效益',
        desc: '显著降低传统咨询和软件成本'
      },
      decisionSupport: {
        title: '决策支持',
        desc: '提供数据驱动的洞察帮助制定减排策略'
      },
      regulatoryAgility: {
        title: '合规灵活性',
        desc: '快速适应不断变化的法规要求'
      },
      scalableROI: {
        title: '可扩展投资回报',
        desc: '随着业务增长获得更大的投资回报'
      },
      ai: {
        title: 'AI智能计算',
        description: '基于机器学习的智能算法，自动识别和计算产品碳足迹'
      },
      database: {
        title: '全球数据库',
        description: '覆盖全球主要地区的碳排放因子数据库，确保计算准确性'
      },
      compliance: {
        title: '合规认证',
        description: '符合ISO 14067、PAS 2050等国际标准，支持第三方认证'
      },
      automation: {
        title: '自动化流程',
        description: '从数据收集到报告生成的全自动化流程，大幅提升效率'
      },
      integration: {
        title: '系统集成',
        description: '支持与ERP、PLM等企业系统无缝集成'
      },
      reporting: {
        title: '智能报告',
        description: '自动生成符合各种标准的专业报告和可视化图表'
      }
    },
    about: {
      title: '关于我们',
      subtitle: '致力于推动全球碳中和进程',
      description: 'Climate Seal AI是一家专注于碳足迹计算和环境数据分析的科技公司。我们通过先进的人工智能技术，为企业提供精准、高效的碳足迹计算解决方案。',
      mission: {
        title: '我们的使命',
        description: '通过技术创新，让碳足迹计算变得简单、准确、可负担，助力全球实现碳中和目标。'
      },
      vision: {
        title: '我们的愿景',
        description: '成为全球领先的碳足迹计算平台，为可持续发展贡献力量。'
      },
      values: {
        title: '我们的价值观',
        items: [
          '科技创新',
          '环境责任',
          '客户至上',
          '诚信透明'
        ]
      }
    },
    contact: {
      title: '联系我们',
      subtitle: '我们随时为您提供专业服务',
      formTitle: '获取免费咨询',
      firstName: '名字',
      lastName: '姓氏',
      companyEmail: '公司邮箱',
      companyName: '公司名称',
      message: '留言',
      messagePlaceholder: '请告诉我们您的需求...',
      scheduleConsultation: '安排免费咨询',
      form: {
        name: '姓名',
        email: '邮箱',
        company: '公司',
        message: '留言',
        submit: '发送消息'
      },
      info: {
        address: '地址',
        phone: '电话',
        email: '邮箱',
        hours: '工作时间'
      }
    },
    pricing: {
      title: '选择适合您的方案',
      subtitle: '灵活的定价方案，满足不同规模企业需求',
      billing: {
        monthly: '按月付费',
        annual: '按年付费',
        save: '节省 10%'
      },
      plans: {
        free: {
          name: '免费版',
          description: '包含50次排放因子匹配',
          features: [
            '最多50次排放因子匹配',
            '基础碳足迹计算',
            '标准报告模板',
            '邮件支持',
            '基础数据导出'
          ],
          notIncluded: [
            '高级分析',
            '自定义集成',
            '优先支持',
            '白标选项'
          ],
          cta: '开始免费试用'
        },
        paid: {
          name: '付费版',
          description: '包含200次排放因子匹配（等于1-2份报告）',
          features: [
            '最多200次排放因子匹配',
            '高级碳排放分析',
            '自定义报告模板',
            '优先邮件和聊天支持',
            '高级数据导出选项',
            'API访问',
            '团队协作工具',
            '自定义品牌选项'
          ],
          notIncluded: [
            '无限匹配',
            '专属客户经理',
            '自定义集成'
          ],
          cta: '开始免费试用'
        },
        enterprise: {
          name: '企业版',
          description: '根据您的具体需求定制价格',
          features: [
            '无限排放因子匹配',
            '与ERP/PLM系统的自定义集成',
            '专属客户经理',
            '自定义报告和分析',
            '白标解决方案',
            '高级API访问',
            '定制培训和入门',
            'SLA保证'
          ],
          notIncluded: [],
          cta: '联系销售'
        }
      },
      addons: {
        title: '增强您的方案',
        subtitle: '添加额外功能和服务来定制您的体验',
        items: [
          {
            name: '更多排放因子匹配',
            description: '100次排放因子匹配',
            price: '¥280'
          },
          {
            name: '自定义集成',
            description: '与您现有的ERP、PLM或其他系统和数据库连接',
            price: '联系销售'
          },
          {
            name: '专业服务',
            description: '专家咨询和实施支持',
            price: '联系销售'
          }
        ]
      },
      payment: {
        title: '完成您的购买',
        paymentOptions: '支付方式',
        methods: {
          creditCard: '信用卡/借记卡',
          wechatPay: '微信支付',
          alipay: '支付宝',
          paypal: 'PayPal'
        },
        security: {
          title: '安全支付',
          description: '您的支付信息经过加密保护。我们绝不储存您的卡片详情。'
        },
        invoice: {
          title: '我需要发票',
          description: '我们将为您提供正式的增值税发票，用于会计和税务目的。',
          companyName: '公司名称',
          taxId: '统一社会信用代码',
          address: '公司地址',
          phone: '联系电话',
          email: '邮箱地址'
        }
      },
      faq: {
        title: '常见问题',
        items: [
          {
            question: '什么是排放因子匹配？',
            answer: '排放因子匹配是将您的产品材料和工艺与我们数据库中的碳排放因子进行匹配的过程。'
          },
          {
            question: '我可以随时取消订阅吗？',
            answer: '是的，您可以随时取消订阅。取消后，您仍可以使用服务直到当前计费周期结束。'
          },
          {
            question: '支持哪些支付方式？',
            answer: '我们支持信用卡、微信支付、支付宝和PayPal。'
          }
        ]
      },
      popular: '最受欢迎',
      month: '/月',
      year: '/年',
      save: '节省',
      starter: {
        title: '入门版',
        price: '免费',
        description: '适合小型企业和初学者',
        features: [
          '5个产品计算额度',
          '基础报告模板',
          '邮件支持',
          '标准数据库访问'
        ],
        cta: '开始使用'
      },
      professional: {
        title: '专业版',
        price: '¥999',
        period: '/月',
        description: '适合中型企业和专业用户',
        features: [
          '100个产品计算额度',
          '高级报告模板',
          '优先技术支持',
          '完整数据库访问',
          'API集成',
          '自定义品牌'
        ],
        cta: '选择专业版',
        popular: '最受欢迎'
      },
      enterprise: {
        title: '企业版',
        price: '定制',
        description: '适合大型企业和特殊需求',
        features: [
          '无限产品计算',
          '定制报告模板',
          '专属客户经理',
          '私有部署选项',
          '高级API集成',
          '培训和咨询服务'
        ],
        cta: '联系销售'
      }
    },
    trialModal: {
      title: '开始免费试用',
      stepIndicator: '步骤',
      of: '/',
      steps: {
        personal: '个人信息',
        company: '公司信息',
        requirements: '产品需求'
      },
      personalInfo: {
        title: '个人信息',
        firstName: '名字',
        lastName: '姓氏',
        email: '企业邮箱',
        phone: '手机号码',
        position: '职位',
        placeholders: {
          firstName: '请输入您的名字',
          lastName: '请输入您的姓氏',
          email: '请输入您的企业邮箱',
          phone: '请输入您的手机号码',
          position: '请输入您的职位'
        }
      },
      companyInfo: {
        title: '公司信息',
        companyName: '公司名称',
        companySize: '公司规模',
        industry: '行业',
        placeholders: {
          companyName: '请输入公司名称',
          companySize: '请选择公司规模',
          industry: '请选择行业'
        },
        companySizeOptions: [
          { value: '', label: '请选择公司规模' },
          { value: '1-10', label: '1-10人' },
          { value: '11-50', label: '11-50人' },
          { value: '51-200', label: '51-200人' },
          { value: '201-1000', label: '201-1000人' },
          { value: '1000+', label: '1000人以上' }
        ],
        industryOptions: [
          { value: '', label: '请选择行业' },
          { value: 'technology', label: '科技' },
          { value: 'finance', label: '金融' },
          { value: 'healthcare', label: '医疗健康' },
          { value: 'education', label: '教育' },
          { value: 'retail', label: '零售' },
          { value: 'manufacturing', label: '制造业' },
          { value: 'other', label: '其他' }
        ]
      },
      requirements: {
        title: '产品需求',
        useCase: '主要使用场景',
        productQuantity: '预计产品数量',
        implementationTime: '实施时间',
        placeholders: {
          useCase: '请描述您的主要使用场景',
          productQuantity: '请选择产品数量',
          implementationTime: '请选择实施时间'
        },
        productQuantityOptions: [
          { value: '', label: '请选择产品数量' },
          { value: '1-10', label: '1-10个' },
          { value: '11-50', label: '11-50个' },
          { value: '51-100', label: '51-100个' },
          { value: '100+', label: '100个以上' }
        ],
        implementationTimeOptions: [
          { value: '', label: '请选择实施时间' },
          { value: 'immediately', label: '立即开始' },
          { value: '1-month', label: '1个月内' },
          { value: '3-months', label: '3个月内' },
          { value: '6-months', label: '6个月内' },
          { value: 'later', label: '6个月后' }
        ]
      },
      buttons: {
        previous: '上一步',
        next: '下一步',
        submit: '提交申请'
      },
      required: '*'
    },
    productDemo: {
      title: 'Climate Seal AI - 产品碳足迹平台（演示）',
      controls: {
        loopMode: '循环模式',
        singleMode: '单次模式',
        pauseDemo: '暂停演示',
        continueDemo: '继续演示',
        restart: '重新开始'
      },
      workStages: {
        research: '需求调研',
        regulation: '法规匹配',
        dataCollection: '数据收集',
        calculation: '计算',
        riskAnalysis: '风险分析',
        report: '报告'
      },
      riskAssessment: {
        title: '风险评估与质量评分',
        dataQuality: '数据质量评分',
        uncertainty: '不确定性风险',
        overallScore: '综合质量评分',
        riskLevel: '综合风险等级',
        medium: '中等',
        metrics: {
          completeness: '数据完整性',
          temporal: '时间相关性',
          geographical: '地理相关性',
          technological: '技术相关性',
          precision: '精度不确定性',
          parameter: '参数不确定性',
          model: '模型不确定性',
          scenario: '情景不确定性',
          dataQualityUncertainty: '数据质量不确定性'
        }
      },
      basicInfo: {
        title: '基础信息',
        productName: '产品名称',
        salesRegion: '销售区域',
        regulation: '适配法规',
        dataCollection: '数据收集周期',
        lifecycleScope: '生命周期范围',
        disclosureLevel: '披露等级',
        values: {
          smartphone: '智能手机',
          global: '全球',
          iso14040: 'ISO 14040/14067',
          year2023: '2023年度',
          cradleToGrave: '摇篮到坟墓',
          certified: '认证级'
        }
      },
      lifecycle: {
        title: '产品碳足迹生命周期分析',
        stages: {
          rawMaterials: '原材料获取',
          manufacturing: '生产制造',
          transportation: '运输配送',
          usage: '使用阶段',
          disposal: '废弃处理'
        },
        bomInfo: {
          title: 'BOM信息',
          materialName: '材料名称',
          description: '描述',
          weight: '重量',
          usage: '使用量',
          unit: '单位',
          emissionFactor: '排放因子',
          source: '因子来源',
          confidence: '置信度'
        }
      },
      aiChat: {
        title: 'Climate Seal AI',
        inputPlaceholder: '输入消息...',
        messages: [
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
        ]
      }
    },
    footer: {
      description: '通过先进的AI技术，让碳足迹计算变得简单、准确、可负担，助力企业实现可持续发展目标。',
      copyright: '© 2024 Climate Seal AI. 保留所有权利。',
      sections: {
        solutions: {
          title: '解决方案',
          links: {
            carbonCredits: '碳积分',
            emissionReduction: '减排方案',
            sustainabilityReporting: '可持续性报告',
            climateStrategy: '气候策略'
          }
        },
        company: {
          title: '公司',
          links: {
            aboutUs: '关于我们',
            careers: '职业机会',
            press: '新闻动态',
            contact: '联系我们'
          }
        },
        resources: {
          title: '资源',
          links: {
            documentation: '文档',
            caseStudies: '案例研究',
            webinars: '网络研讨会',
            blog: '博客'
          }
        }
      }
    },
    trial: {
      card: {
        title: '免费试用',
        feature1: '包含 50 次排放因子匹配',
        feature2: '完整的碳足迹分析报告',
        button: '立即试用'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      solutions: 'Solutions',
      features: 'Features',
      about: 'About',
      contact: 'Contact',
      pricing: 'Pricing',
      trial: 'Free Trial'
    },
    hero: {
      title: 'Intelligent Carbon Footprint Platform',
      subtitle: 'AI-powered automated product carbon footprint calculation solution',
      description: 'Through advanced artificial intelligence technology, we provide enterprises with accurate and efficient product carbon footprint calculation services to help achieve carbon neutrality goals.',
      cta: 'Start Free Trial',
      learnMore: 'Learn More',
      tryProduct: 'Try Product',
      viewPricing: 'View Pricing',
      emissionReduction: 'Emission Reduction',
      complianceRate: 'Compliance Rate',
      costSaving: 'Cost Saving'
    },
    solutions: {
      title: 'Our Solutions',
      coreFeatures: {
        title: 'Core Features Introduction',
        automation: {
          title: 'Fully Automated Zero-Threshold Toolchain',
          features: [
            'Regulation Matching: 0 regulation search and understanding, 0 professional background, automatic multi-regulation matching',
            'Minimal Data: Automatic background data supplementation allowed by regulations, only minimal real-world data required',
            'Modeling & Calculation: 0 manual modeling and 0 manual calculation, no carbon expertise required',
            'Factor Matching: High-precision AI factor matching algorithm, accuracy over 95%, 0 manual assistance',
            'Risk Analysis: Verification-grade risk and credibility assessment, 90%+ certification verification pass rate',
            'Hotspots & Reports: Automatic emission hotspot analysis and multilingual reports, accurately supporting emission reduction and compliance'
          ]
        },
        credibility: {
          title: 'Certification-Grade Reliable Emission Results',
          features: [
            'Multi-product and regulations: Support different product types, regions, and regulatory requirements (ISO/CBAM/CSRD/DPP/PEF/EU battery)',
            'Various carbon business types: Spanning disclosure, carbon tax, green supply chain procurement, carbon assets, carbon finance, carbon labels, product digital passports, battery passports',
            'Support mainstream certifications: BSI, BV, TUV, SGS, and local certification bodies'
          ]
        }
      },
      valueComparison: {
        title: 'Value Comparison Analysis',
        subtitle: 'Traditional Solutions vs Climate Seal AI Solutions',
        timeInvestment: {
          title: 'Time Investment',
          traditional: {
            title: 'Traditional Solutions',
            duration: '2-3 months to complete one report',
            details: [
              '• Outsourced consulting: User investment 1 week+, total cycle 2-3 months',
              '• Software procurement: User investment 2 weeks-1 month, total cycle 2 weeks-1 month',
              '• Certification verification: User investment 1 week+, total cycle 1.5 months',
              '• Green supply chain: User investment long-term, total cycle long-term'
            ]
          },
          climateSeal: {
            title: 'Climate Seal AI',
            duration: 'Hours to complete one report',
            details: [
              '• Calculation: No outsourced consulting, manual resource search and regulations',
              '• Certification: No supplementation and modification of certification document review',
              '• Supply chain: No supply chain training/professional support',
              '• High data quality credibility (AI agent supports suppliers)'
            ]
          }
        },
        financialInvestment: {
          title: 'Financial Investment',
          traditional: {
            title: 'Traditional Solutions',
            cost: '$6-10k/report + supply chain management $70k+',
            details: [
              '• Outsourced consulting: Report fees + coordination consulting communication costs ($4-8k+)',
              '• Software procurement: Software fees + internal carbon expert costs ($4-8k+)',
              '• Certification verification: Coordination supplementation/modification/communication costs ($1.5k+)',
              '• Green supply chain: Software + training + management investment ($70k+)'
            ]
          },
          climateSeal: {
            title: 'Climate Seal AI',
            cost: '$70/1-3 reports + supply chain management $0',
            details: [
              '• Calculation: No outsourced consulting, manual resource search and regulations',
              '• Certification: No supplementation and modification of certification document review',
              '• Supply chain: No supply chain training/professional support',
              '• Supplier burden $70/compliance object'
            ]
          }
        },
        salesImpact: {
          title: 'Sales Impact',
          traditional: {
            title: 'Traditional Solutions',
            impact: 'Compliance risks affect sales, resources occupied by carbon calculation',
            details: [
              '• ISO14067, digital passports, carbon tax requirements affect sales',
              '• Carbon reduction material premiums and scarcity',
              '• Carbon reduction project asset development and green loan resources occupied',
              '• Can bring more revenue but calculation occupies resources'
            ]
          },
          climateSeal: {
            title: 'Climate Seal AI',
            impact: 'Release carbon reduction resources, focus on business growth',
            details: [
              '• Same budget, more funds and manpower invested in emission reduction projects',
              '• More time to compete for low-carbon orders/procurement, low-carbon subsidies',
              '• Focus on low-carbon finance, carbon asset development',
              '    • Green supply chain finance discount opportunities'
            ]
          }
        }
      },
      processComparison: {
        title: 'Process Comparison',
        subtitle: 'Detailed comparison of workflow for three solutions',
        aiAgent: {
          title: 'AI Agent Solution',
          description: '4 steps to complete, report completed in hours & certification cycle halved',
          steps: [
            'Provide minimal data',
            'Confirm information',
            'Deliver to verification agency',
            'Verify and issue certificate'
          ]
        },
        softwareExpert: {
          title: 'Software + Internal Experts',
          description: '11-step process, 2-4 months',
          steps: [
            'Training',
            'Research and compare regulations',
            'Data collection list',
            'Data cleaning and processing',
            'Manual gap filling',
            'Establish calculation model',
            'Manual factor matching',
            'Deliver to verification agency',
            'Pre-review feedback issue list',
            'Information supplement and correction',
            'Verify and issue certificate'
          ]
        },
        consultant: {
          title: 'Outsourced Consulting Experts',
          description: '12-step process, 3-6 months',
          steps: [
            'Initiation and training',
            'Research and compare regulations',
            'Data list preparation',
            'Data cleaning and interviews',
            'Calculation model',
            'Factor matching and calculation',
            'Draft report',
            'Internal review and re-edition',
            'Deliver to verification agency',
            'Pre-review feedback issue list',
            'Information supplement and correction',
            'Verify and issue certificate'
          ]
        }
      },
      cutCosts: {
        title: 'Dramatically Reduce Costs',
        description: 'Save over 90% compared to traditional solutions',
        feature: 'From $6-10k down to $70/report'
      },
      credibility: {
        title: 'Enhance Credibility',
        description: 'Certification-grade calculation results, 90%+ verification pass rate',
        feature: 'Support mainstream certification bodies'
      },
      scale: {
        title: 'Scalable Application',
        description: 'Zero-threshold toolchain, supports large-scale product calculations',
        feature: 'Complete complex calculations in hours'
      },
      support: {
        title: 'Professional Support',
        description: 'Comprehensive technical support and consulting services',
        feature1: '24/7 Technical Support',
        feature2: 'Professional Consulting Team',
        feature3: 'Customized Solutions'
      }
    },
    features: {
      title: 'Core Features',
      subtitle: 'Comprehensive carbon footprint calculation solutions for you',
      timeSavings: {
        title: 'Time Savings',
        desc: 'Automated processes significantly reduce data collection and processing time'
      },
      costEfficiency: {
        title: 'Cost Efficiency',
        desc: 'Significantly reduces traditional consulting and software costs'
      },
      decisionSupport: {
        title: 'Decision Support',
        desc: 'Provides data-driven insights to help develop emission reduction strategies'
      },
      regulatoryAgility: {
        title: 'Regulatory Agility',
        desc: 'Quickly adapts to changing regulations'
      },
      scalableROI: {
        title: 'Scalable ROI',
        desc: 'Achieves a larger return on investment as the business grows'
      },
      ai: {
        title: 'AI Smart Calculation',
        description: 'Machine learning-based intelligent algorithms that automatically identify and calculate product carbon footprints'
      },
      database: {
        title: 'Global Database',
        description: 'Carbon emission factor database covering major global regions, ensuring calculation accuracy'
      },
      compliance: {
        title: 'Compliance Certification',
        description: 'Compliant with international standards such as ISO 14067, PAS 2050, supporting third-party certification'
      },
      automation: {
        title: 'Automated Process',
        description: 'Fully automated process from data collection to report generation, significantly improving efficiency'
      },
      integration: {
        title: 'System Integration',
        description: 'Seamless integration with enterprise systems such as ERP and PLM'
      },
      reporting: {
        title: 'Smart Reporting',
        description: 'Automatically generate professional reports and visualizations compliant with various standards'
      }
    },
    about: {
      title: 'About Us',
      subtitle: 'Committed to promoting global carbon neutrality process',
      description: 'We believe that through technological innovation, carbon footprint calculation can be made simple, accurate, and affordable, helping achieve global carbon neutrality goals.',
      digitalMRV: {
        title: 'Digital MRV System',
        description: 'Establish a complete digital monitoring, reporting and verification system to ensure the accuracy and traceability of carbon data.'
      },
      layeredAssurance: {
        title: 'Layered Assurance System',
        description: 'Provide multi-level quality assurance mechanisms, from self-declaration to third-party certification, to meet different needs.'
      },
      sharedDatabase: {
        title: 'Shared Database',
        description: 'Build a globally shared carbon emission factor database to improve calculation efficiency and data consistency.'
      },
      embeddedAPI: {
        title: 'Embedded API',
        description: 'Provide easy-to-integrate API interfaces that seamlessly embed carbon footprint calculation capabilities into various business systems.'
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are always here to provide professional services',
      formTitle: 'Get Free Consultation',
      firstName: 'First Name',
      lastName: 'Last Name',
      companyEmail: 'Company Email',
      companyName: 'Company Name',
      message: 'Message',
      messagePlaceholder: 'Tell us about your needs...',
      scheduleConsultation: 'Schedule Free Consultation',
      form: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        message: 'Message',
        submit: 'Send Message'
      },
      info: {
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        hours: 'Business Hours'
      }
    },
    pricing: {
      title: 'Choose the Right Plan for You',
      subtitle: 'Flexible pricing plans to meet the needs of businesses of all sizes',
      billing: {
        monthly: 'Monthly',
        annual: 'Annual',
        save: 'Save 10%'
      },
      plans: {
        free: {
          name: 'Free Version',
          description: 'Include 50 emission factor matchings',
          features: [
            'Up to 50 emission factor matchings',
            'Basic carbon footprint calculation',
            'Standard reporting templates',
            'Email support',
            'Basic data export'
          ],
          notIncluded: [
            'Advanced analytics',
            'Custom integrations',
            'Priority support',
            'White-label options'
          ],
          cta: 'Start Free Trial'
        },
        paid: {
          name: 'Paid Version',
          description: 'Include 200 emission factor matchings (equal 1-2 reports)',
          features: [
            'Up to 200 emission factor matchings',
            'Advanced carbon analytics',
            'Custom reporting templates',
            'Priority email & chat support',
            'Advanced data export options',
            'API access',
            'Team collaboration tools',
            'Custom branding options'
          ],
          notIncluded: [
            'Unlimited matchings',
            'Dedicated account manager',
            'Custom integrations'
          ],
          cta: 'Start Free Trial'
        },
        enterprise: {
          name: 'Enterprise',
          description: 'Custom pricing based on your specific requirements',
          features: [
            'Unlimited emission factor matchings',
            'Custom integrations with ERP/PLM systems',
            'Dedicated account manager',
            'Custom reporting & analytics',
            'White-label solutions',
            'Advanced API access',
            'Custom training & onboarding',
            'SLA guarantees'
          ],
          notIncluded: [],
          cta: 'Contact Sales'
        }
      },
      addons: {
        title: 'Enhance Your Plan',
        subtitle: 'Add extra features and services to customize your experience',
        items: [
          {
            name: 'More emission factor matchings',
            description: '100 emission factor matchings',
            price: '$40'
          },
          {
            name: 'Custom Integrations',
            description: 'Connect with your existing ERP, PLM, or other systems and database',
            price: 'contact sales'
          },
          {
            name: 'Professional Services',
            description: 'Expert consulting and implementation support',
            price: 'contact sales'
          }
        ]
      },
      payment: {
        title: 'Complete Your Purchase',
        paymentOptions: 'Payment Options',
        methods: {
          creditCard: 'Credit/Debit Card',
          wechatPay: 'WeChat Pay',
          alipay: 'Alipay',
          paypal: 'PayPal'
        },
        security: {
          title: 'Secure Payment',
          description: 'Your payment information is encrypted and secure. We never store your card details.'
        },
        invoice: {
          title: 'I need an invoice',
          description: 'We will provide you with an official VAT invoice for accounting and tax purposes.',
          companyName: 'Company Name',
          taxId: 'Tax ID',
          address: 'Company Address',
          phone: 'Phone Number',
          email: 'Email Address'
        }
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'What is emission factor matching?',
            answer: 'Emission factor matching is the process of matching your product materials and processes with carbon emission factors in our database.'
          },
          {
            question: 'Can I cancel my subscription anytime?',
            answer: 'Yes, you can cancel your subscription at any time. After cancellation, you can still use the service until the end of the current billing cycle.'
          },
          {
            question: 'What payment methods do you support?',
            answer: 'We support credit cards, WeChat Pay, Alipay, and PayPal.'
          }
        ]
      },
      popular: 'Most Popular',
      month: '/month',
      year: '/year',
      save: 'save',
      starter: {
        title: 'Starter',
        price: 'Free',
        description: 'Perfect for small businesses and beginners',
        features: [
          '5 product calculation credits',
          'Basic report templates',
          'Email support',
          'Standard database access'
        ],
        cta: 'Get Started'
      },
      professional: {
        title: 'Professional',
        price: '$149',
        period: '/month',
        description: 'Perfect for medium businesses and professional users',
        features: [
          '100 product calculation credits',
          'Advanced report templates',
          'Priority technical support',
          'Full database access',
          'API integration',
          'Custom branding'
        ],
        cta: 'Choose Professional',
        popular: 'Most Popular'
      },
      enterprise: {
        title: 'Enterprise',
        price: 'Custom',
        description: 'Perfect for large enterprises and special requirements',
        features: [
          'Unlimited product calculations',
          'Custom report templates',
          'Dedicated account manager',
          'Private deployment options',
          'Advanced API integration',
          'Training and consulting services'
        ],
        cta: 'Contact Sales'
      }
    },
    trialModal: {
      title: 'Start Free Trial',
      stepIndicator: 'Step',
      of: ' of ',
      steps: {
        personal: 'Personal Information',
        company: 'Company Information',
        requirements: 'Product Requirements'
      },
      personalInfo: {
        title: 'Personal Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Business Email',
        phone: 'Phone Number',
        position: 'Position',
        placeholders: {
          firstName: 'Enter your first name',
          lastName: 'Enter your last name',
          email: 'Enter your business email',
          phone: 'Enter your phone number',
          position: 'Enter your position'
        }
      },
      companyInfo: {
        title: 'Company Information',
        companyName: 'Company Name',
        companySize: 'Company Size',
        industry: 'Industry',
        placeholders: {
          companyName: 'Enter company name',
          companySize: 'Select company size',
          industry: 'Select industry'
        },
        companySizeOptions: [
          { value: '', label: 'Select company size' },
          { value: '1-10', label: '1-10 employees' },
          { value: '11-50', label: '11-50 employees' },
          { value: '51-200', label: '51-200 employees' },
          { value: '201-1000', label: '201-1000 employees' },
          { value: '1000+', label: '1000+ employees' }
        ],
        industryOptions: [
          { value: '', label: 'Select industry' },
          { value: 'technology', label: 'Technology' },
          { value: 'finance', label: 'Finance' },
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'education', label: 'Education' },
          { value: 'retail', label: 'Retail' },
          { value: 'manufacturing', label: 'Manufacturing' },
          { value: 'other', label: 'Other' }
        ]
      },
      requirements: {
        title: 'Product Requirements',
        useCase: 'Primary Use Case',
        productQuantity: 'Expected Product Quantity',
        implementationTime: 'Implementation Timeline',
        placeholders: {
          useCase: 'Describe your primary use case',
          productQuantity: 'Select product quantity',
          implementationTime: 'Select implementation timeline'
        },
        productQuantityOptions: [
          { value: '', label: 'Select product quantity' },
          { value: '1-10', label: '1-10 products' },
          { value: '11-50', label: '11-50 products' },
          { value: '51-100', label: '51-100 products' },
          { value: '100+', label: '100+ products' }
        ],
        implementationTimeOptions: [
          { value: '', label: 'Select implementation timeline' },
          { value: 'immediately', label: 'Start immediately' },
          { value: '1-month', label: 'Within 1 month' },
          { value: '3-months', label: 'Within 3 months' },
          { value: '6-months', label: 'Within 6 months' },
          { value: 'later', label: 'After 6 months' }
        ]
      },
      buttons: {
        previous: 'Previous',
        next: 'Next',
        submit: 'Submit Application'
      },
      required: '*'
    },
    productDemo: {
      title: 'Climate Seal AI - Product Carbon Footprint Platform (Demo)',
      controls: {
        loopMode: 'Loop Mode',
        singleMode: 'Single Mode',
        pauseDemo: 'Pause Demo',
        continueDemo: 'Continue Demo',
        restart: 'Restart'
      },
      workStages: {
        research: 'Requirements Research',
        regulation: 'Regulation Matching',
        dataCollection: 'Data Collection',
        calculation: 'Calculation',
        riskAnalysis: 'Risk Analysis',
        report: 'Report'
      },
      riskAssessment: {
        title: 'Risk Assessment & Quality Scoring',
        dataQuality: 'Data Quality Score',
        uncertainty: 'Uncertainty Risk',
        overallScore: 'Overall Quality Score',
        riskLevel: 'Overall Risk Level',
        medium: 'Medium',
        metrics: {
          completeness: 'Data Completeness',
          temporal: 'Temporal Relevance',
          geographical: 'Geographical Relevance',
          technological: 'Technological Relevance',
          precision: 'Precision Uncertainty',
          parameter: 'Parameter Uncertainty',
          model: 'Model Uncertainty',
          scenario: 'Scenario Uncertainty',
          dataQualityUncertainty: 'Data Quality Uncertainty'
        }
      },
      basicInfo: {
        title: 'Basic Information',
        productName: 'Product Name',
        salesRegion: 'Sales Region',
        regulation: 'Applicable Regulation',
        dataCollection: 'Data Collection Period',
        lifecycleScope: 'Lifecycle Scope',
        disclosureLevel: 'Disclosure Level',
        values: {
          smartphone: 'Smartphone',
          global: 'Global',
          iso14040: 'ISO 14040/14067',
          year2023: '2023 Annual',
          cradleToGrave: 'Cradle to Grave',
          certified: 'Certified Level'
        }
      },
      lifecycle: {
        title: 'Product Carbon Footprint Lifecycle Analysis',
        stages: {
          rawMaterials: 'Raw Materials',
          manufacturing: 'Manufacturing',
          transportation: 'Transportation',
          usage: 'Usage Phase',
          disposal: 'End of Life'
        },
        bomInfo: {
          title: 'BOM Information',
          materialName: 'Material Name',
          description: 'Description',
          weight: 'Weight',
          usage: 'Usage',
          unit: 'Unit',
          emissionFactor: 'Emission Factor',
          source: 'Factor Source',
          confidence: 'Confidence'
        }
      },
      aiChat: {
        title: 'Climate Seal AI',
        inputPlaceholder: 'Type message...',
        messages: [
          {
            type: 'ai',
            content: 'Hello! I am the Climate Seal AI assistant. I have matched the applicable regulatory standards for your product basic information: ISO 14040/14067. Next, we need to enter the data collection phase.'
          },
          {
            type: 'user',
            content: 'Please continue.'
          },
          {
            type: 'ai',
            content: 'Alright, we need you to provide information about raw materials. If you have a BOM table and upload it, this will be very helpful for carbon emission accounting.'
          },
          {
            type: 'user',
            content: 'BOM table uploaded'
          },
          {
            type: 'ai',
            content: 'Received your BOM table, the completeness is very high. We will continue to complete some information collection for the manufacturing phase, and then I will perform calculations for you. Is that okay?'
          }
        ]
      }
    },
    footer: {
      description: 'Through advanced AI technology, make carbon footprint calculation simple, accurate, and affordable, helping enterprises achieve sustainable development goals.',
      copyright: '© 2024 Climate Seal AI. All rights reserved.',
      sections: {
        solutions: {
          title: 'Solutions',
          links: {
            carbonCredits: 'Carbon Credits',
            emissionReduction: 'Emission Reduction',
            sustainabilityReporting: 'Sustainability Reporting',
            climateStrategy: 'Climate Strategy'
          }
        },
        company: {
          title: 'Company',
          links: {
            aboutUs: 'About Us',
            careers: 'Careers',
            press: 'News',
            contact: 'Contact Us'
          }
        },
        resources: {
          title: 'Resources',
          links: {
            documentation: 'Documentation',
            caseStudies: 'Case Studies',
            webinars: 'Webinars',
            blog: 'Blog'
          }
        }
      }
    },
    trial: {
      card: {
        title: 'Free Trial',
        feature1: 'Includes 50 emission factor matches',
        feature2: 'Complete carbon footprint analysis report',
        button: 'Start Trial'
      }
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(languages[0]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language.code];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};