import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-white">
      <div className={`border-r ${selectedChat ? 'hidden md:block' : ''} md:w-80`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Messages</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="hover:bg-gray-100 rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      </div>
      <div className={`flex-1 ${!selectedChat ? 'hidden md:block' : ''}`}>
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} onBack={() => setSelectedChat(null)} />
        ) : (
          <div className="hidden md:flex h-full items-center justify-center text-gray-500">
            Sélectionnez une conversation pour commencer
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;