import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MoodOption {
  name: string;
  emoji: string;
  color: string;
}

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
  selectedMood: string;
}

const MoodSelector = ({ onMoodSelect, selectedMood }: MoodSelectorProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupColor, setPopupColor] = useState<string>("bg-white");
  const [showSpecialAnimation, setShowSpecialAnimation] = useState(false);

  const moods: MoodOption[] = [
    { name: "happy", emoji: "😊", color: "bg-yellow-100 dark:bg-yellow-900" },
    { name: "sad", emoji: "😢", color: "bg-blue-100 dark:bg-blue-900" },
    { name: "chill", emoji: "😌", color: "bg-green-100 dark:bg-green-900" },
    { name: "energetic", emoji: "⚡", color: "bg-orange-100 dark:bg-orange-900" },
    { name: "pulkit's playlist", emoji: "❤️", color: "bg-red-100 dark:bg-red-900 animate-heartbeat" },
    { name: "special", emoji: "💖", color: "bg-pink-100 dark:bg-pink-900" }, // New mood option
  ];

  const handleMoodClick = (mood: string) => {
    const selectedMood = moods.find((m) => m.name === mood);
    if (mood === "sad") {
      setPopupColor(selectedMood?.color || "bg-white"); // Set dynamic color
      setShowPopup(true); // Show the popup for "sad" mood
    } else if (mood === "pulkit's playlist") {
      // Redirect to Pulkit's playlist on YouTube Music
      window.open(
        "https://music.youtube.com/playlist?list=PLpK3w4VInZZCU2p6DnqrNTZ9TvExQny-g&si=qe_AYPxQ1p2skhZ_",
        "_blank"
      );
    } else if (mood === "special") {
      setShowSpecialAnimation(true); // Show special animation
    } else {
      onMoodSelect(mood);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const closeSpecialAnimation = () => {
    setShowSpecialAnimation(false);
  };

  return (
    <>
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">How are you feeling?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-3">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => handleMoodClick(mood.name)}
                className={`mood-button ${mood.color} ${selectedMood === mood.name ? "active" : ""}`}
                aria-label={`Select ${mood.name} mood`}
              >
                <span className="text-2xl" role="img" aria-label={mood.name}>
                  {mood.emoji}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-muted-foreground text-sm">
            Selected: <span className="capitalize">{selectedMood || "Choose a mood"}</span>
          </p>
        </CardContent>
      </Card>

      {/* Popup for Sad Mood */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-6 rounded-lg shadow-lg text-center slide-down ${popupColor}`}
            style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)" }}
          >
            <h2 className="text-lg font-bold">Hey, don't be sad! 😊</h2>
            <p className="mt-2 text-sm">You are amazing, and everything will be okay!</p>
            <p className="mt-2 text-sm">Remember, it's okay to feel sad sometimes.</p>
            <p className="mt-2 text-sm">
              <a
                href="https://music.youtube.com/watch?v=wScs3JNn8Lg&si=tOhyWEZTVUmosv3t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 underline"
              >
                ❤️ Click Here
              </a>
            </p>
            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              With You Always
            </button>
          </div>
        </div>
      )}

      {/* Special Animation for "special" mood */}
      {showSpecialAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-pink-500 animate-bounce">May 13</h1>
            <button
              onClick={closeSpecialAnimation}
              className="mt-6 px-4 py-2 bg-pink-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
          <audio autoPlay loop>
            <source src="/assets/audio/special-day.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </>
  );
};

export default MoodSelector;