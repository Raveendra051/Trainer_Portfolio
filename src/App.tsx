/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Code2, 
  Terminal, 
  Cloud, 
  ShieldCheck, 
  Mic2, 
  FileText, 
  Layout, 
  Linkedin, 
  Github, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Database,
  Globe,
  Cpu,
  GraduationCap,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

const NavItem = ({ href, label, active, onClick }: { href: string, label: string, active: boolean, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
  <a 
    href={href} 
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-colors hover:text-brand-green ${active ? 'text-brand-green font-semibold' : 'text-slate-600'}`}
  >
    {label}
  </a>
);

const SectionHeading = ({ children, subtitle, direction = 'left' }: { children: React.ReactNode, subtitle?: string, direction?: 'left' | 'right' }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3"
    >
      <span className="w-8 h-1 bg-brand-green rounded-full"></span>
      {children}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-slate-500 max-w-2xl"
    >
      {subtitle}
    </motion.p>
  </div>
);

const SkillCard = ({ title, items, icon: Icon, index }: { title: string, items: string[], icon: any, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      boxShadow: "0 20px 40px -20px rgba(118, 188, 33, 0.2)"
    }}
    className="bg-white border border-slate-200 p-6 rounded-xl hover:border-brand-green transition-all duration-300 shadow-sm overflow-hidden group"
  >
    <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-green transition-colors duration-300">
      <Icon className="text-brand-green w-6 h-6 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-brand-blue transition-colors">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <span key={item} className="px-3 py-1 bg-slate-50 border border-slate-200 text-xs text-slate-600 rounded-full group-hover:border-brand-green/30 transition-colors font-medium">
          {item}
        </span>
      ))}
    </div>
  </motion.div>
);

const ProjectCard = ({ title, description, tags, icon: Icon, index, href }: { title: string, description: string, tags: string[], icon: any, index: number, href: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
    whileHover={{ 
      y: -12,
      boxShadow: "0 30px 60px -15px rgba(0, 75, 135, 0.1)"
    }}
    className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-brand-blue transition-all duration-500 flex flex-col h-full active:scale-[0.98] shadow-sm"
  >
    <div className="p-8 flex flex-col h-full">
      <div className="w-14 h-14 bg-gradient-to-br from-brand-blue to-brand-green rounded-2xl flex items-center justify-center mb-6 shadow-md overflow-hidden transform group-hover:rotate-6 transition-transform duration-500">
        <Icon className="text-white w-7 h-7" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">{title}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-brand-blue bg-brand-blue/5 px-2 py-1 rounded border border-brand-blue/20">
            {tag}
          </span>
        ))}
      </div>
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-brand-green font-bold group-hover:translate-x-2 transition-transform duration-300"
      >
        View Project <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </motion.div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['hero', 'about', 'toolkit', 'experience', 'methodology', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -150 && rect.top <= 250) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-xl text-brand-blue tracking-tighter">
              Raveendra <span className="text-brand-green">Varma</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-4">
            <NavItem href="#about" label="About" active={activeSection === 'about'} onClick={(e) => smoothScroll(e, 'about')} />
            <NavItem href="#toolkit" label="Toolkit" active={activeSection === 'toolkit'} onClick={(e) => smoothScroll(e, 'toolkit')} />
            <NavItem href="#experience" label="Projects" active={activeSection === 'experience'} onClick={(e) => smoothScroll(e, 'experience')} />
            <NavItem href="#contact" label="Contact" active={activeSection === 'contact'} onClick={(e) => smoothScroll(e, 'contact')} />
            <a 
              href="#contact" 
              onClick={(e) => smoothScroll(e, 'contact')}
              className="ml-4 px-5 py-2 bg-brand-blue text-white rounded-full text-sm font-semibold hover:bg-brand-blue/90 transition-colors shadow-sm"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-brand-green transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <NavItem href="#about" label="About" active={activeSection === 'about'} onClick={(e) => smoothScroll(e, 'about')} />
                <NavItem href="#toolkit" label="Toolkit" active={activeSection === 'toolkit'} onClick={(e) => smoothScroll(e, 'toolkit')} />
                <NavItem href="#experience" label="Projects" active={activeSection === 'experience'} onClick={(e) => smoothScroll(e, 'experience')} />
                <NavItem href="#contact" label="Contact" active={activeSection === 'contact'} onClick={(e) => smoothScroll(e, 'contact')} />
                <a 
                  href="#contact" 
                  onClick={(e) => smoothScroll(e, 'contact')}
                  className="w-full py-4 bg-brand-blue text-white rounded-xl text-center font-bold shadow-lg shadow-brand-blue/20"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen lg:h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0 bg-brand-light">
        {/* Background Gradients */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-green/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="grid grid-cols-12 h-full w-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-slate-300"></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]"
            >
              Empowering <span className="text-gradient">Next-Gen</span> Developers through Python Mastery.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Bridging the gap between industry-standard development and technical education with 
              deep expertise in Python ecosystem, cloud architecture, and secure assessment systems.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a 
                href="#experience" 
                onClick={(e) => smoothScroll(e, 'experience')}
                className="group w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-blue/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-brand-blue/20"
              >
                View My Work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                onClick={(e) => smoothScroll(e, 'contact')}
                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-brand-green transition-all duration-300 hover:scale-105 active:scale-95 h-full shadow-sm"
              >
                Let's Talk
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
              {/* Decorative rings and glow */}
              <div className="absolute inset-0 bg-brand-blue/10 blur-3xl rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-2 border-brand-blue/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-brand-green/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              {/* Image Container */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white bg-slate-100 p-2 shadow-2xl shadow-slate-200 transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://i.ibb.co/nqy5XS8q/IMG-20250523-WA0085-1.jpg" 
                  alt="Python Technical Trainer" 
                  className="w-full h-full object-cover rounded-full transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating tech badges */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-4 bg-white border border-slate-100 p-3 rounded-xl shadow-xl z-20"
              >
                <Code2 className="text-brand-green w-6 h-6" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -left-4 bg-white border border-slate-100 p-3 rounded-xl shadow-xl z-20"
              >
                <Cloud className="text-brand-blue w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-py-yellow rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="From code to classroom, my journey is built on logic and mentorship.">
            About Me
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl relative overflow-hidden group hover:border-brand-green transition-colors duration-500 shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 blur-3xl group-hover:bg-brand-green/20 transition-colors"></div>
                <h3 className="text-4xl font-bold text-slate-900 mb-2">6+ Years</h3>
                <p className="text-brand-blue font-mono text-sm uppercase tracking-wider mb-6">Of Development Excellence</p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  At <span className="text-slate-900 font-semibold">Pragyashal Cloud Solutions</span>, I spent years architecting full-stack solutions using Python, Django, and Flask. My core focus has always been building scalable, cloud-native apps on <span className="text-slate-900 font-semibold">GCP</span>.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-brand-blue transition-colors shadow-sm"
                >
                  <h4 className="text-brand-blue font-bold text-xl mb-1">Developer</h4>
                  <p className="text-slate-500 text-sm italic">Code, Architect, Deploy</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-brand-blue transition-colors shadow-sm"
                >
                  <h4 className="text-brand-blue font-bold text-xl mb-1">Mentor</h4>
                  <p className="text-slate-500 text-sm italic">Train, Guide, Inspire</p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-xl text-slate-600 leading-relaxed">
                My professional pivot into <span className="text-brand-green font-semibold italic">Technical Training</span> wasn't just a career move—it was a mission. By combining my battle-tested industry experience with modern pedagogical techniques, I help developers skip the trial-and-error phase and master production-ready skills.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Mentorship', 'Curriculum Design', 'Public Speaking', 'Code Review'].map((skill, i) => (
                  <motion.div 
                    key={skill} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors"
                  >
                    <ShieldCheck className="w-5 h-5 text-brand-green" />
                    <span className="font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Toolkit Section */}
      <section id="toolkit" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="The stack I use to build and the tools I use to teach.">
            The Trainer's Toolkit
          </SectionHeading>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <SkillCard 
              index={0}
              title="Core Tech" 
              icon={Code2} 
              items={['Python 3.x', 'Django', 'Flask', 'FastAPI', 'REST APIs', 'PostgreSQL']} 
            />
            <SkillCard 
              index={1}
              title="Cloud & DevOps" 
              icon={Cloud} 
              items={['GCP', 'Cloud SQL', 'GCS', 'Vercel', 'CI/CD', 'MySQL Migration']} 
            />
            <SkillCard 
              index={2}
              title="Specialized Training" 
              icon={GraduationCap} 
              items={['LMS Architecture', 'AI Audio Systems', 'Secure Shells', 'PBL Methods']} 
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="experience" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Real-world results from production environments and educational platforms.">
            Featured Experience
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            <ProjectCard 
              index={0}
              title="CloneMyVoice"
              icon={Mic2}
              href="https://clomemyvoice-32681899180.asia-south1.run.app/"
              description="An advanced AI-driven voice cloning platform that utilizes frequency mapping and emotion analysis to create hyper-realistic vocal replicas for multimedia content."
              tags={['AI', 'Python', 'Signal Processing']}
            />
            <ProjectCard 
              index={1}
              title="Mono Tab"
              icon={ShieldCheck}
              href="https://mono-tab.vercel.app/"
              description="A secure, lockdown-style assessment shell designed for high-stakes exam integrity, preventing unauthorized navigation and ensuring fair testing environments."
              tags={['Security', 'Portal', 'Architecture']}
            />
            <ProjectCard 
              index={2}
              title="Content Orchestration"
              icon={Database}
              href="https://content-orchestration-version2-532286902368.asia-south1.run.app/dashboard"
              description="A robust automation engine for large-scale multimedia libraries, extracting deep metadata and managing content flow across hybrid cloud pipelines."
              tags={['Automation', 'GCP', 'ETL']}
            />
            <ProjectCard 
              index={3}
              title="EduVerse / L2E"
              icon={Layout}
              href="https://lms-delta-liart.vercel.app/"
              description="Full-scale LMS design and implementation, focusing on seamless student-teacher collaboration, progress tracking, and interactive learning modules."
              tags={['LMS', 'Django', 'Product']}
            />
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-24 bg-brand-blue/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeading subtitle="My philosophy for creating high-impact learning outcomes.">
            Training Methodology
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-10 bg-white border border-slate-200 shadow-sm rounded-3xl text-left hover:border-brand-blue transition-colors group"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-blue transition-colors">Project-Based Learning (PBL)</h3>
              <p className="text-slate-600 leading-relaxed">
                Theory is the map, but projects are the terrain. I teach by having developers build 
                clones of production systems, ensuring they understand not just the 'how', but the 'why' behind 
                every architectural decision.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-10 bg-white border border-slate-200 shadow-sm rounded-3xl text-left hover:border-brand-green transition-colors group"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-green transition-colors">Cloud-Native Focus</h3>
              <p className="text-slate-600 leading-relaxed">
                Development doesn't stop at 'localhost'. My training modules emphasize deployment, 
                scalability, and cloud security from Day 1, utilizing GCP and modern serverless 
                environments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Let's Connect</h2>
            <p className="text-slate-500 text-sm sm:text-base">Ready to train your team or discuss a project? Drop a line below.</p>
            <div className="mt-4 text-brand-green font-mono text-sm tracking-wider font-bold">
              <a href="tel:+917093371134" className="hover:text-brand-blue transition-colors">PH: +91 7093371134</a>
            </div>
          </div>
          
          <form 
            className="space-y-6" 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name');
              const email = formData.get('email');
              const message = formData.get('message');
              const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
              window.location.href = `mailto:raveendravarma38@gmail.com?subject=${subject}&body=${body}`;
            }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500 px-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500 px-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500 px-1">Message</label>
              <textarea 
                rows={5}
                name="message"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-green transition-colors resize-none"
                placeholder="What's on your mind?"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-xl shadow-lg shadow-brand-green/20 transition-all">
              Send Message
            </button>
          </form>

          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <a 
                href="https://www.linkedin.com/in/raveendra-varma-jallu-10ab4227b/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-brand-blue transition-colors"
              >
                <Linkedin />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-brand-blue transition-colors"
              >
                <Github />
              </a>
              <a 
                href="mailto:raveendravarma38@gmail.com" 
                className="text-slate-400 hover:text-brand-blue transition-colors"
              >
                <Mail />
              </a>
            </div>
            <p className="text-slate-400 text-sm text-center md:text-right font-medium">
              &copy; {new Date().getFullYear()} Raveendra Varma. <br />
              Built with React, Tailwind & Python Passion.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

