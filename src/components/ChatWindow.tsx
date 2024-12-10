import { useState, useEffect } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { ArrowLeft, Settings, Phone, Video, MoreVertical, Star, Archive, Delete, Ban, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface ChatWindowProps {
  chatId: string;
  onBack: () => void;
}

interface MessageType {
  id: string;
  text: string;
  sent: boolean;
  timestamp: number;
}

const ChatWindow = ({ chatId, onBack }: ChatWindowProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatUser, setChatUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Charger l'utilisateur du chat
    const userData = localStorage.getItem(`user_${chatId}`);
    if (userData) {
      setChatUser(JSON.parse(userData));
    }

    // Charger les messages
    const chatMessages = localStorage.getItem(`messages_${chatId}`);
    if (chatMessages) {
      setMessages(JSON.parse(chatMessages));
    }
  }, [chatId]);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sent: true,
      timestamp: Date.now()
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Sauvegarder les messages
    localStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));
  };

  const handleDeleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));
  };

  const handleArchiveChat = () => {
    toast({
      title: "Chat archivé",
      description: "Cette conversation a été archivée"
    });
  };

  const handleStarMessage = () => {
    toast({
      title: "Message enregistré",
      description: "Le message a été ajouté aux favoris"
    });
  };

  const handleBlockUser = () => {
    toast({
      title: "Utilisateur bloqué",
      description: "Vous avez bloqué cet utilisateur"
    });
  };

  const handleReportUser = () => {
    toast({
      title: "Utilisateur signalé",
      description: "Votre signalement a été envoyé"
    });
  };

  const handleDeleteChat = () => {
    localStorage.removeItem(`messages_${chatId}`);
    toast({
      title: "Chat supprimé",
      description: "Cette conversation a été supprimée"
    });
    navigate("/");
  };

  if (!chatUser) return null;

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="md:hidden">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{chatUser.username?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">{chatUser.username}</h2>
              <span className="text-sm text-green-500">En ligne</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Phone className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleStarMessage}>
                <Star className="mr-2 h-4 w-4" />
                <span>Enregistrer les messages</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleArchiveChat}>
                <Archive className="mr-2 h-4 w-4" />
                <span>Archiver la conversation</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleBlockUser} className="text-red-600">
                <Ban className="mr-2 h-4 w-4" />
                <span>Bloquer l'utilisateur</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReportUser} className="text-yellow-600">
                <Flag className="mr-2 h-4 w-4" />
                <span>Signaler l'utilisateur</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteChat} className="text-red-600">
                <Delete className="mr-2 h-4 w-4" />
                <span>Supprimer la conversation</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Aucun message. Commencez la conversation !
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              {...message}
              onDelete={handleDeleteMessage}
            />
          ))
        )}
      </div>
      <MessageInput onSendMessage={handleSendMessage} receiverId={chatId} />
    </div>
  );
};

export default ChatWindow;