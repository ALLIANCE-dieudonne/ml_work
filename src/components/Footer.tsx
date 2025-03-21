
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-12 text-center text-muted-foreground border-t">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-soft">
                <span className="text-white font-medium text-sm">H</span>
              </div>
              <span className="ml-2 text-foreground font-medium">HomePricer</span>
            </div>
            <p className="mt-2 text-sm max-w-md">
              Advanced home price prediction using machine learning
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-sm">
          <p>&copy; {currentYear} HomePricer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
