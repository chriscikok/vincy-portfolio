import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">
        {language === 'en' ? '中文' : 'English'}
      </span>
      <span className="sm:hidden">
        {language === 'en' ? '中' : 'EN'}
      </span>
    </Button>
  );
}