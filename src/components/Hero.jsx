'use client';

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
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Hi, I am{' '}
            <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
              Xander
            </span>
          </h1>

          <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Software Developer
          </p>

          <p
            className={`leading-relaxed ${
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
              className={`px-6 py-3 ${
                isDarkMode
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white rounded-lg transition-all font-medium`}
            >
              Get in Touch
            </button>

            <button
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className={`px-6 py-3 border-2 rounded-lg transition-all font-medium ${
                isDarkMode
                  ? 'border-slate-700 hover:border-blue-500 text-slate-300'
                  : 'border-slate-300 hover:border-blue-600 text-slate-700'
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
                className={`text-2xl transition-colors ${
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

        <div className="flex justify-center">
          <img
            src="https://i.postimg.cc/X7ThkBBC/photo-6105077608338277153-y.jpg"
            alt="Xander Rancap"
            className={`w-80 h-80 object-cover rounded-2xl shadow-2xl ring-2 ${
              isDarkMode ? 'ring-slate-700' : 'ring-slate-200'
            }`}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
