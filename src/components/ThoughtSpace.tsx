
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ThoughtSpace = () => {
  const [thoughts, setThoughts] = useLocalStorage<string>("mood-melody-thoughts", "");
  const [isSaving, setIsSaving] = useState(false);

  const handleThoughtsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setThoughts(e.target.value);
    setIsSaving(true);
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

  return (
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
        <p className="mt-2 text-xs text-muted-foreground">
          Your thoughts are saved automatically and only stored on your device.
        </p>
      </CardContent>
    </Card>
  );
};

export default ThoughtSpace;
