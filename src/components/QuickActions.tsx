import { Language, quickActions } from '@/lib/services';

interface QuickActionsProps {
  language: Language;
  onSelect: (serviceId: string) => void;
}

const QuickActions = ({ language, onSelect }: QuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {quickActions.map((action) => (
        <button
          key={action.id}
          onClick={() => onSelect(action.id)}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium text-foreground transition-all hover:scale-105 active:scale-95 border border-border/50"
        >
          <span>{action.icon}</span>
          <span>{action.label[language]}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
