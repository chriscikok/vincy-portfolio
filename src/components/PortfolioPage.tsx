import { motion } from 'motion/react';

interface PortfolioPageProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function PortfolioPage({ children, title, subtitle }: PortfolioPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
        </div>
        
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}