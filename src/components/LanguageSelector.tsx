import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Language } from '@/lib/services';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  language: Language;
  onChange: (language: Language) => void;
}

const languages = [
  { code: 'en' as Language, name: 'English', native: 'English' },
  { code: 'hi' as Language, name: 'Hindi', native: 'हिंदी' },
  { code: 'mr' as Language, name: 'Marathi', native: 'मराठी' },
];

const LanguageSelector = ({ language, onChange }: LanguageSelectorProps) => {
  return (
    <Select value={language} onValueChange={(value) => onChange(value as Language)}>
      <SelectTrigger className="w-[140px] bg-card border-border/50 shadow-soft">
        <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border/50 z-50">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="font-medium">{lang.native}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
