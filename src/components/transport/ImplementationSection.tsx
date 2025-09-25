'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SettingsIcon, DatabaseIcon, PlayIcon, ClockIcon, CheckCircleIcon, UserIcon } from 'lucide-react';

const implementationSteps = [
  {
    day: 1,
    title: '初期設定',
    subtitle: 'アカウント作成・基本設定',
    icon: SettingsIcon,
    duration: '約2時間',
    tasks: [
      'アカウント作成・ログイン設定',
      '会社基本情報の登録',
      '管理者権限の設定',
      'セキュリティ設定の確認'
    ],
    responsible: '弊社担当者がリモートサポート',
    color: 'blue'
  },
  {
    day: 2,
    title: 'データ移行',
    subtitle: '既存データの完全移行',
    icon: DatabaseIcon,
    duration: '約4時間',
    tasks: [
      '車両情報の一括インポート',
      'ドライバー情報の登録',
      '既存スケジュールデータの移行',
      'データ整合性の確認・調整'
    ],
    responsible: '専任エンジニアが移行作業を実施',
    color: 'green'
  },
  {
    day: 3,
    title: '運用開始',
    subtitle: 'テスト運用から本格稼働',
    icon: PlayIcon,
    duration: '約1時間',
    tasks: [
      '操作説明（30分程度）',
      'テスト運用・動作確認',
      '質問・疑問点の解決',
      '本格運用スタート'
    ],
    responsible: '現場スタッフ向け操作研修実施',
    color: 'purple'
  }
];

const supportFeatures = [
  {
    icon: UserIcon,
    title: '専任担当者制',
    description: '導入から運用まで、専任担当者が一貫してサポート'
  },
  {
    icon: ClockIcon,
    title: '24時間以内対応',
    description: 'お問い合わせから24時間以内に必ずご回答'
  },
  {
    icon: CheckCircleIcon,
    title: '定着率100%',
    description: '導入した全企業で継続利用を実現'
  }
];

const ImplementationSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-600',
      green: 'bg-green-50 border-green-200 text-green-600',
      purple: 'bg-purple-50 border-purple-200 text-purple-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconBgClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            最短3日で
            <span className="text-primary block">完全運用開始</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            東翔運輸での実績を基に確立された効率的な導入プロセス。<br />
            複雑な設定は一切不要で、ITが苦手な方でも安心して導入いただけます。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-primary/10 text-primary px-6 py-3 rounded-full font-bold">
              導入成功率 100%
            </div>
            <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold">
              研修時間 わずか30分
            </div>
            <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-bold">
              定着率 100%
            </div>
          </div>
        </div>

        {/* Implementation Timeline */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {implementationSteps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Day Number */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-white rounded-full text-2xl font-black mb-4">
                    Day {step.day}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.subtitle}</p>
                </div>

                {/* Card */}
                <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 hover:shadow-xl transition-shadow ${getColorClasses(step.color)}`}>
                  {/* Icon and Duration */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${getIconBgClasses(step.color)}`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">所要時間</div>
                      <div className="font-semibold text-gray-900">{step.duration}</div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">実施内容</h4>
                    <ul className="space-y-2">
                      {step.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Responsible */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="text-xs text-gray-500 mb-1">担当</div>
                    <div className="text-sm font-medium text-gray-900">
                      {step.responsible}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < implementationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-32 -right-4 w-8 h-px bg-gray-300 z-10">
                    <div className="absolute -right-1 -top-1 w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default ImplementationSection;