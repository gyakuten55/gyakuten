'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { services, Service } from '@/lib/serviceList';

const ServiceSphere = dynamic(() => import('./ServiceSphere'), { ssr: false });

const colorMap: Record<string, string> = {
  'brand-red': '#A11D2C',
  'brand-blue': '#2563EB',
  'brand-teal': '#008C9E',
  'brand-purple': '#6F42C1',
  'brand-green': '#10B981',
  'brand-orange': '#F97316',
};


export default function ServicesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-primary text-sm font-medium tracking-wide uppercase mb-2">
            サービス・事業内容
          </p>
          <h2 className="text-4xl font-black text-text-main mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl">
            LLMの力でビジネスを根本から変革。診断から構築、運用まで、<br />
            あらゆる課題を「逆転」の発想で解決する、次世代型ソリューション。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service: Service, index: number) => (
            <Link key={service.name} href={service.href}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="min-h-[72px] bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                aria-label={service.name}
              >
                <div className="flex items-center h-full">
                  <div className="w-10 h-10 mr-3 flex-shrink-0">
                    <ServiceSphere color={colorMap[service.color]} />
                  </div>
                  <span className="text-gray-800 font-bold text-sm">
                    {service.name}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}