import { ArrowLeft, MoreVertical, Edit, Camera, QrCode } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <Edit className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <MoreVertical className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-start mt-8">
          <Avatar className="w-24 h-24 border-4 border-primary">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
          <Button 
            variant="secondary"
            size="icon" 
            className="rounded-full bg-primary hover:bg-primary/90"
          >
            <Camera className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="mt-6">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-foreground">
            Hono
            <span className="text-2xl">🦴🍅⬛</span>
          </h1>
          <p className="text-primary font-medium">En ligne</p>
        </div>

        {/* Info Section */}
        <div className="mt-10 space-y-8">
          <div className="bg-accent/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Informations</h2>
            <div className="space-y-6">
              <div className="bg-background rounded-lg p-4">
                <p className="text-foreground font-medium">+229 43313412</p>
                <p className="text-muted-foreground text-sm">Mobile</p>
              </div>
              <div className="bg-background rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-foreground font-medium">@Jose_0x</p>
                  <p className="text-muted-foreground text-sm">Nom d'utilisateur</p>
                </div>
                <Button variant="ghost" size="icon" className="text-primary">
                  <QrCode className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-8">
          <div className="flex border-b border-border">
            <button className="flex-1 pb-2 text-primary border-b-2 border-primary font-medium">
              Publications
            </button>
            <button className="flex-1 pb-2 text-muted-foreground">
              Publications archivées
            </button>
          </div>
          <div className="mt-6 aspect-video bg-accent rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Aucune publication pour le moment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;