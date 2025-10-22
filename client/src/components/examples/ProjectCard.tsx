import ProjectCard, { type Project } from '../ProjectCard';
import dashboardImage from '@assets/generated_images/Web_application_dashboard_5df259a3.png';

const mockProject: Project = {
  id: '1',
  title: 'E-Commerce Analytics Dashboard',
  description: 'A comprehensive analytics dashboard for e-commerce businesses with real-time data visualization, sales tracking, and customer insights.',
  image: dashboardImage,
  technologies: ['React', 'TypeScript', 'Chart.js', 'Node.js', 'PostgreSQL'],
  liveUrl: 'https://demo.example.com',
  githubUrl: 'https://github.com/johndoe/ecommerce-dashboard',
  featured: true,
};

export default function ProjectCardExample() {
  return (
    <div className="p-4 max-w-md">
      <ProjectCard
        project={mockProject}
        isAdmin={true}
        onEdit={(project) => console.log('Edit project:', project)}
        onDelete={(project) => console.log('Delete project:', project)}
      />
    </div>
  );
}