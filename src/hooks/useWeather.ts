import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  city: string;
}

export const useWeather = (defaultCity = 'Uttarakhand') => {
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
        const apiKey = '7fec665673b70e73814c98b48126c25e'; // Replace with your OpenWeather API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        const weatherData: WeatherData = {
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].description,
          icon: data.weather[0].icon,
          city: data.name,
        };

        setWeather(weatherData);
        localStorage.setItem('mood-melody-city', city);
      } catch (err) {
        setError('Failed to fetch weather data');
        toast({
          title: "Weather Error",
          description: "Couldn't fetch the current weather. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, toast]);

  return { weather, loading, error, setCity };
};