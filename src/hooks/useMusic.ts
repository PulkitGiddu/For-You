
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
        // In a real app, you would use the YouTube Data API to search for videos
        // For demo purposes, we'll just use some predefined videos based on mood
        
        // Generate a "random" but consistent video ID based on inputs to simulate API
        const searchQuery = generateSearchQuery(mood, weather, timeOfDay);
        const mockVideoIds = {
          'happy clear morning lofi mix': 'jfKfPfyJRdk',
          'happy cloudy morning lofi mix': '21qNxnCS8WU',
          'happy rainy morning lofi mix': '5yx6BWlEVcY',
          'happy clear afternoon lofi mix': 'rUxyKA_-grg',
          'happy cloudy afternoon lofi mix': 'lTRiuFIWV54',
          'happy rainy afternoon lofi mix': '1fueZCTYkpA',
          'happy clear evening lofi mix': 'EhRw9ktpBpg',
          'happy cloudy evening lofi mix': 'DWcJFNfaw9c',
          'happy rainy evening lofi mix': 'c9ZwCCTG56k',
          'sad clear morning lofi mix': '6R9FnBJKBA0',
          'sad cloudy morning lofi mix': 'ZRPgXx3TT1Q',
          'sad rainy morning lofi mix': 'eevY3-z0RTI',
          'sad clear afternoon lofi mix': 'Tt7bzxurJ1I',
          'sad cloudy afternoon lofi mix': 'FE9_g9j-ffE',
          'sad rainy afternoon lofi mix': 'WY2Nke9zhbo',
          'sad clear evening lofi mix': '2CnVxNvQGLs',
          'sad cloudy evening lofi mix': 'lCOf9GJzHtE',
          'sad rainy evening lofi mix': 'n9Y2Eb4BaSg',
          'chill clear morning lofi mix': 'GEAboOngLIQ',
          'chill cloudy morning lofi mix': 'yHzN9H4wtYw',
          'chill rainy morning lofi mix': 'mPZkdNFkNps',
          'chill clear afternoon lofi mix': 'Z2TkCQmvl1M',
          'chill cloudy afternoon lofi mix': '7NOSDKb0HlU',
          'chill rainy afternoon lofi mix': 'lTRiuFIWV54',
          'chill clear evening lofi mix': 'u23QICgj1aA',
          'chill cloudy evening lofi mix': 'Ep0H4VqGkSI',
          'chill rainy evening lofi mix': 'bmVKaAV_7-A',
          'energetic clear morning lofi mix': 'hvJXwQYXGeg',
          'energetic cloudy morning lofi mix': '7aEQkTOku9c',
          'energetic rainy morning lofi mix': 'FmVLaZzswfE',
          'energetic clear afternoon lofi mix': 'CLeZyIID9Bo',
          'energetic cloudy afternoon lofi mix': 'hivOiRlh1CQ',
          'energetic rainy afternoon lofi mix': 'yXKPNaxNAz0',
          'energetic clear evening lofi mix': '4xDzrJKXOOY',
          'energetic cloudy evening lofi mix': '-9gEgSJc-q0',
          'energetic rainy evening lofi mix': 'G6Kd0GEjNLg',
        };
        
        // Default video in case we don't have a match
        const defaultVideoId = 'jfKfPfyJRdk';
        
        // Create a key based on the search query
        const simplifiedQuery = `${mood} ${weather.toLowerCase().includes('rain') ? 'rainy' : weather.toLowerCase().includes('cloud') ? 'cloudy' : 'clear'} ${timeOfDay} lofi mix`;
        
        // If we have a predefined video for this combo, use it, otherwise use default
        const videoId = mockVideoIds[simplifiedQuery] || defaultVideoId;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        setVideoId(videoId);
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
