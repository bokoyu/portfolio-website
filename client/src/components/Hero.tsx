import { Button } from '@/components/ui/button';
import { ExternalLink, Mail } from 'lucide-react';
import profileImage from '@assets/generated_images/1714169576661.png';

export default function Hero() {
  const handleViewProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolling to projects section');
  };

  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolling to contact section');
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <img
            src={profileImage}
            alt="Boris Theo Petkov - Full Stack Developer"
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            data-testid="img-profile"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
          Hi, I'm <span className="text-primary">Boris Petkov</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Recent Computer Science graduate with a solid foundation in software development,
          cybersecurity, and artificial intelligence. I build full‑stack apps with React and Node,
          and apply AI to solve real problems.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={handleViewProjects}
            className="min-w-[160px]"
            data-testid="button-view-projects"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View My Work
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleContact}
            className="min-w-[160px]"
            data-testid="button-contact"
          >
            <Mail className="mr-2 h-4 w-4" />
            Get In Touch
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-2xl mx-auto">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary" data-testid="text-projects-count">5+</div>
            <div className="text-muted-foreground">Projects Completed</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary" data-testid="text-technologies-count">10+</div>
            <div className="text-muted-foreground">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
}