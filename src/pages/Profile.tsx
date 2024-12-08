import { ArrowLeft, Edit, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UserProfile {
  id: string;
  username: string;
  name: string;
  phone: string;
  description: string;
  avatar?: string;
  online: boolean;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userId } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  
  useEffect(() => {
    // Si c'est le profil de l'utilisateur connecté
    if (!userId) {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setProfile({
          ...user,
          name: user.name || "Jack",
          phone: user.phone || "",
          description: user.description || "",
          online: true,
        });
      }
    } else {
      // Simuler le chargement du profil d'un autre utilisateur
      setProfile({
        id: userId,
        username: "utilisateur",
        name: "Jack",
        phone: "+33 6 12 34 56 78",
        description: "Description de l'utilisateur",
        avatar: "/placeholder.svg",
        online: true,
      });
    }
  }, [userId]);

  const handleSave = () => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...editedProfile };
    setProfile(updatedProfile);
    
    if (!userId) {
      localStorage.setItem("user", JSON.stringify(updatedProfile));
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées",
      });
    }
    
    setIsEditing(false);
  };

  const startChat = () => {
    if (userId) {
      navigate(`/?chatId=${userId}`);
    }
  };

  if (!profile) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 flex items-center justify-between border-b border-border">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        {!userId && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-accent"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-6 w-6" />
          </Button>
        )}
      </div>

      <div className="px-6 pb-6 max-w-2xl mx-auto">
        <div className="flex justify-center mt-8 relative">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-primary">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.username[0]}</AvatarFallback>
            </Avatar>
            {!userId && (
              <Button 
                variant="secondary"
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-primary/90 w-8 h-8"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="mt-6 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">
              {profile.username}
            </h1>
            <p className="text-xl text-primary mt-1">
              {profile.name}
            </p>
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                  <Input
                    value={editedProfile.phone ?? profile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    placeholder="Numéro de téléphone"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <Textarea
                    value={editedProfile.description ?? profile.description}
                    onChange={(e) => setEditedProfile({ ...editedProfile, description: e.target.value })}
                    placeholder="Décrivez-vous en quelques mots"
                    className="h-32"
                  />
                </div>
                <Button onClick={handleSave} className="w-full">
                  Enregistrer
                </Button>
              </>
            ) : (
              <>
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                  <p className="text-foreground">{profile.phone || "Non renseigné"}</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-foreground">{profile.description || "Aucune description"}</p>
                </div>
              </>
            )}
          </div>

          {userId && (
            <Button onClick={startChat} className="w-full">
              Envoyer un message
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;