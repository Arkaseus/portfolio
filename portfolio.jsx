import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, ExternalLink, ArrowDown,
  Menu, X, ChevronRight, Layers, Database, Cloud, Terminal,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES (injected once at root)
───────────────────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; cursor: none !important; }
  html { scroll-behavior: smooth; }
  ::selection { background: rgba(16,185,129,.18); color: #d1fae5; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes dot-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: .5; transform: scale(.85); }
  }
  .animate-blink   { animation: blink 1s step-end infinite; }
  .animate-dot     { animation: dot-pulse 2s ease-in-out infinite; }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .5s cubic-bezier(.25,.46,.45,.94) ${delay}s,
                     transform .5s cubic-bezier(.25,.46,.45,.94) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function useTypewriter(text, speed = 34) {
  const [out, setOut]   = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
    }, 420);
    return () => clearTimeout(t);
  }, []);
  return { out, done };
}

/* ─────────────────────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────────────────────── */
function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [big, setBig] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let tx = 0, ty = 0, rx = 0, ry = 0, raf;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const over  = (e) => setBig(!!e.target.closest("a, button, [data-hover]"));
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    const tick = () => {
      rx += (tx - rx) * 0.11;
      ry += (ty - ry) * 0.11;
      if (dotRef.current)
        dotRef.current.style.transform  = `translate(${tx}px,${ty}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 -translate-x-1/2 -translate-y-1/2" />
      </div>
      {/* outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full border border-emerald-400 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            big
              ? "w-9 h-9 border-opacity-70 bg-emerald-500 bg-opacity-5"
              : "w-5 h-5 border-opacity-40"
          }`}
        />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────────────────────── */
const NAV_LINKS = ["Work", "Experience", "Skills", "Contact"];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-zinc-950 bg-opacity-80 backdrop-blur-md border-b border-zinc-800 border-opacity-50" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* logo mark */}
        <span className="text-zinc-50 font-black text-xl tracking-tight select-none">
          AY<span className="text-emerald-400">.</span>
        </span>

        {/* desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => go(l)}
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 font-medium"
            >
              {l}
            </button>
          ))}
          <a
            href="mailto:akashyadavbca@gmail.com"
            className="text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:border-emerald-500 hover:border-opacity-60 hover:text-white transition-all duration-200"
          >
            Hire Me
          </a>
        </nav>

        {/* mobile burger */}
        <button
          className="md:hidden text-zinc-400 hover:text-zinc-200 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-zinc-950 bg-opacity-95 backdrop-blur-md border-b border-zinc-800">
          <nav className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => go(l)}
                className="text-left text-zinc-300 hover:text-zinc-50 py-1.5 text-sm font-medium transition-colors"
              >
                {l}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  const { out, done } = useTypewriter(
    "Building clean, scalable, and high-performance full-stack web applications."
  );

  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen flex items-center px-6 pt-20 pb-16 max-w-6xl mx-auto">
      <div className="w-full">
        {/* availability badge */}
        <div
          className="flex items-center gap-2.5 mb-8"
          style={{ animation: "fadeUp .55s ease .1s both" }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-dot" />
          <span className="text-xs text-zinc-500 tracking-widest uppercase font-semibold">
            Full-Stack Developer · Node.js, React & AI/LLM Integration
          </span>
        </div>

        {/* typewriter headline */}
        <h1
          className="text-4xl sm:text-5xl xl:text-6xl font-black text-zinc-50 leading-tight tracking-tight mb-8 max-w-3xl"
          style={{ minHeight: "13rem" }}
        >
          {out}
          {!done && (
            <span
              className="inline-block w-0.5 bg-emerald-400 ml-1 align-middle animate-blink"
              style={{ height: "0.9em" }}
            />
          )}
        </h1>

        {/* bio */}
        <p
          className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          style={{ animation: "fadeUp .55s ease 1.15s both", opacity: 0 }}
        >
          I'm{" "}
          <span className="text-zinc-200 font-semibold">Akash Yadav</span> — a
          full-stack developer with 3+ years in production. I architect
          Node.js backends, build fast React interfaces, and wire LLMs into
          real product features at{" "}
          <span className="text-zinc-300">SimplifyS Digital</span>.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-3 mb-14"
          style={{ animation: "fadeUp .55s ease 1.35s both", opacity: 0 }}
        >
          <button
            onClick={scrollToWork}
            className="group flex items-center gap-2 px-6 py-3 bg-emerald-500 text-zinc-950 font-bold text-sm rounded-lg hover:bg-emerald-400 active:scale-95 transition-all duration-200"
          >
            View Work
            <ArrowDown
              size={14}
              className="group-hover:translate-y-0.5 transition-transform duration-200"
            />
          </button>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-lg hover:border-zinc-500 hover:text-zinc-50 transition-all duration-200"
          >
            Resume <ExternalLink size={12} className="text-zinc-500" />
          </a>
        </div>

        {/* social row */}
        <div
          className="flex items-center gap-5"
          style={{ animation: "fadeUp .55s ease 1.55s both", opacity: 0 }}
        >
          {[
            { href: "https://github.com/Arkaseus", Icon: Github,   label: "GitHub" },
            { href: "https://www.linkedin.com/in/akash-yadav-builds", Icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:akashyadavbca@gmail.com",  Icon: Mail,     label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-zinc-600 hover:text-zinc-200 transition-colors duration-200"
            >
              <Icon size={19} />
            </a>
          ))}
          <div className="w-10 h-px bg-zinc-800" />
          <span className="text-xs text-zinc-600 font-medium">
            Prayagraj, India · Open to remote
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    label: "Production SaaS · AI-Integrated",
    name: "Smart Foundry",
    body:
      "A metal-casting client ran their entire production floor on fragile Google Sheets — no real-time visibility, no access control, manual reconciliation every single day. Smart Foundry replaced it: live production dashboards, GPT-4o vision reading values directly off physical instrument displays with structured validated output, a 4-level RBAC system for 100+ floor and admin users, and automated ERP sync via Google Cloud.",
    stack: [
      "Node.js", "Express", "React", "MongoDB", "Redis",
      "OpenAI GPT-4o", "Google Cloud", "Firebase Auth", "AWS",
    ],
    stat: "Shipped in 6.5 mo. vs. 12 mo. estimate",
    github: "#",
    demo: "#",
  },
  {
    label: "TypeScript · Full-Stack · Solo Build",
    name: "IdeaHub",
    body:
      "Developers at university had no dedicated place to share projects, find collaborators by skill, or track progress publicly. IdeaHub is a complete innovation platform: post ideas, vote, discover collaborators, track milestones, and compete on seasonal leaderboards. Designed, architected, and shipped entirely solo — TypeScript React frontend, Node.js/Express API, and MongoDB data layer.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT Auth"],
    stat: "Built solo · Complete feature set · End-to-end",
    github: "https://github.com/Arkaseus",
    demo: "#",
  },
];

function ProjectCard({ p, idx }) {
  const [ref, inView] = useInView(0.08);
  const [hov, setHov] = useState(false);

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .5s ease ${idx * 0.13}s, transform .5s ease ${idx * 0.13}s`,
      }}
      className="relative rounded-2xl border border-zinc-800 bg-zinc-900 bg-opacity-30 p-7 sm:p-8 flex flex-col gap-5 hover:border-zinc-700 hover:bg-opacity-50 transition-all duration-300"
    >
      {/* hairline top-glow on hover */}
      <div
        style={{
          position: "absolute", top: 0, left: "2.5rem", right: "2.5rem", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(16,185,129,.45), transparent)",
          opacity: hov ? 1 : 0, transition: "opacity .3s ease",
        }}
      />

      {/* header row */}
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
          {p.label}
        </span>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            <Github size={15} />
          </a>
          <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live Demo"
            className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-zinc-50 tracking-tight leading-none">
        {p.name}
      </h3>

      <p className="text-zinc-400 text-sm leading-relaxed">{p.body}</p>

      {/* tech pills */}
      <div className="flex flex-wrap gap-2">
        {p.stack.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 border-opacity-50"
          >
            {t}
          </span>
        ))}
      </div>

      {/* stat footer */}
      <div className="pt-4 border-t border-zinc-800 border-opacity-80 mt-auto">
        <span className="text-xs text-zinc-500 font-medium">{p.stat}</span>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="work" className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs text-emerald-400 tracking-widest uppercase font-bold mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-50 tracking-tight mb-3">
            Projects That Shipped
          </h2>
          <p className="text-zinc-500 text-base mb-14 max-w-lg leading-relaxed">
            End-to-end systems built for real operational problems — not demos.
          </p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    company: "SimplifyS Digital Pvt. Ltd.",
    role: "Full-Stack Developer",
    period: "Aug 2023 – Present",
    meta: "Full-time · Remote, India",
    bullets: [
      "Led end-to-end development of Smart Foundry — a production-tracking SaaS for a metal-casting client. Owned the complete stack: Node.js/Express APIs, React + Tailwind frontend, MongoDB schema design, and Redis caching on high-traffic endpoints.",
      "Integrated OpenAI GPT-4o vision models to read measurements directly from industrial instrument displays; engineered prompts for structured, validated output with explicit accuracy checks and error handling.",
      "Built Ratsense — a high-traffic Node.js/MySQL backend on AWS, cutting API response times 60% (600 ms → 200 ms). Shipped a modular admin panel covering 6+ entities with 4-level RBAC.",
      "Implemented Google/Firebase OAuth, role-based access for 100+ users, automated daily ERP sync (Google Cloud Functions + Scheduler), and SMTP reporting — eliminating daily manual reconciliation.",
    ],
  },
  {
    company: "Freelance Collaboration",
    role: "React Native Developer",
    period: "Jan 2025 – Feb 2026",
    meta: "Contract · Remote, US-based client",
    bullets: [
      "Contributed Android screens to a US-based mobile payments application — wired React Native UI to backend REST APIs using Redux for predictable, testable state management.",
      "Optimised rendering performance and navigation flows through the product's pilot launch, collaborating closely on API testing and bug-fixing.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-6 border-t border-zinc-800 border-opacity-40">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs text-emerald-400 tracking-widest uppercase font-bold mb-3">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-50 tracking-tight mb-14">
            Professional Timeline
          </h2>
        </FadeUp>

        <div className="relative">
          {/* vertical guide line */}
          <div className="absolute left-0 top-2 bottom-0 w-px bg-zinc-800 hidden sm:block" />

          <div className="flex flex-col gap-14">
            {EXPERIENCES.map((exp, i) => (
              <FadeUp key={i} delay={i * 0.1} className="relative sm:pl-10">
                {/* timeline dot */}
                <div
                  className="absolute -left-1 top-2 hidden sm:block w-2.5 h-2.5 rounded-full border-2 border-emerald-500 bg-zinc-950"
                  style={{ left: "-5px" }}
                />

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-5">
                  <div>
                    <h3 className="text-zinc-50 font-bold text-lg leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-emerald-400 text-sm font-semibold">{exp.company}</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-zinc-400 text-sm">{exp.period}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{exp.meta}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                      <ChevronRight
                        size={13}
                        className="text-emerald-500 mt-0.5 shrink-0"
                        style={{ opacity: 0.8 }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────────────────────────────────────── */
const SKILL_GROUPS = [
  {
    Icon: Layers,
    label: "Frontend",
    items: [
      "React.js", "React Native", "TypeScript",
      "JavaScript (ES6+)", "Redux", "Tailwind CSS", "HTML5 / CSS3",
    ],
  },
  {
    Icon: Database,
    label: "Backend & Data",
    items: [
      "Node.js", "Express.js", "REST API Design",
      "WebSockets (Socket.io)", "MongoDB", "MySQL", "Redis", "JWT / OAuth / RBAC",
    ],
  },
  {
    Icon: Terminal,
    label: "AI / LLM",
    items: [
      "OpenAI API (GPT-4o)", "Claude API (Anthropic)",
      "Prompt Engineering", "Structured Outputs",
      "Tool / Function Calling", "Model Context Protocol",
    ],
  },
  {
    Icon: Cloud,
    label: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, Lambda, RDS)", "Google Cloud Functions",
      "Docker", "CI/CD", "Git & GitHub", "Linux",
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 px-6 border-t border-zinc-800 border-opacity-40">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs text-emerald-400 tracking-widest uppercase font-bold mb-3">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-50 tracking-tight mb-14">
            What I Work With
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map(({ Icon, label, items }, i) => (
            <FadeUp key={label} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-zinc-800 bg-zinc-900 bg-opacity-30 p-6 hover:border-zinc-700 transition-colors duration-200">
                <div className="flex items-center gap-2.5 mb-5">
                  <Icon size={13} className="text-emerald-400" />
                  <span className="text-xs text-zinc-300 font-bold tracking-widest uppercase">
                    {label}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-zinc-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT / FOOTER
───────────────────────────────────────────────────────────────────────────── */
function Contact() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="py-24 sm:py-32 px-6 border-t border-zinc-800 border-opacity-40"
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs text-emerald-400 tracking-widest uppercase font-bold mb-5">
            Get in Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-zinc-50 leading-tight tracking-tight mb-5">
            Let's build something
            <br />
            <span className="text-zinc-600">compelling together.</span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-md">
            Open to full-time roles and interesting engineering
            challenges. I respond within 24 hours.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:akashyadavbca@gmail.com"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-emerald-500 text-zinc-950 font-bold text-sm rounded-lg hover:bg-emerald-400 active:scale-95 transition-all duration-200"
            >
              <Mail size={14} />
              akashyadavbca@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/akash-yadav-builds"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-lg hover:border-zinc-500 hover:text-zinc-50 transition-all duration-200"
            >
              <Linkedin size={14} />
              LinkedIn
              <ExternalLink size={11} className="text-zinc-600" />
            </a>
            <a
              href="https://github.com/Arkaseus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-lg hover:border-zinc-500 hover:text-zinc-50 transition-all duration-200"
            >
              <Github size={14} />
              GitHub
              <ExternalLink size={11} className="text-zinc-600" />
            </a>
          </div>
        </FadeUp>

        {/* bottom bar */}
        <div className="mt-20 pt-8 border-t border-zinc-800 border-opacity-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-zinc-600 text-xs">
            © {year} Akash Yadav · Prayagraj, India
          </span>
          <div className="flex items-center gap-6">
            {[
              ["https://github.com/Arkaseus", "GitHub"],
              ["https://www.linkedin.com/in/akash-yadav-builds", "LinkedIn"],
              ["mailto:akashyadavbca@gmail.com", "Email"],
            ].map(([href, label]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-400 transition-colors text-xs"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <style>{GLOBAL_CSS}</style>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
      </main>
      <Contact />
    </div>
  );
}
