import { useState, useEffect, useRef } from 'react'
import './App.css'
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  FileText,
  ExternalLink,
  Code2,
  Database,
  Server,
  Cloud,
  Wrench,
  Moon,
  Sun,
  Menu,
  X,
  ChevronUp,
  GraduationCap,
  Briefcase,
} from 'lucide-react'

/* ───────────── data ───────────── */

const NAV_LINKS = ['Home', 'About', 'Projects', 'Skills', 'Contact'] as const

interface Project {
  title: string
  description: string
  tech: string[]
  links: { label: string; url: string }[]
  status?: string
}

const PROJECTS: Project[] = [
  {
    title: 'Comprehension Game',
    description:
      'A web application developed by CG World Oy that enhances educational learning through game-based interaction. Contributed to the development of Comprehension Game, Creator, and Tale Reader projects.',
    tech: ['Django', 'PostgreSQL', 'Redux', 'React', 'TypeScript'],
    links: [
      { label: 'Backend Source', url: '#' },
      { label: 'Backend Live', url: '#' },
      { label: 'Creator Frontend', url: '#' },
    ],
  },
  {
    title: 'LetsDo WebApp',
    description:
      'A web application for task management. Full-stack project with CI/CD pipeline.',
    tech: ['Express', 'Render', 'TypeScript', 'Node', 'Prisma', 'Angular', 'AWS', 'MySQL'],
    links: [
      { label: 'Backend Source', url: '#' },
      { label: 'Frontend Source', url: '#' },
      { label: 'API Docs', url: '#' },
    ],
    status: 'In Progress (CI/CD)',
  },
  {
    title: 'Precious Blog',
    description: 'A basic blog project built as a school assignment.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Source Code', url: '#' },
      { label: 'Go Live', url: '#' },
    ],
  },
  {
    title: 'Foretrust Networking Website',
    description:
      'An educative website for Foretrust Digital Consulting Center covering networking basics.',
    tech: ['Angular'],
    links: [
      { label: 'Source Code', url: '#' },
      { label: 'Go Live', url: '#' },
    ],
  },
  {
    title: 'Rock Paper Scissors',
    description: 'Popular web game built with game sound effects.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Source Code', url: '#' },
      { label: 'Go Live', url: '#' },
    ],
  },
  {
    title: 'Calculator',
    description: 'A mini web calculator.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Source Code', url: '#' },
      { label: 'Go Live', url: '#' },
    ],
  },
]

interface Experience {
  company: string
  location: string
  role: string
  description: string
}

const EXPERIENCES: Experience[] = [
  {
    company: 'Genesys Techhub Company',
    location: 'Enugu',
    role: 'Backend Developer (Intern)',
    description:
      'Worked on maintaining and developing backend services with Express.js, Git, MySQL, TypeScript, JavaScript, and Swagger. Collaborated across frontend, Web3, and design teams. Gained Agile/Scrum experience.',
  },
  {
    company: 'Codewithmosh.com, Mosh Hamedani',
    location: '',
    role: 'Node.js Class',
    description:
      'Completed a comprehensive Node.js course focusing on essential backend concepts and best practices for building server-side applications.',
  },
  {
    company: 'JAMK University of Applied Science',
    location: 'Finland',
    role: 'Entrance Exam on Database',
    description:
      'Prepared for and completed an entrance exam focused on SQL and MySQL database fundamentals.',
  },
  {
    company: 'Genesys Techhub Company',
    location: 'Enugu',
    role: 'Upskill Mentor in Web Development',
    description:
      'Mentored beginners in web development during a three-month Upskill program, guiding them through their learning journey.',
  },
  {
    company: 'Xc7 Systems Limited',
    location: 'Enugu',
    role: 'Student',
    description:
      'Gained in-depth knowledge of web development (frontend and backend), DevOps practices, database management, and networking.',
  },
  {
    company: 'Foretrust Digital Consulting Center',
    location: 'Enugu',
    role: 'Full-Stack Tutor',
    description:
      'Provided tutoring on frontend and backend technologies including HTML, CSS, JavaScript, XAMPP, MySQL, SQLite, Python, and Django.',
  },
  {
    company: 'T-Max Programme',
    location: 'Enugu',
    role: 'Frontend Tutor',
    description:
      'Taught frontend development concepts to students in the T-Max ICT program as part of a government-sponsored initiative.',
  },
]

interface Education {
  school: string
  degree: string
  note?: string
}

const EDUCATION: Education[] = [
  {
    school: 'JAMK University Of Applied Science, Finland',
    degree: 'Bachelor of Engineering in ICT',
    note: 'Currently a student',
  },
  {
    school: 'Anambra State University, Nigeria',
    degree: 'Bachelor of Science in Entrepreneurship Studies',
  },
]

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: <Code2 className="w-5 h-5" />,
    skills: ['JavaScript', 'TypeScript', 'React', 'Angular', 'Bootstrap', 'HTML', 'CSS', 'Angular Material', 'Tailwind'],
  },
  {
    title: 'Backend',
    icon: <Server className="w-5 h-5" />,
    skills: ['Python', 'Django', 'Node.js', 'Express.js', 'PHP', 'Docker', 'Prisma'],
  },
  {
    title: 'Databases',
    icon: <Database className="w-5 h-5" />,
    skills: ['SQL', 'MySQL', 'SQLite', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'DevOps & Tools',
    icon: <Wrench className="w-5 h-5" />,
    skills: ['Git', 'GitHub', 'GitLab', 'Swagger', 'Postman', 'Virtual Machines', 'Linux', 'UML', 'Networking', 'Scrum / Agile'],
  },
  {
    title: 'Cloud & Hosting',
    icon: <Cloud className="w-5 h-5" />,
    skills: ['AWS', 'Render', 'Heroku'],
  },
]

const SOCIAL_LINKS = [
  { icon: <Github className="w-5 h-5" />, label: 'GitHub', url: 'https://github.com/ockx' },
  { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', url: 'https://instagram.com' },
  { icon: <FileText className="w-5 h-5" />, label: 'CV/Resume', url: '#' },
  { icon: <Mail className="w-5 h-5" />, label: 'Email', url: 'mailto:ockpaul1@gmail.com' },
]

/* ───────────── hooks ───────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ───────────── components ───────────── */

function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navClasses = scrolled
    ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg backdrop-blur-md'
    : 'bg-transparent'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#Home" className="flex items-center gap-2 group">
          <img src="/images/line.png" alt="Signature" className="h-8 opacity-80 dark:invert" />
          <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            Obiorah Callistus
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {l}
            </a>
          ))}
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <button onClick={() => setOpen(!open)} className="p-2" aria-label="Menu">
            {open ? <X className="w-6 h-6 dark:text-gray-200" /> : <Menu className="w-6 h-6 dark:text-gray-200" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-700">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const { ref, visible } = useInView()
  return (
    <section id="Home" className="min-h-screen flex items-center pt-20 pb-16 px-6 bg-gradient-to-br from-white via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div ref={ref} className={`max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <p className="text-emerald-600 dark:text-emerald-400 font-medium text-lg">Hello, I'm</p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Callistus <span className="text-emerald-600 dark:text-emerald-400">Obiorah</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium">
              Full-Stack Developer
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg text-lg">
            I am a passionate Full Stack Developer with 4+ years of experience, focused on creating
            efficient and user-friendly web applications. With a strong background in both frontend
            and backend technologies, I am dedicated to building seamless digital experiences.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#Contact"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
            <a
              href="#Projects"
              className="px-8 py-3 border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 font-medium rounded-full hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-400 dark:hover:text-gray-900 transition-all duration-300 hover:-translate-y-0.5"
            >
              View Projects
            </a>
          </div>
          <div className="flex gap-4 pt-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl shadow-emerald-500/20">
              <img
                src="/images/profile.jpg"
                alt="Callistus Obiorah"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/png?text=CO' }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm text-center leading-tight">4+<br />Years</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const { ref: expRef, visible: expVis } = useInView()
  const { ref: eduRef, visible: eduVis } = useInView()

  return (
    <section id="About" className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          About <span className="text-emerald-600 dark:text-emerald-400">Me</span>
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
          My professional journey and education background
        </p>

        {/* Experience */}
        <div ref={expRef} className={`mb-16 transition-all duration-700 ${expVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h3>
          </div>
          <div className="space-y-6">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className="relative pl-8 border-l-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 transition-colors group"
              >
                <div className="absolute left-0 top-0 w-4 h-4 bg-emerald-500 rounded-full -translate-x-1/2 group-hover:scale-125 transition-transform shadow-md" />
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {exp.company}{exp.location ? `, ${exp.location}` : ''}
                    </h4>
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 italic">
                      {exp.role}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div ref={eduRef} className={`transition-all duration-700 ${eduVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{edu.school}</h4>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium italic mb-2">{edu.degree}</p>
                {edu.note && <p className="text-sm text-gray-500 dark:text-gray-400">{edu.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const { ref, visible } = useInView()

  return (
    <section id="Projects" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Featured <span className="text-emerald-600 dark:text-emerald-400">Projects</span>
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
          A selection of projects I've built and contributed to
        </p>
        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{p.title}</h3>
                {p.status && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full whitespace-nowrap">
                    {p.status}
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const { ref, visible } = useInView()

  return (
    <section id="Skills" className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Technical <span className="text-emerald-600 dark:text-emerald-400">Skills</span>
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
          Technologies and tools I work with
        </p>
        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 bg-white dark:bg-gray-900 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { ref, visible } = useInView()

  return (
    <section id="Contact" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Get in <span className="text-emerald-600 dark:text-emerald-400">Touch</span>
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
          Feel free to reach out for collaborations or just a friendly chat
        </p>
        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <a
            href="mailto:ockpaul1@gmail.com"
            className="flex flex-col items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">Email</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">ockpaul1@gmail.com</p>
            </div>
          </a>
          <a
            href="tel:+358465861993"
            className="flex flex-col items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">Phone</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">+358 46 586 1993</p>
            </div>
          </a>
          <div className="flex flex-col items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:-translate-y-1">
            <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">Location</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Jyvaskyla, Finland</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src="/images/line.png" alt="Signature" className="h-8 opacity-60 invert" />
            <span className="font-medium text-gray-300">Obiorah Callistus</span>
          </div>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l}`}
                className="text-sm hover:text-emerald-400 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:text-emerald-400 hover:bg-gray-800 transition-all"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>Designed and built by Callistus Obiorah</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} — All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  if (!show) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-40"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  )
}

/* ───────────── App ───────────── */

function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
