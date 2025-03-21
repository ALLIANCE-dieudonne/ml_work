
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full py-6 px-6 md:px-12 flex justify-between items-center animate-fade-in", className)}>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-soft">
          <span className="text-white font-medium text-xl">H</span>
        </div>
        <h1 className="ml-3 text-lg font-medium">HomePricer</h1>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
