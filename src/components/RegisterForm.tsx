import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";

const RegisterForm = ({ onToggle }: { onToggle: () => void }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
      });
      setIsLoading(false);
      return;
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("user_")) {
        try {
          const userData = JSON.parse(localStorage.getItem(key) || "");
          existingUsers.push(userData);
        } catch (e) {
          console.error("Erreur lors de la lecture des données utilisateur:", e);
        }
      }
    }

    const userExists = existingUsers.some(user => user.username === formData.username);
    if (userExists) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Cet identifiant est déjà utilisé",
      });
      setIsLoading(false);
      return;
    }

    // Créer un nouvel utilisateur
    const userId = `${Date.now()}`;
    const newUser = {
      id: userId,
      username: formData.username,
      name: "Jack",
      phone: "",
      description: "",
    };

    // Sauvegarder l'utilisateur
    localStorage.setItem(`user_${userId}`, JSON.stringify(newUser));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(newUser));
      
    toast({
      title: "Inscription réussie",
      description: "Bienvenue sur l'application",
    });
      
    window.location.href = "/";
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-primary/10 p-4">
          <MessageSquare className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Inscription</h2>
        <p className="text-muted-foreground">
          Créez votre compte pour commencer
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              id="username"
              placeholder="Identifiant"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              placeholder="Mot de passe"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              id="confirmPassword"
              placeholder="Confirmer le mot de passe"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Vous avez déjà un compte ?{" "}
          <Button variant="link" className="p-0" onClick={onToggle}>
            Se connecter
          </Button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;