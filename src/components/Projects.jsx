'use client';

function Projects({ isDarkMode }) {
  const projects = [
    {
      title: 'Basketbol',
      tech: 'Next.js',
      description: 'Basketbol is a web app that displays NBA games, teams, and player information in a clean, responsive interface. It pulls data from multiple sports APIs, handles loading and fallback states gracefully, and presents stats and news in a way that feels stable and production-ready even with API limitations.',
      image: 'https://i.postimg.cc/d0dX1VGs/image.png',
      tags: ['React', 'Next.js', 'JavaScript', 'ESPN API', 'BallDontLie API']
    },    
    {
      title: 'YYC Track',
      tech: 'MERN Stack',
      description: 'YYC Track is a ongoing capstone project; a platform that helps Calgary Transit riders view stations on an interactive map, submit feedback, and see real-time station ratings through a Commuter Experience Index, giving both commuters and transit managers clear insights into service quality.',
      image: 'https://i.postimg.cc/1zpCSYZ0/image.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      title: 'Gym Management System',
      tech: '.NET MAUI Blazor Hybrid',
      description: 'Cross-platform gym management application with secure authentication, membership tracking, scheduling, and database integration.',
      image: 'https://i.postimg.cc/t4trHsnd/FitZone.png',
      tags: ['C#', '.NET MAUI Blazor', 'MariaDB']
    },
    {
      title: 'NV Closet',
      tech: 'UI/UX Design',
      description: 'Digital wardrobe management app with AI-powered outfit recommendations. Modern, intuitive interface focused on user experience.',
      image: 'https://i.postimg.cc/Kj2kF8ML/NV.png',
      tags: ['Figma', 'UI/UX', 'Design']
    },
    {
      title: 'Punch Music',
      tech: 'React Native, Android Studio',
      description: 'Music Swipe App is a team-built music discovery app that integrates the Spotify API, allowing users to swipe through songs with smooth gesture controls. It focuses on an intuitive UI, real-time playback, and seamless front-end/back-end communication to create an engaging, easy-to-use listening experience.',
      image: 'https://your-image-url.com/image.png',
      tags: ['React.js', 'Supabase', 'Spotify API']
    }
  ];

  return (
    <section id="projects" className={`py-20 px-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'} rounded-2xl overflow-hidden transition-all hover:scale-[1.02] border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {project.tech}
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {project.title}
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;