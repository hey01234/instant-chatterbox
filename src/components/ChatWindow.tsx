import { useState } from "react";
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
  reactions?: string[];
  timestamp?: string;
}

const MOCK_MESSAGES = [
  { id: "1", text: "", sent: false, timestamp: "" },
  { id: "2", text: "", sent: true, timestamp: "" },
  { id: "3", text: "", sent: false, timestamp: "" },
];

const ChatWindow = ({ chatId, onBack }: ChatWindowProps) => {
  const [messages, setMessages] = useState<MessageType[]>(MOCK_MESSAGES);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sent: true,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
  };

  const handleReactToMessage = (messageId: string, reaction: string) => {
    setMessages(messages.map((msg) => {
      if (msg.id === messageId) {
        return {
          ...msg,
          reactions: [...(msg.reactions || []), reaction]
        };
      }
      return msg;
    }));
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
    toast({
      title: "Chat supprimé",
      description: "Cette conversation a été supprimée"
    });
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="md:hidden">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">Alice Martin</h2>
              <span className="text-sm text-green-500">En ligne</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => console.log("Video call")}>
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => console.log("Phone call")}>
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
        {messages.map((message) => (
          <Message
            key={message.id}
            {...message}
            onDelete={handleDeleteMessage}
            onReact={handleReactToMessage}
          />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
