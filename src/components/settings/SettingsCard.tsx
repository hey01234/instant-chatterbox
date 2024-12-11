import { ReactNode } from "react";

interface SettingsCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export const SettingsCard = ({ icon, title, children }: SettingsCardProps) => {
  return (
    <div className="p-4 bg-card rounded-lg shadow-sm border border-border hover:border-primary/20 transition-colors duration-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-primary">{icon}</div>
        <span className="text-foreground font-medium">{title}</span>
      </div>
      {children}
    </div>
  );
};