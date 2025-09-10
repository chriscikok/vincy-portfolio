import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/globals.css'
import { LanguageToggle } from './components/LanguageToggle'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Subtitles } from 'lucide-react'
import { PageNavigation } from './components/PageNavigation';
import { StudentHeader } from './components/StudentHeader';
import { SkillsAssessment } from './components/SkillsAssessment';
import { PortfolioPage } from './components/PortfolioPage';
import { CreativeShowcase } from './components/CreativeShowcase';
import { SocialSkills } from './components/SocialSkills';
import { InterestsHobbies } from './components/InterestsHobbies';
import { TeacherComments } from './components/TeacherComments';
import { Card } from './components/ui/card';

function PortfolioApp() {
  const [currentPage, setCurrentPage] = useState(0)
  const { t } = useLanguage();

  const student = {
    name: "Vincy Kok",
    age: 5,
    grade: "Kindergarten Graduate",
    school: "Wayfoong Nursery School",
    favoriteColor: "#ff6b9d",
    photo: "https://vincykok.s3.ap-east-1.amazonaws.com/VincyKok.png"
  };

  const skills = [
    {
      name: t('skill.letter'),
      level: 95,
      description: t('skill.letter.desc')
    }
  ];

  const artworks = [
    {
      title: t('artwork.family'),
      type: t('artwork.drawing'),
      description: t('artwork.family.desc'),
      image: "https://images.unsplash.com/flagged/photo-1551277816-36355be656eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGFydCUyMGRyYXdpbmclMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTcxMTU5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "March 2025",
      mediaType: "image"
    },
    {
      title: "Playing with Clay",
      type: "Video",
      description: "A delightful video showing Emma creating her clay dinosaur with focused concentration and creativity.",
      image: "https://vincykok.s3.ap-east-1.amazonaws.com/VincyKok.png",
      videoUrl: "https://vincykok.s3.ap-east-1.amazonaws.com/IMG_7036.MOV",
      date: "February 2025",
      mediaType: "video"
    },
    {
      title: t('artwork.dinosaur'),
      type: t('artwork.sculpture'),
      description: t('artwork.dinosaur.desc'),
      image: "https://images.unsplash.com/flagged/photo-1551277816-36355be656eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGFydCUyMGRyYXdpbmclMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTcxMTU5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "February 2025",
      mediaType: "image"
    }
  ];

  const socialTraits = [
    {
      trait: t('social.empathy'),
      description: t('social.empathy.desc'),
      examples: [t('example.comfort'), t('example.shares'), t('example.includes')],
      emoji: "💝"
    },
    {
      trait: t('social.leadership'),
      description: t('social.leadership.desc'),
      examples: [t('example.leader'), t('example.organizer'), t('example.helper')],
      emoji: "⭐"
    },
    {
      trait: t('social.communication'),
      description: t('social.communication.desc'),
      examples: [t('example.speaker'), t('example.listener'), t('example.questions')],
      emoji: "💬"
    },
    {
      trait: t('social.cooperation'),
      description: t('social.cooperation.desc'),
      examples: [t('example.team'), t('example.responsibilities'), t('example.compromise')],
      emoji: "🤝"
    }
  ];

  const interests = [
    {
      name: t('interest.dinosaurs'),
      description: t('interest.dinosaurs.desc'),
      image: "https://images.unsplash.com/photo-1544772711-57da9c7368fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc1NzEyMjIzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: t('category.science')
    },
    {
      name: t('interest.art'),
      description: t('interest.art.desc'),
      image: "https://images.unsplash.com/photo-1544772711-57da9c7368fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc1NzEyMjIzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: t('category.arts')
    },
    {
      name: t('interest.reading'),
      description: t('interest.reading.desc'),
      image: "https://images.unsplash.com/photo-1544772711-57da9c7368fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc1NzEyMjIzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: t('category.reading')
    },
    {
      name: t('interest.building'),
      description: t('interest.building.desc'),
      image: "https://images.unsplash.com/photo-1544772711-57da9c7368fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc1NzEyMjIzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: t('category.games')
    },
    {
      name: t('interest.music'),
      description: t('interest.music.desc'),
      image: "https://images.unsplash.com/photo-1544772711-57da9c7368fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc1NzEyMjIzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: t('category.music')
    },
    {
      name: t('interest.outdoor'),
      description: t('interest.outdoor.desc'),
      image: "https://images.unsplash.com/photo-1544772711-57da9c7368fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc1NzEyMjIzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: t('category.science')
    }
  ];

  const teacherComments = [
    {
      teacher: "Ms. Sarah Johnson",
      role: t('teacher.kindergarten'),
      comment: t('teacher.comment1'),
      highlights: [t('highlight.progress'), t('highlight.social'), t('highlight.creative'), t('highlight.helpful')],
      date: "May 2025"
    },
    {
      teacher: "Mr. David Chen",
      role: t('teacher.art'),
      comment: t('teacher.comment2'),
      highlights: [t('highlight.expression'), t('highlight.detail'), t('highlight.experiment'), t('highlight.talent')],
      date: "April 2025"
    }
  ];

  const pages = [
    {
      title: t('overview.title'), 
      subtitle: t('overview.subtitle'),
      content:  (
        <div className="space-y-6">
          <StudentHeader student={student} />
          <Card className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📋 {t('overview.summary')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <p className="text-sm text-blue-800">{t('overview.highest')}</p>
                <p className="text-xs text-gray-600">{t('skill.letter')}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">6+</div>
                <p className="text-sm text-green-800">{t('overview.areas')}</p>
                <p className="text-xs text-gray-600">{t('overview.learner')}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">4</div>
                <p className="text-sm text-purple-800">{t('overview.projects')}</p>
                <p className="text-xs text-gray-600">{t('overview.expression')}</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <div className="text-2xl font-bold text-pink-600">100%</div>
                <p className="text-sm text-pink-800">{t('overview.approval')}</p>
                <p className="text-xs text-gray-600">{t('overview.feedback')}</p>
              </div>
            </div>
          </Card>
        </div>
      ) 
    },
    {
      title: t('academic.title'),
      subtitle: t('academic.subtitle'),
      content: <SkillsAssessment skills={skills} />
    },{
      title: t('creative.title'),
      subtitle: t('creative.subtitle'),
      content: <CreativeShowcase artworks={artworks} />
    },
    {
      title: t('social.title'),
      subtitle: t('social.subtitle'),
      content: <SocialSkills traits={socialTraits} />
    },{
      title: t('interests.title'),
      subtitle: t('interests.subtitle'),
      content: <InterestsHobbies interests={interests} />
    },
    {
      title: t('comments.title'),
      subtitle: t('comments.subtitle'),
      content: <TeacherComments comments={teacherComments} />
    }
  ];

  

  const handlePageChange = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < pages.length) {
      setCurrentPage(pageIndex);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Beautiful Background */}
      <div 
        className="fixed inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1642708831052-2402ef1f8a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwY2hpbGRyZW4lMjBiYWNrZ3JvdW5kJTIwcGFzdGVsfGVufDF8fHx8MTc1NzE0MDQwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`
        }}
      />
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm">
        <PageNavigation
          currentPage={currentPage}
          totalPages={pages.length}
          onPageChange={handlePageChange}
          pageTitle={pages[currentPage].title}
        />

        <PortfolioPage
          title={pages[currentPage].title}
          subtitle={pages[currentPage].subtitle}
        >
          {pages[currentPage].content}
          
          {/* Footer */}
          <div className="text-center py-6 mt-8">
            <p className="text-gray-500 text-sm">
              {t('footer.message')}
            </p>
          </div>
        </PortfolioPage>
    </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  )
}
