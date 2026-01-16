'use client';

import { FiArrowRight } from 'react-icons/fi';

function Hero({ isDarkMode }) {
  const socialLinks = [
    { icon: 'linkedin', url: 'https://www.linkedin.com/in/xander-rancap-79b2a0326/' },
    { icon: 'github', url: 'https://github.com/xndrncp08' },
    { icon: 'instagram', url: 'https://www.instagram.com/derbadoobeelat/' },
  ];

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 pt-20 ${
        isDarkMode ? 'text-white' : 'text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 animate-fade-in">
          <div className={`inline-block px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} mb-4`}>
            <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              👋 Welcome to my portfolio
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Hi, I'm{' '}
            <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} inline-block hover:scale-105 transition-transform`}>
              Xander
            </span>
          </h1>

          <p className={`text-xl font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Software Developer
          </p>

          <p
            className={`leading-relaxed text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Building elegant solutions with modern technologies. Currently studying at
            SAIT with a passion for full-stack development.
          </p>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className={`group px-6 py-3 ${
                isDarkMode
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white rounded-lg transition-all font-medium flex items-center gap-2 hover:gap-3 shadow-lg hover:shadow-xl`}
            >
              Get in Touch
              <FiArrowRight className="transition-all" />
            </button>

            <button
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className={`px-6 py-3 border-2 rounded-lg transition-all font-medium ${
                isDarkMode
                  ? 'border-slate-700 hover:border-blue-500 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 hover:border-blue-600 text-slate-700 hover:bg-slate-50'
              }`}
            >
              View Work
            </button>
          </div>

          <div className="flex gap-4 pt-4">
            {socialLinks.map((social) => (
              <a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl transition-all hover:scale-110 ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-blue-400'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <i className={`bx bxl-${social.icon}`} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center animate-fade-in-delay">
          <div className="relative group">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
            <img
              src="https://i.postimg.cc/L4qbCckk/Gemini-Generated-Image-wygjawygjawygjaw.png"
              alt="Xander Rancap" 
              className={`relative w-80 h-80 object-cover rounded-2xl shadow-2xl ring-2 ${
                isDarkMode ? 'ring-slate-700' : 'ring-slate-200'
              } group-hover:scale-105 transition-transform duration-300`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;