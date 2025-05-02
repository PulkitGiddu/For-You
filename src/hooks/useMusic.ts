import { useState, useEffect } from 'react';
import { generateSearchQuery } from '@/utils/helpers';

export const useMusic = (mood: string, weather: string, timeOfDay: string) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      if (!mood || !weather || !timeOfDay) return;

      setLoading(true);
      setError(null);
      try {
        const apiKey = 'AIzaSyB4wtsbkwnLWzhtsgCOtACX_nq2sRfMMUA'; // Replace with your YouTube Data API v3 key
        const searchQuery = generateSearchQuery(mood);

        // Make a request to the YouTube Data API
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
            searchQuery
          )}&maxResults=1&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch music recommendation');
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          // Extract the video ID from the first result
          const videoId = data.items[0].id.videoId;
          setVideoId(videoId);
        } else {
          throw new Error('No music recommendations found');
        }
      } catch (err) {
        setError('Failed to fetch music recommendation');
        console.error('Error fetching music:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [mood, weather, timeOfDay]);

  return { videoId, loading, error };
};