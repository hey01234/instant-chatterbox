import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onToggle }: { onToggle: () => void }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Vérifier si l'utilisateur existe
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("user_")) {
        try {
          const userData = JSON.parse(localStorage.getItem(key) || "");
          users.push(userData);
        } catch (e) {
          console.error("Erreur lors de la lecture des données utilisateur:", e);
        }
      }
    }

    const user = users.find(u => u.username === formData.identifier);
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Aucun compte trouvé avec cet identifiant",
      });
      setIsLoading(false);
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(user));
    
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur l'application",
    });
    
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-gradient-to-br from-card to-secondary/80 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-primary/10 p-4">
          <MessageSquare className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Bienvenue</h2>
        <p className="text-muted-foreground">
          Connectez-vous pour accéder à votre compte
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            id="identifier"
            placeholder="Identifiant"
            type="text"
            value={formData.identifier}
            onChange={(e) =>
              setFormData({ ...formData, identifier: e.target.value })
            }
            required
            className="bg-background/50 border-input"
          />
          <Input
            id="password"
            placeholder="Mot de passe"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="bg-background/50 border-input"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Vous n'avez pas de compte ?{" "}
          <Button variant="link" className="p-0 text-primary" onClick={onToggle}>
            S'inscrire
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;