'use client';

import React from 'react';
import Link from 'next/link';

interface DiagnosisButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function DiagnosisButton({ className, children }: DiagnosisButtonProps) {
  return (
    <Link href="/diagnosis" className={className}>
      {children}
    </Link>
  );
}