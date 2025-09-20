import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.previous': 'Previous',
    'nav.next': 'Next',
    'nav.page': 'Page',
    'nav.of': 'of',
    'nav.end': ' ',
    
    // Page Titles
    'page.overview': 'Overview',
    'page.skills': 'Skills & Development',
    'page.creative': 'Creative Work',
    'page.interests': 'Interests',
    'page.comments': 'Teacher Comments',
    'page.awards': 'Awards & Certificates',
    'page.personal': 'Personal & School Life',
    
    // Student Overview
    'overview.title': 'Student Overview',
    'overview.subtitle': 'Get to know Vincy Kok',
    'overview.ready': 'Ready for the next adventure in learning! 🌟',
    'overview.summary': 'Portfolio Summary',
    'overview.highest': 'Highest Skill Level',
    'overview.areas': 'Interest Areas',
    'overview.learner': 'Well-rounded learner',
    'overview.projects': 'Art Projects',
    'overview.expression': 'Creative expression',
    'overview.approval': 'Teacher Approval',
    'overview.feedback': 'Positive feedback',
    
    // Skills and Development
    'page.title': 'Skill and Development',
    'skill.subtitle': 'Academic progress and social development',

    // Academic Skills
    'academic.title': 'Academic Skills Assessment',
    'academic.subtitle': "Vincy's learning progress and readiness",
    'academic.excellent': 'Excellent',
    'academic.good': 'Good',
    'academic.developing': 'Developing',
    
    // Skills
    'skill.letter': 'Letter Recognition',
    'skill.letter.desc': 'Recognizes all uppercase and lowercase letters. Can identify letter sounds and beginning sounds in words.',
    'skill.number': 'Number Skills',
    'skill.number.desc': 'Counts to 150, recognizes numbers 1-99, understands basic addition and subtraction concepts.',
    'skill.reading': 'Reading Readiness',
    'skill.reading.desc': 'Shows strong phonemic awareness, can blend simple sounds, and reads sight words independently.',
    'skill.writing': 'Writing Skills',
    'skill.writing.desc': 'Writes first and last name clearly, forms most letters correctly, and writes simple sentences.',
    'skill.listening': 'Listening & Following Directions',
    'skill.listening.desc': 'Excellent listening skills, follows multi-step directions, and stays focused during instruction.',
    'skill.problem': 'Problem Solving',
    'skill.problem.desc': 'Shows creative thinking, persists through challenges, and uses logical reasoning.',
    
    // Creative Work
    'creative.title': 'Creative Works & Art',
    'creative.subtitle': 'Artistic expression and creativity',
    'artwork.family': 'Family Portrait',
    'artwork.family.desc': 'A colorful drawing of her family with detailed features and expressions.',
    'artwork.garden': 'Spring Garden',
    'artwork.garden.desc': 'A vibrant watercolor painting showing flowers and butterflies.',
    'artwork.dinosaur': 'Clay Dinosaur',
    'artwork.dinosaur.desc': 'A creative clay sculpture of her favorite dinosaur with careful attention to detail.',
    'artwork.drawing': 'Drawing',
    'artwork.painting': 'Painting',
    'artwork.sculpture': 'Sculpture',
    'artwork.dancing': 'Dancing',
    'artwork.dancing.performance.2025': 'Dancing performance 2025',
    'artwork.dancing.performance.2025.desc': 'Participated in Annual Performance of Petite Princess Academy of Dance in Sai Wan Ho Civic Centre',
    'artwork.dancing.performance.2024': 'Christmas performance 2024',
    'artwork.dancing.performance.2024.desc': 'Participated in School Christimas performance in Hysan Place',
    'artwork.dancing.prize': 'Prize Presentation Ceremony',
    'artwork.dancing.prize.desc': 'Obtain Honorable Award from Petite Princess Academy of Dance',
    
    // Social Skills
    'social.title': 'Social & Emotional Development',
    'social.subtitle': 'Emotional and social development',
    'social.empathy': 'Empathy & Kindness',
    'social.empathy.desc': 'Shows genuine care for classmates and always offers help when someone is upset.',
    'social.leadership': 'Leadership',
    'social.leadership.desc': 'Natural leader who guides group activities and helps organize classroom tasks.',
    'social.communication': 'Communication',
    'social.communication.desc': 'Expresses thoughts clearly and listens actively to others during conversations.',
    'social.cooperation': 'Cooperation',
    'social.cooperation.desc': 'Works well in teams and readily contributes to group projects and activities.',
    
    // Social Examples
    'example.comfort': 'Comforts crying friends',
    'example.shares': 'Shares toys willingly',
    'example.includes': 'Includes others in play',
    'example.leader': 'Line leader',
    'example.organizer': 'Playground organizer',
    'example.helper': 'Helper to new students',
    'example.speaker': 'Clear speaker',
    'example.listener': 'Good listener',
    'example.questions': 'Asks thoughtful questions',
    'example.team': 'Team player',
    'example.responsibilities': 'Shares responsibilities',
    'example.compromise': 'Compromise skills',
    
    // Interests
    'interests.title': 'Interests & Hobbies',
    'interests.subtitle': 'What Vincy loves to explore and learn about',
    'interest.dinosaurs': 'Dinosaurs',
    'interest.dinosaurs.desc': 'Fascinated by dinosaurs and can name many different species. Loves dinosaur books and documentaries.',
    'interest.art': 'Art & Crafts',
    'interest.art.desc': 'Enjoys painting, drawing, and creating with various materials. Very creative and imaginative.',
    'interest.reading': 'Reading Stories',
    'interest.reading.desc': 'Loves being read to and looking at picture books. Beginning to read simple books independently.',
    'interest.building': 'Building & Construction',
    'interest.building.desc': 'Enjoys building with blocks, Legos, and creating structures. Shows spatial reasoning skills.',
    'interest.music': 'Music & Dancing',
    'interest.music.desc': 'Loves singing songs and moving to music. Shows good rhythm and enjoys music activities.',
    'interest.outdoor': 'Outdoor Exploration',
    'interest.outdoor.desc': 'Enjoys nature walks, collecting leaves and rocks, and learning about plants and animals.',
    'interest.cooking': 'Cooking',
    'interest.cooking.desc': 'Enjoys cooking food and share with family and friends',
    'interest.cycling': 'Cycling',
    'interest.cycling.desc': 'Enjoys riding balance bike with little sister',
    'interest.dancing': 'Dancing',
    'interest.dancing.desc': 'Enjoys dancing and performing on stage',

    
    // Categories
    'category.science': 'Science',
    'category.arts': 'Arts',
    'category.reading': 'Reading',
    'category.games': 'Games',
    'category.music': 'Music',
    'category.sports': 'Sports',
    
    // Teacher Comments
    'comments.title': 'Teacher Observations',
    'comments.subtitle': 'Professional observations and feedback',
    'teacher.said': 'Teacher said about Vincy',
    'teacher.kindergarten': 'Kindergarten Teacher',
    'teacher.art': 'Art Teacher',
    'teacher.comment1': 'Vincy attends class with focused listening, actively participates in classroom discussions, and shows strong learning interest. She particularly enjoys participating in dance and music activities, and can corrdinate movements well. During performance, she shows dedication and self-confidence when performing in front of others',
    'teacher.comment2': 'Emma shows remarkable creativity and attention to detail in her artwork. She experiments with different materials confidently and always approaches art projects with excitement and imagination.',
    
    // Highlights
    'highlight.progress': 'Excellent academic progress',
    'highlight.social': 'Strong social skills',
    'highlight.creative': 'Creative thinker',
    'highlight.helpful': 'Helpful classmate',
    'highlight.expression': 'Creative expression',
    'highlight.detail': 'Attention to detail',
    'highlight.experiment': 'Willing to experiment',
    'highlight.talent': 'Artistic talent',
    
    // General
    'student.age': 'Age',
    'student.grade': 'Kindergarten 3',
    'student.school': 'Wayfoong Nursery School',
    'footer.message': "Portfolio prepared with love for Vincy's educational journey 💫",


    // Awards
    // TODO...
    'awards.title': 'Awards & Certificates',
    'awards.subtitle': 'Recognition and achievements',

    // Life
    // TODO...

    'personal.title': 'Personal & School Life',
    'personal.subtitle': 'Snapshots of daily life and school activities',

    // Photo Carousel
    'carousel.title': 'Photo Memories',
    'carousel.subtitle': 'A collection of beautiful moments from Vincy\'s kindergarten journey',
    'carousel.playing': 'Playing',
    'carousel.paused': 'Paused',
    'carousel.hover': 'Hover to pause',
    'carousel.tap': 'Tap to enlarge',
  },
  zh: {
    // Navigation
    'nav.previous': '上一頁',
    'nav.next': '下一頁',
    'nav.page': '第',
    'nav.of': '頁，共',
    'nav.end': '頁',
    
    // Page Titles
    'page.overview': '概覽',
    'page.skills': '技能與發展',
    'page.creative': '創作作品',
    'page.interests': '興趣愛好',
    'page.comments': '老師評語',
    'page.awards': '獎項與證書',
    'page.personal': '個人與校園生活',
    
    // Student Overview
    'overview.title': '學生概覽',
    'overview.subtitle': '認識郭穎珊',
    'overview.ready': '準備好迎接學習的下一個冒險！🌟',
    'overview.summary': '作品集摘要',
    'overview.highest': '最高技能水準',
    'overview.areas': '興趣領域',
    'overview.learner': '全面發展學習者',
    'overview.projects': '藝術項目',
    'overview.expression': '創意表達',
    'overview.approval': '教師認可',
    'overview.feedback': '正面回饋',

    // Skills and Development
    'page.title': '技能與發展',
    'skill.subtitle': '學術進步與社交發展',
    
    // Academic Skills
    'academic.title': '學術技能評估',
    'academic.subtitle': '穎珊的學習進度和準備情況',
    'academic.excellent': '優秀',
    'academic.good': '良好',
    'academic.developing': '發展中',
    
    // Skills
    'skill.letter': '字母識別',
    'skill.letter.desc': '能夠識別所有大小寫字母。能夠識別字母音和單詞開頭音。',
    'skill.number': '數字技能',
    'skill.number.desc': '能數到150，識別1-99的數字，理解基本加減概念。',
    'skill.reading': '閱讀準備',
    'skill.reading.desc': '表現出強烈的音素意識，能夠混合簡單音素，獨立閱讀視覺詞彙。',
    'skill.writing': '書寫技能',
    'skill.writing.desc': '能清楚書寫姓名，正確書寫大部分字母，能寫簡單句子。',
    'skill.listening': '聽力和遵循指令',
    'skill.listening.desc': '優秀的聽力技能，能遵循多步驟指令，在教學中保持專注。',
    'skill.problem': '解決問題',
    'skill.problem.desc': '表現出創意思維，堅持面對挑戰，運用邏輯推理。',
    
    // Creative Work
    'creative.title': '創意作品與藝術',
    'creative.subtitle': '藝術表達和創造力',
    'artwork.family': '家庭肖像',
    'artwork.family.desc': '一幅色彩豐富的家庭畫作，具有詳細的特徵和表情。',
    'artwork.garden': '春日花園',
    'artwork.garden.desc': '一幅生動的水彩畫，展現花朵和蝴蝶。',
    'artwork.dinosaur': '粘土恐龍',
    'artwork.dinosaur.desc': '一個創意粘土雕塑，展現她最喜歡的恐龍，注重細節。',
    'artwork.drawing': '繪畫',
    'artwork.painting': '彩繪',
    'artwork.sculpture': '雕塑',
    'artwork.dancing': '跳舞',
    'artwork.dancing.performance.2025': '跳舞表演 2025',
    'artwork.dancing.performance.2025.desc': '參加在西灣河文娛中心舉行之2025年度小公主舞蹈學院周年大匯演暨頒獎典禮',
    'artwork.dancing.performance.2024': '跳舞表演 2024',
    'artwork.dancing.performance.2024.desc': '參加在希慎廣場舉行之聖誕歌舞表演',
    'artwork.dancing.prize': '小公主舞蹈學院',
    'artwork.dancing.prize.desc': '獲得卓越表現大獎',
    
    
    // Social Skills
    'social.title': '社會與情感發展',
    'social.subtitle': '情感和社會發展',
    'social.empathy': '同理心與善良',
    'social.empathy.desc': '對同學表現出真正的關心，總是在有人難過時提供幫助。',
    'social.leadership': '領導能力',
    'social.leadership.desc': '天生的領導者，引導小組活動並協助組織課堂任務。',
    'social.communication': '溝通能力',
    'social.communication.desc': '清楚表達想法，在對話中積極聆聽他人。',
    'social.cooperation': '合作能力',
    'social.cooperation.desc': '在團隊中工作良好，積極貢獻小組項目和活動。',
    
    // Social Examples
    'example.comfort': '安慰哭泣的朋友',
    'example.shares': '樂於分享玩具',
    'example.includes': '包容他人參與遊戲',
    'example.leader': '排隊領導者',
    'example.organizer': '操場組織者',
    'example.helper': '新生幫手',
    'example.speaker': '清楚表達者',
    'example.listener': '良好聆聽者',
    'example.questions': '提出有見地的問題',
    'example.team': '團隊合作者',
    'example.responsibilities': '分擔責任',
    'example.compromise': '妥協技巧',
    
    // Interests
    'interests.title': '興趣與愛好',
    'interests.subtitle': '穎珊喜歡探索和學習的事物',
    'interest.dinosaurs': '恐龍',
    'interest.dinosaurs.desc': '對恐龍著迷，能說出許多不同物種的名稱。喜愛恐龍書籍和紀錄片。',
    'interest.art': '藝術與手工',
    'interest.art.desc': '享受繪畫、畫畫和用各種材料創作。非常有創意和想像力。',
    'interest.reading': '閱讀故事',
    'interest.reading.desc': '喜歡被讀故事和看圖畫書。開始獨立閱讀簡單書籍。',
    'interest.building': '建築與構造',
    'interest.building.desc': '享受用積木、樂高建造和創造結構。展現空間推理技能。',
    'interest.music': '音樂與舞蹈',
    'interest.music.desc': '喜愛唱歌和隨音樂律動。展現良好的節拍感，享受音樂活動。',
    'interest.outdoor': '戶外探索',
    'interest.outdoor.desc': '享受自然散步，收集樹葉和石頭，學習植物和動物知識。',
    'interest.cooking': '料理',
    'interest.cooking.desc': '喜愛煮食和分享給家人與朋友',
    'interest.cycling': '運動',
    'interest.cycling.desc': '喜歡跟妹妹踩平衡車',
    'interest.dancing': '跳舞',
    'interest.dancing.desc': '喜愛跳舞和在舞台上表演',
    // Categories
    'category.science': '科學',
    'category.arts': '藝術',
    'category.reading': '閱讀',
    'category.games': '遊戲',
    'category.music': '音樂',
    'category.sports': '體育',
    
    // Teacher Comments
    'comments.title': '教師觀察',
    'comments.subtitle': '專業觀察和回饋',
    'teacher.said': '老師眼中的穎珊',
    'teacher.kindergarten': '幼稚園老師',
    'teacher.art': '美術老師',
    'teacher.comment1': '穎珊上課專心聽講，積極參與課堂討論，表現出濃厚的學習與趣。她尤其喜愛參與舞蹈律動活動，表現出色。進行表演時，她表現投入，並能自信地以歌舞於他人面前表演，建議家長可持續培養，發展其藝術專長。',
    'teacher.comment2': '艾瑪在她的藝術作品中表現出卓越的創造力和對細節的注意。她自信地嘗試不同材料，總是以興奮和想像力接近藝術項目。',
    
    // Highlights
    'highlight.progress': '優秀的學術進步',
    'highlight.social': '強大的社交技能',
    'highlight.creative': '創意思考者',
    'highlight.helpful': '樂於助人的同學',
    'highlight.expression': '創意表達',
    'highlight.detail': '注重細節',
    'highlight.experiment': '樂於嘗試',
    'highlight.talent': '藝術天賦',
    
    // General
    'student.age': '年齡',
    'student.grade': '幼稚園高班',
    'student.school': '滙豐幼兒學校',
    'footer.message': '用愛為穎珊的教育旅程準備的作品集 💫',

    // Awards
    // TODO...
    'awards.title': '獎項與證書',
    'awards.subtitle': '認可與成就',

    // Life
    // TODO...
    'personal.title': '個人與校園生活',
    'personal.subtitle': '回憶與日常時光',

    // Photo Carousel
    'carousel.title': '照片回憶',
    'carousel.subtitle': '穎珊幼稚園旅程中的美好時刻集錦',
    'carousel.playing': '播放中',
    'carousel.paused': '已暫停',
    'carousel.hover': '滑鼠移入暫停',
    'carousel.tap': '點擊放大',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}