import { Language } from '@/lib/services';
import LanguageSelector from './LanguageSelector';
import { HelpCircle } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const Header = ({ language, onLanguageChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border/50 shadow-soft">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-medium">
            <HelpCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              SAHAI <span className="text-muted-foreground font-normal text-base">(सहाय)</span>
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Digital Inclusion Assistant
            </p>
          </div>
        </div>
        <LanguageSelector language={language} onChange={onLanguageChange} />
      </div>
    </header>
  );
};

export default Header;
