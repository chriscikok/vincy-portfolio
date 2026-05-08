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
    'skill.english': 'English Language',
    'skill.english.desc': 'Recognizes all uppercase and lowercase letters. Can form simple sentences. Learnt 42 letter sounds and able to blend and segment consonant-vowel-consonant words',
    'skill.chinese': 'Chinese Language',
    'skill.chinese.desc': 'Recognizes common Chinese characters including MTR station names. Can write basic Chinese strokes and simple words.',
    'skill.number': 'Number Skills',
    'skill.number.desc': 'Counts to 150, recognizes numbers 1-99, understands basic addition and subtraction concepts.',
    'skill.reading': 'Reading Readiness',
    'skill.reading.desc': 'Shows strong phonemic awareness, can blend simple sounds, and reads sight words independently.',
    'skill.writing': 'Writing Skills',
    'skill.writing.desc': 'Writes first and last name clearly in both English and Chinese, and writes simple sentences.',
    'skill.listening': 'Listening & Following Directions',
    'skill.listening.desc': 'Excellent listening skills, follows multi-step directions, and stays focused during instruction.',
    'skill.problem': 'Problem Solving',
    'skill.problem.desc': 'Shows creative thinking, persists through challenges, and uses logical reasoning.',
    
    // Creative Work
    'creative.title': 'Creative Works & Art',
    'creative.subtitle': 'Artistic expression and creativity',
    'artwork.dancing.performance.2025': 'Dancing performance 2025',
    'artwork.dancing.performance.2025.desc': 'Participated in Annual Performance of Petite Princess Academy of Dance in Sai Wan Ho Civic Centre',
    'artwork.dancing.performance.2024': 'Christmas performance 2024',
    'artwork.dancing.performance.2024.desc': 'Participated in School Christimas performance in Hysan Place',
    'artwork.dancing.prize': 'Prize Presentation Ceremony',
    'artwork.dancing.prize.desc': 'Obtain Honorable Award from Petite Princess Academy of Dance',
    'artwork.school.artwork': 'School Artwork',
    'artwork.school.artwork.desc': 'Artwork created during school art classes',

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
    'category.living': 'Living',
    
    // Teacher Comments
    'comments.title': 'Teacher Observations',
    'comments.subtitle': 'Professional observations and feedback',
    'teacher.said': 'Teacher said about Vincy',
    'teacher.kindergarten': 'Kindergarten Teacher',
    'teacher.art': 'Art Teacher',
    'teacher.classteacher': 'Class Teacher',
    'teacher.dance': 'Dance Teacher',
    'teacher.report': 'School Report',
    'teacher.dance.examiner': 'Dance Examiner',
    'teacher.comment1': 'Has a strong interest in learning, can focus attentively during lectures, and actively participates in discussions. Able to create dance steps that complement the music, performing exceptionally well. Demonstrated a serious attitude during dance rehearsals and was confident and engaged during performances.',
    'teacher.comment2': 'Helpful and able to build harmonious relationships with peers. Enjoys going to school, and is proactive and courteous. Able to follow rules and to fulfill responsibilities according to her capabilities.',
    'teacher.comment.k2.sem2': 'Cheerful personality and warm towards others. Loves learning and has excellent language expression skills. Has a talent for dancing.',
    'teacher.comment.k2.sem1': 'Respects teachers and gets along harmoniously with peers. Peaceful and kind, with good learning abilities.',
    'teacher.comment.k1.sem2': 'Cares for and looks after the young, and is very dedicated to learning.',
    'teacher.comment.k1.sem1': 'Straightforward and innocent in personality, especially passionate and skilled in dance.',
    'teacher.comment.pn.sem2': 'Cheerful in personality and warm towards others. Has a serious attitude towards learning.',
    'teacher.comment.pn.sem1': 'Optimistic and sincere in personality, loved by teachers and classmates. Diligently studying and making continuous progress.',
    'teacher.comment.dance.school': 'Vincy has always impressed me, her peers and other teachers with her hard work, focus and determination to achieve her learning goals. Her passion sets her apart from other students. She has deomonstrated excellent academic and holistic performance in our school with full marks achievement in The Commonwealth Society of Teachers of Dancing Examinations. I believe that these qualities make her an outstanding student.',
    'teacher.comment.dance.rad': 'Strong ankles are used in point and flex exercises, good use of feet in point and close dancing steps. High elevation in bend and jump. Straight back can be maintained throughtout the whole lession. Pointed toes are shown in the marching. Good corrdination in both marching and skipping.',
    'teacher.comment.dance.cstd': 'Wow! you look fantastic! You are so clever! Excellent timing, personality and coordination. Wonderful! Well done!',

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
    
    'life.beautiful.memories': 'Beautiful Memories',
    'life.activity.types' : 'Activity Types',
    'life.happy.moments': 'Happy Moments',
    'life.memories': 'memories',
    'life.memory': 'memory',

    'life.category.family': 'With Family',
    'life.category.trips': 'Field Trips',
    'life.category.events': 'School Events',
    'life.category.daily': 'Daily Life',
    'life.category.friends': 'With Friends',
    'life.category.learning': 'Learning',
    'life.category.fun': 'Fun Time',

    'life.family.portrait': 'Family Portrait',
    'life.family.portrait.desc': 'Capture and preserve the warmth and love of family through a beautiful portrait.',
    'life.family.farming': 'Family Farming',
    'life.family.farming.desc': 'Experience the joy of growing and harvesting food with family farming activities.',
    'life.school.trip': 'Carbon Neutral Outdoor Classroom',
    'life.school.trip.desc': 'Understanding life in nature and learning to embody a low-carbon lifestyle.',
    'life.school.awards': 'Project Morals & Money (Project M²)',
    'life.school.awards.desc': 'Joined with school principal to receive the school award from Project M².',
    'life.school.sports.day': 'Sports Day',
    'life.school.sports.day.desc': 'Participated in various fun athletic events and games during the school sports day.',
    'life.school.hsbc.performance.2026': 'HSBC Community Festival 2026',
    'life.school.hsbc.performance.2026.desc': 'Dancing performance in the HSBC Community Festival 2026',
    'life.friends.babysitting': 'Babysitting',
    'life.friends.babysitting.desc': 'Taking care of her baby friends',

    'life.place.studio': 'Photo Studio',
    'life.place.taipo': 'Tai Po',
    'life.place.kaitak': 'Kai Tak',
    'life.place.shatin': 'Sha Tin',
    'life.place.central' : 'Central',
    'life.place.waterfront.park': 'Tai Po Waterfront Park',

    'life.with' : 'With: ',
    'life.people.father': 'Father',
    'life.people.mother': 'Mother',
    'life.people.sister': 'Sister',
    'life.people.grandpa': 'Grandpa',
    'life.people.grandma': 'Grandma',
    'life.people.classmates': 'Classmates',
    'life.people.teachers': 'Teachers',
    'life.people.principal': 'School Principal',
    'life.people.friends': 'Friends',

    // Photo Carousel
    'carousel.title': 'Photo Memories',
    'carousel.subtitle': 'A collection of beautiful moments from Vincy\'s kindergarten journey',
    'carousel.playing': 'Playing',
    'carousel.paused': 'Paused',
    'carousel.hover': 'Hover to pause',
    'carousel.tap': 'Tap to enlarge',

    // Common
    'January': 'January',
    'February': 'February',
    'March': 'March',
    'April': 'April',
    'May': 'May',
    'June': 'June',
    'July': 'July',
    'August': 'August',
    'September': 'September',
    'October': 'October',
    'November': 'November',
    'December': 'December',

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
    'skill.english': '英語能力',
    'skill.english.desc': '能夠識別所有大小寫字母。能夠組成簡單句子。已學會42個字母音，能夠拼讀和分解子音-元音-子音的單詞。',
    'skill.chinese': '中文能力',
    'skill.chinese.desc': '能夠識別常用中文字包括港鐵車站名。能夠書寫基本的中文筆劃和簡單詞語。',
    
    'skill.number': '數字技能',
    'skill.number.desc': '能數到150，識別1-99的數字，理解基本加減概念。',
    'skill.reading': '閱讀準備',
    'skill.reading.desc': '表現出強烈的音素意識，能夠混合簡單音素，獨立閱讀視覺詞彙。',
    'skill.writing': '書寫技能',
    'skill.writing.desc': '能清楚書寫中英文姓名，能寫簡單句子。',
    'skill.listening': '聽力和遵循指令',
    'skill.listening.desc': '優秀的聽力技能，能遵循多步驟指令，在教學中保持專注。',
    'skill.problem': '解決問題',
    'skill.problem.desc': '表現出創意思維，堅持面對挑戰，運用邏輯推理。',
    
    // Creative Work
    'creative.title': '創意作品與藝術',
    'creative.subtitle': '藝術表達和創造力',
    'artwork.dancing.performance.2025': '跳舞表演 2025',
    'artwork.dancing.performance.2025.desc': '參加在西灣河文娛中心舉行之2025年度小公主舞蹈學院周年大匯演暨頒獎典禮',
    'artwork.dancing.performance.2024': '跳舞表演 2024',
    'artwork.dancing.performance.2024.desc': '參加在希慎廣場舉行之聖誕歌舞表演',
    'artwork.dancing.prize': '小公主舞蹈學院',
    'artwork.dancing.prize.desc': '獲得卓越表現大獎',
    'artwork.school.artwork': '校內藝術作品',
    'artwork.school.artwork.desc': '在校內藝術課堂中創作的藝術作品',
    
    
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
    'category.living': '生活',
    
    // Teacher Comments
    'comments.title': '教師觀察',
    'comments.subtitle': '專業觀察和回饋',
    'teacher.said': '老師眼中的穎珊',
    'teacher.kindergarten': '幼稚園老師',
    'teacher.art': '美術老師',
    'teacher.classteacher': '幼稚園班主任',
    'teacher.dance': '舞蹈老師',
    'teacher.report': '學校報告',
    'teacher.dance.examiner': '舞蹈考官',
    'teacher.comment1': '學習興趣濃厚，能專心聽講，亦會積極參與討論。能配合音樂自我創作舞步，表現出色。於跳舞表演綵排時態度認真，表演時自信投入。',
    'teacher.comment2': '樂於助人，能與友伴建立融洽的關係。喜歡上學，主動有禮。能遵守規則，能按自己的能力完成自己的責任。',
    'teacher.comment.k2.sem2': '性格開朗，待人熱情。熱愛學習，語言表達能力甚佳。具跳舞天份。',
    'teacher.comment.k2.sem1': '尊敬師長，能與友伴和睦相處。為人平和善良，學習能力良好。',
    'teacher.comment.k1.sem2': '關心並照顧幼小，學習十分用心。',
    'teacher.comment.k1.sem1': '性格直率天真，特別熱愛及擅長舞蹈。',
    'teacher.comment.pn.sem2': '性格開朗，待人熱情。學習態度認真。',
    'teacher.comment.pn.sem1': '性格樂觀率真，受師長與同學喜愛。認真學習，日益進步。',
    'teacher.comment.dance.school': '一直以她的努力、專注和實現學習目標的決心給我、她的同學和其他老師留下了深刻的印象。她的熱情使她與其他學生不同。她在我們的學校表現出色，尤其是在澳洲聯邦舞蹈教師協會(香港區)考試中取得了滿分。我相信這些品質使她成為一名傑出的學生。',
    'teacher.comment.dance.rad': '能利用強壯的腳踝，良好的腳部運用體現在整個課堂的舞步中。能完成芭蕾舞中彎曲和跳躍動作并能高高躍起。整個課堂中可以保持直背。前進時能使用足尖前行。步操和跳躍協調性良好。',
    'teacher.comment.dance.cstd': '哇！你看起來真棒！你真聰明！時機、個性和協調性都非常出色。太好了！做得好！',


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

    'life.beautiful.memories': '美好回憶',
    'life.activity.types' : '活動類型',
    'life.happy.moments': '快樂時光',
    'life.memories': '回憶',
    'life.memory': '回憶',

    'life.category.family': '與家人',
    'life.category.trips': '校外教學',
    'life.category.events': '校園活動',
    'life.category.daily': '日常生活',
    'life.category.friends': '與朋友',
    'life.category.learning': '學習',
    'life.category.fun': '歡樂時光',


    'life.family.portrait': '家庭肖像',
    'life.family.portrait.desc': '通过一幅美丽的肖像捕捉并保存家庭的温暖和爱。',
    'life.family.farming': '家庭農耕',
    'life.family.farming.desc': '通過家庭農耕活動，體驗種植和收穫食物的樂趣。',
    'life.school.trip': '綠幼童碳中和戶外學堂',
    'life.school.trip.desc': '認識大自然生活，學習體現低碳生活。',
    'life.school.awards': 'Project Morals & Money (Project M²)',
    'life.school.awards.desc': '與校長一同接受Project M²的學校獎項。',
    'life.school.sports.day': '運動會',
    'life.school.sports.day.desc': '在學校運動會中參加各種有趣的田徑項目和遊戲。',
    'life.school.hsbc.performance.2026': '滙豐社區節 2026',
    'life.school.hsbc.performance.2026.desc': '在滙豐社區節2026的舞蹈表演',
    'life.friends.babysitting': '幼兒照顧',
    'life.friends.babysitting.desc': '照顧小嬰兒',

    'life.place.studio': '影樓',
    'life.place.taipo': '大埔',
    'life.place.kaitak': '啟德',
    'life.place.shatin': '沙田',
    'life.place.central': '中環',
    'life.place.waterfront.park': '大埔海濱公園',

    'life.with' : '與 ',
    'life.people.father': '父親',
    'life.people.mother': '母親',
    'life.people.sister': '妹妹',
    'life.people.grandpa': '公公',
    'life.people.grandma': '婆婆',
    'life.people.classmates': '同學',
    'life.people.teachers': '老師',
    'life.people.principal': '校長',
    'life.people.friends': '朋友',


    // Photo Carousel
    'carousel.title': '照片回憶',
    'carousel.subtitle': '穎珊幼稚園旅程中的美好時刻集錦',
    'carousel.playing': '播放中',
    'carousel.paused': '已暫停',
    'carousel.hover': '滑鼠移入暫停',
    'carousel.tap': '點擊放大',


    // Common
    'January': '一月',
    'February': '二月',
    'March': '三月',
    'April': '四月',
    'May': '五月',
    'June': '六月',
    'July': '七月',
    'August': '八月',
    'September': '九月',
    'October': '十月',
    'November': '十一月',
    'December': '十二月',
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