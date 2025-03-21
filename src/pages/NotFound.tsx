
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-12 text-center">
      <div className="animate-float">
        <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 mx-auto">
          <span className="text-primary text-6xl font-light">404</span>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Page Not Found</h1>
      
      <p className="text-lg text-muted-foreground max-w-md mb-8 animate-fade-in">
        We couldn't find the page you were looking for. Perhaps you mistyped the URL or the page has been moved.
      </p>
      
      <Button 
        asChild
        size="lg"
        className="rounded-xl px-8 animate-fade-in"
      >
        <a href="/">Return Home</a>
      </Button>
    </div>
  );
};

export default NotFound;
