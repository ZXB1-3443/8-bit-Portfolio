/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// --- DATA ---
const SECTIONS = ['HOME', 'ABOUT', 'EXPERIENCE', 'CONTACT'] as const;
type Section = typeof SECTIONS[number];

const EXPERIENCE_DATA = [
  { id: 1, title: 'PRIVATE TUTOR', tech: ['MATH', 'COMPUTERS', 'HISTORY'], year: '2024', desc: 'Provided 1-on-1 group tutoring, adapted teaching methods, and improved academic performance.' },
  { id: 2, title: 'B.TECH (CS)', tech: ['OSMANIA UNIVERSITY', 'CS'], year: '2028', desc: 'Nawab Shah College of Engineering and Technology. Core CS concepts.' },
  { id: 3, title: 'DATA STRUCTURES', tech: ['PYTHON', 'COURSERA'], year: 'CERT', desc: 'University of Michigan certification in Python Data Structures.' },
  { id: 4, title: 'ACCESS WEB DATA', tech: ['PYTHON', 'COURSERA'], year: 'CERT', desc: 'University of Michigan certification on utilizing Python for web data.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Section>('HOME');
  const [hoveredTab, setHoveredTab] = useState<Section | null>(null);
  const [booting, setBooting] = useState(true);
  const [bootText, setBootText] = useState('');

  useEffect(() => {
    const sequence = [
      "INITIALIZING BIOS...",
      "LOADING PYTHON MODULES... OK",
      "MOUNTING SYED ZABIULLAH MEHDI DATA...",
      "INITIALIZING PROFESSIONAL PORTFOLIO..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setBootText(prev => prev + '\n' + sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  if (booting) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#00FF41] font-mono p-4 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl px-4">
          <pre className="whitespace-pre-wrap leading-relaxed font-bold text-xs sm:text-sm md:text-base lg:text-lg">{bootText}</pre>
          <span className="animate-blink mt-3 inline-block w-3 h-5 bg-[#00FF41]"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#00FF41] font-mono p-2 sm:p-4 md:p-8 flex items-center justify-center">
      <div className="w-full h-auto lg:h-[90vh] lg:min-h-[650px] max-w-[1024px] border-4 sm:border-[12px] md:border-[16px] border-[#222] bg-[#121212] flex flex-col p-4 sm:p-6 md:p-8 overflow-visible lg:overflow-hidden box-border shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        <header className={`flex justify-between items-end mb-6 border-b-4 pb-4 shrink-0 transition-colors ${
          activeTab === 'HOME' ? 'border-[#00FF41]' : 
          activeTab === 'ABOUT' ? 'border-[#FF00FF]' : 
          activeTab === 'EXPERIENCE' ? 'border-[#00FFFF]' : 'border-[#FFFF00]'
        }`}>
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="hidden sm:flex items-center justify-center text-white opacity-90 pr-4 sm:pr-5 border-r-2 border-[#333]">
              <span className="text-3xl sm:text-5xl font-black tracking-tighter">ZXB</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tighter leading-none text-white truncate">SYED_ZABIULLAH</h1>
              <p className="text-xs sm:text-sm md:text-lg opacity-80 mt-1 md:mt-2">&gt; CS STUDENT / OSMANIA UNIVERSITY</p>
            </div>
          </div>
          <div className="text-right flex-col gap-1 hidden md:flex shrink-0">
            <div className={`text-xs uppercase text-black px-2 py-0.5 font-bold transition-colors ${
              activeTab === 'HOME' ? 'bg-[#00FF41]' : 
              activeTab === 'ABOUT' ? 'bg-[#FF00FF]' : 
              activeTab === 'EXPERIENCE' ? 'bg-[#00FFFF]' : 'bg-[#FFFF00]'
            }`}>Status: ONLINE</div>
            <div className="text-[10px] opacity-60 uppercase mt-1">Boot: SUCCESS</div>
          </div>
        </header>

        <nav className="mb-6 grid grid-cols-2 sm:flex sm:flex-row sm:justify-center items-center gap-3 md:gap-4 shrink-0 w-full">
          {SECTIONS.map((sec, i) => {
            const activeColors = ['bg-[#00FF41]', 'bg-[#FF00FF]', 'bg-[#00FFFF]', 'bg-[#FFFF00]'];
            const hoverColors = ['hover:bg-[#00FF41]', 'hover:bg-[#FF00FF]', 'hover:bg-[#00FFFF]', 'hover:bg-[#FFFF00]'];
            return (
              <button
                key={sec}
                onClick={() => setActiveTab(sec)}
                className={`px-2 py-2 sm:px-4 sm:py-3 border-2 sm:border-4 border-black hover:text-black shadow-[3px_3px_0px_#000] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] uppercase font-bold text-[10px] sm:text-xs md:text-sm tracking-wider transition-all focus:outline-none w-full sm:w-auto text-center
                ${activeTab === sec ? `${activeColors[i%4]} text-black` : `bg-[#333] text-white ${hoverColors[i%4]}`}`}
              >
                [ {sec} ]
              </button>
            );
          })}
        </nav>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-visible lg:overflow-hidden min-h-0">
          <div className="lg:col-span-8 lg:h-full lg:overflow-y-auto lg:pr-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: 'linear' }}
              className="h-full"
            >
              {activeTab === 'HOME' && <HomeView />}
              {activeTab === 'ABOUT' && <AboutView />}
              {activeTab === 'EXPERIENCE' && <ExperienceView />}
              {activeTab === 'CONTACT' && <ContactView />}
            </motion.div>
          </div>

          <aside className={`w-full lg:col-span-4 bg-[#1a1a1a] border-4 p-5 flex flex-col gap-6 lg:overflow-y-auto transition-colors ${
              activeTab === 'HOME' ? 'border-[#00FF41]' : 
              activeTab === 'ABOUT' ? 'border-[#FF00FF]' : 
              activeTab === 'EXPERIENCE' ? 'border-[#00FFFF]' : 'border-[#FFFF00]'
          }`}>
            <div className="border-b-2 border-[#333] pb-4">
              <h3 className={`text-base font-bold mb-2 uppercase tracking-widest transition-colors ${
                  activeTab === 'HOME' ? 'text-[#00FF41]' : 
                  activeTab === 'ABOUT' ? 'text-[#FF00FF]' : 
                  activeTab === 'EXPERIENCE' ? 'text-[#00FFFF]' : 'text-[#FFFF00]'
              }`}>System_Status</h3>
              <div className="bg-black p-3 text-xs border border-[#333]">
                <p className="text-[#00FF41]">&gt; Boot sequence complete.</p>
                <p className={`transition-colors ${
                  activeTab === 'HOME' ? 'text-[#00FF41]' : 
                  activeTab === 'ABOUT' ? 'text-[#FF00FF]' : 
                  activeTab === 'EXPERIENCE' ? 'text-[#00FFFF]' : 'text-[#FFFF00]'
                }`}>&gt; Loading {activeTab.toLowerCase()} data...</p>
                <p className={`animate-blink transition-colors ${
                  activeTab === 'HOME' ? 'text-[#00FF41]' : 
                  activeTab === 'ABOUT' ? 'text-[#FF00FF]' : 
                  activeTab === 'EXPERIENCE' ? 'text-[#00FFFF]' : 'text-[#FFFF00]'
                }`}>&gt; _</p>
              </div>
            </div>
            <div className="flex-1">
              <h3 className={`text-base font-bold mb-2 uppercase tracking-widest transition-colors ${
                  activeTab === 'HOME' ? 'text-[#00FF41]' : 
                  activeTab === 'ABOUT' ? 'text-[#FF00FF]' : 
                  activeTab === 'EXPERIENCE' ? 'text-[#00FFFF]' : 'text-[#FFFF00]'
              }`}>Abilities</h3>
              <ul className="text-xs sm:text-sm space-y-2">
                <li>[#] PYTHON / WEB DATA</li>
                <li>[#] CYBERSECURITY / IOT</li>
                <li>[#] TEACHING / COMM.</li>
                <li>[#] MS OFFICE</li>
              </ul>
            </div>
            <div className="mt-auto border-t-2 border-[#333] pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs opacity-50 uppercase">STUDENT_LVL</span>
                <div className="w-full ml-4 max-w-32 h-3 bg-[#333] relative">
                  <div className={`absolute left-0 top-0 h-full w-[100%] transition-colors ${
                    activeTab === 'HOME' ? 'bg-[#00FF41]' : 
                    activeTab === 'ABOUT' ? 'bg-[#FF00FF]' : 
                    activeTab === 'EXPERIENCE' ? 'bg-[#00FFFF]' : 'bg-[#FFFF00]'
                  }`}></div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

// --- VIEWS ---

function HomeView() {
  return (
    <div className="h-full flex flex-col pt-2 md:pt-4">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 text-white font-bold opacity-90">OVERVIEW</h2>
      <div className="text-xs sm:text-sm lg:text-base space-y-6 leading-relaxed max-w-2xl text-gray-300">
        <p>
          Welcome. I am Syed Zabiullah Mehdi, a motivated Computer Science student with a strong foundation in core CS concepts.
        </p>
        <p>
          Proficient in Python and problem-solving, seeking an entry-level opportunity to contribute technical aptitude and excellent communication to a dynamic team.
        </p>
      </div>

      <div className="mt-8 lg:mt-auto pt-6 border-t-2 border-[#333]">
        <div className="inline-block p-4 bg-black border border-[#333] text-xs sm:text-sm w-full md:w-auto">
          <div className="flex justify-between gap-8 mb-2">
            <span className="text-white">EFFICIENCY:</span> 
            <span className="text-[#00FF41] font-bold">[||||||||||] 100/100</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-white">CAPACITY:</span> 
            <span className="text-[#00FFFF] font-bold">[||||||||||] 50/50</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <div className="h-full flex flex-col pt-2 md:pt-4 pb-4">
      <h2 className="text-2xl sm:text-3xl mb-6 text-white font-bold uppercase tracking-wider border-b-2 border-[#333] pb-2 inline-block self-start hover-glitch" data-text="PROFILE_DETAILS">PROFILE_DETAILS</h2>
      
      <div className="bg-[#1a1a1a] border-4 border-[#333] p-5 mb-6 shadowInner hover-cyber-box border-[#333] hover:border-[#00FFFF]">
        <h3 className="text-[#FFFF00] font-bold tracking-widest mb-3 uppercase hover-glitch" data-text="BIOGRAPHY">BIOGRAPHY</h3>
        <p className="text-[#00FF41] text-xs sm:text-sm leading-relaxed opacity-80 hover-decrypt">
          I am a Computer Science undergraduate at Osmania University, Hyderabad. My academic focus centers on Python development, algorithm design, and cybersecurity principles. I am dedicated to applying analytical problem-solving to complex technical challenges, with a strong interest in building secure, efficient, and scalable software systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
        <div className="bg-[#1a1a1a] border-4 border-[#333] p-5 hover-cyber-box">
          <h3 className="text-[#FF00FF] font-bold tracking-widest mb-4 uppercase hover-glitch" data-text="Core_Competencies">Core_Competencies</h3>
          <ul className="space-y-4 text-[#00FF41]">
            <li className="flex flex-col gap-1 pb-2">
              <div className="flex justify-between hover-decrypt p-1 -m-1"><span>PYTHON SCRIPTING:</span> <span>90%</span></div>
              <div className="w-full h-1 bg-[#333]"><div className="h-full bg-[#00FF41] w-[90%]"></div></div>
            </li>
            <li className="flex flex-col gap-1 pb-2">
              <div className="flex justify-between hover-decrypt p-1 -m-1"><span>CYBERSECURITY BASICS:</span> <span>85%</span></div>
              <div className="w-full h-1 bg-[#333]"><div className="h-full bg-[#00FF41] w-[85%]"></div></div>
            </li>
            <li className="flex flex-col gap-1 pb-2">
              <div className="flex justify-between hover-decrypt p-1 -m-1"><span>COMMUNICATION:</span> <span>95%</span></div>
              <div className="w-full h-1 bg-[#333]"><div className="h-full bg-[#00FF41] w-[95%]"></div></div>
            </li>
            <li className="flex flex-col gap-1 pb-2">
              <div className="flex justify-between hover-decrypt p-1 -m-1"><span>ADAPTABILITY:</span> <span>92%</span></div>
              <div className="w-full h-1 bg-[#333]"><div className="h-full bg-[#00FF41] w-[92%]"></div></div>
            </li>
          </ul>
        </div>
        <div className="bg-[#1a1a1a] border-4 border-[#333] p-5 hover-cyber-box hover:border-[#FFFF00]">
          <h3 className="text-[#00FFFF] font-bold tracking-widest mb-4 uppercase hover-glitch" data-text="INTERESTS">INTERESTS</h3>
          <ul className="space-y-2 text-[#00FF41] font-bold">
            <li className="hover-decrypt cursor-crosshair border border-transparent p-2 bg-black hover:border-[#00FF41] transition-colors">&gt; E-SPORTS & GAMING</li>
            <li className="hover-decrypt cursor-crosshair border border-transparent p-2 bg-black hover:border-[#00FF41] transition-colors">&gt; FOOTBALL & VOLLEYBALL</li>
            <li className="hover-decrypt cursor-crosshair border border-transparent p-2 bg-black hover:border-[#00FF41] transition-colors">&gt; DRAWING & ART</li>
            <li className="hover-decrypt cursor-crosshair border border-transparent p-2 bg-black hover:border-[#00FF41] transition-colors">&gt; GYM TRAINING & READING</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ExperienceView() {
  const dotColors = ['text-[#FF00FF]', 'text-[#00FFFF]', 'text-[#FFFF00]', 'text-[#FF4444]'];
  return (
    <div className="flex flex-col h-full pt-2 md:pt-4">
      <h2 className="text-2xl sm:text-3xl mb-6 text-white font-bold uppercase tracking-wider border-b-2 border-[#333] pb-2 inline-block self-start hover-glitch" data-text="EXPERIENCE_&_ACADEMICS">EXPERIENCE_&_ACADEMICS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
        {EXPERIENCE_DATA.map((proj, i) => (
          <div key={proj.id} className="bg-[#1a1a1a] border-4 border-[#333] p-5 relative flex flex-col justify-between group hover:border-[#00FF41] hover-cyber-box cursor-pointer min-h-[160px]">
            <div className="flex justify-between">
              <span className="text-[10px] sm:text-xs opacity-60 hover-decrypt">[ {proj.year !== 'CERT' ? `YR_${proj.year}` : proj.year} ]</span>
              <span className={dotColors[i % 4]}>●</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mt-4 text-white uppercase hover-glitch" data-text={proj.title}>{proj.title}</h3>
            <p className="text-xs sm:text-sm text-[#00FF41] mt-2 leading-relaxed opacity-80 hover-decrypt">{proj.desc}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              {proj.tech.map((t) => (
                <span key={t} className="text-[9px] border border-[#00FFFF] px-1.5 py-0.5 text-[#00FFFF] hover-decrypt">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactView() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SENDING');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('IDLE'), 3000);
      } else {
        setStatus('ERROR');
      }
    } catch {
      setStatus('ERROR');
    }
  };

  return (
    <div className="h-full flex flex-col pt-2 md:pt-4">
      <h2 className="text-2xl sm:text-3xl mb-6 text-white font-bold uppercase tracking-wider border-b-2 border-[#333] pb-2 inline-block self-start">CONTACT_INITIATION</h2>
      
      <div className="mb-6 text-[#FFFF00] bg-[#1a1a1a] p-4 border-2 border-[#333] text-xs sm:text-sm uppercase">
        <p className="mb-1">EMAIL: zabiullahmehdi@gmail.com</p>
        <p className="mb-1">PHONE: +91 9100268325</p>
        <p>LOCATION: HYDERABAD - 500023</p>
      </div>

      <form className="flex flex-col gap-4 text-xs sm:text-sm w-full max-w-lg bg-[#1a1a1a] p-5 border-4 border-[#333]" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-2 text-[#FFFF00]">NAME:</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            className="bg-black border-2 border-[#333] p-2.5 text-[#FFFF00] focus:outline-none focus:border-[#FFFF00] transition-colors" 
            placeholder="ENTER NAME..." 
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-[#00FFFF]">EMAIL ADDRESS:</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
            className="bg-black border-2 border-[#333] p-2.5 text-[#FFFF00] focus:outline-none focus:border-[#FFFF00] transition-colors" 
            placeholder="ENTER EMAIL..." 
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-[#FF00FF]">MESSAGE:</label>
          <textarea 
            rows={4} 
            required
            value={formData.message}
            onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
            className="bg-black border-2 border-[#333] p-2.5 text-[#FFFF00] focus:outline-none focus:border-[#FFFF00] transition-colors" 
            placeholder="TYPE MESSAGE HERE..."
          ></textarea>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <button 
            type="submit"
            disabled={status === 'SENDING'}
            className="bg-[#333] px-5 py-3 border-4 border-black text-white hover:bg-[#FFFF00] hover:text-black shadow-[4px_4px_0px_#000] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] uppercase font-bold tracking-wider transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'SENDING' ? '[ TRANSMITTING... ]' : '[ SEND_MESSAGE ]'}
          </button>
          
          {status === 'SUCCESS' && <span className="text-[#00FF41] font-bold animate-pulse">TRANSMISSION SENT OK</span>}
          {status === 'ERROR' && <span className="text-[#FF4444] font-bold">TRANSMISSION FAILED (CHECK SMTP)</span>}
        </div>
      </form>
    </div>
  );
}
