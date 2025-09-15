import { useState } from 'react'
import './styles/globals.css'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { PageNavigation } from './components/PageNavigation';
import { StudentHeader } from './components/StudentHeader';
import { AwardsAndCertificates } from './components/AwardsAndCertificates';
import { PersonalSchoolLife } from './components/PersonalSchoolLife';
import { ComprehensiveSkills } from './components/ComprehensiveSkills';
import { PortfolioPage } from './components/PortfolioPage';
import { CreativeShowcase } from './components/CreativeShowcase';
import { InterestsHobbies } from './components/InterestsHobbies';
import { TeacherComments } from './components/TeacherComments';
import { Card } from './components/ui/card';


function PortfolioApp() {
  const [currentPage, setCurrentPage] = useState(0)
  const { t } = useLanguage();

  const student = {
    name: "Vincy Kok",
    age: 5,
    grade: "Kindergarten 3",
    school: "Wayfoong Nursery School",
    favoriteColor: "#ff6b9d",
    photo: "https://d10ir6fnh9pb6o.cloudfront.net/VincyKok.png"
  };

  const skills = [
    {
      name: t('skill.letter'),
      level: 100,
      description: t('skill.letter.desc')
    },{
      name: t('skill.number'),
      level: 100,
      description: t('skill.number.desc')
    },{
      name: t('skill.reading'),
      level: 100,
      description: t('skill.reading.desc')
    },{
      name: t('skill.writing'),
      level: 100,
      description: t('skill.writing.desc')
    },{
      name: t('skill.listening'),
      level: 100,
      description: t('skill.listening.desc')
    },{
      name: t('skill.problem'),
      level: 100,
      description: t('skill.problem.desc')
    }
  ];

  const artworks = [
    {
      title: t('artwork.dancing.performance.2025'),
      type: "Video",
      description: t('artwork.dancing.performance.2025.desc'),
      images: ["https://d10ir6fnh9pb6o.cloudfront.net/IMG_6882.png"],
      videoUrl: "https://d10ir6fnh9pb6o.cloudfront.net/IMG_7036.mp4",
      date: "August 2025",
      mediaType: 'video'
    },
    {
      title: t('artwork.dancing.performance.2024'),
      type: "Video",
      description: t('artwork.dancing.performance.2024.desc'),
      images: ["https://d10ir6fnh9pb6o.cloudfront.net/portfolio/artwork/Vincy_xmas_performance_2024.jpeg"],
      videoUrl: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/artwork/Vincy_xmas_performance_2024.mp4",
      date: "December 2024",
      mediaType: 'video'
    },
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
      name: t('interest.cooking'),
      description: t('interest.cooking.desc'),
      image: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/interests/Vincy_cooking.jpeg",
      category: t('category.science')
    },
    {
      name: t('interest.cycling'),
      description: t('interest.cycling.desc'),
      image: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/interests/Vincy_cycling_with_sister.jpeg",
      category: t('category.sports')
    },
    {
      name: t('interest.dancing'),
      description: t('interest.dancing.desc'),
      image: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/interests/Vincy_dancing.jpeg",
      category: t('category.arts')
    },
  ];

  const teacherComments = [
    {
      teacher: "Ms. Chan",
      role: t('teacher.kindergarten'),
      comment: t('teacher.comment1'),
      highlights: [t('highlight.talent')],
      date: "Aug 2025"
    },
    
  ];
  const awards = [
    {
      title: "The Commonwealth Society of Teachers of Dancing",
      category: "dancing",
      description: "Passed Pre Theatrical & Performing Arts with Honours Plus.",
      date: "Sep 2024",
      image: "",
      badge: "🏆",
      files: [
        {
          url: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/awards/Vincy_CSTD_Certificate_20240930.pdf",
          type: "pdf" as const,
          name: "Official Certificate with Examiner Report"
        }
      ]
    },
    {
      title: "Petite Princess Academy of Dance",
      category: "dancing",
      description: "Received Honorable Award for outstanding performance.",
      date: "Aug 2025",
      image: "",
      badge: "🏆",
      files: [
        {
          url: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/awards/Vincy_Petite_Princess_2025_Award.jpeg",
          type: "image" as const,
          name: "Official Certificate"
        }
      ]
    },
    {
      title: "LCM HK Speech Festival",
      category: "speech",
      description: "Received Merit for 9th LCM Hong Kong Speech Festival.",
      date: "May 2025",
      image: "",
      badge: "💬",
      files: [
        {
          url: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/awards/Vincy_LCM_HK_Speech_Festival_20250503.pdf",
          type: "pdf" as const,
          name: "Official Certificate with Examiner Report"
        }
      ]
    },
    {
      title: "GASCA",
      category: "speech",
      description: "Received Distinction Award for 57th English recitation competition.",
      date: "Jul 2024",
      image: "",
      badge: "💬",
      files: [
        {
          url: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/awards/Vincy_GASCA_international_competition.pdf",
          type: "pdf" as const,
          name: "Official Certificate"
        }
      ]
    },
    {
      title: "British Council",
      category: "academic",
      description: "Completed phonic stage 1",
      date: "Jan 2025",
      image: "",
      badge: "👍",
      files: [
        {
          url: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/awards/Vincy_British_Council_Phonics_Stage_1.pdf",
          type: "pdf" as const,
          name: "Completion Certificate"
        }
      ]
    },
    {
      title: "British Council",
      category: "academic",
      description: "Completed phonic stage 2",
      date: "Jun 2025",
      image: "",
      badge: "👍",
      files: [
        {
          url: "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/awards/Vincy_British_Council_Phonics_Stage_2.pdf",
          type: "pdf" as const,
          name: "Completion Certificate"
        }
      ]
    }
  ];

  const personalMemories = [
    {
      title: "Family portrait day",
      description: "Capturing smiles and joy with family in the studio.",
      images: [
        "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/life/Vincy_with_her_family.jpeg",
        "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/life/Vincy_with_sister.jpeg",
        "https://d10ir6fnh9pb6o.cloudfront.net/portfolio/life/Vincy_kiss_her_sister.jpeg",
      ],
      date: "November 2024",
      location: "Studio",
      category: "daily",
      participants: ["Father", "Mother", "Sister"],
      mood: "😘"
    },
    
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
      title: t('page.title'),
      subtitle: t('skill.subtitle'),
      content: <ComprehensiveSkills academicSkills={skills} socialTraits={socialTraits} />
    },{
      title: t('creative.title'),
      subtitle: t('creative.subtitle'),
      content: <CreativeShowcase artworks={artworks} />
    },
    {
      title: t('interests.title'),
      subtitle: t('interests.subtitle'),
      content: <InterestsHobbies interests={interests} />
    },
    {
      title: t('comments.title'),
      subtitle: t('comments.subtitle'),
      content: <TeacherComments comments={teacherComments} />
    },
    {
      title: t('awards.title'),
      subtitle: t('awards.subtitle'),
      content: <AwardsAndCertificates awards={awards} />
    },
    {
      title: t('personal.title'),
      subtitle: t('personal.subtitle'),
      content: <PersonalSchoolLife memories={personalMemories} />
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
          /*pageTitle={pages[currentPage].title}*/
        />

        <PortfolioPage
          title={pages[currentPage].title}
          subtitle={pages[currentPage].subtitle}
        >
          {pages[currentPage].content}
          
          {/* Footer */}
          <div className="text-center py-6 mt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm mb-2">
              {t('footer.message')}
            </p>
            <div className="text-gray-400 text-xs space-y-1">
              <p>© 2025 Vincy Kok Portfolio. All rights reserved.</p>
              <p>
                Built with React & Tailwind CSS | 
                <span className="mx-1">•</span>
                Designed for educational purposes
              </p>
            </div>
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
