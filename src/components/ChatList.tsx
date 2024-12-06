import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import OnlineStatus from "./OnlineStatus";

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  selectedChat: string | null;
}

const MOCK_CHATS = [
  { 
    id: "1", 
    name: "Alice Martin", 
    lastMessage: "Salut ! Comment ça va ?", 
    online: true,
    timestamp: "14:30",
    unread: 2
  },
  { 
    id: "2", 
    name: "Thomas Bernard", 
    lastMessage: "On se voit demain ?", 
    online: false,
    timestamp: "Hier",
    unread: 0
  },
  { 
    id: "3", 
    name: "Marie Dubois", 
    lastMessage: "Super, merci !", 
    online: true,
    timestamp: "Lun",
    unread: 0
  },
];

const ChatList = ({ onSelectChat, selectedChat }: ChatListProps) => {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-xl font-semibold flex-1">Messages</h1>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {MOCK_CHATS.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-4 flex items-center gap-3 hover:bg-accent cursor-pointer transition-colors ${
              selectedChat === chat.id ? "bg-accent" : ""
            }`}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <OnlineStatus online={chat.online} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;