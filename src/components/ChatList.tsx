import OnlineStatus from "./OnlineStatus";

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  selectedChat: string | null;
}

const MOCK_CHATS = [
  { id: "1", name: "Alice Martin", lastMessage: "Salut ! Comment ça va ?", online: true },
  { id: "2", name: "Thomas Bernard", lastMessage: "On se voit demain ?", online: false },
  { id: "3", name: "Marie Dubois", lastMessage: "Super, merci !", online: true },
];

const ChatList = ({ onSelectChat, selectedChat }: ChatListProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Messages</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {MOCK_CHATS.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${
              selectedChat === chat.id ? "bg-gray-50" : ""
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                {chat.name.charAt(0)}
              </div>
              <OnlineStatus online={chat.online} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500">14:30</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;