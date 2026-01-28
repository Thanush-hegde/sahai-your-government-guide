import { Language, translations } from '@/lib/services';
import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentChecklistProps {
  documents: string[];
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentChecklist = ({ documents, language, isOpen, onClose }: DocumentChecklistProps) => {
  if (documents.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed right-6 top-24 w-80 animate-slide-in-right">
        <div className="bg-card rounded-2xl shadow-strong border border-border/50 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 px-5 py-4">
            <div className="flex items-center gap-2 text-primary-foreground">
              <FileText className="w-5 h-5" />
              <h3 className="font-semibold text-lg">
                {translations[language].documentsNeeded}
              </h3>
            </div>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {documents.map((doc, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border/30 transition-all hover:bg-muted"
                >
                  <span className="text-lg">☐</span>
                  <span className="text-sm text-foreground leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-card rounded-t-3xl shadow-strong border-t border-border/50 max-h-[70vh] overflow-hidden">
          <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary/80 px-5 py-4">
            <div className="flex items-center gap-2 text-primary-foreground">
              <FileText className="w-5 h-5" />
              <h3 className="font-semibold text-lg">
                {translations[language].documentsNeeded}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[calc(70vh-60px)]">
            <ul className="space-y-3">
              {documents.map((doc, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border/30"
                >
                  <span className="text-lg">☐</span>
                  <span className="text-sm text-foreground leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/20 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default DocumentChecklist;
