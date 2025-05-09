import React from 'react';
import { BookOpen, FileText, Download } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  link: string;
  icon: 'guide' | 'document' | 'download';
}

const RelatedResources = () => {
  const resources: Resource[] = [
    {
      id: 1,
      title: 'DigiLocker User Guide',
      description: 'A comprehensive guide covering all DigiLocker features and benefits.',
      link: '#',
      icon: 'guide'
    },
    {
      id: 2,
      title: 'DigiLocker FAQ',
      description: 'Find answers to commonly asked questions about DigiLocker.',
      link: '#',
      icon: 'document'
    },
    {
      id: 3,
      title: 'DigiLocker Mobile App',
      description: 'Download the DigiLocker mobile app for on-the-go access.',
      link: '#',
      icon: 'download'
    }
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />;
      case 'document':
        return <FileText size={20} className="text-blue-600 dark:text-blue-400" />;
      case 'download':
        return <Download size={20} className="text-blue-600 dark:text-blue-400" />;
      default:
        return <FileText size={20} className="text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="resources" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Related Resources
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <a 
                key={resource.id}
                href={resource.link}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-all hover:shadow-lg transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="flex items-center mb-4">
                  {renderIcon(resource.icon)}
                  <h3 className="ml-2 font-semibold text-gray-900 dark:text-white">{resource.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{resource.description}</p>
                <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">Learn more →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedResources;