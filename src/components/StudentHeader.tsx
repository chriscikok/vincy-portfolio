import { ImageWithFallback } from './utils/ImageWithFallback';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Globe } from 'lucide-react';
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

  const handleLocationClick = () => {
    const query = encodeURIComponent(`${student.school} school`);
    const googleMapsUrl = `https://www.google.com/maps/search/${query}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleWebsiteClick = () => {
    // You can replace this with the actual school website URL
    const schoolWebsiteUrl = 'https://wfns.hkcschild.edu.hk/?lang=en'; // Example URL
    window.open(schoolWebsiteUrl, '_blank');
  };
  
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
            <div className="flex items-center gap-1">
              <Badge 
                variant="secondary" 
                className="bg-green-100 text-green-800 text-sm flex items-center gap-1"
              >
                {t('student.school')}
              </Badge>
              <button
                onClick={handleLocationClick}
                className="p-1 rounded-full bg-green-100 hover:bg-green-200 text-green-800 transition-colors"
                title={`View ${student.school} location on Google Maps`}
              >
                <MapPin className="w-3 h-3" />
              </button>
              <button
                onClick={handleWebsiteClick}
                className="p-1 rounded-full bg-green-100 hover:bg-green-200 text-green-800 transition-colors"
                title={`Visit ${student.school} website`}
              >
                <Globe className="w-3 h-3" />
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            {t('overview.ready')}
          </p>
        </div>
      </div>
    </Card>
  );
}