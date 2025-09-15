import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PageNavigation({ currentPage, totalPages, onPageChange }: PageNavigationProps) {
  const { t } = useLanguage();
  
  const pages = [
    t('page.overview'),
    t('page.skills'),
    t('page.creative'),
    t('page.interests'),
    t('page.comments'),
    t('page.awards'),
    t('page.personal')
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
            {/*<div className="font-semibold text-gray-800">{pageTitle}</div>*/}
            <div className="text-sm text-gray-500">
              {t('nav.page')} {currentPage + 1} {t('nav.of')} {totalPages} {t('nav.end')}
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
        <div className="hidden lg:block">
          <div className="flex flex-wrap gap-2 justify-center">
            {pages.map((page, index) => (
              <Button
                key={index}
                variant={currentPage === index ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(index)}
                className="whitespace-nowrap text-xs px-3 py-2 min-w-0 flex-shrink hover:scale-105 transition-transform duration-200"
              >
                {page}
              </Button>
            ))}
          </div>
        </div>

        {/* Tablet Dropdown Menu */}
        <div className="hidden md:block lg:hidden">
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Menu className="w-4 h-4" />
                  {pages[currentPage]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {pages.map((page, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => onPageChange(index)}
                    className={`cursor-pointer ${
                      currentPage === index ? 'bg-blue-50 text-blue-700 font-medium' : ''
                    }`}
                  >
                    <span className="mr-2">{currentPage === index ? '●' : '○'}</span>
                    {page}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Page Dots */}
        <div className="flex md:hidden justify-center gap-2 mt-2">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                currentPage === index 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ${pages[index]}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}