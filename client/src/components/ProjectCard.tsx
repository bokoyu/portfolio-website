import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Edit, Trash2 } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

export default function ProjectCard({ project, isAdmin = false, onEdit, onDelete }: ProjectCardProps) {
  const handleLiveClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
      console.log('Opening live demo:', project.liveUrl);
    }
  };

  const handleGithubClick = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
      console.log('Opening GitHub:', project.githubUrl);
    }
  };

  const handleEdit = () => {
    onEdit?.(project);
    console.log('Editing project:', project.title);
  };

  const handleDelete = () => {
    onDelete?.(project);
    console.log('Deleting project:', project.title);
  };

  return (
    <Card className="group hover-elevate transition-all duration-200 overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-testid={`img-project-${project.id}`}
        />
        {project.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleEdit}
              data-testid={`button-edit-project-${project.id}`}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleDelete}
              data-testid={`button-delete-project-${project.id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-semibold" data-testid={`text-project-title-${project.id}`}>
          {project.title}
        </CardTitle>
        <CardDescription data-testid={`text-project-description-${project.id}`}>
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          {project.liveUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLiveClick}
              className="flex-1"
              data-testid={`button-live-demo-${project.id}`}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          )}
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGithubClick}
              className="flex-1"
              data-testid={`button-github-${project.id}`}
            >
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}