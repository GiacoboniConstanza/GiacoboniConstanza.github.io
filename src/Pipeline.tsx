import type { Lang } from './content'
import type { StageId, Status } from './script'

type Node = { id: StageId; x: number; y: number; label: string; sub: string }
const W = 100, H = 58
const NODES: Node[] = [
  { id: 'branch', x: 10, y: 30, label: 'feature', sub: 'git branch' },
  { id: 'mr', x: 140, y: 30, label: 'merge req.', sub: 'code review' },
  { id: 'lint', x: 270, y: 30, label: 'lint', sub: 'phpcs · grumphp' },
  { id: 'analyze', x: 400, y: 30, label: 'PHPStan', sub: 'static analysis' },
  { id: 'test', x: 400, y: 150, label: 'PHPUnit', sub: '+ playwright' },
  { id: 'build', x: 270, y: 150, label: 'Docker', sub: 'compose build' },
  { id: 'deploy', x: 140, y: 150, label: 'deploy', sub: 'staging → prod' },
]
const EDGES: { from: StageId; to: StageId; d: string }[] = [
  { from: 'branch', to: 'mr', d: 'M110 59 L140 59' },
  { from: 'mr', to: 'lint', d: 'M240 59 L270 59' },
  { from: 'lint', to: 'analyze', d: 'M370 59 L400 59' },
  { from: 'analyze', to: 'test', d: 'M450 88 L450 150' },
  { from: 'test', to: 'build', d: 'M400 179 L370 179' },
  { from: 'build', to: 'deploy', d: 'M270 179 L240 179' },
  { from: 'deploy', to: 'prod', d: 'M190 208 L190 268' },
]
const PROD = (() => {
  let x = 26
  return ['PHP · CodeIgniter', 'MariaDB', 'Docker', 'GlitchTip · Uptime Kuma'].map((label) => {
    const w = label.length * 5.8 + 30
    const item = { label, x, w }
    x += w + 8
    return item
  })
})()

function Badge({ x, y, st, reduced }: { x: number; y: number; st: Status; reduced: boolean }) {
  if (st === 'ok') return (
    <g className={reduced ? '' : 'pop-ok'}>
      <circle cx={x} cy={y} r="9" fill="var(--ok)" />
      <path d={`M${x - 4} ${y} l3 3 l5 -6`} fill="none" stroke="#04110f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
  if (st === 'run') return (
    <g>
      <circle cx={x} cy={y} r="9" fill="#0b1320" stroke="#334155" />
      <circle cx={x} cy={y} r="5" fill="none" stroke="#1e293b" strokeWidth="2" />
      {/* El grupo rota alrededor del centro del badge: su caja (fill-box) es el círculo completo, no solo el arco */}
      <g className={reduced ? '' : 'spin'}>
        <circle cx={x} cy={y} r="6" fill="none" stroke="none" />
        <circle cx={x} cy={y} r="5" fill="none" stroke="var(--acc)" strokeWidth="2" strokeLinecap="round" strokeDasharray="9 22.4" transform={`rotate(-90 ${x} ${y})`} />
      </g>
    </g>
  )
  return <circle cx={x} cy={y} r="4" fill="#1e293b" />
}

export function Pipeline({ st, reduced, lang }: { st: Record<StageId, Status>; reduced: boolean; lang: Lang }) {
  const prod = st.prod
  return (
    <svg viewBox="0 0 520 392" className="h-auto w-full overflow-visible" role="img"
      aria-label={lang === 'es' ? 'Diagrama del pipeline: rama, merge request, lint, PHPStan, PHPUnit, Docker, deploy y producción' : 'Pipeline diagram: branch, merge request, lint, PHPStan, PHPUnit, Docker, deploy and production'}>
      <defs>
        <filter id="g"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {EDGES.map((e) => {
        const on = st[e.from] === 'ok' && st[e.to] !== 'idle'
        const live = st[e.from] === 'ok' && st[e.to] === 'run'
        return (
          <g key={e.from}>
            <path d={e.d} stroke="#1c2836" strokeWidth="2" fill="none" />
            {on && <path d={e.d} stroke="var(--acc)" strokeWidth="2" fill="none" className={live && !reduced ? 'flow' : ''} opacity={live ? 1 : .55} />}
            {live && !reduced && (
              <circle r="3.5" fill="var(--acc2)" filter="url(#g)"><animateMotion dur=".7s" repeatCount="indefinite" path={e.d} /></circle>
            )}
          </g>
        )
      })}
      {NODES.map((n) => {
        const s = st[n.id]
        return (
          <g key={n.id}>
            <rect x={n.x} y={n.y} width={W} height={H} rx="10" fill={s === 'idle' ? '#0b121c' : '#0d1a22'}
              stroke={s === 'ok' ? 'var(--acc)' : s === 'run' ? 'var(--acc2)' : '#1f2b3b'} strokeOpacity={s === 'ok' ? .7 : 1} strokeWidth={s === 'run' ? 1.6 : 1}
              style={{ transition: 'stroke .3s, fill .3s' }} />
            <text x={n.x + 12} y={n.y + 25} fill={s === 'idle' ? '#64748b' : '#fff'} fontFamily="Inter Variable" fontWeight="700" fontSize="13" style={{ transition: 'fill .3s' }}>{n.label}</text>
            <text x={n.x + 12} y={n.y + 43} fill="#64748b" fontFamily="JetBrains Mono" fontSize="9">{n.sub}</text>
            <Badge x={n.x + W - 4} y={n.y + 4} st={s} reduced={reduced} />
          </g>
        )
      })}
      {/* producción: arquitectura */}
      <g>
        <rect x="10" y="268" width="490" height="112" rx="14" fill={prod === 'ok' ? 'color-mix(in srgb, var(--acc) 7%, transparent)' : '#0a1019'}
          stroke={prod === 'idle' ? '#1f2b3b' : 'var(--acc)'} strokeDasharray={prod === 'ok' ? '0' : '5 5'} strokeOpacity=".6" style={{ transition: 'all .4s' }} />
        <text x="26" y="292" fill={prod === 'idle' ? '#64748b' : 'var(--acc)'} fontFamily="JetBrains Mono" fontSize="11" fontWeight="700">production</text>
        <text x="484" y="292" textAnchor="end" fill={prod === 'ok' ? 'var(--ok)' : '#475569'} fontFamily="JetBrains Mono" fontSize="10.5">
          {prod === 'ok' ? '● live' : prod === 'run' ? (lang === 'es' ? '◌ desplegando…' : '◌ deploying…') : (lang === 'es' ? '○ en espera' : '○ waiting')}
        </text>
        {PROD.map((p, i) => {
          const w = p.w
          return (
            <g key={p.label} style={{ opacity: prod === 'ok' ? 1 : .35, transition: `opacity .4s ${reduced ? 0 : i * 0.12}s` }}>
              <rect x={p.x} y="312" width={w} height="44" rx="8" fill="#0d1520" stroke={prod === 'ok' ? 'var(--acc)' : '#1f2b3b'} strokeOpacity=".5" />
              <circle cx={p.x + 12} cy="334" r="3" fill={prod === 'ok' ? 'var(--ok)' : '#334155'} />
              <text x={p.x + 21} y="337.5" fill="#e2e8f0" fontFamily="JetBrains Mono" fontSize="9.5">{p.label}</text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
