import { ImageWithFallback } from './utils/ImageWithFallback';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

interface StudentHeaderProps {
  student: {
    name: string;
    age: number;
    grade: string;
    school: string;
    favoriteColor: string;
    photo: string;
  };
}

export function StudentHeader({ student }: StudentHeaderProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
      <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <ImageWithFallback
              src={student.photo}
              alt={`${student.name}'s photo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div 
            className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white"
            style={{ backgroundColor: student.favoriteColor }}
          ></div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{student.name}</h1>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-sm">
              {t('student.age')} {student.age}
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-sm">
              {t('student.grade')}
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm">
              {t('student.school')}
            </Badge>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            {t('overview.ready')}
          </p>
        </div>
      </div>
    </Card>
  );
}