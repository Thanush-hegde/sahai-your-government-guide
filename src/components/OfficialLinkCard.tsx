import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/services';
import { ExternalLink, Phone, CheckCircle2 } from 'lucide-react';

interface OfficialLinkCardProps {
  link: string;
  helpline: string;
  language: Language;
}

const OfficialLinkCard = ({ link, helpline, language }: OfficialLinkCardProps) => {
  return (
    <div className="flex justify-start mb-4 animate-slide-up">
      <div className="w-full max-w-md">
        <div className="official-gradient rounded-2xl p-6 text-primary-foreground shadow-strong">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-success" />
            <span className="text-lg font-semibold">
              {translations[language].processComplete}
            </span>
          </div>
          
          <Button
            asChild
            className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-base py-5 mb-4"
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5 mr-2" />
              {translations[language].visitWebsite}
            </a>
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
            <Phone className="w-4 h-4" />
            <span className="font-medium">
              {translations[language].helpline}: {helpline}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialLinkCard;
