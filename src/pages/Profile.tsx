import { ArrowLeft, Edit, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import OnlineStatus from "@/components/OnlineStatus";

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  
  // Mock data - in a real app, this would come from an API
  const profile = {
    id: userId || "self",
    name: userId ? "Alice Martin" : "Hono",
    username: userId ? "@alice_m" : "@hono_0x",
    avatar: "/placeholder.svg",
    phone: "+229 43313412",
    online: true,
    isOwnProfile: !userId
  };

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
        {profile.isOwnProfile && (
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <Edit className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6 max-w-2xl mx-auto">
        <div className="flex justify-center mt-8 relative">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-primary">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <OnlineStatus online={profile.online} />
            {profile.isOwnProfile && (
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
        
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-foreground">
            {profile.name}
            <span className="text-2xl">🦴🍅⬛</span>
          </h1>
          <p className="text-primary font-medium mt-1">
            {profile.online ? "En ligne" : "Hors ligne"}
          </p>
        </div>

        {/* Info Section */}
        <div className="mt-10">
          <div className="bg-accent/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Informations</h2>
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4">
                <p className="text-foreground font-medium">{profile.phone}</p>
                <p className="text-muted-foreground text-sm">Mobile</p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <p className="text-foreground font-medium">{profile.username}</p>
                <p className="text-muted-foreground text-sm">Nom d'utilisateur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;