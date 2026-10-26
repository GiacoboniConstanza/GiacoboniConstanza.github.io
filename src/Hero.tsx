import { useCallback, useEffect, useRef, useState } from 'react'
import { CV_FILES, LINKS, NAME, STACK_SHORT, T, type Lang } from './content'
import { useReducedMotion } from './hooks'
import { Pipeline } from './Pipeline'
import { script, type StageId, type Status } from './script'

type Line =
  | { id: number; k: 'cmd'; text: string }
  | { id: number; k: 'out'; text: string; tone?: 'dim' | 'ok' | 'acc' | 'err' }
  | { id: number; k: 'link'; text: string; href: string }
  | { id: number; k: 'pipe'; stage: StageId; label: string; jobs: string }

const IDLE: Record<StageId, Status> = { branch: 'idle', mr: 'idle', lint: 'idle', analyze: 'idle', test: 'idle', build: 'idle', deploy: 'idle', prod: 'idle' }

const UI = {
  es: { waiting: 'esperando deploy…', replay: 'repetir', skip: 'saltar', help: 'Comandos: whoami · stack · contact · cv · replay · lang en|es · clear', nf: 'comando no encontrado', hint: 'escribir un comando o "help"', sections: 'Secciones', term: 'Terminal: flujo de trabajo git y pipeline de CI/CD', cmd: 'Comando', profile: 'perfil', highlights: 'casos_destacados', ill: '// flujo ilustrativo basado en el trabajo diario: GitLab, merge requests y CI/CD' },
  en: { waiting: 'waiting for deploy…', replay: 'replay', skip: 'skip', help: 'Commands: whoami · stack · contact · cv · replay · lang en|es · clear', nf: 'command not found', hint: 'type a command or "help"', sections: 'Sections', term: 'Terminal: git workflow and CI/CD pipeline', cmd: 'Command', profile: 'profile', highlights: 'case_studies', ill: '// illustrative flow based on daily work: GitLab, merge requests and CI/CD' },
}

let uid = 0
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function Hero({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const reduced = useReducedMotion()
  const t = T[lang], ui = UI[lang]

  const [lines, setLines] = useState<Line[]>([])
  const [typing, setTyping] = useState<string | null>(null)
  const [st, setSt] = useState<Record<StageId, Status>>(IDLE)
  const [done, setDone] = useState(false)
  const [input, setInput] = useState('')
  const run = useRef(0)
  const scroller = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const finalState = useCallback((l: Lang) => {
    const out: Line[] = []
    for (const ev of script(l)) {
      if (ev.k === 'cmd') out.push({ id: ++uid, k: 'cmd', text: ev.text })
      else if (ev.k === 'out') out.push({ id: ++uid, k: 'out', text: ev.text, tone: ev.tone })
      else if (ev.k === 'pipe') out.push({ id: ++uid, k: 'pipe', stage: ev.id, label: ev.label, jobs: ev.jobs })
    }
    setLines(out); setTyping(null)
    setSt(Object.fromEntries(Object.keys(IDLE).map((k) => [k, 'ok'])) as Record<StageId, Status>)
    setDone(true)
  }, [])

  const play = useCallback(async (l: Lang) => {
    const my = ++run.current
    const alive = () => run.current === my
    setLines([]); setSt(IDLE); setDone(false); setTyping(null)
    await sleep(350)
    for (const ev of script(l)) {
      if (!alive()) return
      if (ev.k === 'cmd') {
        if (ev.stage) setSt((s) => ({ ...s, [ev.stage!]: 'run' }))
        for (let i = 1; i <= ev.text.length; i++) {
          if (!alive()) return
          setTyping(ev.text.slice(0, i))
          await sleep(ev.text.length > 40 ? 11 : 18)
        }
        await sleep(140)
        setTyping(null); setLines((p) => [...p, { id: ++uid, k: 'cmd', text: ev.text }])
        await sleep(120)
      } else if (ev.k === 'out') {
        setLines((p) => [...p, { id: ++uid, k: 'out', text: ev.text, tone: ev.tone }])
        await sleep(ev.wait ?? 160)
      } else if (ev.k === 'stage') {
        setSt((s) => ({ ...s, [ev.id]: ev.status }))
        await sleep(ev.wait ?? 80)
      } else if (ev.k === 'pipe') {
        setSt((s) => ({ ...s, [ev.id]: 'run' }))
        setLines((p) => [...p, { id: ++uid, k: 'pipe', stage: ev.id, label: ev.label, jobs: ev.jobs }])
        await sleep(ev.ms)
        if (!alive()) return
        setSt((s) => ({ ...s, [ev.id]: 'ok' }))
        await sleep(90)
      } else if (ev.k === 'done') {
        setDone(true)
      }
    }
  }, [])

  useEffect(() => { if (reduced) finalState(lang); else play(lang) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight }) }, [lines, typing, done])

  const exec = (raw: string) => {
    const c = raw.trim().toLowerCase(); if (!c) return
    const echo: Line = { id: ++uid, k: 'cmd', text: c }
    const o = (text: string, tone?: 'dim' | 'ok' | 'acc' | 'err'): Line => ({ id: ++uid, k: 'out', text, tone })
    const [cmd, arg] = c.split(/\s+/)
    if (cmd === 'replay') { reduced ? finalState(lang) : play(lang); return }
    if (cmd === 'clear') { setLines([]); return }
    let out: Line[]
    switch (cmd) {
      case 'help': out = [o(ui.help, 'dim')]; break
      case 'whoami': out = [o(NAME, 'acc'), o(t.role), o(t.tagline, 'dim')]; break
      case 'stack': out = Object.entries(STACK_SHORT).map(([g, v]) => o(`${g.padEnd(11)} ${v.join(' · ')}`, 'dim')); break
      case 'contact': out = [
        { id: ++uid, k: 'link', text: `mail      ${LINKS.email}`, href: `mailto:${LINKS.email}` },
        { id: ++uid, k: 'link', text: `linkedin  ${LINKS.linkedin}`, href: LINKS.linkedin },
        { id: ++uid, k: 'link', text: `github    ${LINKS.github}`, href: LINKS.github },
        { id: ++uid, k: 'link', text: `cv        ${CV_FILES[lang].slice(1)}`, href: CV_FILES[lang] }]; break
      case 'cv': out = [
        { id: ++uid, k: 'link', text: `es  ${CV_FILES.es.slice(1)}`, href: CV_FILES.es },
        { id: ++uid, k: 'link', text: `en  ${CV_FILES.en.slice(1)}`, href: CV_FILES.en }]; break
      case 'lang': { const n: Lang = arg === 'en' || arg === 'es' ? arg : lang === 'es' ? 'en' : 'es'; setLang(n); out = [o(`lang → ${n}`, 'ok')]; break }
      default: out = [o(`${ui.nf}: ${cmd}`, 'err')]
    }
    setLines((p) => [...p, echo, ...out])
  }

  const prompt = <><span className="acc">~/app</span><span className="text-slate-500"> ❯ </span></>

  return (
    <>

      <div id="top" className="mx-auto max-w-6xl px-5">
        {/* titular: se revela al terminar el deploy */}
        <section aria-live="polite" className="flex min-h-[318px] flex-col justify-center py-4 sm:min-h-[250px] lg:h-[200px] lg:min-h-0">
          {done ? (
            <div className="reveal grid items-end gap-x-10 gap-y-4 lg:grid-cols-[auto_1fr]">
              <p className="font-mono text-xs lg:col-span-2"><span style={{ color: 'var(--ok)' }}>✓ deployed</span><span className="text-slate-500"> · main · production</span></p>
              <div>
                <h1 className="text-[clamp(2.5rem,6vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-white">Constanza <span className="grad">Giacoboni</span></h1>
                <p className="mt-3 font-mono text-[15px] acc2">{t.role}</p>
              </div>
              <div className="lg:pb-1">
                <p className="max-w-[26rem] text-[14.5px] leading-relaxed text-slate-400">{t.tagline}</p>
                <div className="mt-3.5 flex flex-wrap gap-2 font-mono text-[12px]">
                  <a href={`mailto:${LINKS.email}`} className="bg-acc rounded-md px-3 py-1.5 font-bold text-[#04110f] transition hover:brightness-110">{t.contact} →</a>
                  <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#1c2836] px-3 py-1.5 text-slate-200 transition hover:border-[var(--acc)]">LinkedIn ↗</a>
                  <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#1c2836] px-3 py-1.5 text-slate-200 transition hover:border-[var(--acc)]">GitHub ↗</a>
                </div>
              </div>
            </div>
          ) : (
            <div aria-hidden="true">
              <p className="font-mono text-xs text-slate-500"><span className="acc">◌</span> {ui.waiting}</p>
              <div className="shimmer mt-4 h-14 w-[min(640px,90%)] rounded-lg" />
              <div className="shimmer mt-3 h-4 w-[min(340px,60%)] rounded" />
              <h1 className="sr-only">{NAME} · {t.role}</h1>
            </div>
          )}
        </section>

        <div className="grid gap-5 pb-16 lg:grid-cols-[1.12fr_1fr]">
          {/* terminal */}
          <section aria-label={ui.term} className="win flex h-[430px] flex-col overflow-hidden rounded-xl" onClick={() => done && inputRef.current?.focus()}>
            <div className="flex items-center gap-2 border-b border-[#1c2836] px-4 py-2.5">
              <span className="size-3 rounded-full bg-[#f2777a]" aria-hidden="true" /><span className="size-3 rounded-full bg-[#f2c48d]" aria-hidden="true" /><span className="size-3 rounded-full bg-[#2dd4bf]" aria-hidden="true" />
              <span className="ml-3 font-mono text-[11px] text-slate-500">zsh — ~/app</span>
              <div className="ml-auto flex gap-1.5">
                {!done && <button type="button" onClick={(e) => { e.stopPropagation(); run.current++; finalState(lang) }} className="rounded border border-[#1c2836] px-2 py-0.5 font-mono text-[11px] text-slate-400 hover:text-white">⏭ {ui.skip}</button>}
                <button type="button" onClick={(e) => { e.stopPropagation(); reduced ? finalState(lang) : play(lang) }} className="rounded border border-[#1c2836] px-2 py-0.5 font-mono text-[11px] acc2 hover:border-[var(--acc)]">↻ {ui.replay}</button>
              </div>
            </div>
            <div ref={scroller} className="thin flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-[1.75]">
              {lines.map((l) => {
                if (l.k === 'cmd') return <p key={l.id} className="ln whitespace-pre-wrap break-all">{prompt}<span className="text-white">{l.text}</span></p>
                if (l.k === 'link') return <p key={l.id} className="ln"><a href={l.href} target="_blank" rel="noopener noreferrer" className="acc2 underline decoration-dotted underline-offset-4 hover:text-white">{l.text}</a></p>
                if (l.k === 'pipe') {
                  const s = st[l.stage]
                  return (
                    <p key={l.id} className="ln flex gap-3 whitespace-pre">
                      <span className="w-16 text-slate-300">{l.label}</span>
                      <span className="flex-1 truncate text-slate-500">{l.jobs}</span>
                      {s === 'ok' ? <span style={{ color: 'var(--ok)' }}>✓ passed</span> : <span className="acc2"><span className="inline-block w-3">{reduced ? '…' : <Spinner />}</span> running</span>}
                    </p>
                  )
                }
                const tone = l.tone === 'ok' ? 'text-[var(--ok)]' : l.tone === 'acc' ? 'font-bold acc' : l.tone === 'err' ? 'text-[#f2777a]' : l.tone === 'dim' ? 'text-slate-500' : 'text-slate-300'
                return <p key={l.id} className={`ln whitespace-pre-wrap ${tone}`}>{l.text}</p>
              })}
              {typing !== null && <p className="whitespace-pre-wrap break-all">{prompt}<span className="caret text-white">{typing}</span></p>}
              {done && (
                <form className="flex" onSubmit={(e) => { e.preventDefault(); exec(input); setInput('') }}>
                  <label htmlFor="cmd" className="shrink-0 whitespace-pre">{prompt}</label>
                  <input id="cmd" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off" spellCheck={false} aria-label={ui.cmd}
                    placeholder={ui.hint} className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-slate-600" style={{ caretColor: 'var(--acc)' }} />
                </form>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 border-t border-[#1c2836] px-4 py-2">
              {['whoami', 'stack', 'contact', 'cv', 'help'].map((c) => (
                <button key={c} type="button" disabled={!done} onClick={(e) => { e.stopPropagation(); exec(c) }}
                  className="rounded border border-[#1c2836] px-2 py-0.5 font-mono text-[11px] acc2 transition hover:border-[var(--acc)] disabled:opacity-30">{c}</button>
              ))}
            </div>
          </section>

          {/* diagrama sincronizado */}
          <section aria-label="Pipeline" className="win flex flex-col rounded-xl p-4">
            <div className="mb-2 flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-500">pipeline · develop → main</span>
              <span style={{ color: done ? 'var(--ok)' : 'var(--acc2)' }}>{done ? '● passed' : '● running'}</span>
            </div>
            <div className="flex flex-1 items-center"><Pipeline st={st} reduced={reduced} lang={lang} /></div>
            <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-slate-600">{ui.ill}</p>
          </section>
        </div>

      </div>
    </>
  )
}

function Spinner() {
  const [i, setI] = useState(0)
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % 10), 80); return () => clearInterval(id) }, [])
  return <>{'⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'[i]}</>
}
