import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Globe, Smartphone } from 'lucide-react';

export default function AboutSection() {
  const skills = {
    frontend: ['React', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'Express', 'REST APIs'],
    database: ['PostgreSQL', 'SQLite'],
    tools: ['Git', 'Linux', 'Docker', 'Azure', 'SHAP', 'GitHub']
  };

  const experience = [
    {
      title: 'Commission for REECL',
      company: 'REECL.net',
      period: 'Mar 2023 - Oct 2023',
      description: 'Built interactive features in React.js and PHP tools improving engagement and eligibility checks for energy-efficient appliance loans (1000+ monthly visits).'
    },
    {
      title: 'Trading Assistant',
      company: 'Tesco',
      period: 'Sep 2024 - Present',
      description: 'Achieved 99% accuracy on online orders; collaborated in fast-paced teams—skills transferable to agile software development.'
    }
  ];

  const skillCategories = [
    { icon: <Code className="h-6 w-6" />, title: 'Frontend', skills: skills.frontend },
    { icon: <Database className="h-6 w-6" />, title: 'Backend', skills: skills.backend },
    { icon: <Globe className="h-6 w-6" />, title: 'Database', skills: skills.database },
    { icon: <Smartphone className="h-6 w-6" />, title: 'Tools & Platforms', skills: skills.tools }
  ];

  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recent Computer Science graduate at Oxford Brookes University. Passionate about full‑stack development,
            cybersecurity, and applying AI (NLP/transformers) to solve real problems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Skills */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-primary">{category.icon}</div>
                      <h4 className="font-semibold text-foreground">{category.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">Experience</h3>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h4 className="font-semibold text-foreground" data-testid={`text-job-title-${index}`}>
                        {job.title}
                      </h4>
                      <span className="text-sm text-muted-foreground" data-testid={`text-job-period-${index}`}>
                        {job.period}
                      </span>
                    </div>
                    <p className="text-primary font-medium mb-3" data-testid={`text-company-${index}`}>
                      {job.company}
                    </p>
                    <p className="text-muted-foreground text-sm" data-testid={`text-job-description-${index}`}>
                      {job.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Touch */}
        <Card className="p-8 text-center bg-primary/5">
          <CardContent className="p-0">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Beyond Code
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or enjoying outdoor activities. I believe in continuous 
              learning and staying updated with the latest industry trends.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}