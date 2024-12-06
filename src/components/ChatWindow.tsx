import { useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { ArrowLeft, Settings, Phone, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
  { id: "1", text: "Salut ! Comment ça va ?", sent: false, timestamp: "09:30" },
  { id: "2", text: "Très bien merci, et toi ?", sent: true, timestamp: "09:31" },
  { id: "3", text: "Super ! Tu fais quoi ce weekend ?", sent: false, timestamp: "09:32" },
];

const ChatWindow = ({ chatId, onBack }: ChatWindowProps) => {
  const [messages, setMessages] = useState<MessageType[]>(MOCK_MESSAGES);
  const navigate = useNavigate();

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
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="h-5 w-5" />
          </Button>
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