export interface RomanticSong {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: string;
  category: 'classic' | 'modern' | 'instrumental' | 'wedding' | 'anniversary';
  mood: 'sweet' | 'passionate' | 'tender' | 'joyful' | 'dreamy';
  preview?: string; // Optional preview URL
}

export const romanticSongs: RomanticSong[] = [
  // Classic Love Songs
  {
    id: 'perfect-ed-sheeran',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    url: '/music/romantic/perfect-ed-sheeran.mp3',
    duration: '4:23',
    category: 'modern',
    mood: 'sweet',
  },
  {
    id: 'thinking-out-loud',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    url: '/music/romantic/thinking-out-loud.mp3',
    duration: '4:41',
    category: 'modern',
    mood: 'tender',
  },
  {
    id: 'all-of-me',
    title: 'All of Me',
    artist: 'John Legend',
    url: '/music/romantic/all-of-me.mp3',
    duration: '4:29',
    category: 'modern',
    mood: 'passionate',
  },
  {
    id: 'cant-help-falling-in-love',
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley',
    url: '/music/romantic/cant-help-falling-in-love.mp3',
    duration: '3:02',
    category: 'classic',
    mood: 'sweet',
  },
  {
    id: 'wonderful-tonight',
    title: 'Wonderful Tonight',
    artist: 'Eric Clapton',
    url: '/music/romantic/wonderful-tonight.mp3',
    duration: '3:43',
    category: 'classic',
    mood: 'tender',
  },
  {
    id: 'make-you-feel-my-love',
    title: 'Make You Feel My Love',
    artist: 'Adele',
    url: '/music/romantic/make-you-feel-my-love.mp3',
    duration: '3:32',
    category: 'modern',
    mood: 'passionate',
  },
  {
    id: 'marry-me',
    title: 'Marry Me',
    artist: 'Train',
    url: '/music/romantic/marry-me.mp3',
    duration: '3:58',
    category: 'wedding',
    mood: 'joyful',
  },
  {
    id: 'a-thousand-years',
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    url: '/music/romantic/a-thousand-years.mp3',
    duration: '4:45',
    category: 'wedding',
    mood: 'dreamy',
  },
  {
    id: 'at-last',
    title: 'At Last',
    artist: 'Etta James',
    url: '/music/romantic/at-last.mp3',
    duration: '3:01',
    category: 'classic',
    mood: 'passionate',
  },
  {
    id: 'your-song',
    title: 'Your Song',
    artist: 'Elton John',
    url: '/music/romantic/your-song.mp3',
    duration: '4:01',
    category: 'classic',
    mood: 'sweet',
  },
  // Instrumental Romantic Music
  {
    id: 'romantic-piano-1',
    title: 'Tender Moments',
    artist: 'Romantic Piano Collection',
    url: '/music/romantic/tender-moments.mp3',
    duration: '3:30',
    category: 'instrumental',
    mood: 'tender',
  },
  {
    id: 'romantic-guitar-1',
    title: 'Love Serenade',
    artist: 'Acoustic Romance',
    url: '/music/romantic/love-serenade.mp3',
    duration: '4:15',
    category: 'instrumental',
    mood: 'dreamy',
  },
  {
    id: 'romantic-strings-1',
    title: 'Heart Strings',
    artist: 'Chamber of Love',
    url: '/music/romantic/heart-strings.mp3',
    duration: '5:20',
    category: 'instrumental',
    mood: 'passionate',
  },
  // Anniversary Songs
  {
    id: 'anniversary-song',
    title: 'Anniversary Song',
    artist: 'Tony Bennett',
    url: '/music/romantic/anniversary-song.mp3',
    duration: '3:25',
    category: 'anniversary',
    mood: 'sweet',
  },
  {
    id: 'unforgettable',
    title: 'Unforgettable',
    artist: 'Nat King Cole',
    url: '/music/romantic/unforgettable.mp3',
    duration: '3:28',
    category: 'classic',
    mood: 'tender',
  },
];

export const getSongsByCategory = (category: RomanticSong['category']): RomanticSong[] => {
  return romanticSongs.filter(song => song.category === category);
};

export const getSongsByMood = (mood: RomanticSong['mood']): RomanticSong[] => {
  return romanticSongs.filter(song => song.mood === mood);
};

export const getRandomSong = (): RomanticSong => {
  return romanticSongs[Math.floor(Math.random() * romanticSongs.length)];
};

export const getRecommendedSongs = (occasion: string): RomanticSong[] => {
  const occasionLower = occasion.toLowerCase();
  
  if (occasionLower.includes('wedding') || occasionLower.includes('marry')) {
    return getSongsByCategory('wedding').slice(0, 5);
  } else if (occasionLower.includes('anniversary')) {
    return getSongsByCategory('anniversary').concat(getSongsByCategory('classic')).slice(0, 5);
  } else if (occasionLower.includes('valentine') || occasionLower.includes('love')) {
    return getSongsByMood('passionate').concat(getSongsByMood('sweet')).slice(0, 5);
  } else if (occasionLower.includes('birthday')) {
    return getSongsByMood('joyful').concat(getSongsByMood('sweet')).slice(0, 5);
  } else {
    // Default romantic selection
    return [
      romanticSongs.find(s => s.id === 'perfect-ed-sheeran')!,
      romanticSongs.find(s => s.id === 'all-of-me')!,
      romanticSongs.find(s => s.id === 'thinking-out-loud')!,
      romanticSongs.find(s => s.id === 'cant-help-falling-in-love')!,
      romanticSongs.find(s => s.id === 'wonderful-tonight')!,
    ];
  }
};
