import { useState } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 p-2 rounded-full border focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;