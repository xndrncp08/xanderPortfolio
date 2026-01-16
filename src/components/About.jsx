"use client";

function About({ isDarkMode }) {
  return (
    <section
      id="about"
      className={`py-20 px-6 ${isDarkMode ? "bg-slate-800" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl font-bold mb-12 ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          About Me
        </h2>

        <div
          className={`space-y-6 ${
            isDarkMode ? "text-slate-300" : "text-slate-700"
          } leading-relaxed text-lg`}
        >
          <p>
            I'm{" "}
            <strong className={isDarkMode ? "text-white" : "text-slate-900"}>
              Xander Rancap
            </strong>
            , I'm a software developer currently studying Software Development
            at SAIT, maintaining a 3.4 GPA. I enjoy building things that are
            clean, practical, and easy to use—where good design and solid
            functionality meet.
          </p>

          <p>
            I did immersion at{" "}
            <strong className={isDarkMode ? "text-white" : "text-slate-900"}>
              Eduspec Holdings Berhad
            </strong>{" "}
            in Metro Manila. I worked hands-on with educational robotics
            platforms like Arduino, SAM Labs, and VEX Robotics, building and
            testing robots and circuits. That experience helped me better
            understand how hardware and software work together and gave me
            plenty of practice collaborating and taking initiative in a team
            setting.
          </p>

          <p>
            During my studies, I've worked on and led several group projects
            using object-oriented programming and scalable design principles.
            One of my favorite projects was a cross-platform gym management app
            built with{" "}
            <strong className={isDarkMode ? "text-white" : "text-slate-900"}>
              .NET MAUI Blazor Hybrid
            </strong>
            , where I focused on usability, clean architecture, and keeping the
            team organized.
          </p>

          <p>
            Tech-wise, I work with C#, Python, JavaScript, and SQL, and I'm
            comfortable using tools like React, Node.js, and Tailwind CSS. I'm
            always learning—currently diving into Java, MongoDB, and mobile
            development—and I like staying curious and experimenting with new
            tech.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
