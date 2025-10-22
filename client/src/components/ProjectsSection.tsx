import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProjectCard, { type Project } from './ProjectCard';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';

interface ProjectsSectionProps {
  isAdmin?: boolean;
  onAddProject?: () => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (project: Project) => void;
}

export default function ProjectsSection({ 
  isAdmin = false, 
  onAddProject, 
  onEditProject, 
  onDeleteProject 
}: ProjectsSectionProps) {
  const { data } = useQuery<{ projects: Project[] }>({ queryKey: ['/api', 'projects'], queryFn: getQueryFn({ on401: 'throw' }) });
  const projects = useMemo(() => data?.projects ?? [], [data]);

  const handleAddProject = () => {
    onAddProject?.();
    console.log('Add new project clicked');
  };

  const handleEditProject = (project: Project) => {
    onEditProject?.(project);
    console.log('Edit project:', project.title);
  };

  const handleDeleteProject = (project: Project) => {
    onDeleteProject?.(project);
    console.log('Delete project:', project.title);
  };

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating expertise in full-stack development,
            modern web technologies, and user-centered design.
          </p>
          
          {isAdmin && (
            <div className="mt-8">
              <Button onClick={handleAddProject} data-testid="button-add-project">
                <Plus className="mr-2 h-4 w-4" />
                Add New Project
              </Button>
            </div>
          )}
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isAdmin={isAdmin}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Other Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isAdmin={isAdmin}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}