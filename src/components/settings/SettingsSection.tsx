import { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const SettingsSection = ({ title, children, className = "" }: SettingsSectionProps) => {
  return (
    <div className={`space-y-4 animate-fade-in ${className}`}>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};