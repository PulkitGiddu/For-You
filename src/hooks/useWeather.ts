
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  city: string;
}

export const useWeather = (defaultCity = 'Tokyo') => {
  const [city, setCity] = useState<string>(() => {
    const savedCity = localStorage.getItem('mood-melody-city');
    return savedCity || defaultCity;
  });
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // For demo purposes, we'll simulate the weather data
        // In a real app, you would use OpenWeatherMap API or another weather API
        const mockWeatherConditions = [
          'Clear Sky', 'Partly Cloudy', 'Cloudy', 
          'Light Rain', 'Moderate Rain', 'Heavy Rain',
          'Thunderstorm', 'Snow', 'Fog'
        ];
        
        const mockTemp = Math.floor(Math.random() * 30) + 5; // 5-35°C
        const mockCondition = mockWeatherConditions[Math.floor(Math.random() * mockWeatherConditions.length)];
        const mockIcon = mockCondition.toLowerCase().replace(' ', '-');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setWeather({
          temperature: mockTemp,
          condition: mockCondition,
          icon: mockIcon,
          city: city
        });
        
        localStorage.setItem('mood-melody-city', city);
      } catch (err) {
        setError('Failed to fetch weather data');
        toast({
          title: "Weather Error",
          description: "Couldn't fetch the current weather. Using default values.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, toast]);

  return { weather, loading, error, setCity };
};
