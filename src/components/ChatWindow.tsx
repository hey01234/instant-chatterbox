import { useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { ArrowLeft } from "lucide-react";

interface ChatWindowProps {
  chatId: string;
  onBack: () => void;
}

const MOCK_MESSAGES = [
  { id: "1", text: "Salut ! Comment ça va ?", sent: false },
  { id: "2", text: "Très bien merci, et toi ?", sent: true },
  { id: "3", text: "Super ! Tu fais quoi ce weekend ?", sent: false },
];

const ChatWindow = ({ chatId, onBack }: ChatWindowProps) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sent: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-4">
        <button onClick={onBack} className="md:hidden">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
            A
          </div>
          <div>
            <h2 className="font-medium">Alice Martin</h2>
            <span className="text-sm text-green-500">En ligne</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;