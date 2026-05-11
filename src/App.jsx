import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Certifications', 'Contact']

const SKILLS = [
  {
    icon: '⚡',
    title: 'Backend & Core',
    color: '#7c6dff',
    items: ['Node.js', 'TypeScript', 'Express.js', 'Redis', 'C++', 'Python', 'Golang', 'REST APIs'],
  },
  {
    icon: '☁',
    title: 'Cloud & DevOps',
    color: '#00e5ff',
    items: ['AWS Lambda', 'AWS S3', 'SQS / SNS', 'Jenkins', 'GitLab CI'],
  },
  {
    icon: '🗄',
    title: 'Databases',
    color: '#ff6b9d',
    items: ['MySQL', 'MongoDB', 'Redis Cache', 'Query Optimization'],
  },
  {
    icon: '🧠',
    title: 'Systems & Perf',
    color: '#7c6dff',
    items: ['DSA (500+ problems)', 'Memory Optimization', 'Multithreading', 'Scalability', 'Debugging'],
  },
  {
    icon: '✦',
    title: 'AI / ML',
    color: '#00e5ff',
    items: ['Machine Learning basics', 'Data Visualization', 'React.js', 'Angular.js'],
  },
  {
    icon: '⚒',
    title: 'Tools',
    color: '#ff6b9d',
    items: ['Git / GitHub', 'GitLab', 'Postman', 'VS Code', 'Jenkins'],
  },
]

const PROJECTS = [
  {
    featured: true,
    tag: 'Full-Stack',
    title: 'MediCarePro',
    subtitle: 'Hospital Management System',
    desc: 'Responsive hospital management system with patient registration, appointment scheduling, and medical records. Structured DB schema for accuracy and consistency at scale.',
    tech: ['React.js', 'Node.js', 'MySQL', 'Express.js', 'REST API'],
    github: 'https://github.com/krsandeep1808/Hospital-Management-System',
  },
  {
    featured: false,
    tag: 'Admin Dashboard',
    title: 'Ecomscape',
    subtitle: 'E-Commerce Admin Dashboard',
    desc: 'Simplifies e-commerce management with user controls, data visualization, real-time monitoring, and customizable widgets. Optimized API response times for high-volume data.',
    tech: ['React.js', 'MongoDB', 'Node.js', 'Express'],
    github: 'https://github.com/krsandeep1808/Admin-Dashboard',
  },
  {
    featured: false,
    tag: 'Productivity',
    title: 'Noteify',
    subtitle: 'Full-Stack Note App',
    desc: 'Full-stack CRUD note-taking app improving efficiency by 60% and reducing management overhead by 25%. MySQL + REST API backend with clean architecture.',
    tech: ['React', 'MySQL', 'REST API', 'Node.js'],
    github: 'https://github.com/krsandeep1808/Noteify',
  },
]

const EXPERIENCE = [
  {
    role: 'Software Development Engineer I',
    company: 'Social Buzz Technologies',
    location: 'Mumbai, India',
    period: 'Jun 2024 – Jan 2026',
    current: true,
    points: [
      'Designed scalable backend systems in Node.js, TypeScript, Redis, SQL, AWS — improved response times by up to 75%.',
      'Implemented query optimization, caching strategies, and structured logging for monitoring.',
      'Built idempotent payment flows and fault-tolerant, test-ready architectures.',
      'Reduced deployment delays by 2–3 days; cut operational costs by 70% via pipeline improvements.',
    ],
  },
  {
    role: 'Software Development Engineer — Intern',
    company: 'Clerisy Solutions',
    location: 'Mohali, India',
    period: 'Nov 2023 – May 2024',
    current: false,
    points: [
      'Built real-time financial dashboard with React.js — improved user engagement by 35%.',
      'Participated in full SDLC: system design, testing, debugging, performance validation.',
      'Assisted in backend API integration and data flow between frontend and backend systems.',
    ],
  },
]

const CONTACT_LINKS = [
  { label: 'Email',    value: 'kumar1808sandeep@gmail.com',              href: 'mailto:kumar1808sandeep@gmail.com',             icon: '✉' },
  { label: 'LinkedIn', value: 'sandeepkumar1808',                        href: 'https://www.linkedin.com/in/sandeepkumar1808/', icon: 'in' },
  { label: 'GitHub',   value: 'krsandeep1808',                           href: 'https://github.com/krsandeep1808',              icon: '⌥' },
  { label: 'Twitter',  value: '@sandeep_dev',                             href: '#',                                             icon: '𝕏' },
]

const ACHIEVEMENTS = [
  {
    platform: 'HackerRank',
    stat: '2234',
    label: 'Best Rank',
    desc: 'Solved 500+ problems across algorithms, data structures, and competitive programming.',
    color: '#00e5ff',
    icon: '🏆',
  },
  {
    platform: 'LeetCode',
    stat: '500+',
    label: 'Problems Solved',
    desc: 'Strong coverage across arrays, trees, graphs, dynamic programming, and system design.',
    color: '#ff6b9d',
    icon: '⚡',
  },
  {
    platform: 'CodeChef',
    stat: '200+',
    label: 'Problems Solved',
    desc: 'Completed 10+ rated contests with consistently strong rankings across difficulty levels.',
    color: '#7c6dff',
    icon: '🎯',
  },
]

const CERTIFICATIONS = [
  {
    title: 'Amazon Web Services',
    subtitle: 'Lambda · SQS · SNS · S3',
    issuer: 'AWS',
    icon: '☁',
    color: '#00e5ff',
  },
  {
    title: 'Machine Learning',
    subtitle: 'Supervised & Unsupervised Learning, Neural Networks',
    issuer: 'Stanford University',
    icon: '🤖',
    color: '#7c6dff',
  },
  {
    title: 'Software Testing',
    subtitle: 'Unit, Integration & Automation Testing',
    issuer: 'IIIT Bangalore',
    icon: '🧪',
    color: '#ff6b9d',
  },
]

/* ─────────────────────────────────────────
   HOOK — scroll reveal
───────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

/* ─────────────────────────────────────────
   SHARED UI PIECES
───────────────────────────────────────── */
function SectionLabel({ num, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <span style={{ color: '#00e5ff', fontSize: 11, letterSpacing: 2, fontWeight: 600 }}>
        {num} // {label}
      </span>
      <div
        style={{
          flex: 1, height: 1,
          background: 'linear-gradient(90deg, rgba(0,229,255,0.3), transparent)',
        }}
      />
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(36px, 5vw, 60px)',
        letterSpacing: -2,
        lineHeight: 1.05,
        marginBottom: 56,
        color: '#eef2ff',
      }}
    >
      {children}
    </h2>
  )
}

/* ─────────────────────────────────────────
   NAV
───────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: scrolled ? '14px 48px' : '24px 48px',
        background: scrolled ? 'rgba(10,14,26,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,229,255,0.1)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <a
        href="#hero"
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: '#eef2ff', letterSpacing: 1 }}
      >
        sandeep<span style={{ color: '#00e5ff' }}>.dev</span>
      </a>

      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {NAV_LINKS.map(link => (
          <a
            key={link}
            href={`#${link}`}
            style={{ fontSize: 12, color: '#8899bb', letterSpacing: 1, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00e5ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8899bb')}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  const [typed, setTyped] = useState('')
  const fullText = 'Full Stack Software Engineer'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      index += 1
      setTyped(fullText.slice(0, index))
      if (index >= fullText.length) clearInterval(timer)
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '120px 48px 80px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />
      {/* Glow orb */}
      <div
        style={{
          position: 'absolute', top: '20%', left: '-10%',
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'floatY 8s ease-in-out infinite',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(0,229,255,0.3)', padding: '6px 16px',
            borderRadius: 4, marginBottom: 40,
            animation: 'fadeSlideDown 0.5s 0.2s both',
          }}
        >
          <div
            style={{
              width: 6, height: 6, borderRadius: '50%', background: '#00e5ff',
              animation: 'glowPulse 2s infinite',
            }}
          />
          <span style={{ fontSize: 11, color: '#00e5ff', letterSpacing: 2 }}>
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(52px, 9vw, 110px)', lineHeight: 0.92,
            letterSpacing: -3, marginBottom: 16,
            animation: 'fadeSlideUp 0.7s 0.4s both',
          }}
        >
          <span style={{ display: 'block', color: '#eef2ff' }}>Sandeep</span>
          <span className="grad-text" style={{ display: 'block' }}>Kumar</span>
        </h1>

        {/* Typewriter */}
        <p
          style={{
            fontSize: 16, color: '#8899bb', marginBottom: 24, minHeight: 28,
            animation: 'fadeSlideUp 0.7s 0.6s both',
          }}
        >
          {typed}
          <span
            style={{
              borderLeft: '2px solid #00e5ff',
              marginLeft: 2,
              animation: 'blink 1s infinite',
            }}
          >
            &nbsp;
          </span>
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: 14, lineHeight: 1.9, color: '#8899bb',
            maxWidth: 520, marginBottom: 48, fontWeight: 300,
            animation: 'fadeSlideUp 0.7s 0.8s both',
          }}
        >
          Specialising in{' '}
          <span style={{ color: '#00e5ff' }}>scalable backend systems</span> and{' '}
          <span style={{ color: '#7c6dff' }}>high-performance APIs</span>.{' '}
          1.5+ years shipping production-grade software in fast-paced environments.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeSlideUp 0.7s 1s both' }}>
          <a
            href="#projects"
            style={{
              background: '#00e5ff', color: '#0a0e1a',
              padding: '14px 32px', fontSize: 13, fontWeight: 700,
              letterSpacing: 1, display: 'inline-block', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#7c6dff'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(124,109,255,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#00e5ff'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              background: 'transparent', color: '#c8d6f0',
              padding: '13px 32px', fontSize: 13, fontWeight: 500,
              border: '1px solid rgba(255,255,255,0.15)',
              letterSpacing: 1, display: 'inline-block', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'
              e.currentTarget.style.color = '#00e5ff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = '#c8d6f0'
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex', gap: 48, marginTop: 72,
            borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 36,
            animation: 'fadeSlideUp 0.7s 1.2s both',
          }}
        >
          {[
            { n: '1.5+', l: 'years exp' },
            { n: '30+',  l: 'projects shipped' },
            { n: '12+',  l: 'tech stack' },
          ].map(stat => (
            <div key={stat.l}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: 36, color: '#eef2ff', letterSpacing: -1,
                }}
              >
                {stat.n}
              </div>
              <div style={{ fontSize: 11, color: '#8899bb', letterSpacing: 1, marginTop: 4 }}>
                {stat.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   ABOUT
───────────────────────────────────────── */
function About() {
  const ref = useReveal()
  const profileRows = [
    { k: 'name',       v: 'Sandeep Kumar',         vc: null },
    { k: 'role',       v: 'Software Dev Engineer',  vc: null },
    { k: 'location',   v: 'Noida Uttar Pradesh, India',       vc: null },
    { k: 'experience', v: '1.5+ years',             vc: null },
    { k: 'education',  v: 'B.E.- CSE',           vc: null },
    { k: 'status',     v: '● Open to work',         vc: '#00e5ff' },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="reveal"
      style={{ padding: '100px 48px', background: '#0c1020' }}
    >
      <SectionLabel num="01" label="ABOUT" />
      <SectionTitle>Who I Am</SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        {/* Left text */}
        <div>
          {[
            <>
              I&apos;m a{' '}
              <strong style={{ color: '#eef2ff' }}>Software Development Engineer</strong>{' '}
              based in Noida, Uttar Pradesh, India with a passion for building systems that are as elegant
              under the hood as they are on the surface.
            </>,
            <>
              I specialise in{' '}
              <span style={{ color: '#00e5ff' }}>Node.js, TypeScript, Redis, and AWS</span>{' '}
              — designing and optimising backend services from concept to production.
            </>,
            <>
              At Social Buzz Technologies, I improved system response times by{' '}
              <strong style={{ color: '#eef2ff' }}>up to 75%</strong> and cut operational
              costs by <strong style={{ color: '#eef2ff' }}>70%</strong> through smarter
              architecture, query optimisation, and pipeline improvements.
            </>,
          ].map((para, i) => (
            <p
              key={i}
              style={{ fontSize: 14, lineHeight: 2, color: '#8899bb', marginBottom: 20, fontWeight: 300 }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Right: profile.json card */}
        <div
          style={{
            background: '#0a0e1a',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8, overflow: 'hidden',
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', background: '#111827',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ fontSize: 11, color: '#8899bb', marginLeft: 8 }}>// profile.json</span>
          </div>

          {/* Rows */}
          <div style={{ padding: '24px' }}>
            {profileRows.map(row => (
              <div
                key={row.k}
                style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 12,
                }}
              >
                <span style={{ color: '#8899bb' }}>{row.k}</span>
                <span style={{ color: row.vc || '#eef2ff' }}>{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SKILLS
───────────────────────────────────────── */
function SkillCard({ skill, delay }) {
  const ref = useReveal()
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div
        style={{
          background: hovered ? '#111827' : '#0c1020',
          border: `1px solid ${hovered ? skill.color + '44' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 8, padding: '28px',
          transition: 'all 0.3s', height: '100%',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 20, paddingBottom: 16,
            borderBottom: `1px solid ${skill.color}33`,
          }}
        >
          <span style={{ fontSize: 20 }}>{skill.icon}</span>
          <span style={{ fontSize: 11, color: skill.color, letterSpacing: 2, fontWeight: 600 }}>
            {skill.title.toUpperCase()}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skill.items.map(item => (
            <SkillTag key={item} item={item} color={skill.color} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillTag({ item, color }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      style={{
        fontSize: 11, padding: '5px 12px',
        background: '#0a0e1a',
        border: `1px solid ${hov ? color + '55' : 'rgba(255,255,255,0.06)'}`,
        color: hov ? color : '#8899bb',
        borderRadius: 3, transition: 'all 0.2s', cursor: 'default',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {item}
    </span>
  )
}

function Skills() {
  return (
    <section id="skills" style={{ padding: '100px 48px' }}>
      <SectionLabel num="02" label="SKILLS" />
      <SectionTitle>What I Build With</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.title} skill={skill} delay={i * 80} />
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   PROJECTS
───────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const ref = useReveal()
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        gridColumn: project.featured ? '1 / -1' : 'auto',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        style={{
          background: hov ? '#111827' : '#0c1020',
          border: `1px solid ${hov ? 'rgba(0,229,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 8,
          padding: project.featured ? '40px' : '32px',
          transition: 'all 0.3s', height: '100%',
          display: 'flex', flexDirection: 'column',
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {project.featured && (
              <span
                style={{
                  fontSize: 10, padding: '4px 12px',
                  background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)',
                  color: '#00e5ff', letterSpacing: 1,
                }}
              >
                ✦ Featured
              </span>
            )}
            <span
              style={{
                fontSize: 10, padding: '4px 12px',
                background: 'rgba(124,109,255,0.1)', border: '1px solid rgba(124,109,255,0.3)',
                color: '#7c6dff', letterSpacing: 1,
              }}
            >
              {project.tag}
            </span>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 11, color: '#8899bb', letterSpacing: 1, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00e5ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8899bb')}
          >
            ↗ GitHub
          </a>
        </div>

        <h3
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: project.featured ? 32 : 22,
            letterSpacing: -1, color: '#eef2ff', marginBottom: 8,
          }}
        >
          {project.title}
        </h3>
        <div style={{ fontSize: 11, color: '#00e5ff', letterSpacing: 1, marginBottom: 16 }}>
          {project.subtitle}
        </div>
        <p style={{ fontSize: 13, color: '#8899bb', lineHeight: 1.85, marginBottom: 24, fontWeight: 300, flex: 1 }}>
          {project.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tech.map(t => (
            <span
              key={t}
              style={{
                fontSize: 11, padding: '5px 12px',
                background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.06)', color: '#8899bb',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section id="projects" style={{ padding: '100px 48px', background: '#0c1020' }}>
      <SectionLabel num="03" label="PROJECTS" />
      <SectionTitle>Things I&apos;ve Built</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────── */
function ExpCard({ exp, index }) {
  const ref = useReveal()
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      className="reveal"
      style={{ transitionDelay: `${index * 150}ms`, position: 'relative', paddingLeft: 32, marginBottom: 40 }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: 'absolute', left: 0, top: 8,
          width: 10, height: 10, borderRadius: '50%',
          background: exp.current ? '#00e5ff' : '#4a5568',
          border: `2px solid ${exp.current ? '#00e5ff' : '#4a5568'}`,
          animation: exp.current ? 'glowPulse 2s infinite' : 'none',
        }}
      />
      <div
        style={{
          background: hov ? '#111827' : '#0c1020',
          border: `1px solid ${hov ? 'rgba(0,229,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 8, padding: '32px', transition: 'all 0.3s',
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div
          style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 12,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 20, color: '#eef2ff', letterSpacing: -0.5,
              }}
            >
              {exp.role}
            </div>
            <div style={{ fontSize: 12, color: '#00e5ff', marginTop: 4 }}>
              // {exp.company}, {exp.location}
            </div>
          </div>
          <div
            style={{
              fontSize: 11, padding: '6px 16px', background: '#0a0e1a',
              border: '1px solid rgba(255,255,255,0.06)', color: '#8899bb',
              borderRadius: 3, whiteSpace: 'nowrap',
            }}
          >
            {exp.period}
          </div>
        </div>

        <ul style={{ listStyle: 'none', marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {exp.points.map((pt, i) => (
            <li
              key={i}
              style={{
                fontSize: 13, color: '#8899bb', paddingLeft: 20,
                position: 'relative', lineHeight: 1.75, fontWeight: 300,
              }}
            >
              <span style={{ position: 'absolute', left: 0, color: '#00e5ff' }}>→</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Experience() {
  return (
    <section id="experience" style={{ padding: '100px 48px' }}>
      <SectionLabel num="04" label="EXPERIENCE" />
      <SectionTitle>Where I&apos;ve Worked</SectionTitle>
      <div style={{ position: 'relative' }}>
        {/* Timeline vertical line */}
        <div
          style={{
            position: 'absolute', left: 4, top: 0, bottom: 0, width: 1,
            background: 'linear-gradient(180deg, rgba(0,229,255,0.4), rgba(124,109,255,0.15), transparent)',
          }}
        />
        {EXPERIENCE.map((exp, i) => (
          <ExpCard key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}


/* ─────────────────────────────────────────
   ACHIEVEMENTS
───────────────────────────────────────── */
function AchievementCard({ item, index }) {
  const ref = useReveal()
  const [hov, setHov] = useState(false)

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
      <div
        style={{
          background: hov ? '#111827' : '#0c1020',
          border: `1px solid ${hov ? item.color + '44' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 8, padding: '36px 32px',
          transition: 'all 0.3s', height: '100%', position: 'relative', overflow: 'hidden',
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: item.color, filter: 'blur(80px)',
          opacity: hov ? 0.18 : 0.08, transition: 'opacity 0.3s',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Platform + icon */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: item.color, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                {item.platform}
              </div>
              <div style={{ fontSize: 12, color: '#8899bb' }}>{item.label}</div>
            </div>
            <span style={{ fontSize: 28 }}>{item.icon}</span>
          </div>

          {/* Big stat */}
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900,
            fontSize: 'clamp(52px, 7vw, 72px)', letterSpacing: -3,
            lineHeight: 1, color: '#eef2ff', marginBottom: 20,
          }}>
            {item.stat}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: `linear-gradient(90deg, ${item.color}44, transparent)`, marginBottom: 20 }} />

          <p style={{ fontSize: 13, color: '#8899bb', lineHeight: 1.75, fontWeight: 300 }}>
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

function Achievements() {
  return (
    <section id="achievements" style={{ padding: '100px 48px', background: '#0c1020' }}>
      <SectionLabel num="05" label="ACHIEVEMENTS" />
      <SectionTitle>By the <span style={{ fontStyle: 'italic', color: '#8899bb' }}>Numbers</span></SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {ACHIEVEMENTS.map((item, i) => (
          <AchievementCard key={item.platform} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CERTIFICATIONS
───────────────────────────────────────── */
function CertCard({ cert, index }) {
  const ref = useReveal()
  const [hov, setHov] = useState(false)

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${index * 120}ms` }}>
      <div
        style={{
          background: hov ? '#111827' : '#0c1020',
          border: `1px solid ${hov ? cert.color + '44' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 8, padding: '28px 28px',
          transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 20,
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Icon box */}
        <div style={{
          width: 52, height: 52, borderRadius: 12, flexShrink: 0,
          background: cert.color + '18',
          border: `1px solid ${cert.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, transition: 'all 0.3s',
        }}>
          {cert.icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: 17, color: '#eef2ff', letterSpacing: -0.3, marginBottom: 4,
          }}>
            {cert.title}
          </div>
          <div style={{ fontSize: 12, color: '#8899bb', marginBottom: 8 }}>{cert.subtitle}</div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, color: cert.color, letterSpacing: 1,
          }}>
            <span>✓</span>
            <span>{cert.issuer}</span>
          </div>
        </div>

        {/* Badge */}
        <div style={{
          flexShrink: 0,
          fontSize: 10, padding: '6px 14px',
          background: cert.color + '12',
          border: `1px solid ${cert.color}33`,
          color: cert.color, letterSpacing: 1.5, textTransform: 'uppercase', borderRadius: 3,
        }}>
          Certified
        </div>
      </div>
    </div>
  )
}

function Certifications() {
  return (
    <section id="certifications" style={{ padding: '100px 48px' }}>
      <SectionLabel num="06" label="CERTIFICATIONS" />
      <SectionTitle>What I&apos;ve <span style={{ fontStyle: 'italic', color: '#8899bb' }}>Learned</span></SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CERTIFICATIONS.map((cert, i) => (
          <CertCard key={cert.title} cert={cert} index={i} />
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CONTACT
───────────────────────────────────────── */
function Contact() {
  const ref = useReveal()

  return (
    <section
      id="contact"
      ref={ref}
      className="reveal"
      style={{ padding: '120px 48px 100px', background: '#0c1020', textAlign: 'center' }}
    >
      <SectionLabel num="07" label="CONTACT" />
      <h2
        style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: -3, lineHeight: 1,
          color: '#eef2ff', marginBottom: 24,
        }}
      >
        Let&apos;s Build <span className="grad-text">Together</span>
      </h2>
      <p
        style={{
          fontSize: 14, color: '#8899bb', maxWidth: 460, margin: '0 auto 56px',
          lineHeight: 1.85, fontWeight: 300,
        }}
      >
        I&apos;m currently Open to SDE-1 / SDE-2 backend roles in Delhi NCR, Bangalore, Hyderabad, Mumbai or remote. Send me a message — I reply within 24 hours.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
        {CONTACT_LINKS.map(cl => (
          <ContactPill key={cl.label} link={cl} />
        ))}
      </div>
    </section>
  )
}

function ContactPill({ link }) {
  const [hov, setHov] = useState(false)
  const isEmail = link.label === 'Email'

  function handleEmailClick(e) {
    e.preventDefault()
    const email = link.value
    const mailtoUrl = `mailto:${email}`
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}`

    // Try to open native mail app first
    const mailWindow = window.open(mailtoUrl, '_self')

    // After 500ms, if no mail app handled it, open Gmail in new tab as fallback
    setTimeout(() => {
      window.open(gmailUrl, '_blank')
    }, 500)
  }

  if (isEmail) {
    return (
      <button
        onClick={handleEmailClick}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '12px 24px', cursor: 'pointer',
          background: hov ? 'rgba(0,229,255,0.05)' : '#0a0e1a',
          border: `1px solid ${hov ? 'rgba(0,229,255,0.35)' : 'rgba(255,255,255,0.06)'}`,
          color: hov ? '#00e5ff' : '#c8d6f0',
          fontSize: 13, transition: 'all 0.25s',
          fontFamily: "'JetBrains Mono', monospace",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <span style={{ fontWeight: 600 }}>{link.icon}</span>
        <span>{link.value}</span>
      </button>
    )
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '12px 24px',
        background: hov ? 'rgba(0,229,255,0.05)' : '#0a0e1a',
        border: `1px solid ${hov ? 'rgba(0,229,255,0.35)' : 'rgba(255,255,255,0.06)'}`,
        color: hov ? '#00e5ff' : '#c8d6f0',
        fontSize: 13, transition: 'all 0.25s',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ fontWeight: 600 }}>{link.icon}</span>
      <span>↗ {link.label}</span>
    </a>
  )
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        background: '#07090f', padding: '24px 48px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}
    >
      <span style={{ fontSize: 12, color: '#4a5568' }}>© 2026 sandeep.dev All rights reserved.</span>
    </footer>
  )
}

/* ─────────────────────────────────────────
   ROOT APP
───────────────────────────────────────── */
export default function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  )
}