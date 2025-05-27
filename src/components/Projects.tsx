import React from 'react';
import { Github, ArrowRight, Code } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Online Car Rental System",
      description: "Secure and seamless booking platform with advanced features for vehicle management and user authentication.",
      tech: ["MongoDB", "React.js", "Node.js"],
      image: "project1.png",
      stats: "30% performance improvement",
      category: "Web Application"
    },
    {
      title: "Online Job Portal",
      description: "Comprehensive job matching platform connecting employers with candidates through intelligent algorithms.",
      tech: ["Django", "PostgreSQL", "Bootstrap", "HTML", "CSS", "Python"],
      image: "project2.jpg",
      stats: "Smart job matching",
      category: "Platform"
    },
    {
      title: "Career Assessment Tool",
      description: "Web-based platform providing personalized career guidance for students through comprehensive assessments.",
      tech: ["MySQL", "Spring Boot", "JSP", "Tailwind CSS", "HTML", "CSS"],
      image: "project3.png",
      stats: "Personalized guidance",
      category: "Educational Tool"
    }
  ];

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
                  src={project.image} 
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {project.stats}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg text-white hover:shadow-lg transition-shadow">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects; 