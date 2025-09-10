import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageTitle: string;
}

export function PageNavigation({ currentPage, totalPages, onPageChange, pageTitle }: PageNavigationProps) {
  const { t } = useLanguage();
  
  const pages = [
    t('page.overview'),
    t('page.academic'),
    t('page.creative'),
    t('page.social'),
    t('page.interests'),
    t('page.comments')
  ];

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Mobile Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t('nav.previous')}</span>
          </Button>
          
          <div className="text-center flex-1 mx-4">
            <div className="font-semibold text-gray-800">{pageTitle}</div>
            <div className="text-sm text-gray-500">
              {t('nav.page')} {currentPage + 1} {t('nav.of')} {totalPages}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline">{t('nav.next')}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>

        {/* Desktop Page Tabs */}
        <div className="hidden md:flex gap-2 overflow-x-auto">
          {pages.map((page, index) => (
            <Button
              key={index}
              variant={currentPage === index ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange(index)}
              className="whitespace-nowrap flex-shrink-0"
            >
              {page}
            </Button>
          ))}
        </div>

        {/* Mobile Page Dots */}
        <div className="flex md:hidden justify-center gap-2 mt-2">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentPage === index 
                  ? 'bg-blue-500 w-6' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}