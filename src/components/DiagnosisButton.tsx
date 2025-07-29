'use client';

import React from 'react';

interface DiagnosisButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function DiagnosisButton({ className, children }: DiagnosisButtonProps) {
  const handleClick = () => {
    alert('現在、無料LLMO診断サービスは準備中です。\n\nより高品質な分析結果をお届けするため、システムの最適化を進めております。サービス開始まで今しばらくお待ちください。\n\n個別のご相談については、お問い合わせフォームよりお気軽にお声かけください。');
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}