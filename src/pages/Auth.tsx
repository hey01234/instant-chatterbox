import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";
import RegisterForm from "@/components/RegisterForm";

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

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.identifier, // Django attend "username"
        password: formData.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${formData.identifier}`,
      });
    } else {
      const errorData = await response.json();
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorData.error || "Identifiant ou mot de passe incorrect",
      });
    }
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Erreur",
      description: "Impossible de se connecter au serveur",
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="w-full max-w-md space-y-8 p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-primary/10 p-4">
          <MessageSquare className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Bienvenue</h2>
        <p className="text-muted-foreground">
          Connectez-vous pour accéder à votre compte
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              id="identifier"
              placeholder="Identifiant"
              type="text"
              value={formData.identifier}
              onChange={(e) =>
                setFormData({ ...formData, identifier: e.target.value })
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
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Vous n'avez pas de compte ?{" "}
          <Button variant="link" className="p-0" onClick={onToggle}>
            S'inscrire
          </Button>
        </p>
      </div>
    </div>
  );
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {isLogin ? (
        <LoginForm onToggle={toggleForm} />
      ) : (
        <RegisterForm onToggle={toggleForm} />
      )}
    </div>
  );
};

export default Auth;
