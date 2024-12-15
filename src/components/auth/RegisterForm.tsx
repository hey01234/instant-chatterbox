import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/utils/api";

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

    try {
      const response = await registerUser({
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(response));
      
      toast({
        title: "Inscription réussie",
        description: "Bienvenue sur l'application",
      });
      
      window.location.href = "/";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-gradient-to-br from-card to-secondary/80 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-primary/10 p-4">
          <img 
            src="/lovable-uploads/283a273b-d013-414a-96a8-cf46bce6668a.png" 
            alt="Cerco Messenger" 
            className="h-12 w-12"
          />
        </div>
        <h2 className="text-3xl font-bold">Inscription</h2>
        <p className="text-muted-foreground">
          Créez votre compte pour commencer
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            id="username"
            placeholder="Identifiant"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
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
          <Input
            id="confirmPassword"
            placeholder="Confirmer le mot de passe"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
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
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Vous avez déjà un compte ?{" "}
          <Button variant="link" className="p-0 text-primary" onClick={onToggle}>
            Se connecter
          </Button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;