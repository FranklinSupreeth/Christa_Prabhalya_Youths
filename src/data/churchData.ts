import {
  BibleVerse,
  YouthActivity,
  ChurchEvent,
  DevotionalResource,
  PrayerTopic,
  UserPrayerRequest,
  LeadershipMember
} from '../types';

import churchHeroImg from '../assets/images/csi_chruch_bulding.png';
import churchLogoImg from '../assets/images/csi_church_logo.png';
import youthGroupImg from '../assets/images/youth_group_1787504212042.jpg';


export const CHURCH_IMAGES = {
  hero: churchHeroImg,
  logo: churchLogoImg,
  youthGroup: youthGroupImg,
};

export const CHURCH_DETAILS = {
  name: 'CSI KCD Christha Prabhalaya Church Youths',
  churchName: 'CSI KCD Christha Prabhalaya Church',
  tagline: 'Faith • Fellowship • Purpose',
  themeVerse: {
    reference: 'Ecclesiastes 12:1',
    text: 'Remember your Creator in the days of your youth, before the days of trouble come and the years approach when you will say, "I find no pleasure in them."',
    translation: 'NIV'
  },
  welcomeMessage: 'Welcome to the vibrant youth family of CSI KCD Christha Prabhalaya Church! We are a Christ-centered generation passionate about growing in God\'s Word, building authentic friendships, serving our community, and living with bold eternal purpose.',
  email: 'christhaprabhalayayouths@gmail.com',
  instagram: 'https://www.instagram.com/cpc_youths?igsi=MW94b2Y3ZWplbGZ3ZA==',
  instagramHandle: '@cpc_youths',
  phone: '+91 98450 12345',
  whatsapp: '+91 98450 12345',
  location: 'CSI KCD Christha Prabhalaya Church, Bengaluru, Karnataka, India',
  googleMapsUrl: 'https://maps.google.com/?q=CSI+KCD+Christha+Prabhalaya+Church',
  embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0421856503867!2d77.58240157454844!3d13.096513012128437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae190052ff86d9%3A0x8a7bc47b9b811806!2sCSI%20KCD%20Christha%20Prabhalaya%20Church!5e0!3m2!1sen!2sin!4v1787506117803!5m2!1sen!2sin',
  gatheringTimes: {
    sundayService: 'Every Sunday | 10:30 AM - 12:30 PM',
    bibleStudy: 'Every Wednesday | 6:30 PM - 8:00 PM',
    prayerMeeting: 'Every Friday | 7:00 PM - 8:30 PM',
    worshipNight: 'Last Saturday of Every Month | 6:00 PM - 8:30 PM'
  }
};

export const YOUTH_PILLARS = [
  {
    title: 'Faith in Christ',
    subtitle: 'Rooted in God\'s Word',
    desc: 'Unwavering devotion, biblical discipleship, and Christ-like character in modern youth culture.',
    icon: 'Cross'
  },
  {
    title: 'Warm Fellowship',
    subtitle: 'Authentic Brotherhood & Sisterhood',
    desc: 'A safe, loving community where every young person is embraced, heard, supported, and uplifted.',
    icon: 'HeartHandshake'
  },
  {
    title: 'Kingdom Purpose',
    subtitle: 'Serving with Passion',
    desc: 'Mobilizing youth gifts in music, media, evangelism, outreach, and local charitable missions.',
    icon: 'Compass'
  }
];

export const YOUTH_ACTIVITIES: YouthActivity[] = [
  {
    id: 'act-1',
    title: 'Sunday Youth Gatherings',
    subtitle: 'Worship, Word & Dynamic Connections',
    category: 'Worship',
    schedule: 'Every Sunday Morning',
    time: '10:30 AM - 12:30 PM',
    location: 'Youth Fellowship Hall & Sanctuary',
    leader: 'Youth Ministry Team',
    description: 'Our flagship weekly rendezvous! An uplifting morning featuring live contemporary and choral worship, practical life-applicable sermons tailored for teenagers and young adults, interactive group discussions, and friendly fellowship tea.',
    highlights: ['Live youth worship band', 'Practical youth message', 'Small group breakout sharing', 'Warm tea & refreshments'],
    icon: 'Sun',
    tag: 'Core Gathering'
  },
  {
    id: 'act-2',
    title: 'Youth Bible Study',
    subtitle: 'Deep Diving into the Holy Scriptures',
    category: 'The Word',
    schedule: 'Every Wednesday Evening',
    time: '6:30 PM - 8:00 PM',
    location: 'Upper Room / Online Hybrid',
    leader: 'Bible Discipleship Mentors',
    description: 'Verse-by-verse scriptural exploration tackling real-world questions: purpose, relationships, workplace ethics, dealing with anxiety, and walking faithfully with God in a digital era.',
    highlights: ['Chapter study & historical context', 'Open Q&A theology forum', 'Digital study notes & reading plans', 'Actionable weekly takeaways'],
    icon: 'BookOpen',
    tag: 'Discipleship'
  },
  {
    id: 'act-3',
    title: 'Prayer & Intercession Meetings',
    subtitle: 'Standing in the Gap for Our Generation',
    category: 'Prayer',
    schedule: 'Every Friday Evening',
    time: '7:00 PM - 8:30 PM',
    location: 'Chapel of Light',
    leader: 'Intercession Lead',
    description: 'An intimate candlelit and acoustic prayer space where we bring personal battles, academic trials, family healing, church revival, and national prayer needs before God\'s throne.',
    highlights: ['Personal prayer ministry', 'Praise & adoration chants', 'Spiritual warfare & breakthrough', 'Silent reflection & altar moments'],
    icon: 'Flame',
    tag: 'Spiritual Fire'
  },
  {
    id: 'act-4',
    title: 'Worship & Choir Sessions',
    subtitle: 'Igniting Praises in Spirit and Truth',
    category: 'Worship',
    schedule: 'Saturday Afternoons',
    time: '4:00 PM - 6:00 PM',
    location: 'Main Sanctuary Choir Loft',
    leader: 'Worship Director',
    description: 'Nurturing musical talents, vocal harmonies, acoustic instruments, sound engineering, and creative arts for Sunday services and special revival worship concerts.',
    highlights: ['Vocal coaching & harmonies', 'Acoustic & electric instruments', 'Songwriting & lyric meditation', 'Spirit-led praise jams'],
    icon: 'Music',
    tag: 'Creative Arts'
  },
  {
    id: 'act-5',
    title: 'Fellowship & Youth Retreats',
    subtitle: 'Building Unbreakable Bonds',
    category: 'Fellowship',
    schedule: 'Monthly / Seasonal Camps',
    time: 'Weekend Schedules',
    location: 'Nature Retreat Centers / Hall',
    leader: 'Fellowship Committee',
    description: 'Weekend bonfires, retreat getaways, picnic days, and brotherhood/sisterhood nights filled with laughter, heartfelt testimonies, and lifelong friendships.',
    highlights: ['Campfire acoustic jam & games', 'Youth retreat camps', 'Testimony nights', 'Mentorship pairings'],
    icon: 'Users',
    tag: 'Community'
  },
  {
    id: 'act-6',
    title: 'Outreach & Evangelism',
    subtitle: 'Sharing Christ\'s Love Beyond the Walls',
    category: 'Outreach',
    schedule: 'Bi-Weekly Saturdays',
    time: '3:30 PM - 6:30 PM',
    location: 'City Parks, Campuses & Streets',
    leader: 'Outreach Coordinator',
    description: 'Street ministry, gospel tracts distribution, hospital visitations, street drama/flashmobs, and campus student outreach bringing hope to seekers and the brokenhearted.',
    highlights: ['Street outreach & tracts', 'Hospital encouragement visits', 'Campus prayer walks', 'Creative gospel drama'],
    icon: 'Globe',
    tag: 'Mission'
  },
  {
    id: 'act-7',
    title: 'Community Service & Charity',
    subtitle: 'Living as the Hands and Feet of Jesus',
    category: 'Outreach',
    schedule: 'First Saturday of the Month',
    time: '9:00 AM - 1:00 PM',
    location: 'Local Orphanages, Shelters & Neighborhoods',
    leader: 'Social Action Team',
    description: 'Feeding the underprivileged, blood donation camps, clean-up drives, orphan care, elderly home visits, and distributing educational kits for needy children.',
    highlights: ['Food grain & meal distribution', 'Orphanage celebration days', 'Environmental cleanup initiatives', 'Medical & education support'],
    icon: 'Heart',
    tag: 'Compassion'
  },
  {
    id: 'act-8',
    title: 'Games & Recreational Sports',
    subtitle: 'Active Bodies, Joyful Spirits',
    category: 'Recreation',
    schedule: 'Every Saturday Evening',
    time: '5:30 PM - 7:30 PM',
    location: 'Church Sports Grounds',
    leader: 'Youth Sports Captain',
    description: 'Football, basketball, cricket tournaments, indoor board game nights, and fitness challenges promoting physical health, team spirit, and wholesome sportsmanship.',
    highlights: ['Friendly soccer & cricket matches', 'Indoor trivia & board game cafe', 'Annual Church Youth Olympiad', 'Health & fitness workshops'],
    icon: 'Trophy',
    tag: 'Energetic'
  }
];

export const CHURCH_EVENTS: ChurchEvent[] = [
  {
    id: 'evt-1',
    title: 'Ignite Youth Camp 2026: "Unshakable"',
    theme: 'Standing Firm on the Rock of Ages (1 Cor 15:58)',
    date: '2026-09-18',
    formattedDate: 'Sept 18 - 20, 2026',
    time: '3-Day Residential Camp',
    venue: 'Hilltop Serene Retreat Centre',
    category: 'Camp & Retreat',
    description: 'Our biggest youth spiritual retreat of the year! Three days of non-stop worship, transformative keynote speakers, outdoor adventure games, deep bonfire fellowship, and an altar call for generational revival.',
    agenda: [
      { time: 'Day 1 (5:00 PM)', activity: 'Check-in, Welcome Icebreakers & Opening Worship' },
      { time: 'Day 2 (9:00 AM)', activity: 'Keynote Message, Outdoor Quest & Team Games' },
      { time: 'Day 2 (7:00 PM)', activity: 'Bonfire Night, Acoustic Worship & Testimonies' },
      { time: 'Day 3 (10:00 AM)', activity: 'Youth Consecration Service, Communion & Commissioning' }
    ],
    isUpcoming: true,
    featured: true,
    registrationOpen: true,
    totalSeats: 120,
    registeredCount: 84,
    speakers: ['Rev. Samuel David', 'Youth Pastor Jonathan', 'Worship Leader Sarah']
  },
  {
    id: 'evt-2',
    title: 'Holy Spirit Night of Worship & Prophetic Praise',
    theme: 'Deep Cries Out to Deep (Psalm 42:7)',
    date: '2026-09-05',
    formattedDate: 'Saturday, Sept 5, 2026',
    time: '6:30 PM - 9:30 PM',
    venue: 'Christha Prabhalaya Main Sanctuary',
    category: 'Worship Night',
    description: 'An immersive, uninterrupted night of prayer, adoration, and Holy Spirit worship led by the combined Christha Prabhalaya Youth Choir and guest musicians.',
    agenda: [
      { time: '6:30 PM', activity: 'Prelude of Instrumental Praise & Contemplation' },
      { time: '7:00 PM', activity: 'High Praises & Choral Anthems' },
      { time: '8:00 PM', activity: 'Short Exhortation on Youth Purity' },
      { time: '8:30 PM', activity: 'Altar Intercession & Candlelit Blessing' }
    ],
    isUpcoming: true,
    featured: false,
    registrationOpen: true,
    totalSeats: 250,
    registeredCount: 160
  },
  {
    id: 'evt-3',
    title: 'Youth Bible Jeopardy & Scripture Marathon',
    theme: 'Thy Word is a Lamp Unto My Feet (Psalm 119:105)',
    date: '2026-09-12',
    formattedDate: 'Saturday, Sept 12, 2026',
    time: '4:00 PM - 7:00 PM',
    venue: 'Fellowship Hall',
    category: 'Bible & Quiz',
    description: 'Exciting team trivia showdown covering the Gospels, Acts of the Apostles, Old Testament heroes, and Bible memorization with trophies, gift hampers, and pizza party!',
    agenda: [
      { time: '4:00 PM', activity: 'Team Formation & Fast-Finger Qualifier' },
      { time: '5:00 PM', activity: 'Main Jeopardy Board Competition' },
      { time: '6:15 PM', activity: 'Grand Final & Prize Distribution' },
      { time: '6:45 PM', activity: 'Youth Pizza & Fellowship Fellowship' }
    ],
    isUpcoming: true,
    featured: false,
    registrationOpen: true,
    totalSeats: 80,
    registeredCount: 45
  },
  {
    id: 'evt-4',
    title: 'Compassion City Outreach: "Loaves & Fishes"',
    theme: 'Faith Without Works is Dead (James 2:17)',
    date: '2026-09-26',
    formattedDate: 'Saturday, Sept 26, 2026',
    time: '8:30 AM - 1:00 PM',
    venue: 'Meeting at Church Grounds -> City Shelter',
    category: 'Outreach',
    description: 'Youth-led drive distributing 300 freshly prepared warm meal boxes, hygiene kits, and personalized prayer notes to elderly citizens and destitute families.',
    agenda: [
      { time: '8:30 AM', activity: 'Briefing, Packing Meals & Prayer Circle' },
      { time: '9:30 AM', activity: 'Outreach Distribution at Assigned Zones' },
      { time: '11:45 AM', activity: 'Children\'s Storytelling at Shelter' },
      { time: '12:30 PM', activity: 'Debrief & Thanksgiving Prayer' }
    ],
    isUpcoming: true,
    featured: false,
    registrationOpen: true,
    totalSeats: 50,
    registeredCount: 38
  },
  {
    id: 'evt-5',
    title: 'CPC Youth Inter-Church Football Cup',
    theme: 'Run the Race with Endurance (Hebrews 12:1)',
    date: '2026-10-03',
    formattedDate: 'Saturday, Oct 3, 2026',
    time: '3:00 PM - 8:00 PM',
    venue: 'St. Paul\'s Arena Grounds',
    category: 'Sports & Social',
    description: '7-a-side friendly tournament uniting youth groups from 8 neighboring churches in a spirit of camaraderie, healthy competition, and brotherhood.',
    agenda: [
      { time: '3:00 PM', activity: 'Opening Prayer & Group Stage Matches' },
      { time: '5:30 PM', activity: 'Semifinals & Halftime Show' },
      { time: '7:00 PM', activity: 'Championship Match & Award Ceremony' }
    ],
    isUpcoming: true,
    featured: false,
    registrationOpen: true,
    totalSeats: 100,
    registeredCount: 60
  }
];

export const PAST_EVENTS_GALLERY = [
  {
    title: 'Easter Youth Dawn Praise & Breakfast',
    date: 'Easter Sunday, April 2026',
    description: 'Over 140 youth members gathered at 5:00 AM on the church lawn to celebrate the Risen King with brass horns and guitars.',
    tag: 'Resurrection'
  },
  {
    title: 'Annual Youth Gospel Musical: "The Prodigal"',
    date: 'December 2025',
    description: 'An original 90-minute theater and choir drama performed in the sanctuary for over 600 attendees.',
    tag: 'Drama & Music'
  },
  {
    title: 'Mission Green: Church Garden Care & Tree Plantation',
    date: 'October 2025',
    description: 'Planted 150 flowering saplings and manicured the sacred church walkways and rose garden.',
    tag: 'Creation Care'
  },
  {
    title: 'Winter Youth Bible Bootcamp',
    date: 'November 2025',
    description: 'In-depth study on the Epistles of Paul and modern apologetics for high school and university students.',
    tag: 'Apologetics'
  }
];

export const BIBLE_VERSES: BibleVerse[] = [
  {
    id: 'v-1',
    reference: 'Ecclesiastes 12:1',
    book: 'Ecclesiastes',
    chapter: 12,
    verse: 1,
    text: 'Remember your Creator in the days of your youth, before the days of trouble come and the years approach when you will say, "I find no pleasure in them."',
    translation: 'NIV',
    theme: 'Youth & Purpose',
    reflection: 'Youth is not just a season to be spent on fleeting pleasures; it is the golden prime of life meant to build an unshakeable foundation in the Lord.'
  },
  {
    id: 'v-2',
    reference: '1 Timothy 4:12',
    book: '1 Timothy',
    chapter: 4,
    verse: 12,
    text: 'Don’t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.',
    translation: 'NIV',
    theme: 'Youth & Purpose',
    reflection: 'Your age does not limit your spiritual impact. Through your integrity, your words, and your pure heart, God can ignite an entire community.'
  },
  {
    id: 'v-3',
    reference: 'Jeremiah 29:11',
    book: 'Jeremiah',
    chapter: 29,
    verse: 11,
    text: '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."',
    translation: 'NIV',
    theme: 'Hope & Healing',
    reflection: 'When anxiety or uncertainty clouds your horizon, anchor yourself in the certainty of God\'s sovereign, good plans for your destiny.'
  },
  {
    id: 'v-4',
    reference: 'Philippians 4:13',
    book: 'Philippians',
    chapter: 4,
    verse: 13,
    text: 'I can do all things through Christ who strengthens me.',
    translation: 'NKJV',
    theme: 'Faith & Courage',
    reflection: 'No trial, exam, workplace challenge, or personal weakness is too great when the supernatural power of Christ surges through your spirit.'
  },
  {
    id: 'v-5',
    reference: 'Proverbs 3:5-6',
    book: 'Proverbs',
    chapter: 3,
    verse: '5-6',
    text: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    translation: 'NIV',
    theme: 'Wisdom & Guidance',
    reflection: 'Surrendering total control to God is not weakness; it is the highest wisdom. He directs steps that our limited vision cannot see.'
  },
  {
    id: 'v-6',
    reference: 'Isaiah 40:30-31',
    book: 'Isaiah',
    chapter: 40,
    verse: '30-31',
    text: 'Even youths grow tired and weary, and young men stumble and fall; but those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    translation: 'NIV',
    theme: 'Faith & Courage',
    reflection: 'Human energy exhausts itself, but divine grace is infinite. Wait upon the Lord, and let Him elevate your spirit above every storm.'
  },
  {
    id: 'v-7',
    reference: 'Joshua 1:9',
    book: 'Joshua',
    chapter: 1,
    verse: 9,
    text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.',
    translation: 'NIV',
    theme: 'Faith & Courage',
    reflection: 'Courage is not the absence of fear, but the assurance of God\'s abiding presence right alongside you.'
  },
  {
    id: 'v-8',
    reference: 'Psalm 119:9',
    book: 'Psalm',
    chapter: 119,
    verse: 9,
    text: 'How can a young person stay on the path of purity? By living according to your word.',
    translation: 'NIV',
    theme: 'Youth & Purpose',
    reflection: 'In a world overflowing with distractions, the Scripture is our sacred compass and purifying stream.'
  },
  {
    id: 'v-9',
    reference: 'John 13:34-35',
    book: 'John',
    chapter: 13,
    verse: '34-35',
    text: 'A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.',
    translation: 'NIV',
    theme: 'Love & Unity',
    reflection: 'The world recognizes true Christians not by our arguments, but by the undeniable warmth of our selfless love for each other.'
  },
  {
    id: 'v-10',
    reference: 'Romans 12:2',
    book: 'Romans',
    chapter: 12,
    verse: 2,
    text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.',
    translation: 'NIV',
    theme: 'Wisdom & Guidance',
    reflection: 'Stand out boldly for Christ. A renewed mind sees what truly matters through eternal eyes.'
  },
  {
    id: 'v-11',
    reference: 'Psalm 23:1-3',
    book: 'Psalm',
    chapter: 23,
    verse: '1-3',
    text: 'The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
    translation: 'NIV',
    theme: 'Peace & Comfort',
    reflection: 'Rest your racing thoughts. The Good Shepherd provides tranquility for your weary soul.'
  },
  {
    id: 'v-12',
    reference: 'Matthew 5:14-16',
    book: 'Matthew',
    chapter: 5,
    verse: '14-16',
    text: 'You are the light of the world. A town built on a hill cannot be hidden... let your light shine before others, that they may see your good deeds and glorify your Father in heaven.',
    translation: 'NIV',
    theme: 'Love & Unity',
    reflection: 'Do not hide your faith. Shine brightly in your campus, office, and family, radiating the love and truth of Christ.'
  }
];

export const DEVOTIONAL_RESOURCES: DevotionalResource[] = [
  {
    id: 'dev-1',
    title: 'Finding Your Divine Identity in a Culture of Comparison',
    passage: '1 Peter 2:9 — "You are a chosen people, a royal priesthood, a holy nation..."',
    author: 'CPC Youth Ministry Team',
    date: 'This Week\'s Devotional',
    readTime: '4 min read',
    category: 'Identity & Faith',
    summary: 'Social media tempts us to measure worth by likes, followers, and worldly standards. Discover how your true eternal value is sealed by the cross of Jesus.',
    content: [
      'In a digital age saturated with endless scrolling and curated highlight reels, it is remarkably easy for young people to feel inadequate. We compare our everyday struggles with someone else\'s best moments.',
      'Scripture declares something radically different: You are not defined by algorithms, peer approval, or transient trends. You were purchased at infinite price by the Savior.',
      'When God looks at you, He sees His beloved son or daughter, clothed in righteousness, filled with unique gifts, and destined for eternal kingdom impact.'
    ],
    reflectionQuestions: [
      'Where do you find yourself seeking validation most frequently?',
      'How does knowing you are "God\'s special possession" transform your confidence today?'
    ],
    prayer: 'Lord Jesus, liberate my heart from the snare of comparison. Fill my thoughts with the truth of who You say I am. Anchor my worth entirely in Your love. Amen.'
  },
  {
    id: 'dev-2',
    title: 'Overcoming Anxiety: The Anchor for the Storm',
    passage: 'Philippians 4:6-7 — "Do not be anxious about anything, but in every situation, by prayer and petition..."',
    author: 'Youth Discipleship Group',
    date: 'Monthly Study',
    readTime: '5 min read',
    category: 'Mental Health & Peace',
    summary: 'Practical Biblical steps to cast your academic, emotional, and career burdens upon Christ and receive the peace that transcends all human comprehension.',
    content: [
      'Anxiety is one of the most widespread challenges facing today\'s youth generation. Deadlines, career dilemmas, financial pressures, and emotional heartbreaks can feel overwhelming.',
      'Paul wrote the words of Philippians 4 while imprisoned in chains. His peace was not dependent on smooth external circumstances, but on the unwavering presence of the Prince of Peace.',
      'When anxious thoughts arise, practice "Holy Exchange": hand over your panic in honest prayer, and actively receive His supernatural calm.'
    ],
    reflectionQuestions: [
      'What specific burden can you release to God right at this moment?',
      'How can you cultivate a habit of giving thanks before the answers are visible?'
    ],
    prayer: 'Heavenly Father, I cast all my anxieties, fears, and heavy burdens upon You. Guard my heart and mind with Your peace that surpasses all understanding. In Jesus\' name, Amen.'
  },
  {
    id: 'dev-3',
    title: 'Fueling Your Passion for the Great Commission',
    passage: 'Matthew 28:19-20 — "Go therefore and make disciples of all nations..."',
    author: 'Youth Missions Circle',
    date: 'Missions Focus',
    readTime: '3 min read',
    category: 'Evangelism & Purpose',
    summary: 'Evangelism is not reserved for full-time missionaries; it begins with your circle of friends, your classmate, your colleague, and your neighborhood.',
    content: [
      'Every young Christian is called to be a living witness. Your life is the closest Bible many people in your college or workplace will ever read.',
      'You don\'t need a theology degree to share Christ. Simply share your personal story of how Jesus changed your life, offer to pray for someone in distress, and love unconditionally.',
      'Let your light shine boldly with gentleness, humility, and genuine respect.'
    ],
    reflectionQuestions: [
      'Who in your daily circle needs to experience the love and hope of Jesus?',
      'What simple step of kindness or encouragement can you take for them this week?'
    ],
    prayer: 'Lord, give me boldness and a compassionate heart for the lost. Make me a channel of Your grace wherever I go. Amen.'
  }
];

export const PRAYER_TOPICS: PrayerTopic[] = [
  {
    id: 'pr-1',
    title: 'Spiritual Revival Among Christian Youths',
    scripture: '2 Chronicles 7:14',
    category: 'Youth Revival',
    description: 'Pray for a fresh outpouring of the Holy Spirit upon high schoolers, college students, and young professionals across our city and churches.',
    prayCount: 142
  },
  {
    id: 'pr-2',
    title: 'Guidance in Academic Exams, Careers & Life Decisions',
    scripture: 'Psalm 32:8',
    category: 'Exams & Careers',
    description: 'Pray for wisdom, sharp memory, divine favor, and integrity for all students facing competitive exams, interviews, and major career transitions.',
    prayCount: 218
  },
  {
    id: 'pr-3',
    title: 'Emotional Healing, Freedom from Depression & Addiction',
    scripture: 'Psalm 147:3',
    category: 'Families & Healing',
    description: 'Pray for young hearts struggling with loneliness, heartbreak, mental distress, substance struggles, or identity crises to find complete healing in Jesus.',
    prayCount: 189
  },
  {
    id: 'pr-4',
    title: 'Youth Ministry Leaders & Pastors',
    scripture: '1 Thessalonians 5:12-13',
    category: 'Church & Nations',
    description: 'Pray for divine protection, spiritual wisdom, humility, and vision for our priests, youth mentors, worship teams, and volunteer coordinators.',
    prayCount: 95
  },
  {
    id: 'pr-5',
    title: 'Boldness in Personal Evangelism & Campus Ministry',
    scripture: 'Acts 4:29',
    category: 'Spiritual Growth',
    description: 'Pray that every youth member stands steadfast as a beacon of light, truth, and Christ-like love in their schools, colleges, and workplaces.',
    prayCount: 130
  }
];

export const INITIAL_PRAYER_REQUESTS: UserPrayerRequest[] = [
  {
    id: 'req-1',
    name: 'Samuel K.',
    isAnonymous: false,
    category: 'Career & Studies',
    request: 'Please pray for my upcoming master\'s degree entrance exam and guidance regarding a job offer in Bengaluru.',
    date: '2 hours ago',
    prayCount: 24
  },
  {
    id: 'req-2',
    name: 'Anonymous Sister',
    isAnonymous: true,
    category: 'Family & Healing',
    request: 'Pray for my mother\'s health recovery after surgery and for peace and unity in our household.',
    date: '5 hours ago',
    prayCount: 39
  },
  {
    id: 'req-3',
    name: 'Joshua & Youth Choir',
    isAnonymous: false,
    category: 'Worship & Ministry',
    request: 'Pray for our youth worship team as we prepare for the upcoming Revival Camp and Holy Spirit Praise Night.',
    date: 'Yesterday',
    prayCount: 47
  },
  {
    id: 'req-4',
    name: 'Anonymous Brother',
    isAnonymous: true,
    category: 'Spiritual Walk',
    request: 'Battling with distractions and anxiety. Praying for a deeper hunger for God\'s Word and consistent personal prayer life.',
    date: '2 days ago',
    prayCount: 52
  }
];

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: 'Rev. Fr. Parish Priest',
    role: 'Spiritual Director & Patron',
    favoriteVerse: 'John 10:11',
    bio: 'Guiding the youth with paternal care, pastoral wisdom, and a vision to raise godly, mature disciples.',
    contactHint: 'Sanctuary Parish Office'
  },
  {
    name: 'Youth Pastor / Coordinator',
    role: 'Youth Ministry Director',
    favoriteVerse: 'Ecclesiastes 12:1',
    bio: 'Passionate about mentoring young leaders, organizing camps, and equipping youth with sound Biblical truth.',
    contactHint: 'pastor@cpc-youths.org'
  },
  {
    name: 'Youth President & Committee',
    role: 'Youth Executive Board',
    favoriteVerse: '1 Timothy 4:12',
    bio: 'Elected young leaders steering weekly programs, charity drives, sports, and community outreach with vigor.',
    contactHint: 'christhaprabhalayayouths@gmail.com'
  },
  {
    name: 'Worship & Media Leads',
    role: 'Music & Creative Team',
    favoriteVerse: 'Psalm 100:1-2',
    bio: 'Dedicated musicians, vocalists, audio technicians, and media designers glorifying Christ through creativity.',
    contactHint: 'Instagram: @cpc_youths'
  }
];
