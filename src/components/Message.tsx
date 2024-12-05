import { useState } from "react";
import { Trash2 } from "lucide-react";

interface MessageProps {
  id: string;
  text: string;
  sent: boolean;
  onDelete?: (id: string) => void;
  onReact?: (id: string, reaction: string) => void;
}

const Message = ({ id, text, sent, onDelete, onReact }: MessageProps) => {
  const reactions = ["👍", "❤️", "😂", "😮", "😢", "😡"];
  const [showActions, setShowActions] = useState(false);

  return (
    <div className={`flex ${sent ? "justify-end" : "justify-start"} group`}>
      <div className="relative">
        <div
          className={`max-w-[70%] p-3 rounded-2xl animate-message-in ${
            sent ? "bg-chat-sent" : "bg-chat-received"
          }`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <p className="text-sm">{text}</p>
          
          {showActions && sent && (
            <button
              onClick={() => onDelete?.(id)}
              className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
            </button>
          )}
          
          {showActions && (
            <div className="absolute -bottom-8 left-0 flex gap-1 bg-white rounded-full shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {reactions.map((reaction) => (
                <button
                  key={reaction}
                  onClick={() => onReact?.(id, reaction)}
                  className="hover:scale-125 transition-transform"
                >
                  {reaction}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;