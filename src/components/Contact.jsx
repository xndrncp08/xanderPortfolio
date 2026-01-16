'use client';

import { FiMail, FiMapPin } from 'react-icons/fi';

function Contact({ isDarkMode }) {
  return (
    <section id="contact" className={`py-20 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Let's Work Together
        </h2>
        <p className={`text-lg mb-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          I'm currently open to new opportunities and collaborations
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a
            href="mailto:xanderrancap08@gmail.com"
            className={`flex items-center gap-3 px-8 py-4 ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-750 border-slate-700'
                : 'bg-white hover:bg-slate-50 border-slate-200'
            } border rounded-xl transition-all hover:scale-105 hover:shadow-lg`}
          >
            <FiMail className={`text-2xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div className="text-left">
              <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Email
              </div>
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                xandertrancap08@gmail.com
              </div>
            </div>
          </a>

          <div
            className={`flex items-center gap-3 px-8 py-4 ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            } border rounded-xl`}
          >
            <FiMapPin className={`text-2xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div className="text-left">
              <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Location
              </div>
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Calgary, AB
              </div>
            </div>
          </div>
        </div>

        <div className={`text-center pt-8 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
          <p>© 2026 Xander Rancap. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;