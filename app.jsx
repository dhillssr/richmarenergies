const { useState, useEffect, useRef } = React;
const { motion, useScroll, useTransform, useInView, AnimatePresence } = window.Motion || window.FramerMotion || {};

// Lucide icon helper — Lucide UMD exposes window.lucide.icons
const Icon = ({ name, className = "", strokeWidth = 1.5, size = 24 }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const iconSet = window.lucide && window.lucide.icons;
    if (!iconSet) return;
    const key = name
      .replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
    const IconCmp = iconSet[key] || iconSet[name];
    if (IconCmp) {
      ref.current.innerHTML = "";
      const svg = IconCmp.toSvg
        ? IconCmp.toSvg({ "stroke-width": strokeWidth, width: size, height: size })
        : null;
      if (svg) ref.current.innerHTML = svg;
    }
  }, [name, strokeWidth, size]);
  return <span ref={ref} className={`inline-flex ${className}`} aria-hidden="true" />;
};

// Reveal-on-scroll wrapper
const Reveal = ({ children, delay = 0, y = 24, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView ? useInView(ref, { once: true, margin: "-80px" }) : true;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ───────────────────────── NAV ─────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Services", "#services"],
    ["The Difference", "#difference"],
    ["Process", "#process"],
    ["Contact", "#contact"],
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "glass" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-md bg-amber-500 text-charcoal-950">
            <Icon name="zap" size={18} strokeWidth={2.5} />
          </span>
          <span className="font-bold tracking-tight text-[15px]">
            VOLTLINE<span className="text-amber-500">.</span>
          </span>
          <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 rounded-sm border hairline text-[10px] font-mono uppercase tracking-widest text-charcoal-500">
            Master Electric
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-[13.5px] text-zinc-300 hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+15555550199" className="hidden lg:flex items-center gap-2 text-[13px] text-zinc-300 hover:text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="font-mono">24/7 · (555) 555-0199</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-amber-500 text-charcoal-950 text-[13px] font-semibold hover:bg-amber-400 transition-colors"
          >
            Request Quote
            <Icon name="arrow-right" size={14} strokeWidth={2.5} />
          </a>
          <button
            className="md:hidden p-2 -mr-2 text-zinc-300"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <Icon name={open ? "x" : "menu"} size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden glass border-t hairline">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="text-zinc-200 py-1.5">
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// ───────────────────────── HERO ─────────────────────────
const Hero = () => (
  <section id="top" className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
    {/* bg grid + radial */}
    <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
    <div
      className="absolute -top-32 right-[-10%] w-[680px] h-[680px] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(closest-side, rgba(245,158,11,0.18), rgba(245,158,11,0) 70%)",
      }}
    />

    <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
      {/* eyebrow */}
      <Reveal>
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Licensed · Bonded · Insured
          </span>
          <span className="text-charcoal-600">/</span>
          <span>EST. 2003</span>
          <span className="text-charcoal-600">/</span>
          <span>License #ME-44219</span>
        </div>
      </Reveal>

      <div className="mt-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <h1 className="text-[44px] sm:text-6xl lg:text-[88px] leading-[0.95] font-extrabold tracking-tight text-balance">
              Expert
              <br />
              electrical<br />
              <span className="relative inline-block">
                <span className="text-amber-500">solutions.</span>
                <svg
                  className="absolute -bottom-3 left-0 w-full h-3"
                  viewBox="0 0 240 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 L60 4 L80 9 L130 3 L170 8 L210 4 L238 7"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-zinc-400 text-pretty">
              Master-electrician-led service for homes, businesses, and complex
              systems. Code-correct, on-time, and engineered to outlast the
              warranty.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-amber-500 text-charcoal-950 font-semibold text-[14px] hover:bg-amber-400 transition-all amber-glow"
              >
                Request a quote
                <Icon name="arrow-up-right" size={16} strokeWidth={2.5} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border hairline text-zinc-200 hover:bg-charcoal-850 text-[14px] transition-colors"
              >
                <Icon name="play" size={13} strokeWidth={2.5} />
                See our work
              </a>
              <div className="flex items-center gap-2 ml-2 text-[12.5px] text-zinc-500 font-mono">
                <Icon name="shield-check" size={14} strokeWidth={1.75} />
                Avg. response · 47 min
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hero image card */}
        <div className="lg:col-span-5">
          <Reveal delay={0.2} y={32}>
            <div className="relative">
              <div className="absolute -inset-px bg-gradient-to-b from-amber-500/30 via-amber-500/0 to-amber-500/0 rounded-2xl blur-sm" />
              <div className="relative rounded-2xl overflow-hidden border hairline bg-charcoal-900">
                <img
                  src="https://images.unsplash.com/photo-1565608438257-fac3c27beb36?w=1200&q=80&auto=format&fit=crop"
                  alt="Modern electrical panel installation"
                  className="w-full h-[460px] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/10 to-transparent" />

                {/* Stat overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-amber-500/90">
                      Project · 0428
                    </div>
                    <div className="mt-1 text-white text-[15px] font-semibold">
                      400A service upgrade · Heritage District
                    </div>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-md bg-charcoal-950/70 backdrop-blur border hairline text-[11px] font-mono">
                    <span className="text-emerald-400">●</span> Energized
                  </div>
                </div>
              </div>

              {/* Floating credentials card */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-6 -bottom-8 hidden sm:block bg-charcoal-850 border hairline rounded-xl p-4 w-[230px] shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center">
                    <Icon name="badge-check" size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-[12px] font-mono text-zinc-500 uppercase">Master Cert.</div>
                    <div className="text-[13px] font-semibold text-white">Class A · NEC 2023</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t hairline grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-[11px] text-zinc-500 font-mono">YRS</div>
                    <div className="text-white font-bold num-tab">22</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-500 font-mono">JOBS</div>
                    <div className="text-white font-bold num-tab">3.4k</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-500 font-mono">★</div>
                    <div className="text-amber-500 font-bold num-tab">4.9</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>

    {/* Marquee credentials strip */}
    <div className="relative mt-20 lg:mt-28 border-y hairline overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap py-4 text-[12px] font-mono uppercase tracking-[0.18em] text-zinc-500">
        {Array.from({ length: 2 }).map((_, dup) => (
          <div key={dup} className="flex items-center gap-10 pr-10">
            {[
              "NECA Member",
              "IBEW Local 134",
              "OSHA 30 Certified",
              "EVITP EV Charger Installer",
              "Generac Authorized Dealer",
              "NEC 2023 Compliant",
              "Tesla Powerwall Certified",
              "BBB A+ Accredited",
            ].map((c) => (
              <span key={c + dup} className="flex items-center gap-3">
                <Icon name="zap" size={11} strokeWidth={2} className="text-amber-500" />
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ───────────────────────── SERVICES ─────────────────────────
const services = [
  {
    icon: "home",
    code: "01 / RES",
    title: "Residential",
    blurb:
      "Whole-home rewires, panel upgrades, smart lighting, EV chargers, and code-correct renovations.",
    img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80&auto=format&fit=crop",
    points: ["Service upgrades 100A–400A", "Smart panels & sub-panels", "EV charger installation"],
  },
  {
    icon: "building-2",
    code: "02 / COM",
    title: "Commercial",
    blurb:
      "Fit-outs, retrofits, and tenant improvements with phased schedules to keep your business open.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
    points: ["Office & retail fit-outs", "3-phase power & metering", "Lighting controls (DALI/0-10V)"],
  },
  {
    icon: "zap",
    code: "03 / SPC",
    title: "Specialized Systems",
    blurb:
      "Backup generators, solar tie-ins, battery storage, and high-density data closets done right.",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80&auto=format&fit=crop",
    points: ["Standby generators", "Solar + battery storage", "Low-voltage & data"],
  },
  {
    icon: "siren",
    code: "04 / 24H",
    title: "Emergency",
    blurb:
      "Storm damage, dead panels, tripping breakers — a master electrician answers, day or night.",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80&auto=format&fit=crop",
    points: ["24/7 dispatch", "On-site within 60 min*", "Temporary power restoration"],
  },
];

const Services = () => (
  <section id="services" className="relative py-24 lg:py-32 noise">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div>
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-500 mb-3">
              § 02 — Core Services
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-balance max-w-2xl leading-[1.02]">
              Four disciplines.<br />
              <span className="text-zinc-500">One master.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="text-zinc-400 max-w-md text-[15px] leading-relaxed">
            Every job — from a flickering kitchen light to a 600-amp commercial
            service — is scoped, executed, and signed off by a Master
            Electrician. No middle-men, no apprentices left to guess.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07}>
            <article className="group relative rounded-2xl border hairline bg-charcoal-900 hover:bg-charcoal-850 transition-colors overflow-hidden h-full">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-[10.5px] uppercase tracking-widest text-zinc-400">
                  {s.code}
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-md bg-charcoal-950/80 border hairline flex items-center justify-center text-amber-500">
                  <Icon name={s.icon} size={17} strokeWidth={1.75} />
                </div>
              </div>
              <div className="p-6 lg:p-7">
                <h3 className="text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[14.5px] text-zinc-400 leading-relaxed">{s.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-[13.5px] text-zinc-300">
                      <span className="w-1 h-1 rounded-full bg-amber-500" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t hairline flex items-center justify-between">
                  <span className="text-[12px] font-mono uppercase tracking-widest text-zinc-500">
                    Free estimate
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-[13px] text-zinc-200 group-hover:text-amber-500 transition-colors"
                  >
                    Get a quote
                    <Icon name="arrow-up-right" size={14} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ───────────────────────── DIFFERENCE ─────────────────────────
const stats = [
  { value: "22+", label: "Years on the wire" },
  { value: "3.4k", label: "Projects energized" },
  { value: "<60m", label: "Avg. emergency response" },
  { value: "0", label: "Open code violations" },
];

const credentials = [
  { icon: "award", title: "Master Electrician — Class A", sub: "License #ME-44219, NEC 2023" },
  { icon: "shield-check", title: "Bonded · Insured · Permitted", sub: "$2M general liability coverage" },
  { icon: "graduation-cap", title: "Apprenticeship-trained crew", sub: "IBEW Local 134, ongoing CE" },
  { icon: "file-check-2", title: "Inspection pass-rate · 99.4%", sub: "First-time pass on permit close-outs" },
];

const Difference = () => (
  <section id="difference" className="relative py-24 lg:py-32 bg-charcoal-900 border-y hairline">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-500 mb-3">
              § 03 — The Master Difference
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl lg:text-[56px] font-extrabold tracking-tight leading-[1.02] text-balance">
              Twenty-two years.<br />
              One pair of hands<br />
              <span className="text-amber-500">on every drawing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-zinc-400 leading-relaxed text-pretty max-w-md">
              Marcus Avery has held a Master Electrician license since 2009. He
              reviews every load calc, walks every rough-in, and is the name on
              every permit. That's not marketing — it's the job.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex items-center gap-4 p-4 rounded-xl border hairline bg-charcoal-850">
              <div
                className="w-14 h-14 rounded-full bg-cover bg-center border hairline"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop')",
                }}
              />
              <div className="flex-1">
                <div className="text-white font-semibold text-[14px]">Marcus Avery</div>
                <div className="text-[12.5px] text-zinc-500 font-mono">Master Electrician · Founder</div>
              </div>
              <a
                href="#contact"
                className="text-[12.5px] font-mono uppercase tracking-widest text-amber-500 hover:text-amber-400"
              >
                Book →
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-px bg-charcoal-700 rounded-2xl overflow-hidden border hairline">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="bg-charcoal-900 p-6 lg:p-8 h-full">
                  <div className="text-4xl lg:text-6xl font-extrabold tracking-tight num-tab text-white">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[12.5px] font-mono uppercase tracking-widest text-zinc-500">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Credentials list */}
          <div className="mt-6 rounded-2xl border hairline bg-charcoal-950 divide-y divide-charcoal-700/60">
            {credentials.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="flex items-center gap-5 p-5 lg:p-6">
                  <div className="w-11 h-11 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={18} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-[15px] truncate">{c.title}</div>
                    <div className="text-[13px] text-zinc-500">{c.sub}</div>
                  </div>
                  <Icon name="arrow-up-right" size={15} strokeWidth={1.75} className="text-zinc-600" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────────── PROCESS ─────────────────────────
const steps = [
  { n: "01", t: "Site walk", d: "Free in-person assessment. We document existing conditions and listen to what you actually need." },
  { n: "02", t: "Scope & quote", d: "Itemized, fixed-fee proposal — no vague hourly traps. Permits and inspections itemized." },
  { n: "03", t: "Execute", d: "Master-led crew, clean job site, daily progress notes, code-correct rough-in and trim-out." },
  { n: "04", t: "Sign-off", d: "Inspection passes the first time. You get an as-built panel schedule and a 5-year workmanship warranty." },
];

const Process = () => (
  <section id="process" className="relative py-24 lg:py-32">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div>
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-500 mb-3">
              § 04 — How we work
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.02]">
              A four-step<br />
              <span className="text-zinc-500">job ticket.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal-700 rounded-2xl overflow-hidden border hairline">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.07}>
            <div className="bg-charcoal-950 p-7 lg:p-8 h-full relative group hover:bg-charcoal-900 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-amber-500">
                  Step {s.n}
                </span>
                <span className="w-7 h-7 rounded-full border hairline flex items-center justify-center text-zinc-500 group-hover:text-amber-500 transition-colors">
                  <Icon name="arrow-down-right" size={13} strokeWidth={2} />
                </span>
              </div>
              <h3 className="mt-8 text-xl font-bold text-white">{s.t}</h3>
              <p className="mt-2 text-[14px] text-zinc-400 leading-relaxed">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ───────────────────────── CONTACT ─────────────────────────
const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Residential",
    urgency: "Within a week",
    message: "",
  });

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Formspree-compatible: replace YOUR_FORM_ID with real endpoint
    // const endpoint = "https://formspree.io/f/YOUR_FORM_ID";
    // try {
    //   await fetch(endpoint, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json", Accept: "application/json" },
    //     body: JSON.stringify(form),
    //   });
    // } catch (_) {}
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(245,158,11,0.18), rgba(245,158,11,0) 70%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="rounded-3xl border hairline bg-charcoal-900 overflow-hidden">
          <div className="grid lg:grid-cols-12">
            {/* Left side */}
            <div className="lg:col-span-5 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r hairline relative">
              <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
              <div className="relative">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-500 mb-3">
                  § 05 — Request a quote
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.02] text-balance">
                  Let's get<br />
                  <span className="text-amber-500">your project</span><br />
                  energized.
                </h2>
                <p className="mt-5 text-zinc-400 max-w-sm leading-relaxed">
                  Tell us what you need. A master electrician — not a call center — will reach out within one business hour.
                </p>

                <div className="mt-10 space-y-5">
                  <a href="tel:+15555550199" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-lg bg-charcoal-850 border hairline flex items-center justify-center text-amber-500">
                      <Icon name="phone" size={17} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-[12px] font-mono uppercase tracking-widest text-zinc-500">24/7 dispatch</div>
                      <div className="text-white font-semibold group-hover:text-amber-500 transition-colors">
                        (555) 555-0199
                      </div>
                    </div>
                  </a>
                  <a href="mailto:hello@voltline.co" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-lg bg-charcoal-850 border hairline flex items-center justify-center text-amber-500">
                      <Icon name="mail" size={17} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-[12px] font-mono uppercase tracking-widest text-zinc-500">Email</div>
                      <div className="text-white font-semibold group-hover:text-amber-500 transition-colors">
                        hello@voltline.co
                      </div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-charcoal-850 border hairline flex items-center justify-center text-amber-500">
                      <Icon name="map-pin" size={17} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-[12px] font-mono uppercase tracking-widest text-zinc-500">Service area</div>
                      <div className="text-white font-semibold">Greater Metro · 40-mile radius</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-7 p-8 lg:p-12">
              {submitted ? (
                <Reveal>
                  <div className="h-full flex flex-col items-start justify-center min-h-[460px]">
                    <div className="w-14 h-14 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 flex items-center justify-center">
                      <Icon name="check" size={26} strokeWidth={2.5} />
                    </div>
                    <h3 className="mt-6 text-3xl font-bold tracking-tight">Request received.</h3>
                    <p className="mt-3 text-zinc-400 max-w-md">
                      Thanks, {form.name || "there"}. A master electrician will be in touch within one business hour. For active emergencies, please call <a className="text-amber-500" href="tel:+15555550199">(555) 555-0199</a>.
                    </p>
                  </div>
                </Reveal>
              ) : (
                <form
                  onSubmit={onSubmit}
                  action="https://formspree.io/f/YOUR_FORM_ID"
                  method="POST"
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" required>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={onChange("name")}
                        placeholder="Jane Doe"
                        className="form-input"
                      />
                    </Field>
                    <Field label="Phone" required>
                      <input
                        required
                        name="phone"
                        value={form.phone}
                        onChange={onChange("phone")}
                        placeholder="(555) 555-0123"
                        className="form-input"
                      />
                    </Field>
                  </div>

                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange("email")}
                      placeholder="you@example.com"
                      className="form-input"
                    />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Service type">
                      <SegSelect
                        name="serviceType"
                        value={form.serviceType}
                        onChange={(v) => setForm((f) => ({ ...f, serviceType: v }))}
                        options={["Residential", "Commercial", "Specialized", "Emergency"]}
                      />
                    </Field>
                    <Field label="Urgency">
                      <SegSelect
                        name="urgency"
                        value={form.urgency}
                        onChange={(v) => setForm((f) => ({ ...f, urgency: v }))}
                        options={["ASAP", "This week", "Within a week", "Planning"]}
                      />
                    </Field>
                  </div>

                  <Field label="Tell us about the job">
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={onChange("message")}
                      placeholder="Panel upgrade, square footage, timing, breaker behavior, etc."
                      className="form-input resize-none"
                    />
                  </Field>

                  <div className="pt-2 flex flex-wrap items-center gap-4 justify-between">
                    <p className="text-[12px] text-zinc-500 font-mono">
                      <Icon name="lock" size={12} strokeWidth={2} className="inline -mt-0.5 mr-1" />
                      Encrypted via Formspree · Never shared.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-amber-500 text-charcoal-950 font-semibold text-[14px] hover:bg-amber-400 transition-all disabled:opacity-60 amber-glow"
                    >
                      {submitting ? "Sending…" : "Send request"}
                      <Icon name="arrow-right" size={15} strokeWidth={2.5} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, children, required }) => (
  <label className="block">
    <div className="text-[11.5px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2">
      {label} {required && <span className="text-amber-500">*</span>}
    </div>
    {children}
  </label>
);

const SegSelect = ({ value, onChange, options, name }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-charcoal-950 border hairline rounded-md">
    {options.map((o) => (
      <button
        key={o}
        type="button"
        onClick={() => onChange(o)}
        className={`px-2 py-2 rounded text-[12.5px] transition-colors ${
          value === o
            ? "bg-amber-500 text-charcoal-950 font-semibold"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        {o}
      </button>
    ))}
    <input type="hidden" name={name} value={value} />
  </div>
);

// ───────────────────────── FOOTER ─────────────────────────
const Footer = () => (
  <footer className="relative border-t hairline pt-16 pb-10">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-md bg-amber-500 text-charcoal-950">
              <Icon name="zap" size={18} strokeWidth={2.5} />
            </span>
            <span className="font-bold tracking-tight text-[15px]">
              VOLTLINE<span className="text-amber-500">.</span>
            </span>
          </div>
          <p className="mt-4 text-[14px] text-zinc-500 max-w-sm leading-relaxed">
            Master-electrician-led service for homes, businesses, and complex systems across the Greater Metro region.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-4">Services</div>
          <ul className="space-y-2 text-[14px] text-zinc-300">
            <li><a href="#services" className="hover:text-amber-500">Residential</a></li>
            <li><a href="#services" className="hover:text-amber-500">Commercial</a></li>
            <li><a href="#services" className="hover:text-amber-500">Specialized</a></li>
            <li><a href="#services" className="hover:text-amber-500">Emergency · 24/7</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-4">Contact</div>
          <ul className="space-y-2 text-[14px] text-zinc-300">
            <li><a href="tel:+15555550199" className="hover:text-amber-500">(555) 555-0199</a></li>
            <li><a href="mailto:hello@voltline.co" className="hover:text-amber-500">hello@voltline.co</a></li>
            <li className="text-zinc-500">Mon–Fri 7a–6p · 24/7 emergency line</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] font-mono text-zinc-500 uppercase tracking-widest">
        <div>© 2026 Voltline Electric Co. · Lic. ME-44219</div>
        <div className="flex items-center gap-4">
          <span>NEC 2023</span>
          <span>·</span>
          <span>Bonded · Insured</span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" /> Dispatch online
          </span>
        </div>
      </div>
    </div>
  </footer>
);

// ───────────────────────── ROOT ─────────────────────────
const App = () => (
  <>
    <style>{`
      .form-input {
        width: 100%;
        background: #0a0a0b;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 8px;
        padding: 12px 14px;
        color: #f4f4f5;
        font-size: 14px;
        outline: none;
        transition: border-color .15s, box-shadow .15s;
      }
      .form-input::placeholder { color: #52525b; }
      .form-input:focus {
        border-color: rgba(245,158,11,0.6);
        box-shadow: 0 0 0 3px rgba(245,158,11,0.12);
      }
      textarea.form-input { font-family: inherit; }
    `}</style>
    <Nav />
    <main>
      <Hero />
      <Services />
      <Difference />
      <Process />
      <Contact />
    </main>
    <Footer />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
