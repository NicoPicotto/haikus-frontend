import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
   const { theme, setTheme } = useTheme();

   const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
   };

   return (
      <Button
         variant='ghost'
         size='icon'
         onClick={toggleTheme}
         aria-label='Toggle theme'
      >
         <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
               theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
         />
         <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
               theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
         />
      </Button>
   );
}
