import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, Globe, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type Language = 'en' | 'hi';

const DISCLAIMER = {
  en: "⚠️ Medical Disclaimer: This AI assistant provides general health information only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.",
  hi: "⚠️ चिकित्सा अस्वीकरण: यह AI सहायक केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है और पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है। चिकित्सा संबंधी चिंताओं के लिए हमेशा योग्य स्वास्थ्य सेवा प्रदाता से परामर्श लें।"
};

const INITIAL_MESSAGE = {
  en: "Hello! I'm your AI Health Assistant. I'm here to help you understand your symptoms and provide general health guidance. How are you feeling today? Please describe any symptoms you're experiencing.",
  hi: "नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। मैं आपके लक्षणों को समझने और सामान्य स्वास्थ्य मार्गदर्शन प्रदान करने में आपकी मदद करने के लिए यहां हूं। आज आप कैसा महसूस कर रहे हैं? कृपया अपने किसी भी लक्षण का वर्णन करें।"
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/health-chat`;

export function HealthChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set initial assistant message based on language
    setMessages([{
      id: 'initial',
      role: 'assistant',
      content: INITIAL_MESSAGE[language],
      timestamp: new Date()
    }]);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const chatMessages = messages
        .filter(m => m.id !== 'initial')
        .map(m => ({ role: m.role, content: m.content }));
      chatMessages.push({ role: 'user', content: userMessage });

      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: chatMessages, language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantContent = '';
      const assistantId = (Date.now() + 1).toString();

      // Add empty assistant message
      setMessages(prev => [...prev, {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => prev.map(m => 
                m.id === assistantId ? { ...m, content: assistantContent } : m
              ));
            }
          } catch {
            // Incomplete JSON, wait for more data
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: language === 'en' ? 'Error' : 'त्रुटि',
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const message = input.trim();
    setInput('');
    streamChat(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <Card className="flex flex-col h-[600px] max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {language === 'en' ? 'AI Health Assistant' : 'AI स्वास्थ्य सहायक'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Your friendly symptom checker' : 'आपका मित्रवत लक्षण जांचकर्ता'}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleLanguage}
          className="flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          {language === 'en' ? 'हिंदी' : 'English'}
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/20 border-b">
        <div className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>{DISCLAIMER[language]}</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-muted rounded-lg px-4 py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'en' ? 'Describe your symptoms...' : 'अपने लक्षणों का वर्णन करें...'}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!input.trim() || isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80" onClick={() => setInput(language === 'en' ? 'I have a fever' : 'मुझे बुखार है')}>
            {language === 'en' ? '🤒 Fever' : '🤒 बुखार'}
          </Badge>
          <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80" onClick={() => setInput(language === 'en' ? 'I have a headache' : 'मुझे सिरदर्द है')}>
            {language === 'en' ? '🤕 Headache' : '🤕 सिरदर्द'}
          </Badge>
          <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80" onClick={() => setInput(language === 'en' ? 'I have a cough' : 'मुझे खांसी है')}>
            {language === 'en' ? '😷 Cough' : '😷 खांसी'}
          </Badge>
          <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80" onClick={() => setInput(language === 'en' ? 'I have stomach pain' : 'मुझे पेट दर्द है')}>
            {language === 'en' ? '🤢 Stomach Pain' : '🤢 पेट दर्द'}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
