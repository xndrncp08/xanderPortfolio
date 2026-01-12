'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Hero isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Skills isDarkMode={isDarkMode} />
      <Projects isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
    </div>
  );
}

export default Home;