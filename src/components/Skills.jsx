'use client';

function Skills({ isDarkMode }) {
  const skills = [
    { name: 'JavaScript', icon: 'bx bxl-javascript' },
    { name: 'React', icon: 'bx bxl-react' },
    { name: 'Node.js', icon: 'bx bxl-nodejs' },
    { name: 'C#', icon: 'devicon-csharp-plain' },
    { name: 'Python', icon: 'bx bxl-python' },
    { name: 'Java', icon: 'bx bxl-java' },
    { name: 'MongoDB', icon: 'bx bxl-mongodb' },
    { name: 'SQL', icon: 'bx bxs-data' },
    { name: 'HTML/CSS', icon: 'bx bxl-html5' },
    { name: 'Tailwind', icon: 'bx bxl-tailwind-css' },
    { name: 'Git', icon: 'bx bxl-git' },
    { name: 'Vercel', icon: 'bx bx-cloud' }
  ];

  return (
    <section id="skills" className={`py-20 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Skills & Technologies
        </h2>
        <p className={`text-center mb-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Tools I use to bring ideas to life
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`${isDarkMode ? 'bg-slate-800 hover:bg-slate-750' : 'bg-white hover:bg-slate-50'} rounded-xl p-6 text-center transition-all border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} hover:scale-105 hover:shadow-lg`}
            >
              <i className={`${skill.icon} text-5xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-3`}></i>
              <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;