import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  Bookmark,
  Settings,
  Sun,
  Moon,
  LogOut,
  UserCircle,
} from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
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

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar fixe */}
      <div className="w-16 md:w-64 h-full bg-card border-r border-border flex flex-col">
        <div className="p-4">
          <h1 className="text-xl font-bold hidden md:block">Chat App</h1>
        </div>
        
        <div className="flex-1 px-2 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => navigate("/")}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="hidden md:inline">Messages</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => navigate("/contacts")}
          >
            <Users className="h-5 w-5" />
            <span className="hidden md:inline">Contacts</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => navigate("/saved-messages")}
          >
            <Bookmark className="h-5 w-5" />
            <span className="hidden md:inline">Messages enregistrés</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => navigate("/profile")}
          >
            <UserCircle className="h-5 w-5" />
            <span className="hidden md:inline">Profil</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => navigate("/settings")}
          >
            <Settings className="h-5 w-5" />
            <span className="hidden md:inline">Paramètres</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
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
            className="w-full justify-start gap-2 text-red-500 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden md:inline">Déconnexion</span>
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;