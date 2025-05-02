
import { useEffect, useState } from "react";
import { getGreeting } from "@/utils/helpers";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  name?: string;
}

const Header = ({ name = "Mansi" }: HeaderProps) => {
  const [greeting, setGreeting] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    setGreeting(getGreeting());
    
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000); // Update greeting every minute
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center md:text-left">
        <span className="animate-float inline-block"></span> For You
      </h1>
  
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <h2 className="text-base md:text-lg font-medium text-center md:text-left">
          {greeting}, {name}!
        </h2>
  
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
