import { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="flex h-full">
      <div className={`border-r border-border ${selectedChat ? 'hidden md:block' : ''} md:w-80`}>
        <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      </div>
      <div className={`flex-1 ${!selectedChat ? 'hidden md:block' : ''}`}>
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} onBack={() => setSelectedChat(null)} />
        ) : (
          <div className="hidden md:flex h-full items-center justify-center text-muted-foreground flex-col gap-4">
            <p>Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;