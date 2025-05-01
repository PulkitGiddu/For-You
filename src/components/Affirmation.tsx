import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getRandomAffirmation } from "@/utils/helpers";
import { Smile } from "lucide-react";
import Confetti from "react-confetti";

const Affirmation = () => {
  const [affirmation, setAffirmation] = useState(getRandomAffirmation()); // Start with a random affirmation
  const [showCelebration, setShowCelebration] = useState(false);

  const proposalText = [
    "Mansi, ek baat bolu? Like I was reading something and I found a beautiful line saying, 'Find out your flow or Ikigai.' It means finding what you love to do. And you know, I never get tired of doing anything for the ones I love, and probably that count has increased. And that is you.",
    "And mujae lagta hai ki subsae mushkil tha for us to find each other amongst millions of people and you know what's the easy part now in our life is to never lose each other.",
    "So, I love you because the entire universe conspired to help me find you.",
  ];

  useEffect(() => {
    // Change affirmation every 1 minute
    const interval = setInterval(() => {
      setAffirmation(getRandomAffirmation());
    }, 60000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleButtonClick = () => {
    setAffirmation(proposalText.join(" ")); // Show proposalText
    setShowCelebration(true);

    // Start celebration for 10 seconds, then reset
    setTimeout(() => {
      setShowCelebration(false);
      setAffirmation(getRandomAffirmation()); // Reset to a random affirmation
    }, 20000);
  };

  return (
    <>
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
              onClick={handleButtonClick}
              className="text-sm"
            >
              For You
            </Button>
          </div>
        </CardContent>
      </Card>

      {showCelebration && (
        <Confetti
          width={window.innerWidth}
          height={1500}
          numberOfPieces={250} // Increase or decrease the number of confetti pieces
          gravity={0.1} // Adjust the gravity for slower or faster falling confetti
          colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]} // Custom colors
        />
      )}
    </>
  );
};

export default Affirmation;