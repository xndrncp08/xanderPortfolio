'use client';

function About({ isDarkMode }) {
  return (
    <section id="about" className={`py-20 px-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl font-bold mb-12 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          About Me
        </h2>
        
        <div className={`space-y-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
          <p>
            I'm <strong>Xander Rancap</strong>, a passionate software developer pursuing Software Development at the Southern Alberta Institute of Technology with a 3.4 GPA. I specialize in creating elegant, user-centered solutions that bridge design and functionality.
          </p>

          <p>
            In February 2024, I did immersion at <strong>Eduspec Holdings Berhad</strong> in Metro Manila, working with educational robotics platforms including Arduino, SAM Labs, and VEX Robotics. This experience strengthened my ability to merge hardware with software and refine my leadership skills through collaborative circuit design and programming.
          </p>

          <p>
            I've led multiple group projects implementing object-oriented principles, including a cross-platform gym management application using <strong>.NET MAUI Blazor Hybrid</strong>. These experiences taught me not just technical excellence, but also effective team management and scalable architecture design.
          </p>

          <p>
            My toolkit includes C#, Python, JavaScript, SQL, and modern frameworks like React, Node.js, and Tailwind CSS. I'm constantly expanding my knowledge in Java, MongoDB, and mobile development to stay at the forefront of technology.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;