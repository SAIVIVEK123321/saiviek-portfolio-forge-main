import React from 'react';
import { Github, ArrowRight, Code, ExternalLink } from 'lucide-react';
import { trackProjectClick } from '../utils/analytics';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/lib/api';
import { API_URL } from '@/lib/api';

const Projects = () => {
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects, initialData: [] });

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Digital Product Showcases
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image ? `${API_URL}${project.image}` : '/placeholder.svg'} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                  {project.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {typeof project.tech === 'string' ? project.tech.split(',').map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {tech.trim()}
                    </span>
                  )) : null}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    {project.stats}
                  </div>
                  <div className="flex items-center space-x-4">
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        title="View on GitHub"
                        onClick={() => trackProjectClick(project.title, 'github')}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.deploymentLink && (
                      <a 
                        href={project.deploymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        title="View Live Demo"
                        onClick={() => trackProjectClick(project.title, 'deployment')}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Projects; 