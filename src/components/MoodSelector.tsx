
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
  const moods: MoodOption[] = [
    { name: "happy", emoji: "😊", color: "bg-yellow-100 dark:bg-yellow-900" },
    { name: "sad", emoji: "😢", color: "bg-blue-100 dark:bg-blue-900" },
    { name: "chill", emoji: "😌", color: "bg-green-100 dark:bg-green-900" },
    { name: "energetic", emoji: "⚡", color: "bg-orange-100 dark:bg-orange-900" },
  ];

  return (
    <Card className="card-gradient">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">How are you feeling?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-3">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => onMoodSelect(mood.name)}
              className={`mood-button ${mood.color} ${
                selectedMood === mood.name ? "active" : ""
              }`}
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
  );
};

export default MoodSelector;
