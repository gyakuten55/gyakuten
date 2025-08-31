'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProfitSimulator() {
  const [hourlyRate, setHourlyRate] = useState<number>(5000);
  const [projectHours, setProjectHours] = useState<number>(40);
  const [projectBudget] = useState<number>(100000); // 10万円固定
  const [internalCost, setInternalCost] = useState<number>(0);
  const [outsourcingProfit, setOutsourcingProfit] = useState<number>(0);
  const [referralFee, setReferralFee] = useState<number>(15000); // 15%の紹介料

  useEffect(() => {
    // 内製時のコスト計算
    const calculatedInternalCost = hourlyRate * projectHours;
    setInternalCost(calculatedInternalCost);

    // 外注時の利益計算（紹介料を受け取る場合）
    const calculatedOutsourcingProfit = referralFee;
    setOutsourcingProfit(calculatedOutsourcingProfit);
  }, [hourlyRate, projectHours, referralFee]);

  const profitDifference = outsourcingProfit + internalCost;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black text-black mb-6">
            💡 小規模案件利益シミュレーター
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            「10万円の案件を内製 vs 外注」どちらが得？
          </p>
          <p className="text-sm text-gray-600">
            下記の値を調整して、御社の状況でシミュレーションしてみてください
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 入力部分 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
            <h3 className="text-xl font-bold text-black mb-6">条件設定</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  貴社の技術者時給単価
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="3000"
                    max="10000"
                    step="500"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="flex-1 mr-4"
                  />
                  <div className="w-24 text-right">
                    <span className="text-lg font-bold text-primary">¥{hourlyRate.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  3,000円〜10,000円で調整
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  10万円案件の想定工数
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="20"
                    max="80"
                    step="5"
                    value={projectHours}
                    onChange={(e) => setProjectHours(Number(e.target.value))}
                    className="flex-1 mr-4"
                  />
                  <div className="w-24 text-right">
                    <span className="text-lg font-bold text-primary">{projectHours}時間</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  20〜80時間で調整
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  紹介料率（固定値）
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="10000"
                    max="20000"
                    step="2500"
                    value={referralFee}
                    onChange={(e) => setReferralFee(Number(e.target.value))}
                    className="flex-1 mr-4"
                  />
                  <div className="w-24 text-right">
                    <span className="text-lg font-bold text-primary">¥{referralFee.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((referralFee / projectBudget) * 100)}%相当
                </div>
              </div>
            </div>
          </div>

          {/* 結果表示部分 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
            <h3 className="text-xl font-bold text-black mb-6">損益比較結果</h3>
            
            <div className="space-y-6">
              {/* 内製した場合 */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-black">内製で開発した場合</h4>
                  <span className="text-sm text-gray-600">コスト</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">
                    -¥{internalCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {hourlyRate.toLocaleString()}円 × {projectHours}時間
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  + 管理工数・機会損失も発生
                </div>
              </div>

              {/* 外注した場合 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-black">GYAKUTENに外注した場合</h4>
                  <span className="text-sm text-gray-600">利益</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    +¥{outsourcingProfit.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    紹介料として収益化
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  + 本業に集中できる時間を創出
                </div>
              </div>

              {/* 差額 */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                <div className="text-center">
                  <h4 className="font-bold text-black mb-2">外注による効果</h4>
                  <div className="text-3xl font-black text-blue-600 mb-1">
                    +¥{profitDifference.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    コスト削減 + 紹介料収益
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-gray-700">
                <strong>💡 ポイント：</strong><br />
                小規模案件ほど内製の割が合わず、<br />
                優秀な外注先への委託が効果的です。
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg">
            <h4 className="text-xl font-bold text-black mb-4">
              なるほど、任せた方が得なんですね！
            </h4>
            <p className="text-gray-700 mb-6">
              このシミュレーションは一例です。実際の案件では、要件の複雑さや緊急度によって工数は変動します。<br />
              まずは無料相談で、具体的な案件の工数・費用感をお聞かせください。
            </p>
            <Link
              href="/contact"
              className="bg-primary text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors inline-block"
            >
              無料で相談してみる
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}