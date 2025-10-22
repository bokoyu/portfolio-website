import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import { apiRequest, queryClient } from '@/lib/queryClient';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import ProjectForm from '@/components/ProjectForm';
import { type Project } from '@/components/ProjectCard';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    console.log('User logged in as admin');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    console.log('User logged out');
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setProjectFormOpen(true);
    console.log('Add project form opened');
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectFormOpen(true);
    console.log('Edit project form opened for:', project.title);
  };

  const handleDeleteProject = async (project: Project) => {
    await apiRequest('DELETE', `/api/projects/${project.id}`);
    await queryClient.invalidateQueries({ queryKey: ['/api', 'projects'] });
  };

  const handleSaveProject = async (projectData: Omit<Project, 'id'> & { id?: string }) => {
    if (projectData.id) {
      await apiRequest('PATCH', `/api/projects/${projectData.id}`, projectData);
    } else {
      await apiRequest('POST', '/api/projects', projectData);
    }
    await queryClient.invalidateQueries({ queryKey: ['/api', 'projects'] });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAdmin={isAdmin}
        onLoginClick={() => setLoginModalOpen(true)}
        onLogoutClick={handleLogout}
      />
      
      <main>
        <Hero />
        
        <ProjectsSection
          isAdmin={isAdmin}
          onAddProject={handleAddProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
        
        <AboutSection />
        
        <ContactSection />
      </main>
      
      <Footer />

      {/* Modals */}
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLoginSuccess={handleLoginSuccess}
      />

      <ProjectForm
        open={projectFormOpen}
        onOpenChange={setProjectFormOpen}
        project={editingProject}
        onSave={handleSaveProject}
      />
    </div>
  );
}