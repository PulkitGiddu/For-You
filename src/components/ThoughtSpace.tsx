import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ThoughtSpace = () => {
  const [thoughts, setThoughts] = useLocalStorage<string>("mood-melody-thoughts", "");
  const [isSaving, setIsSaving] = useState(false);
  const [stickyNotes, setStickyNotes] = useState<string[]>([]);

  const handleThoughtsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setThoughts(e.target.value);
    setIsSaving(true);
  };

  const addStickyNote = () => {
    if (thoughts.trim()) {
      setStickyNotes((prev) => [...prev, thoughts.trim()]);
      setThoughts(""); // Clear the textarea
    }
  };

  // Show saving indicator
  useEffect(() => {
    if (isSaving) {
      const timer = setTimeout(() => {
        setIsSaving(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [thoughts, isSaving]);

  // Function to determine text color based on background color
  const getTextColor = (bgColor: string) => {
    if (bgColor === "bg-yellow-200" || bgColor === "bg-blue-200") {
      return "text-black";
    }
    return "text-white";
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="card-gradient h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span>Your Thoughts</span>
            {isSaving && (
              <span className="text-xs text-muted-foreground animate-pulse">
                Saving...
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <Textarea
            placeholder="Write your thoughts here..."
            className="flex-1 min-h-[200px] resize-none bg-background/50 backdrop-blur-sm"
            value={thoughts}
            onChange={handleThoughtsChange}
          />
          <button
            onClick={addStickyNote}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md self-end"
          >
            Add Sticky Note
          </button>
          <p className="mt-2 text-xs text-muted-foreground">
            Your thoughts are saved automatically and only stored on your device.
          </p>
        </CardContent>
      </Card>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {stickyNotes.map((note, index) => {
          // Dynamically assign background color (example: alternating colors)
          const bgColor = index % 2 === 0 ? "bg-yellow-200" : "bg-blue-200";
          const textColor = getTextColor(bgColor);

          return (
            <div
              key={index}
              className={`p-4 rounded-md shadow-md text-sm ${bgColor} ${textColor}`}
            >
              {note}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThoughtSpace;