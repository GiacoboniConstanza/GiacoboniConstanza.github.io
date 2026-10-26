import { useEffect, useState, type ReactNode } from 'react'
import { CV_FILES, LINKS, NAME, T, type Lang } from './content'
import { Hero } from './Hero'
import { useInView, useLang } from './hooks'

const SEC = ['profile', 'stack', 'experience', 'cases', 'projects', 'education', 'contact'] as const
const IDS: Record<(typeof SEC)[number], string> = { profile: 'perfil', stack: 'stack', experience: 'experiencia', cases: 'casos', projects: 'proyectos', education: 'formacion', contact: 'contacto' }

export default function App() {
  const [lang, setLang] = useLang()
  const t = T[lang]
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const f = () => setScrolled(scrollY > 8); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])

  return (
    <div className="grid-bg min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">{lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
      <header className={`sticky top-0 z-40 transition-colors duration-300 ${scrolled ? 'border-b border-[#1c2836] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md' : 'border-b border-transparent'}`}>
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
          <a href="#top" className="font-mono text-sm font-bold text-white">cg<span className="acc">@</span>deploy</a>
          <nav aria-label={lang === 'es' ? 'Secciones' : 'Sections'} className="ml-4 hidden gap-4 font-mono text-[12px] text-slate-400 lg:flex">
            {SEC.filter((k) => k !== 'education').map((k) => <a key={k} href={`#${IDS[k]}`} className="transition hover:text-white">/{t.nav[k]}</a>)}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <button type="button" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={lang === 'es' ? 'View in English' : 'Ver en español'}
              className="rounded-full border border-[#1c2836] bg-[#0b121c] px-3 py-1.5 font-mono text-[11px] uppercase text-slate-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--acc)]">{lang === 'es' ? 'en' : 'es'}</button>
          </div>
        </div>
      </header>

      <main id="main">
        <Hero lang={lang} setLang={setLang} />
        <div className="mx-auto max-w-6xl px-5">
          <Profile lang={lang} />
          <Stack lang={lang} />
          <Experience lang={lang} />
          <Cases lang={lang} />
          <Projects lang={lang} />
          <Education lang={lang} />
          <Contact lang={lang} />
        </div>
      </main>

      <footer className="border-t border-[#1c2836]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 font-mono text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {NAME} · {t.footer}</span>
          <a href="#top" className="transition hover:text-white">↑ {lang === 'es' ? 'volver arriba' : 'back to top'}</a>
        </div>
      </footer>
    </div>
  )
}

/* ---------- piezas comunes ---------- */
function Section({ id, title, cmd, children }: { id: string; title: string; cmd?: string; children: ReactNode }) {
  const [ref, seen] = useInView<HTMLElement>(0.01)
  return (
    <section id={id} ref={ref} aria-labelledby={`${id}-h`} className={`rv grid gap-6 border-t border-[#1c2836] py-14 lg:grid-cols-[210px_1fr] lg:gap-10 lg:py-16 ${seen ? 'in' : ''}`}>
      <div>
        <h2 id={`${id}-h`} className="font-mono text-sm font-bold acc lg:sticky lg:top-24"><span className="text-slate-600">// </span>{title}</h2>
        {cmd && <p className="mt-1.5 font-mono text-[11px] text-slate-600 lg:sticky lg:top-31">$ {cmd}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md border border-[#1c2836] bg-[#0b121c] px-2 py-0.5 font-mono text-[11.5px] text-slate-300">{children}</span>
)
const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-[#1c2836] bg-[#0a111a]/85 ${className}`}>{children}</div>
)
function WinBar({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#1c2836] px-4 py-2.5">
      <span className="size-2.5 rounded-full bg-[#f2777a]" aria-hidden="true" /><span className="size-2.5 rounded-full bg-[#f2c48d]" aria-hidden="true" /><span className="size-2.5 rounded-full bg-[#2dd4bf]" aria-hidden="true" />
      <span className="ml-2 truncate font-mono text-[11px] text-slate-500">{title}</span>
      {right && <span className="ml-auto font-mono text-[11px]">{right}</span>}
    </div>
  )
}

/* ---------- secciones ---------- */
function Profile({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <Section id="perfil" title={t.profileTitle} cmd="cat README.md">
      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <div className="max-w-3xl space-y-4">
          <p className="text-lg leading-relaxed text-slate-200 sm:text-xl">{t.profile[0]}</p>
          <p className="text-[15px] leading-relaxed text-slate-400">{t.profile[1]}</p>
        </div>
        <Card className="h-fit overflow-hidden">
          <WinBar title="profile.yml" />
          <dl className="px-4 py-3 font-mono text-[12.5px] leading-[1.9]">
            {t.facts.map(([k, v]) => (
              <div key={k} className="flex gap-2"><dt className="shrink-0 acc2">{k}:</dt><dd className="text-slate-300">{v}</dd></div>
            ))}
          </dl>
        </Card>
      </div>
    </Section>
  )
}

function Stack({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <Section id="stack" title={t.stackTitle} cmd="ls ./stack">
      <div className="grid gap-3 sm:grid-cols-2">
        {t.stack.map((g) => (
          <Card key={g.k} className="p-4 transition duration-300 hover:border-[color-mix(in_srgb,var(--acc)_55%,#1c2836)]">
            <h3 className="font-mono text-[12px] text-slate-500"><span className="acc">{g.k}/</span> <span className="text-slate-300">{g.label}</span></h3>
            <div className="mt-3 flex flex-wrap gap-1.5">{g.items.map((i) => <Chip key={i}>{i}</Chip>)}</div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Experience({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <Section id="experiencia" title={t.expTitle} cmd="git log --graph --decorate">
      <ol className="relative">
        {t.jobs.map((j, i) => (
          <li key={j.hash} className="relative pb-10 pl-8 last:pb-0">
            {i < t.jobs.length - 1 && <span aria-hidden="true" className="absolute left-[7px] top-5 bottom-0 w-px bg-[linear-gradient(var(--acc),#1c2836)] opacity-60" />}
            <span aria-hidden="true" className="absolute left-0 top-[5px] grid size-[15px] place-items-center rounded-full border-2 border-[var(--acc)] bg-[var(--bg)]"><span className="size-[5px] rounded-full bg-[var(--acc)]" /></span>
            <p className="font-mono text-[12px]">
              <span className="text-[#f2c48d]">commit {j.hash}</span>{' '}
              <span className="text-slate-500">(</span><span className={j.ref.startsWith('HEAD') ? 'acc' : 'acc2'}>{j.ref}</span><span className="text-slate-500">)</span>
            </p>
            <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-bold text-white">{j.role}</h3>
              <span className="rounded border border-[#1c2836] bg-[#0b121c] px-2 py-0.5 font-mono text-[11.5px] acc2">{j.period}</span>
            </div>
            <p className="mt-0.5 text-[14.5px] text-slate-400">{j.org}</p>
            {j.groups.map((g, gi) => (
              <div key={gi} className="mt-3">
                {g.label && <p className="mb-1.5 font-mono text-[11.5px] text-slate-500"><span className="acc">&gt;</span> {g.label}</p>}
                <ul className="space-y-1.5">
                  {g.items.map((b) => (
                    <li key={b} className="relative pl-5 text-[14.5px] leading-relaxed text-slate-300 before:absolute before:left-0 before:top-0 before:font-mono before:text-[var(--acc)] before:content-['+']">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Cases({ lang }: { lang: Lang }) {
  const t = T[lang]
  return (
    <Section id="casos" title={t.casesTitle} cmd="ls ./casos">
      <div className="grid gap-4 md:grid-cols-2">
        {t.cases.map((c, i) => (
          <Card key={c.k} className="group flex flex-col p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--acc)_60%,#1c2836)]">
            <p className="font-mono text-[11px] text-slate-500"><span style={{ color: 'var(--ok)' }}>✓</span> job_{String(i + 1).padStart(2, '0')} · {c.k}</p>
            <h3 className="mt-2 text-lg font-bold text-white">{c.title}</h3>
            <div className="mt-2 space-y-2 text-[14.5px] leading-relaxed text-slate-400">{c.body.map((p) => <p key={p}>{p}</p>)}</div>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">{c.tags.map((x) => <Chip key={x}>{x}</Chip>)}</div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Projects({ lang }: { lang: Lang }) {
  const p = T[lang].project
  return (
    <Section id="proyectos" title={T[lang].projTitle} cmd="open a-medias">
      <Card className="overflow-hidden">
        <WinBar title="a-medias-delta.vercel.app" right={<span style={{ color: 'var(--ok)' }}>● live</span>} />
        <div className="grid gap-6 p-5 md:grid-cols-[1fr_auto] md:items-end sm:p-6">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white">{p.name} <span className="font-mono text-sm font-normal text-slate-500">· PWA</span></h3>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-300">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <a href={LINKS.aMedias} target="_blank" rel="noopener noreferrer" className="bg-acc rounded-md px-3.5 py-2 font-mono text-[12.5px] font-bold text-[#04110f] transition hover:brightness-110">{p.demo} ↗</a>
            <span className="font-mono text-[11px] text-slate-500">🔒 {p.repo}</span>
          </div>
        </div>
      </Card>
    </Section>
  )
}

function Education({ lang }: { lang: Lang }) {
  const t = T[lang]
  const Row = ({ a, b, y }: { a: string; b: string; y: string }) => (
    <li className="grid grid-cols-[86px_1fr] gap-3 py-2.5">
      <span className="font-mono text-[11.5px] leading-6 acc2">{y}</span>
      <span><span className="block text-[14.5px] font-semibold leading-6 text-slate-200">{a}</span>{b && <span className="block text-[13.5px] text-slate-500">{b}</span>}</span>
    </li>
  )
  return (
    <Section id="formacion" title={t.eduTitle} cmd="cat formacion.md">
      <div className="grid gap-8 xl:grid-cols-2">
        <div>
          <ul className="divide-y divide-[#1c2836]">{t.edu.map(([a, b, y]) => <Row key={a} a={a} b={b} y={y} />)}</ul>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="font-mono text-[12px] acc"><span className="text-slate-600">## </span>{t.coursesTitle}</h3>
            <ul className="mt-1 divide-y divide-[#1c2836]">{t.courses.map(([a, b, y]) => <Row key={a} a={a} b={b} y={y} />)}</ul>
          </div>
          <div>
            <h3 className="font-mono text-[12px] acc"><span className="text-slate-600">## </span>{t.langsTitle}</h3>
            <ul className="mt-2 space-y-1.5">{t.langs.map(([k, v]) => <li key={k} className="text-[14.5px] text-slate-300"><span className="font-semibold text-slate-100">{k}:</span> {v}</li>)}</ul>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Contact({ lang }: { lang: Lang }) {
  const t = T[lang]
  const rows: [string, string, string][] = [
    ['mail', LINKS.email, `mailto:${LINKS.email}`],
    ['linkedin', LINKS.linkedin.replace('https://www.', ''), LINKS.linkedin],
    ['github', LINKS.github.replace('https://', ''), LINKS.github],
  ]
  return (
    <Section id="contacto" title={t.contactTitle} cmd="contact --all">
      <p className="max-w-2xl text-lg text-slate-300">{t.contactLead}</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <Card className="overflow-hidden">
          <WinBar title="contact.sh" />
          <ul className="px-4 py-3 font-mono text-[13px] leading-[2]">
            {rows.map(([k, v, href]) => (
              <li key={k} className="flex min-w-0 gap-3">
                <span className="w-20 shrink-0 text-slate-500">{k}</span>
                <a href={href} {...(k === 'mail' ? {} : { target: '_blank', rel: 'noopener noreferrer' })} className="truncate acc2 underline decoration-dotted underline-offset-4 transition hover:text-white">{v}</a>
              </li>
            ))}
          </ul>
        </Card>
        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:justify-center">
          <a href={CV_FILES.es} download className="bg-acc rounded-md px-4 py-2.5 text-center font-mono text-[12.5px] font-bold text-[#04110f] transition hover:brightness-110">↓ {t.cvEs} <span className="font-normal opacity-70">· PDF</span></a>
          <a href={CV_FILES.en} download className="rounded-md border border-[#1c2836] bg-[#0b121c] px-4 py-2.5 text-center font-mono text-[12.5px] text-slate-200 transition hover:border-[var(--acc)]">↓ {t.cvEn} <span className="opacity-60">· PDF</span></a>
        </div>
      </div>
    </Section>
  )
}
