import type { Lang } from './content'

export type StageId = 'branch' | 'mr' | 'lint' | 'analyze' | 'test' | 'build' | 'deploy' | 'prod'
export type Status = 'idle' | 'run' | 'ok'
export type Ev =
  | { k: 'cmd'; text: string; stage?: StageId }
  | { k: 'out'; text: string; tone?: 'dim' | 'ok' | 'acc'; wait?: number }
  | { k: 'stage'; id: StageId; status: Status; wait?: number }
  | { k: 'pipe'; id: StageId; label: string; jobs: string; ms: number }
  | { k: 'done' }

const BR = 'feature/conciliacion-pagos'

export function script(lang: Lang): Ev[] {
  const es = lang === 'es'
  return [
    { k: 'cmd', text: `git checkout -b ${BR}`, stage: 'branch' },
    { k: 'out', text: `Switched to a new branch '${BR}'`, tone: 'dim' },
    { k: 'cmd', text: 'git commit -m "feat: conciliación de pagos"' },
    { k: 'out', text: `[${BR} 3f9c2e1] feat: conciliación de pagos`, tone: 'dim' },
    { k: 'stage', id: 'branch', status: 'ok' },
    { k: 'cmd', text: 'glab mr create --fill --target-branch develop', stage: 'mr' },
    { k: 'out', text: es ? '→ merge request abierto · revisión de código solicitada' : '→ merge request opened · code review requested', tone: 'dim', wait: 380 },
    { k: 'out', text: es ? '✓ revisión aprobada' : '✓ review approved', tone: 'ok', wait: 260 },
    { k: 'cmd', text: 'glab mr merge --yes' },
    { k: 'out', text: es ? '✓ merged → develop · pipeline en ejecución' : '✓ merged → develop · pipeline running', tone: 'ok' },
    { k: 'stage', id: 'mr', status: 'ok' },
    { k: 'pipe', id: 'lint', label: 'lint', jobs: 'phpcs · grumphp · sqlfluff', ms: 650 },
    { k: 'pipe', id: 'analyze', label: 'analyze', jobs: 'phpstan', ms: 600 },
    { k: 'pipe', id: 'test', label: 'test', jobs: 'phpunit · playwright', ms: 850 },
    { k: 'pipe', id: 'build', label: 'build', jobs: 'docker compose build', ms: 600 },
    { k: 'pipe', id: 'deploy', label: 'deploy', jobs: 'staging → production', ms: 750 },
    { k: 'stage', id: 'prod', status: 'run', wait: 300 },
    { k: 'stage', id: 'prod', status: 'ok', wait: 0 },
    { k: 'out', text: es ? '✓ deployed · constanza-giacoboni está en producción' : '✓ deployed · constanza-giacoboni is live in production', tone: 'acc' },
    { k: 'done' },
  ]
}
