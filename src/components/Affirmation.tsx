
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getRandomAffirmation } from "@/utils/helpers";
import { Smile } from "lucide-react";

const Affirmation = () => {
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    setAffirmation(getRandomAffirmation());
  }, []);

  const handleNewAffirmation = () => {
    setAffirmation(getRandomAffirmation());
  };

  return (
    <Card className="card-gradient">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Smile className="h-5 w-5 text-primary" />
          <span>Daily Affirmation</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[80px] flex flex-col items-center justify-center">
          <p className="text-lg font-medium text-center italic">
            "{affirmation}"
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewAffirmation}
            className="text-sm"
          >
            New Affirmation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Affirmation;
