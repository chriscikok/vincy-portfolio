import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

interface Skill {
  name: string;
  level: number;
  description: string;
}

interface SocialTrait {
  trait: string;
  description: string;
  examples: string[];
  emoji: string;
}

interface ComprehensiveSkillsProps {
  academicSkills: Skill[];
  socialTraits: SocialTrait[];
}

export function ComprehensiveSkills({ academicSkills, socialTraits }: ComprehensiveSkillsProps) {
  const { t } = useLanguage();

  const getSkillLevel = (level: number) => {
    if (level >= 85) return { label: t('academic.excellent'), color: 'text-green-600 bg-green-50 border-green-200' };
    if (level >= 70) return { label: t('academic.good'), color: 'text-blue-600 bg-blue-50 border-blue-200' };
    return { label: t('academic.developing'), color: 'text-orange-600 bg-orange-50 border-orange-200' };
  };

  const getProgressColor = (level: number) => {
    if (level >= 85) return 'from-green-400 to-green-600';
    if (level >= 70) return 'from-blue-400 to-blue-600';
    return 'from-orange-400 to-orange-600';
  };

  return (
    <div className="space-y-8">
      {/* Academic Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📚</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t('academic.title')}</h2>
            <p className="text-gray-600">{t('academic.subtitle')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {academicSkills.map((skill, index) => {
            const skillLevel = getSkillLevel(skill.level);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 hover:border-blue-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-800">{skill.name}</h3>
                    <Badge variant="outline" className={`${skillLevel.color} border`}>
                      {skillLevel.label}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-800">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={skill.level} className="h-3" />
                      <div 
                        className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${getProgressColor(skill.level)} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {skill.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Social Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🤝</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t('social.title')}</h2>
            <p className="text-gray-600">{t('social.subtitle')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {socialTraits.map((trait, index) => (
            <motion.div
              key={trait.trait}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 hover:border-green-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl flex-shrink-0">{trait.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{trait.trait}</h3>
                    <p className="text-gray-600 leading-relaxed">{trait.description}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-sm">✨</span>
                    Examples
                  </h4>
                  <div className="space-y-2">
                    {trait.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-700">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📊 Skills Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/70 rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(academicSkills.reduce((sum, skill) => sum + skill.level, 0) / academicSkills.length)}%
              </div>
              <div className="text-sm text-gray-700">Academic Average</div>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg border border-green-100">
              <div className="text-2xl font-bold text-green-600">{socialTraits.length}</div>
              <div className="text-sm text-gray-700">Social Strengths</div>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">Excellent</div>
              <div className="text-sm text-gray-700">Overall Readiness</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}