"use client";

function Skills({ isDarkMode }) {
  const skills = [
    { name: "JavaScript", icon: "bx bxl-javascript" },
    { name: "React", icon: "bx bxl-react" },
    { name: "React Native", icon: "bx bxl-react" },
    { name: "Node.js", icon: "bx bxl-nodejs" },
    { name: "C#", icon: "devicon-csharp-plain" },
    { name: "Python", icon: "bx bxl-python" },
    { name: "Java", icon: "bx bxl-java" },
    { name: "MongoDB", icon: "bx bxl-mongodb" },
    { name: "MySQL", icon: "bx bxs-data" },
    { name: "PL/SQL", icon: "bx bx-data" },
    { name: "Supabase", icon: "bx bx-cloud" },
    { name: "HTML/CSS", icon: "bx bxl-html5" },
    { name: "Tailwind", icon: "bx bxl-tailwind-css" },
    { name: "Git", icon: "bx bxl-git" },
    { name: "Vercel", icon: "bx bx-cloud" },
    { name: "Express", icon: "bx bxl-nodejs" },
  ];

  return (
    <section
      id="skills"
      className={`py-20 px-6 ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl font-bold mb-4 text-center ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Skills & Technologies
        </h2>
        <p
          className={`text-center mb-12 ${
            isDarkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Tools I use to bring ideas to life
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`animate-fade-in-up ${
                isDarkMode
                  ? "bg-slate-800 hover:bg-slate-750"
                  : "bg-white hover:bg-slate-50"
              } rounded-xl p-6 text-center transition-all duration-300 border ${
                isDarkMode
                  ? "border-slate-700 hover:border-blue-500"
                  : "border-slate-200 hover:border-blue-600"
              } hover:scale-105 hover:shadow-xl group cursor-pointer`}
            >
              <i
                className={`${skill.icon} text-5xl ${
                  isDarkMode
                    ? "text-blue-400 group-hover:text-blue-300"
                    : "text-blue-600 group-hover:text-blue-700"
                } mb-3 transition-all group-hover:scale-110`}
              ></i>
              <h3
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
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
