import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MessageSquare,
  Users,
  Bookmark,
  Settings,
  Sun,
  Moon,
  LogOut,
  UserCircle,
  Menu,
} from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/auth");
  };

  const NavContent = () => (
    <>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/283a273b-d013-414a-96a8-cf46bce6668a.png" 
            alt="Cerco Messenger" 
            className="h-8 w-auto"
          />
          <h1 className="text-xl font-bold hidden md:block">Cerco Messenger</h1>
        </div>
      </div>
      
      <div className="flex-1 px-2 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-accent"
          onClick={() => navigate("/")}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="hidden md:inline">Messages</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-accent"
          onClick={() => navigate("/contacts")}
        >
          <Users className="h-5 w-5" />
          <span className="hidden md:inline">Contacts</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-accent"
          onClick={() => navigate("/saved-messages")}
        >
          <Bookmark className="h-5 w-5" />
          <span className="hidden md:inline">Messages enregistrés</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-accent"
          onClick={() => navigate("/profile")}
        >
          <UserCircle className="h-5 w-5" />
          <span className="hidden md:inline">Profil</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-accent"
          onClick={() => navigate("/settings")}
        >
          <Settings className="h-5 w-5" />
          <span className="hidden md:inline">Paramètres</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-accent"
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <>
              <Sun className="h-5 w-5" />
              <span className="hidden md:inline">Thème clair</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5" />
              <span className="hidden md:inline">Thème sombre</span>
            </>
          )}
        </Button>
      </div>

      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden md:inline">Déconnexion</span>
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background">
      {isMobile ? (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 px-4 flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <NavContent />
            </SheetContent>
          </Sheet>
          <img 
            src="/lovable-uploads/283a273b-d013-414a-96a8-cf46bce6668a.png" 
            alt="Cerco Messenger" 
            className="h-8 w-auto"
          />
          <div className="w-10" /> {/* Spacer pour centrer le logo */}
        </div>
      ) : (
        <div className="w-16 md:w-64 h-full bg-card border-r border-border flex flex-col">
          <NavContent />
        </div>
      )}

      <div className={`flex-1 overflow-hidden ${isMobile ? "pt-16" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;