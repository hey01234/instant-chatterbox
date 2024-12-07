import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Message from "@/components/Message";

const SavedMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: "1", text: "Message important à garder", sent: true, timestamp: "10:30" },
    { id: "2", text: "Rappel pour plus tard", sent: true, timestamp: "Hier" },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Messages enregistrés</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            {...message}
            onDelete={(id) => setMessages(messages.filter(m => m.id !== id))}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedMessages;