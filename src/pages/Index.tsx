
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import WeatherDisplay from "@/components/WeatherDisplay";
import MoodSelector from "@/components/MoodSelector";
import MusicPlayer from "@/components/MusicPlayer";
import Affirmation from "@/components/Affirmation";
import ThoughtSpace from "@/components/ThoughtSpace";
import { useWeather } from "@/hooks/useWeather";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { weather } = useWeather();
  const [selectedMood, setSelectedMood] = useLocalStorage<string>(
    "mood-melody-selected-mood",
    "happy"
  );
  const { toast } = useToast();

  useEffect(() => {
    // Set the theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    
    // Welcome toast
    toast({
      title: "Welcome to Mood Melody",
      description: "Select your mood, and we'll find the perfect music for you.",
    });
  }, [toast]);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    toast({
      title: "Mood Updated",
      description: `Your mood has been set to ${mood}. Finding new music...`,
    });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-1">
            <WeatherDisplay />
          </div>
          <div className="md:col-span-3">
            <MoodSelector
              onMoodSelect={handleMoodSelect}
              selectedMood={selectedMood}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <MusicPlayer
            mood={selectedMood}
            weatherCondition={weather?.condition || "clear"}
          />
          <Affirmation />
        </div>

        <div className="mb-6">
          <ThoughtSpace />
        </div>

        <footer className="text-center text-sm text-muted-foreground mt-8">
          <p>Mood Melody - Made with 💜 for you</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
