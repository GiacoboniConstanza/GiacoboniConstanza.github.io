import { useEffect, useRef, useState } from 'react'
import type { Lang } from './content'

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>(() => {
    const q = new URLSearchParams(location.search).get('lang')
    if (q === 'es' || q === 'en') return q
    return localStorage.getItem('cg-lang') === 'en' ? 'en' : 'es'
  })
  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('cg-lang', lang)
  }, [lang])
  return [lang, setLang]
}

export function useReducedMotion(): boolean {
  const [rm, setRm] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const m = matchMedia('(prefers-reduced-motion: reduce)')
    const f = () => setRm(m.matches)
    m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [])
  return rm
}

/** true cuando el elemento entra en pantalla (una sola vez). */
export function useInView<T extends Element>(threshold = 0.25): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && setSeen(true), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen]
}

/** Cuenta de 0 a n cuando start es true. */
export function useCountUp(n: number, start: boolean, reduced: boolean, ms = 1400): number {
  const [v, setV] = useState(reduced ? n : 0)
  useEffect(() => {
    if (!start) return
    if (reduced) { setV(n); return }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms)
      setV(Math.round(n * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [n, start, reduced, ms])
  return v
}
