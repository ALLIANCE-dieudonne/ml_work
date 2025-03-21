
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, className, style }) => {
  return (
    <div 
      className={cn("flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:shadow-soft", className)}
      style={style}
    >
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Feature;
