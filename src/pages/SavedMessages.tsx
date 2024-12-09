import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Message from "@/components/Message";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface SavedMessage {
  id: string;
  text: string;
  timestamp: string;
}

const SavedMessages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const savedMessages = localStorage.getItem("savedMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleSaveMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem("savedMessages", JSON.stringify(updatedMessages));
    setNewMessage("");

    toast({
      title: "Message enregistré",
      description: "Le message a été ajouté aux favoris",
    });
  };

  const handleDeleteMessage = (id: string) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem("savedMessages", JSON.stringify(updatedMessages));

    toast({
      title: "Message supprimé",
      description: "Le message a été retiré des favoris",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Messages enregistrés</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez un nouveau message à sauvegarder..."
            className="min-h-[100px]"
          />
          <Button
            onClick={handleSaveMessage}
            className="w-full"
            disabled={!newMessage.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un message
          </Button>
        </div>

        <div className="space-y-4 mt-8">
          {messages.map((message) => (
            <div key={message.id} className="relative group">
              <Message
                id={message.id}
                text={message.text}
                sent={true}
                onDelete={handleDeleteMessage}
              />
              <span className="text-xs text-muted-foreground absolute -bottom-5 right-0">
                {message.timestamp}
              </span>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              Aucun message enregistré
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedMessages;