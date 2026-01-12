'use client';

function Contact({ isDarkMode }) {
  return (
    <section id="contact" className={`py-20 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-2xl mx-auto">
        <h2 className={`text-4xl font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Get In Touch
        </h2>
        <p className={`text-center mb-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Let's build something amazing together
        </p>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-8 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <div className="space-y-6">
            <div>
              <label className={`block mb-2 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-slate-900 text-white border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-300'} border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
              />
            </div>

            <div>
              <label className={`block mb-2 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Email
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-slate-900 text-white border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-300'} border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
              />
            </div>

            <div>
              <label className={`block mb-2 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Message
              </label>
              <textarea
                rows="5"
                className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-slate-900 text-white border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-300'} border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none`}
              ></textarea>
            </div>

            <button
              className={`w-full py-3 ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg font-medium transition-all`}
            >
              Send Message
            </button>
          </div>
        </div>

        <div className={`text-center mt-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <p>© 2026 Xander Rancap. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;