import { ArrowLeft, MoreVertical, Edit, Camera, QrCode } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Edit className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <MoreVertical className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex justify-between items-start">
          <Avatar className="w-20 h-20 border-4 border-primary">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-[#5EA5DE] hover:bg-[#5EA5DE]/90 text-white"
          >
            <Camera className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="mt-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Hono
            <span className="text-xl">🦴🍅⬛</span>
          </h1>
          <p className="text-[#5EA5DE]">online</p>
        </div>

        {/* Info Section */}
        <div className="mt-8">
          <h2 className="text-xl text-[#5EA5DE] mb-4">Info</h2>
          <div className="space-y-4">
            <div>
              <p className="text-white">+229 43313412</p>
              <p className="text-gray-400 text-sm">Mobile</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white">@Jose_0x</p>
                <p className="text-gray-400 text-sm">Username</p>
              </div>
              <Button variant="ghost" size="icon" className="text-[#5EA5DE]">
                <QrCode className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-8">
          <div className="flex border-b border-gray-700">
            <button className="flex-1 pb-2 text-[#5EA5DE] border-b-2 border-[#5EA5DE]">
              Posts
            </button>
            <button className="flex-1 pb-2 text-gray-400">
              Archived Posts
            </button>
          </div>
          {/* Posts content would go here */}
          <div className="mt-4 aspect-video bg-gray-800 rounded-lg">
            {/* Placeholder for video/post content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;