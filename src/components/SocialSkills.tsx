import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

interface SocialTrait {
  trait: string;
  description: string;
  examples: string[];
  emoji: string;
}

interface SocialSkillsProps {
  traits: SocialTrait[];
}

export function SocialSkills({ traits }: SocialSkillsProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🤝 {t('social.title')}
      </h2>
      
      <div className="space-y-4">
        {traits.map((trait, index) => (
          <div key={index} className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border border-pink-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl flex-shrink-0">{trait.emoji}</span>
              <h3 className="font-semibold text-gray-800">{trait.trait}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{trait.description}</p>
            <div className="flex flex-wrap gap-2">
              {trait.examples.map((example, exIndex) => (
                <Badge
                  key={exIndex}
                  variant="secondary"
                  className="text-xs bg-purple-100 text-purple-700"
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}