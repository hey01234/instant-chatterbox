import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Bell, Moon, Sun, Shield, Smartphone, Volume2, Languages, Trash2 } from "lucide-react";
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

  const handleDeleteAccount = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { id } = JSON.parse(userData);
      localStorage.removeItem(`user_${id}`);
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      
      // Supprimer les conversations associées
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes(`chat_${id}_`) || key.includes(`_${id}`)) {
          localStorage.removeItem(key);
        }
      });

      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès",
        variant: "destructive",
      });
      navigate("/auth");
    }
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
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Apparence</h2>
            <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm border border-border">
              <div className="flex items-center gap-3">
                {isDarkMode ? <Moon className="h-5 w-5 text-foreground" /> : <Sun className="h-5 w-5 text-foreground" />}
                <span className="text-foreground">Thème {isDarkMode ? "sombre" : "clair"}</span>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm border border-border">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-foreground" />
                  <span className="text-foreground">Notifications push</span>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm border border-border">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-foreground" />
                  <span className="text-foreground">Sons</span>
                </div>
                <Switch checked={sound} onCheckedChange={setSound} />
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Langue et région</h2>
            <div className="p-4 bg-card rounded-lg shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Languages className="h-5 w-5 text-foreground" />
                <span className="text-foreground">Langue de l'application</span>
              </div>
              <select 
                className="w-full mt-2 p-2 rounded-md border border-border bg-background text-foreground"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Français">Français</option>
                <option value="English">English</option>
                <option value="Español">Español</option>
              </select>
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Sécurité</h2>
            <div className="p-4 bg-card rounded-lg shadow-sm border border-border">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-foreground" />
                <span className="text-foreground">Authentification à deux facteurs</span>
              </div>
              <Button variant="outline" className="mt-4">
                Configurer
              </Button>
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Appareils connectés</h2>
            <div className="p-4 bg-card rounded-lg shadow-sm border border-border">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-foreground" />
                <div>
                  <p className="font-medium text-foreground">iPhone 13</p>
                  <p className="text-sm text-muted-foreground">Dernière connexion: Aujourd'hui</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-destructive">Zone de danger</h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer mon compte
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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