
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getWeatherEmoji } from "@/utils/helpers";
import { useWeather } from "@/hooks/useWeather";
import { CloudRain, Cloud, CloudSun } from "lucide-react";

const WeatherDisplay = () => {
  const { weather, loading, setCity } = useWeather();
  const [cityInput, setCityInput] = useState("");

  const handleCityChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setCity(cityInput.trim());
      setCityInput("");
    }
  };

  const getWeatherIcon = () => {
    if (!weather) return <CloudSun className="h-6 w-6 text-muted-foreground animate-pulse" />;
    
    const condition = weather.condition.toLowerCase();
    if (condition.includes("rain")) return <CloudRain className="h-6 w-6 text-blue-400" />;
    if (condition.includes("cloud")) return <Cloud className="h-6 w-6 text-gray-400" />;
    return <CloudSun className="h-6 w-6 text-yellow-400" />;
  };

  return (
    <Card className="card-gradient border shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {getWeatherIcon()}
            <h3 className="font-medium">Current Weather</h3>
          </div>
          {weather && (
            <div className="text-lg font-semibold">
              {getWeatherEmoji(weather.condition)}
            </div>
          )}
        </div>

        {loading ? (
          <div className="h-20 flex items-center justify-center">
            <div className="animate-pulse">Loading weather...</div>
          </div>
        ) : weather ? (
          <div className="space-y-2">
            <p className="text-lg">
              {weather.temperature}°C in {weather.city}
            </p>
            <p className="text-sm text-muted-foreground">{weather.condition}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Unable to fetch weather data
          </p>
        )}

        <form onSubmit={handleCityChange} className="mt-4 flex gap-2">
          <Input
            type="text"
            placeholder="Change city..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="secondary" size="sm">
            Update
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
