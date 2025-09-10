import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

interface Skill {
  name: string;
  level: number; // 1-100
  description: string;
}

interface SkillsAssessmentProps {
  skills: Skill[];
}

export function SkillsAssessment({ skills }: SkillsAssessmentProps) {
  const { t } = useLanguage();
  
  const getSkillColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSkillBadge = (level: number) => {
    if (level >= 80) return { text: t('academic.excellent'), variant: 'default' as const, className: 'bg-green-100 text-green-800' };
    if (level >= 60) return { text: t('academic.good'), variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' };
    return { text: t('academic.developing'), variant: 'outline' as const, className: 'bg-orange-100 text-orange-800' };
  };

  return (
    <Card className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        📊 {t('academic.title')}
      </h2>
      
      <div className="space-y-4">
        {skills.map((skill, index) => {
          const badge = getSkillBadge(skill.level);
          return (
            <div key={index} className="p-3 md:p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                <h3 className="font-semibold text-gray-700">{skill.name}</h3>
                <Badge className={`${badge.className} self-start sm:self-auto text-xs`}>{badge.text}</Badge>
              </div>
              <Progress value={skill.level} className="mb-3" />
              <p className="text-sm text-gray-600 leading-relaxed">{skill.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}