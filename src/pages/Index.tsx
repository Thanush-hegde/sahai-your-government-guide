import { useState, useEffect, useRef } from 'react';
import { Language, translations } from '@/lib/services';
import { useChat } from '@/hooks/useChat';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import DocumentChecklist from '@/components/DocumentChecklist';
import OfficialLinkCard from '@/components/OfficialLinkCard';
import QuickActions from '@/components/QuickActions';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const Index = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [showSidebar, setShowSidebar] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isTyping,
    checklist,
    officialLink,
    helpline,
    chatState,
    handleUserResponse,
    handleQuickAction,
    handleSimplify,
    initializeChat,
  } = useChat(language, setLanguage);

  // Initialize chat on mount
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full lg:mr-[340px] lg:ml-auto lg:max-w-3xl">
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-thin chat-scroll"
          style={{ maxHeight: 'calc(100vh - 180px)' }}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              language={language}
              showSimplify={message.showSimplify}
              onSimplify={(simplified) => handleSimplify(message.id, simplified)}
            />
          ))}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-chat-bot rounded-2xl rounded-bl-md shadow-medium border border-border/50">
                <TypingIndicator />
              </div>
            </div>
          )}

          {officialLink && helpline && (
            <OfficialLinkCard
              link={officialLink}
              helpline={helpline}
              language={language}
            />
          )}

          {/* Quick Actions - show when no service is active */}
          {messages.length > 0 && !chatState.currentService && !chatState.isComplete && (
            <div className="mt-6 mb-4">
              <p className="text-center text-sm text-muted-foreground mb-3">
                {translations[language].quickActions}
              </p>
              <QuickActions language={language} onSelect={handleQuickAction} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <ChatInput
          language={language}
          onSend={handleUserResponse}
          disabled={isTyping}
        />
      </main>

      {/* Document Checklist Sidebar */}
      <DocumentChecklist
        documents={checklist}
        language={language}
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
      />

      {/* Mobile Toggle Button for Checklist */}
      {checklist.length > 0 && (
        <Button
          onClick={() => setShowSidebar(true)}
          className="lg:hidden fixed bottom-24 right-4 z-30 w-14 h-14 rounded-full shadow-strong bg-primary hover:bg-primary/90 text-primary-foreground"
          size="icon"
        >
          <FileText className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default Index;
