import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../ScrollToTop';
import FixedDiagnosisCTA from '../FixedDiagnosisCTA';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <FixedDiagnosisCTA />
    </div>
  );
};

export default Layout;