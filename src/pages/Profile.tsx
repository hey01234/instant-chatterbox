import { ArrowLeft, Camera, Trash2, Edit2, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setProfile({
        ...user,
        name: user.name || "Utilisateur",
        phone: user.phone || "",
        description: user.description || "",
        online: true,
      });
    }
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => prev ? { ...prev, avatar: reader.result as string } : null);
        localStorage.setItem("user", JSON.stringify({ 
          ...profile, 
          avatar: reader.result 
        }));
        toast({
          title: "Photo de profil mise à jour",
          description: "Votre photo de profil a été modifiée avec succès",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setProfile(prev => prev ? { ...prev, avatar: undefined } : null);
    localStorage.setItem("user", JSON.stringify({ 
      ...profile, 
      avatar: undefined 
    }));
    toast({
      title: "Photo de profil supprimée",
      description: "Votre photo de profil a été supprimée avec succès",
    });
  };

  const handleSave = () => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...editedProfile };
    setProfile(updatedProfile);
    localStorage.setItem("user", JSON.stringify(updatedProfile));
    
    toast({
      title: "Profil mis à jour",
      description: "Vos modifications ont été enregistrées avec succès",
    });
    
    setIsEditing(false);
  };

  if (!profile) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 flex items-center justify-between border-b border-border bg-card">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Profil</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-accent"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <X className="h-6 w-6" /> : <Edit2 className="h-6 w-6" />}
        </Button>
      </div>

      <div className="px-6 pb-6 max-w-2xl mx-auto">
        <div className="flex justify-center mt-8">
          <div className="relative group">
            <Avatar className="w-32 h-32 border-4 border-primary cursor-pointer transition-transform hover:scale-105">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              <Button
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90 h-8 w-8"
                onClick={handleAvatarClick}
              >
                <Camera className="h-4 w-4" />
              </Button>
              
              {profile.avatar && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="rounded-full h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer la photo de profil ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action ne peut pas être annulée.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRemoveAvatar}>
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              {profile.name}
            </h1>
            <p className="text-primary mt-1">
              @{profile.username}
            </p>
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nom</label>
                  <Input
                    value={editedProfile.name ?? profile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    placeholder="Votre nom"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                  <Input
                    value={editedProfile.phone ?? profile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    placeholder="Votre numéro de téléphone"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <Textarea
                    value={editedProfile.description ?? profile.description}
                    onChange={(e) => setEditedProfile({ ...editedProfile, description: e.target.value })}
                    placeholder="Décrivez-vous en quelques mots"
                    className="mt-1 h-32"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                  <p className="text-foreground mt-1">{profile.phone || "Non renseigné"}</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-foreground mt-1">{profile.description || "Aucune description"}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;