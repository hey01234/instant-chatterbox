import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MOCK_CONTACTS = [
  { id: "1", name: "Alice Martin", status: "En ligne", avatar: "/placeholder.svg" },
  { id: "2", name: "Thomas Bernard", status: "Hors ligne", avatar: "/placeholder.svg" },
  { id: "3", name: "Marie Dubois", status: "En ligne", avatar: "/placeholder.svg" },
];

const Contacts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = MOCK_CONTACTS.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Contacts</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="space-y-2">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => navigate(`/chat/${contact.id}`)}
            >
              <Avatar>
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;