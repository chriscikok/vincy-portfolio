import { Card } from './ui/card';
import { ImageWithFallback } from './utils/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface Interest {
  name: string;
  description: string;
  image: string;
  category: string;
}

interface InterestsHobbiesProps {
  interests: Interest[];
}

export function InterestsHobbies({ interests }: InterestsHobbiesProps) {
  const { t } = useLanguage();
  
  const getCategoryColor = (category: string) => {
    const colors = {
      [t('category.sports')]: 'bg-orange-100 text-orange-800',
      [t('category.arts')]: 'bg-purple-100 text-purple-800',
      [t('category.science')]: 'bg-blue-100 text-blue-800',
      [t('category.music')]: 'bg-pink-100 text-pink-800',
      [t('category.reading')]: 'bg-green-100 text-green-800',
      [t('category.games')]: 'bg-yellow-100 text-yellow-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        ⭐ {t('interests.title')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {interests.map((interest, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 sm:h-40 bg-gray-100">
              <ImageWithFallback
                src={interest.image}
                alt={interest.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <h3 className="font-semibold text-gray-800">{interest.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full self-start ${getCategoryColor(interest.category)}`}>
                  {interest.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{interest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}