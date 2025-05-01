
// Time-related helper functions
export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};

export const getGreeting = (): string => {
  const timeOfDay = getTimeOfDay();
  
  switch (timeOfDay) {
    case 'morning': return 'Good morning';
    case 'afternoon': return 'Good afternoon';
    case 'evening': return 'Good evening';
    case 'night': return 'Good night';
  }
};

// Weather-related helpers
export const getWeatherEmoji = (weatherCondition: string): string => {
  const condition = weatherCondition.toLowerCase();
  
  if (condition.includes('clear')) return '☀️';
  if (condition.includes('cloud')) return '☁️';
  if (condition.includes('rain')) return '🌧️';
  if (condition.includes('snow')) return '❄️';
  if (condition.includes('thunder')) return '⚡';
  if (condition.includes('fog') || condition.includes('mist')) return '🌫️';
  
  return '🌤️';
};

export const generateSearchQuery = (
  mood: string, 
  weather: string, 
  timeOfDay: string
): string => {
  let baseGenres = ['Bollywood', 'Hindi songs'];

  // Enhance based on mood
  if (mood.toLowerCase().includes('happy') || mood.toLowerCase().includes('energetic')) {
    baseGenres.push('Punjabi');
  }

  if (mood.toLowerCase().includes('calm') || mood.toLowerCase().includes('peaceful') || mood.toLowerCase().includes('nature')) {
    baseGenres.push('Uttarakhand folk', 'Pahadi songs');
  }

  // Optional: add "lofi", "mix", or "playlist" if user wants background vibes
  const extras = ['playlist', 'mix', "🎵 Pulkit's playlist"];

  // Shuffle an array
  const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);

  // Shuffle genres and extras
  const shuffledGenres = shuffleArray(baseGenres);
  // Final query string
  return `${mood} ${weather} ${timeOfDay} ${shuffledGenres.join(' ')} `;
};

export const getRandomAffirmation = (): string => {
  const affirmations = [
    // 🌟 Motivational
    "You are enough, just as you are.",
    "Today is full of possibilities.",
    "You are capable of amazing things.",
    "Your presence matters in this world.",
    "It's okay to take things at your own pace.",
    "You deserve kindness, especially from yourself.",
    "Small steps still move you forward.",
    "Your feelings are valid and important.",
    "You bring unique gifts to the world.",
    "Rest is productive too.",
    "Today is a new beginning.",
    "Your best is enough.",
    "You are resilient and strong.",
    "Be gentle with yourself today.",
    "You are exactly where you need to be.",
    "Your journey is your own.",
    "You are allowed to take up space.",
    "Breathe and remember who you are.",
    "You are doing better than you think.",
    "Let go of what you can't control.",
    "You are stronger than any doubt.",
    "Progress is more important than perfection.",
    "You are allowed to say no.",
    "You’re doing better than yesterday, and that counts.",
    "The only comparison worth making is to your past self.",

    // 💖 Love Affirmations
    "I am open to giving and receiving love freely.",
    "Love flows to me effortlessly.",
    "I deserve a love that feels like home.",
    "I attract kind and loving relationships.",
    "My heart is full of warmth and compassion.",
    "I am lovable just as I am.",
    "The love I seek is also seeking me.",
    "I am grateful for the love that surrounds me.",
    "I radiate love and kindness.",
    "My relationships are growing deeper each day.",
    "I choose love over fear.",
    "I give love with no expectation of return.",
    "I love and accept myself completely.",
    "Love begins within me.",
    "I bring joy into the lives of those I love.",
    "I am worthy of romantic happiness.",

    // 😂 Funny Love Affirmations
    "I am the whole package — with snacks included.",
    "Even Netflix wishes it could chill with me.",
    "I’m not single, I’m in a long-term relationship with myself.",
    "I radiate romance... and probably pizza rolls.",
    "My soulmate better love memes and naps.",
    "I attract love like Wi-Fi attracts bad connections.",
    "I am cute, even when I eat fries in bed.",
    "I’m dating myself, and honestly, I’m a great partner.",
    "My future spouse is probably lost but trying.",
    "Love is in the air — or maybe that’s just my perfume.",
    "I deserve a love story... with snacks.",
    "I'm so lovable, even dogs get jealous.",
    "I have the romantic energy of a K-drama finale.",
    "I flirt like a confused potato — and it’s working.",
    "I may not be perfect, but I’m perfectly huggable.",
    "My love language is food. Feed me and I’m yours.",
    "If loving me is wrong, you’re doing life wrong.",
    "I'm not high maintenance — I’m romantically deluxe.",
    "I'm emotionally available... after coffee.",
    "The right person will love my weird just right."
  ];

  const randomIndex = Math.floor(Math.random() * affirmations.length);
  return affirmations[randomIndex];
};
