import { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/services';
import { Send } from 'lucide-react';

interface ChatInputProps {
  language: Language;
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ language, onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-3 p-4 bg-card border-t border-border/50">
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={translations[language].typeMessage}
          disabled={disabled}
          className="w-full px-4 py-3 pr-12 bg-muted rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-ring resize-none text-foreground placeholder:text-muted-foreground"
          rows={1}
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />
      </div>
      <Button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        size="lg"
        className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-soft"
      >
        <Send className="w-5 h-5" />
        <span className="ml-2 hidden sm:inline">{translations[language].send}</span>
      </Button>
    </div>
  );
};

export default ChatInput;
