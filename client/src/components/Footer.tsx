import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Boris Theo Petkov. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>using React & TypeScript</span>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            This portfolio showcases my skills in full-stack development. 
            All projects are examples of real-world applications I've built using modern technologies and best practices.
          </p>
        </div>
      </div>
    </footer>
  );
}