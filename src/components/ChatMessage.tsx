import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Language, translations, simplifyText } from '@/lib/services';
import { RefreshCw } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  language: Language;
  showSimplify?: boolean;
  onSimplify?: (simplified: string) => void;
}

const ChatMessage = ({ content, isUser, language, showSimplify = false, onSimplify }: ChatMessageProps) => {
  const [isSimplified, setIsSimplified] = useState(false);

  const handleSimplify = () => {
    if (!isSimplified && onSimplify) {
      const simplified = simplifyText(content);
      onSimplify(simplified);
      setIsSimplified(true);
    }
  };

  // Process content to render with proper formatting
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Check if it's a numbered list item
      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={index} className="flex gap-2 my-1">
            <span className="font-semibold text-primary min-w-[24px]">{line.match(/^\d+\./)?.[0]}</span>
            <span>{line.replace(/^\d+\./, '').trim()}</span>
          </div>
        );
      }
      // Check if it's a bullet point
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={index} className="flex gap-2 my-0.5 ml-4">
            <span className="text-primary">•</span>
            <span>{line.replace(/^[•-]/, '').trim()}</span>
          </div>
        );
      }
      // Check if it's a warning/note
      if (line.trim().startsWith('⚠️') || line.trim().startsWith('💡') || line.trim().startsWith('💰') || line.trim().startsWith('📝') || line.trim().startsWith('🌾') || line.trim().startsWith('✨') || line.trim().startsWith('🗳️') || line.trim().startsWith('🏥') || line.trim().startsWith('✈️')) {
        return (
          <div key={index} className="mt-3 p-3 bg-muted rounded-lg border-l-4 border-accent">
            {line}
          </div>
        );
      }
      // Empty line
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }
      // Regular text
      return <div key={index} className="my-0.5">{line}</div>;
    });
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-slide-up">
        <div className="max-w-[75%] lg:max-w-[65%] px-4 py-3 rounded-2xl rounded-br-md bg-chat-user text-secondary-foreground shadow-soft">
          <p className="text-[15px] leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4 animate-slide-up">
      <div className="max-w-[85%] lg:max-w-[75%]">
        <div className="px-5 py-4 rounded-2xl rounded-bl-md bg-chat-bot shadow-medium border border-border/50">
          <div className="text-[15px] leading-relaxed text-foreground">
            {renderContent(content)}
          </div>
        </div>
        {showSimplify && !isSimplified && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSimplify}
            className="mt-2 text-muted-foreground hover:text-foreground simplify-hover"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            {translations[language].simplify}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
