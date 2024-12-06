import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Bell, Moon, Sun, Shield, Smartphone, Volume2, Languages } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [language, setLanguage] = useState("Français");

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
    toast({
      title: "Thème modifié",
      description: `Le thème ${isDarkMode ? "clair" : "sombre"} a été activé`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos modifications ont été enregistrées avec succès",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Paramètres</h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Apparence</h2>
            <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>Thème {isDarkMode ? "sombre" : "clair"}</span>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5" />
                  <span>Notifications push</span>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5" />
                  <span>Sons</span>
                </div>
                <Switch checked={sound} onCheckedChange={setSound} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Langue et région</h2>
            <div className="p-4 bg-card rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Languages className="h-5 w-5" />
                <span>Langue de l'application</span>
              </div>
              <select 
                className="w-full mt-2 p-2 rounded-md border border-border bg-background"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Français">Français</option>
                <option value="English">English</option>
                <option value="Español">Español</option>
              </select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Sécurité</h2>
            <div className="p-4 bg-card rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5" />
                <span>Authentification à deux facteurs</span>
              </div>
              <Button variant="outline" className="mt-4">
                Configurer
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Appareils connectés</h2>
            <div className="p-4 bg-card rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5" />
                <div>
                  <p className="font-medium">iPhone 13</p>
                  <p className="text-sm text-muted-foreground">Dernière connexion: Aujourd'hui</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button onClick={handleSave} className="w-full">
              Sauvegarder les modifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;