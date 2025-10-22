import ProjectsSection from '../ProjectsSection';

export default function ProjectsSectionExample() {
  return (
    <ProjectsSection
      isAdmin={true}
      onAddProject={() => console.log('Add project clicked')}
      onEditProject={(project) => console.log('Edit project:', project)}
      onDeleteProject={(project) => console.log('Delete project:', project)}
    />
  );
}