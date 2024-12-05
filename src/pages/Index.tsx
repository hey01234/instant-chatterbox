import { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-white">
      <div className={`border-r ${selectedChat ? 'hidden md:block' : ''} md:w-80`}>
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