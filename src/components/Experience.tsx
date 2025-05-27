import React from 'react';
import { Cloud, Brain, Award } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building expertise through hands-on projects and professional internships
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-orange-500 rounded-full"></div>
            
            <div className="space-y-12">
              <div className="flex items-center justify-center">
                <div className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 max-w-2xl w-full relative">
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI: Transformative Learning with TechSaksham</h3>
                      <p className="text-purple-600 dark:text-purple-400 font-medium">AICTE & EduSkills | Joint CSR Initiative by Microsoft & SAP</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">March 2024 - April 2024</p>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Participated in a project-based internship on Artificial Intelligence under AICTE and EduSkills initiative. Developed AI solutions under the guidance of mentors from Microsoft, SAP, and Edunet Foundation.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Key Learnings:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Machine Learning</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Data Handling</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">AI Solution Development</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Responsible AI Practices</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          <h5 className="font-semibold text-gray-900 dark:text-white">Certificate</h5>
                        </div>
                        <div className="space-y-2">
                          <img 
                            src="/certificate1.jpg" 
                            alt="AI Certificate" 
                            className="w-48 h-auto rounded-lg border border-gray-200 dark:border-gray-700"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            AI: Transformative Learning wit h TechSaksham<br />
                            Issued by: AICTE & EduSkills<br />
                            Date: April 2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 max-w-2xl w-full relative">
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Cloud Virtual Internship (AWS Academy)</h3>
                      <p className="text-purple-600 dark:text-purple-400 font-medium">AICTE & EduSkills | K L University</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">January 2024 - February 2024</p>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Completed a virtual internship focused on cloud technologies under AICTE and EduSkills initiative. Gained practical exposure to cloud infrastructure, deployment models, and cloud-based services.
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Key Areas:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Cloud Infrastructure</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Deployment Models</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Cloud Services</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Practical Implementation</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          <h5 className="font-semibold text-gray-900 dark:text-white">Certificate</h5>
                        </div>
                        <div className="space-y-2">
                          <img 
                            src="/certificate2.jpg" 
                            alt="Cloud Certificate" 
                            className="w-48 h-auto rounded-lg border border-gray-200 dark:border-gray-700"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Cloud Virtual Internship<br />
                            Issued by: AICTE & EduSkills<br />
                            Date: February 2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
