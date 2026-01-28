import { useState, useCallback } from 'react';
import {
  Language,
  ServiceFlow,
  translations,
  detectLanguage,
  detectService,
  services,
} from '@/lib/services';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  showSimplify?: boolean;
}

interface ChatState {
  currentService: ServiceFlow | null;
  currentStep: string | null;
  userData: Record<string, string>;
  isComplete: boolean;
}

export function useChat(language: Language, setLanguage: (lang: Language) => void) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [checklist, setChecklist] = useState<string[]>([]);
  const [officialLink, setOfficialLink] = useState<string | null>(null);
  const [helpline, setHelpline] = useState<string | null>(null);
  const [chatState, setChatState] = useState<ChatState>({
    currentService: null,
    currentStep: null,
    userData: {},
    isComplete: false,
  });

  const addMessage = useCallback((content: string, isUser: boolean, showSimplify?: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      content,
      isUser,
      showSimplify,
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const simulateTyping = useCallback(async () => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600));
    setIsTyping(false);
  }, []);

  const handleServiceStart = useCallback(
    async (service: ServiceFlow) => {
      await simulateTyping();
      
      setChatState({
        currentService: service,
        currentStep: 'start',
        userData: {},
        isComplete: false,
      });
      
      setChecklist(service.checklist[language]);
      
      const firstQuestion = service.questions.start.text[language];
      addMessage(firstQuestion, false, false);
    },
    [language, addMessage, simulateTyping]
  );

  const handleUserResponse = useCallback(
    async (userMessage: string) => {
      // Detect language from user input and update if different
      const detectedLang = detectLanguage(userMessage);
      if (detectedLang !== language && messages.length < 3) {
        setLanguage(detectedLang);
      }

      addMessage(userMessage, true);

      const { currentService, currentStep, userData } = chatState;

      // If no active service, try to detect one
      if (!currentService) {
        const detectedService = detectService(userMessage);
        
        if (detectedService) {
          await handleServiceStart(detectedService);
          return;
        }
        
        // No service detected, show greeting with quick actions hint
        await simulateTyping();
        addMessage(translations[language].greeting, false, true);
        return;
      }

      // Handle current service flow
      if (currentStep && currentService.questions[currentStep]) {
        const currentQuestion = currentService.questions[currentStep];
        
        // Validate response if validation exists
        if (currentQuestion.validation) {
          const validationResult = currentQuestion.validation(userMessage);
          if (!validationResult.valid && validationResult.message) {
            await simulateTyping();
            addMessage(validationResult.message[language], false, true);
            
            // Reset service
            setChatState({
              currentService: null,
              currentStep: null,
              userData: {},
              isComplete: false,
            });
            setChecklist([]);
            return;
          }
        }

        // Store user data
        const newUserData = { ...userData, [currentStep]: userMessage };
        
        // Get next step
        let nextStep: string | null = null;
        if (typeof currentQuestion.nextStep === 'function') {
          nextStep = currentQuestion.nextStep(userMessage);
        } else {
          nextStep = currentQuestion.nextStep || null;
        }

        if (nextStep === 'complete') {
          // Show final output
          await simulateTyping();
          addMessage(currentService.finalOutput[language], false, true);
          
          // Show official link card
          setOfficialLink(currentService.officialLink);
          setHelpline(currentService.helpline);
          
          setChatState({
            ...chatState,
            userData: newUserData,
            isComplete: true,
          });
          
          // Add closing message after a delay
          setTimeout(async () => {
            await simulateTyping();
            addMessage(
              `${translations[language].anythingElse}\n\n${translations[language].disclaimer}\n\n${translations[language].thankYou}`,
              false,
              false
            );
          }, 1500);
          
        } else if (nextStep && currentService.questions[nextStep]) {
          // Ask next question
          setChatState({
            ...chatState,
            currentStep: nextStep,
            userData: newUserData,
          });
          
          await simulateTyping();
          addMessage(currentService.questions[nextStep].text[language], false, false);
        }
      }
    },
    [chatState, language, messages.length, addMessage, handleServiceStart, simulateTyping, setLanguage]
  );

  const handleQuickAction = useCallback(
    async (serviceId: string) => {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        // Add user message showing they selected this service
        addMessage(service.keywords[0], true);
        await handleServiceStart(service);
      }
    },
    [addMessage, handleServiceStart]
  );

  const handleSimplify = useCallback(
    (messageId: string, simplifiedContent: string) => {
      addMessage(simplifiedContent, false, false);
    },
    [addMessage]
  );

  const initializeChat = useCallback(() => {
    if (messages.length === 0) {
      addMessage(translations[language].greeting, false, false);
    }
  }, [language, messages.length, addMessage]);

  return {
    messages,
    isTyping,
    checklist,
    officialLink,
    helpline,
    chatState,
    addMessage,
    handleUserResponse,
    handleQuickAction,
    handleSimplify,
    initializeChat,
  };
}
