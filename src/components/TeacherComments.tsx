import { Card } from './ui/card';
import { Badge } from './ui/badge';

import { useLanguage } from '../contexts/LanguageContext';
interface Comment {
  teacher: string;
  role: string;
  comment: string;
  highlights: string[];
  date: string;
}

interface TeacherCommentsProps {
  comments: Comment[];
}

export function TeacherComments({ comments }: TeacherCommentsProps) {

    const { t } = useLanguage();
  return (
    <Card className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        💬 {t('teacher.said')}
      </h2>
      
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="font-semibold text-blue-900">{comment.teacher}</h3>
                <p className="text-sm text-blue-700">{comment.role}</p>
              </div>
              <span className="text-xs text-blue-600 self-start sm:self-auto">{comment.date}</span>
            </div>
            
            <blockquote className="text-gray-700 mb-4 italic text-sm sm:text-base leading-relaxed">
              "{comment.comment}"
            </blockquote>
            
            <div className="flex flex-wrap gap-2">
              {comment.highlights.map((highlight, hIndex) => (
                <Badge
                  key={hIndex}
                  className="bg-blue-100 text-blue-800 text-xs"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}