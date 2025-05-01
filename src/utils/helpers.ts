
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

// Music-related helpers
export const generateSearchQuery = (
  mood: string, 
  weather: string, 
  timeOfDay: string
): string => {
  return `${mood} ${weather} ${timeOfDay} lofi mix`;
};

// Affirmations
export const getRandomAffirmation = (): string => {
  const affirmations = [
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
    "You are worthy of good things.",
    "Today is a new beginning.",
    "Your best is enough.",
    "You are resilient and strong.",
    "Be gentle with yourself today.",
    "You are exactly where you need to be.",
    "Your journey is your own.",
    "You are allowed to take up space.",
    "Breathe and remember who you are.",
    "You are doing better than you think."
  ];
  
  return affirmations[Math.floor(Math.random() * affirmations.length)];
};
