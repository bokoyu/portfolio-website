import { useState } from 'react';
import ProjectForm from '../ProjectForm';
import { Button } from '@/components/ui/button';
import { type Project } from '../ProjectCard';

const mockProject: Project = {
  id: '1',
  title: 'Sample Project',
  description: 'This is a sample project for demonstration.',
  image: '',
  technologies: ['React', 'TypeScript'],
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/user/project',
  featured: false,
};

export default function ProjectFormExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>
        Open Project Form
      </Button>
      <ProjectForm
        open={open}
        onOpenChange={setOpen}
        project={mockProject}
        onSave={(project) => console.log('Save project:', project)}
      />
    </div>
  );
}