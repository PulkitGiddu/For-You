
import { useState, useEffect } from "react";
import { useMusic } from "@/hooks/useMusic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTimeOfDay } from "@/utils/helpers";

interface MusicPlayerProps {
  mood: string;
  weatherCondition: string;
}

const MusicPlayer = ({ mood, weatherCondition }: MusicPlayerProps) => {
  const timeOfDay = getTimeOfDay();
  const { videoId, loading, error } = useMusic(mood, weatherCondition, timeOfDay);
  const [loadingPlayer, setLoadingPlayer] = useState(true);

  // Reset loading state when videoId changes
  useEffect(() => {
    setLoadingPlayer(true);
  }, [videoId]);

  if (!mood) {
    return (
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Your Music Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-72">
          <p className="text-muted-foreground">Select a mood to get started</p>
        </CardContent>
      </Card>
    );
  }

  const handleIframeLoad = () => {
    setLoadingPlayer(false);
  };

  return (
    <Card className="card-gradient">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Your Music Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video rounded-md overflow-hidden">
          {loading || !videoId ? (
            <div className="flex flex-col items-center justify-center h-full bg-muted animate-pulse rounded-md">
              <p className="text-muted-foreground">Finding the perfect music...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full bg-muted rounded-md">
              <p className="text-destructive">Couldn't load music recommendation</p>
            </div>
          ) : (
            <>
              {loadingPlayer && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse rounded-md">
                  <p className="text-muted-foreground">Loading player...</p>
                </div>
              )}
              <iframe
                className="w-full aspect-video rounded-md"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                title="YouTube music player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
              ></iframe>
            </>
          )}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Music selected based on your {mood} mood, {weatherCondition} weather, and {timeOfDay} vibes.
        </p>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
