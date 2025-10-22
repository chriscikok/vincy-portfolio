import { useEffect, useMemo, useState } from 'react'
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
import { PhotoCarousel } from './components/PhotoCarousel';
import { fetchObjectList } from './api';

const ASSETS_URL = import.meta.env.VITE_ASSETS_URL;


function PortfolioApp() {
  const [currentPage, setCurrentPage] = useState(0)
  const { t } = useLanguage();

  const student = {
    name: "Vincy Kok",
    age: 5,
    grade: "Kindergarten 3",
    school: "Wayfoong Nursery School",
    favoriteColor: "#ff6b9d",
    photo: ASSETS_URL + "/VincyKok.png"
  };

  const skills = [
    {
      name: t('skill.english'),
      level: 100,
      description: t('skill.english.desc')
    },{
      name: t('skill.chinese'),
      level: 100,
      description: t('skill.chinese.desc')
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
      images: [ASSETS_URL + "/portfolio/artwork/Vincy_2025_performance.png"],
      videoUrl: ASSETS_URL + "/portfolio/artwork/Vincy_2025_performance.mp4",
      date: t('August') + " 2025",
      mediaType: 'video' as const
    },
    {
      title: t('artwork.dancing.performance.2024'),
      type: "Video",
      description: t('artwork.dancing.performance.2024.desc'),
      images: [ASSETS_URL + "/portfolio/artwork/Vincy_xmas_performance_2024.jpeg"],
      videoUrl: ASSETS_URL + "/portfolio/artwork/Vincy_xmas_performance_2024.mp4",
      date: t('December') + " 2024",
      mediaType: 'video' as const
    },
    {
      title: t('artwork.school.artwork'),
      type: "Image",
      description: t('artwork.school.artwork.desc'),
      images: [
        ASSETS_URL + "/portfolio/artwork/Vincy_School_Artwork_1.jpeg",
        ASSETS_URL + "/portfolio/artwork/Vincy_School_Artwork_2.jpeg",
        ASSETS_URL + "/portfolio/artwork/Vincy_School_Artwork_3.jpeg",
        ASSETS_URL + "/portfolio/artwork/Vincy_School_Artwork_4.jpeg",
        ASSETS_URL + "/portfolio/artwork/Vincy_School_Artwork_5.jpeg",
        ASSETS_URL + "/portfolio/artwork/Vincy_School_Artwork_6.jpeg",

      ],
      mediaType: 'image' as const
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
      image: ASSETS_URL + "/portfolio/interests/Vincy_cooking.jpeg",
      category: t('category.living')
    },
    {
      name: t('interest.cycling'),
      description: t('interest.cycling.desc'),
      image: ASSETS_URL + "/portfolio/interests/Vincy_cycling_with_sister.jpeg",
      category: t('category.sports')
    },
    {
      name: t('interest.dancing'),
      description: t('interest.dancing.desc'),
      image: ASSETS_URL + "/portfolio/interests/Vincy_dancing.jpeg",
      category: t('category.arts')
    },
    {
      name: t('interest.reading'),
      description: t('interest.reading.desc'),
      image: ASSETS_URL + "/portfolio/interests/Vincy_reading.jpeg",
      category: t('category.reading')
    },
  ];

  const teacherComments = [
    {
      teacher: "Ms. Chan",
      role: t('teacher.classteacher'),
      comment: t('teacher.comment1'),
      highlights: [t('highlight.talent'),t('highlight.expression'),t('highlight.creative')],
      date: "Aug 2025"
    },
    {
      teacher: "Ms. Lai",
      role: t('teacher.dance'),
      comment: t('teacher.comment.dance.school'),
      highlights: [t('highlight.talent'),t('highlight.expression')],
      date: "Aug 2025"
    },
    {
      teacher: t('teacher.report'),
      role: t('teacher.kindergarten'),
      comment: t('teacher.comment.k2.sem2'),
      highlights: [t('highlight.social'), t('highlight.talent')],
      date: "Aug 2025"
    },
    {
      teacher: 'RAD Examiner',
      role: t('teacher.dance.examiner'),
      comment: t('teacher.comment.dance.rad'),
      highlights: [t('highlight.talent'), t('highlight.expression')],
      date: "May 2025"
    },
    {
      teacher: t('teacher.report'),
      role: t('teacher.kindergarten'),
      comment: t('teacher.comment.k2.sem1'),
      highlights: [t('highlight.progress'), t('highlight.social')],
      date: "Feb 2025"
    },
    {
      teacher: 'Ms. Mimilla',
      role: t('teacher.dance.examiner'),
      comment: t('teacher.comment.dance.cstd'),
      highlights: [t('highlight.talent'), t('highlight.expression')],
      date: "Sep 2024"
    },
    {
      teacher: "Ms. Chu",
      role: t('teacher.classteacher'),
      comment: t('teacher.comment2'),
      highlights: [t('highlight.helpful'), t('highlight.social')],
      date: "Aug 2024"
    },
    {
      teacher: t('teacher.report'),
      role: t('teacher.kindergarten'),
      comment: t('teacher.comment.k1.sem2'),
      highlights: [t('highlight.helpful'), t('highlight.progress')],
      date: "Aug 2024"
    },
    {
      teacher: t('teacher.report'),
      role: t('teacher.kindergarten'),
      comment: t('teacher.comment.k1.sem1'),
      highlights: [t('highlight.talent')],
      date: "Feb 2024"
    },
    {
      teacher: t('teacher.report'),
      role: t('teacher.kindergarten'),
      comment: t('teacher.comment.pn.sem2'),
      highlights: [t('highlight.progress')],
      date: "Aug 2023"
    },
    {
      teacher: t('teacher.report'),
      role: t('teacher.kindergarten'),
      comment: t('teacher.comment.pn.sem1'),
      highlights: [t('highlight.progress')],
      date: "Feb 2023"
    },
    
  ];
  const awards = [
    {
      title: "Petite Princess Academy of Dance",
      category: "dancing",
      description: "Received Honorable Award for outstanding performance.",
      date: "Aug 2025",
      image: "",
      badge: "🏆",
      files: [
        {
          url: ASSETS_URL + "/portfolio/awards/Vincy_Petite_Princess_2025_Award.jpeg",
          type: "image" as const,
          name: "Official Certificate"
        }
      ]
    },
    {
      title: "Royal Academy of Dance",
      category: "dancing",
      description: "Completed Demoonstration class for Pre-School Dance Level 2",
      date: "May 2025",
      image: "",
      badge: "🏆",
      files: [
        {
          url: ASSETS_URL + "/portfolio/awards/Vincy_RAD_PSD2_20250515.pdf",
          type: "pdf" as const,
          name: "Official Certificate"
        }
      ]
    },
    {
      title: "The Commonwealth Society of Teachers of Dancing",
      category: "dancing",
      description: "Passed Pre Theatrical & Performing Arts with Honours Plus.",
      date: "Sep 2024",
      image: "",
      badge: "🏆",
      files: [
        {
          url: ASSETS_URL + "/portfolio/awards/Vincy_CSTD_Certificate_20240930.pdf",
          type: "pdf" as const,
          name: "Official Certificate with Examiner Report"
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
          url: ASSETS_URL + "/portfolio/awards/Vincy_LCM_HK_Speech_Festival_20250503.pdf",
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
          url: ASSETS_URL + "/portfolio/awards/Vincy_GASCA_international_competition.pdf",
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
          url: ASSETS_URL + "/portfolio/awards/Vincy_British_Council_Phonics_Stage_1.pdf",
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
          url: ASSETS_URL + "/portfolio/awards/Vincy_British_Council_Phonics_Stage_2.pdf",
          type: "pdf" as const,
          name: "Completion Certificate"
        }
      ]
    }
  ];

  const personalMemories = [
    {
      title: t('life.family.portrait'),
      description: t('life.family.portrait.desc'),
      images: [
        ASSETS_URL + "/portfolio/life/Vincy_with_her_family.jpeg",
        ASSETS_URL + "/portfolio/life/Vincy_with_sister.jpeg",
        ASSETS_URL + "/portfolio/life/Vincy_kiss_her_sister.jpeg",
      ],
      date: t('November') + " 2024",
      location: t('life.place.studio'),
      category: "family" as const,
      participants: [t('life.people.father'), t('life.people.mother'), t('life.people.sister')],
      mood: "😘"
    },
    {
      title: t('life.family.farming'),
      description: t('life.family.farming.desc'),
      images: [
        ASSETS_URL + "/portfolio/life/Vincy_farming_1.jpg",
        ASSETS_URL + "/portfolio/life/Vincy_farming_2.jpeg",
        ASSETS_URL + "/portfolio/life/Vincy_farming_3.jpeg",
      ],
      date: t('July') + " 2024",
      location: t('life.place.taipo'),
      category: "family" as const,
      participants: [t('life.people.grandpa'), t('life.people.grandma'), t('life.people.mother'), t('life.people.sister')],
      mood: "👩🏽‍🌾🌾"
    },
    {
      title: t('life.school.trip'),
      description: t('life.school.trip.desc'),
      images: [
        ASSETS_URL + "/portfolio/life/Field_trip_1_1.jpg",
        ASSETS_URL + "/portfolio/life/Field_trip_1_2.jpg",
      ],
      date: t('March') + " 2025",
      location: t('life.place.waterfront.park'),
      category: "trips" as const,
      participants: [t('life.people.mother'), t('life.people.classmates'), t('life.people.teachers')],
      mood: "🪁"
    },
    {
      title: t('life.school.awards'),
      description: t('life.school.awards.desc'),
      images: [
        ASSETS_URL + "/portfolio/life/Vincy_Student_Rep.jpeg",
      ],
      date: t('Augest') + " 2025",
      location: t('life.place.kaitak'),
      category: "events" as const,
      participants: [t('life.people.father'), t('life.people.mother'), t('life.people.sister'),t('life.people.principal')],
      mood: "🏆"
    },
    {
      title: t('life.school.sports.day'),
      description: t('life.school.sports.day.desc'),
      images: [
        ASSETS_URL + "/portfolio/life/Vincy_Sport_Day_1.jpeg",
        ASSETS_URL + "/portfolio/life/Vincy_Sport_Day_2.jpeg",
      ],
      videoUrl: ASSETS_URL + "/portfolio/life/Vincy_Sport_Day.mp4",
      date: t('April') + " 2025",
      location: t('Shatin'),
      category: "events" as const,
      participants: [ t('life.people.father'), t('life.people.mother'), t('life.people.sister'), t('life.people.classmates'), t('life.people.teachers')],
      mood: "🏃🏻‍♀️",
      mediaType: 'mixed' as const
    },
    {
      title: t('life.friends.babysitting'),
      description: t('life.friends.babysitting.desc'),
      images: [
        ASSETS_URL + "/portfolio/life/Vincy_Babysitting_1.jpeg",
        ASSETS_URL + "/portfolio/life/Vincy_Babysitting_2.jpeg",
        ASSETS_URL + "/portfolio/life/Vincy_Babysitting_3.jpeg",
        ASSETS_URL + "/portfolio/life/Vincy_Babysitting_4.jpeg",
      ],
      date: t('August') + " 2025",
      location: t('life.place.taipo'),
      category: "friends" as const,
      participants: [t('life.people.father'), t('life.people.mother'), t('life.people.sister'),t('life.people.friends')],
      mood: "👶"
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
            <div className="grid sm:grid-cols-2 gap-4 text-center">
              {/*<div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <p className="text-sm text-blue-800">{t('overview.highest')}</p>
                <p className="text-xs text-gray-600">{t('skill.letter')}</p>
              </div>*/}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">4</div>
                <p className="text-sm text-green-800">{t('overview.areas')}</p>
                <p className="text-xs text-gray-600">{t('overview.learner')}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">3</div>
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

  // Collect all photos for the carousel
  const [fetchedPhotoUrls, setFetchedPhotoUrls] = useState<Array<{ url: string; category: string }>>([]);

  useEffect(() => {
    const URL = ASSETS_URL + '/api/v1/files';
    const PREFIX = 'portfolio/additional/caring/';
    fetchObjectList(URL, PREFIX).then((urls) => {
      setFetchedPhotoUrls(
        (urls as string[]).map((url) => ({
          url,
          category: 'Caring'
        }))
      );
    });

    const PREFIX_2 = 'portfolio/additional/sport/';
    fetchObjectList(URL, PREFIX_2).then((urls) => {
      setFetchedPhotoUrls((prevUrls) => [
        ...prevUrls,
        ...(urls as string[]).map((url) => ({
          url,
          category: 'Sport'
        }))
      ]);
    });

    const PREFIX_3 = 'portfolio/additional/school_events/';
    fetchObjectList(URL, PREFIX_3).then((urls) => {
      setFetchedPhotoUrls((prevUrls) => [
        ...prevUrls,
        ...(urls as string[]).map((url) => ({
          url,
          category: 'School Events'
        }))
      ]);
    });

  }, []);

  const carouselPhotos = useMemo(() => {
    const photos: Array<{id: string, src: string, alt: string, title?: string, category?: string}> = [];
    
    // Add artwork images
    /*artworks.forEach((artwork, artworkIndex) => {
      artwork.images.forEach((image, imageIndex) => {
        photos.push({
          id: `artwork-${artworkIndex}-${imageIndex}`,
          src: image,
          alt: `${artwork.title} - ${artwork.type}`,
          title: artwork.title,
          category: artwork.type
        });
      });
    });*/

    // Add personal memory images
    /*personalMemories.forEach((memory, memoryIndex) => {
      memory.images.forEach((image, imageIndex) => {
        photos.push({
          id: `memory-${memoryIndex}-${imageIndex}`,
          src: image,
          alt: `${memory.title}`,
          title: memory.title,
          category: memory.category
        });
      });
    });*/

    // Add fetched photos
    fetchedPhotoUrls.forEach((element, elementIndex) => {
      photos.push({
        id: `fetched-${elementIndex}`,
        src: ASSETS_URL + "/" + element.url,
        alt: ``,
        title: ``,
        category: element.category
      });
    });

    return photos;
  }, [fetchedPhotoUrls]);

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
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80">
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
          
          {/* Photo Carousel Section */}
          <div className="mt-8 mb-8">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">📸 {t('carousel.title')}</h2>
              <p className="text-gray-600 text-sm">{t('carousel.subtitle')}</p>
            </div>
            <PhotoCarousel 
              photos={carouselPhotos}
              speed={25}
              direction="left"
            />
          </div>

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
