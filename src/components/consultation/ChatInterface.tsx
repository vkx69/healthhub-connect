import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, MoreVertical, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  sender: "patient" | "doctor";
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
}

interface ChatInterfaceProps {
  doctorName: string;
  doctorImage?: string;
}

const ChatInterface = ({ doctorName, doctorImage }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "doctor",
      content: "Hello! How can I help you today?",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
    },
    {
      id: "2",
      sender: "patient",
      content: "Hi Dr. I've been experiencing headaches for the past few days.",
      timestamp: new Date(Date.now() - 240000),
      type: "text",
    },
    {
      id: "3",
      sender: "doctor",
      content: "I understand. Can you describe the type of headache? Is it a throbbing pain, pressure, or sharp pain?",
      timestamp: new Date(Date.now() - 180000),
      type: "text",
    },
    {
      id: "4",
      sender: "patient",
      content: "It's more of a throbbing pain, usually on one side of my head.",
      timestamp: new Date(Date.now() - 120000),
      type: "text",
    },
    {
      id: "5",
      sender: "doctor",
      content: "That sounds like it could be a migraine. Have you noticed any triggers like bright lights, stress, or certain foods?",
      timestamp: new Date(Date.now() - 60000),
      type: "text",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "patient",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate doctor response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: "doctor",
        content: "Thank you for sharing that. Let me review your symptoms and get back to you with recommendations.",
        timestamp: new Date(),
        type: "text",
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {doctorName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{doctorName}</h4>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                  message.sender === "patient"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ImageIcon className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="pr-10 bg-background border-border"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Smile className="w-5 h-5" />
            </Button>
          </div>
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-primary hover:bg-primary/90"
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
