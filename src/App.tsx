import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ComponentType } from 'react'
import {
  easeInOut,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ArrowDown, Moon, Sun } from '@phosphor-icons/react'
import { Castle, Cloud, House, Lamp, Library, Office, PostOffice, Shop, SkylineTile, Walker } from './components/art'
import {
  HouseBackdrop,
  HouseRoom,
  LibraryBackdrop,
  LibraryRoom,
  OfficeBackdrop,
  OfficeRoom,
  PostBackdrop,
  PostRoom,
  ShopBackdrop,
  ShopRoom,
  type RoomProps,
} from './components/rooms'
import { profile } from './lib/portfolio'

type Stop = {
  id: string
  label: string
  Exterior: ComponentType
  door: string // transform-origin of the door inside the exterior art, so the camera pushes through it
  sign: { eyebrow: string; title: string; line: string }
  Backdrop: ComponentType
  Room: ComponentType<RoomProps>
  stay: number // scroll units spent inside; longer rooms get more so their content scrolls gently
}

// Add a building = add a row. Order is the order you walk past them.
const STOPS: Stop[] = [
  {
    id: 'home', label: 'Home', Exterior: House, door: '50% 90%', Backdrop: HouseBackdrop, Room: HouseRoom, stay: 1.2,
    sign: { eyebrow: `No. 14, ${profile.location}`, title: profile.name, line: profile.role },
  },
  {
    id: 'experience', label: 'Work', Exterior: Office, door: '50% 88%', Backdrop: OfficeBackdrop, Room: OfficeRoom, stay: 1.2,
    sign: { eyebrow: 'The office', title: 'Experience', line: 'Where I clock in.' },
  },
  {
    id: 'skills', label: 'Skills', Exterior: Library, door: '74% 85%', Backdrop: LibraryBackdrop, Room: LibraryRoom, stay: 1.8,
    sign: { eyebrow: 'The library', title: 'Skills', line: 'Every book on the shelf is something I use.' },
  },
  {
    id: 'projects', label: 'Projects', Exterior: Shop, door: '78% 82%', Backdrop: ShopBackdrop, Room: ShopRoom, stay: 2.6,
    sign: { eyebrow: 'Project store', title: 'Projects', line: 'Things I built, on display.' },
  },
  {
    id: 'contact', label: 'Contact', Exterior: PostOffice, door: '50% 86%', Backdrop: PostBackdrop, Room: PostRoom, stay: 1.2,
    sign: { eyebrow: 'Post office', title: 'Contact', line: 'Drop me a line.' },
  },
]
const N = STOPS.length

// The walk, in scroll units: look at the facade, push through the door, read, step back out, walk on.
const LOOK = 0.4
const ENTER = 0.7
const WALK = 1
const VH_PER_UNIT = 75

const keys: { t: number; s: number; v: number }[] = []
const stays: { start: number; end: number }[] = []
let t = 0
STOPS.forEach(({ stay }, i) => {
  if (i > 0) t += WALK
  keys.push({ t, s: i, v: 0 })
  t += LOOK
  keys.push({ t, s: i, v: 0 })
  t += ENTER
  keys.push({ t, s: i, v: 1 })
  stays.push({ start: t, end: t + stay })
  t += stay
  keys.push({ t, s: i, v: 1 })
  if (i < N - 1) {
    t += ENTER
    keys.push({ t, s: i, v: 0 })
  }
})
const TOTAL = t
const T = keys.map((k) => k.t / TOTAL)
const STAYS = stays.map(({ start, end }) => ({ start: start / TOTAL, end: end / TOTAL }))

export default function App() {
  const reduce = useReducedMotion()
  const street = useRef<HTMLElement>(null)
  const walker = useRef<HTMLDivElement>(null)
  const idle = useRef<number>(undefined)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: street, offset: ['start start', 'end end'] })
  const stop = useTransform(scrollYProgress, T, keys.map((k) => k.s), { ease: easeInOut })
  const inside = useTransform(scrollYProgress, T, keys.map((k) => k.v), { ease: easeInOut })
  const x = useTransform(stop, (s) => `${-s * 100}vw`)
  const farX = useTransform(stop, (s) => `${-s * 30}vw`)
  const cloudX = useTransform(stop, (s) => `${-s * 12}vw`)
  const walkerOpacity = useTransform(inside, (v) => 1 - Math.min(1, v * 3))

  useMotionValueEvent(stop, 'change', (v) => {
    setActive(Math.round(v))
    const w = walker.current
    if (!w) return
    w.dataset.walking = 'true'
    w.dataset.dir = v >= (stop.getPrevious() ?? v) ? '1' : '-1'
    clearTimeout(idle.current)
    idle.current = window.setTimeout(() => (w.dataset.walking = 'false'), 140)
  })

  // Nav jumps land just inside the door, at the top of the room.
  const goTo = (i: number) => {
    const el = street.current
    if (reduce || !el) {
      setActive(i) // ponytail: only nav jumps update the pill here; add an IntersectionObserver if manual scrolling should too
      return document.getElementById(STOPS[i].id)?.scrollIntoView()
    }
    window.scrollTo({ top: el.offsetTop + STAYS[i].start * (el.offsetHeight - window.innerHeight) + 2, behavior: 'smooth' })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('dialog[open]')) return
      if (e.key === 'ArrowRight') goTo(Math.min(N - 1, active + 1))
      if (e.key === 'ArrowLeft') goTo(Math.max(0, active - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (reduce) {
    return (
      <>
        <Header active={active} goTo={goTo} />
        <main className="stacked">
          {STOPS.map((s, i) => (
            <RoomView key={s.id} stop={s} index={i} goTo={goTo} />
          ))}
        </main>
      </>
    )
  }

  return (
    <>
      <Header active={active} goTo={goTo} />
      <main ref={street} style={{ height: `calc(100svh + ${TOTAL * VH_PER_UNIT}vh)` }}>
        <motion.div className="viewport" style={{ '--p': stop } as unknown as CSSProperties}>
          <div className="sky" aria-hidden />
          <div className="stars" aria-hidden />
          <div className="sun" aria-hidden />
          <motion.div className="clouds" style={{ x: cloudX }} aria-hidden>
            <Cloud className="c1" />
            <Cloud className="c2" />
            <Cloud className="c3" />
            <Cloud className="c4" />
          </motion.div>
          <motion.div className="far" style={{ x: farX }} aria-hidden>
            {Array.from({ length: 8 }, (_, i) => <SkylineTile key={i} />)}
            <Castle />
          </motion.div>
          <motion.div className="track" style={{ x, width: `${N * 100}vw` }} aria-hidden>
            {STOPS.map((s, i) => (
              <ExteriorView key={s.id} stop={s} index={i} pos={stop} inside={inside} />
            ))}
            {STOPS.slice(1).map((s, i) => (
              <div key={s.id} className="lamp" style={{ left: `calc(${(i + 1) * 100}vw - 1.5vh)` }}>
                <span className="glow" />
                <Lamp />
              </div>
            ))}
          </motion.div>
          <motion.div ref={walker} className="walker" data-walking="false" data-dir="1" style={{ opacity: walkerOpacity }} aria-hidden>
            <Walker />
          </motion.div>
          {STOPS.map((s, i) => (
            <RoomView key={s.id} stop={s} index={i} goTo={goTo} pos={stop} inside={inside} progress={scrollYProgress} />
          ))}
        </motion.div>
      </main>
    </>
  )
}

type Live = { pos: MotionValue<number>; inside: MotionValue<number> }

function ExteriorView({ stop: { Exterior, door, sign }, index, pos, inside }: { stop: Stop; index: number } & Live) {
  // Read both values every time: motion only re-runs these when a value it read changes.
  const push = () => {
    const v = inside.get()
    return Math.abs(pos.get() - index) < 0.5 ? v : 0
  }
  // Camera push: the facade scales up around its own door until the doorway fills the screen.
  const scale = useTransform(() => 1 + push() ** 2 * 7)
  const signOpacity = useTransform(() => 1 - Math.min(1, push() * 2.5))
  const signX = useTransform(() => `${(index - pos.get()) * 18}vw`)
  return (
    <div className="stop">
      <motion.div className="stop-art" style={{ scale, transformOrigin: door }}>
        <Exterior />
      </motion.div>
      <motion.div className="board-slot" style={{ opacity: signOpacity, x: signX }}>
        <div className="board board-paper street-sign">
          <p className="eyebrow">{sign.eyebrow}</p>
          <p className={`board-title ${index === 0 ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}`}>{sign.title}</p>
          <p className="mt-1 font-display text-lg italic text-[var(--ink-soft)]">{sign.line}</p>
          <p className="hint mt-4 flex items-center gap-1.5">
            <ArrowDown weight="bold" /> Scroll to step inside
          </p>
        </div>
      </motion.div>
      <div className="sidewalk" />
    </div>
  )
}

type RoomViewProps = { stop: Stop; index: number; goTo: (i: number) => void } & Partial<Live> & {
  progress?: MotionValue<number>
}

function RoomView({ stop: { id, Backdrop, Room }, index, goTo, pos, inside, progress }: RoomViewProps) {
  const box = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState(0)

  // Content taller than the room scrolls through while you stand inside.
  useLayoutEffect(() => {
    if (!pos || !box.current || !content.current) return
    const measure = () => setOverflow(Math.max(0, content.current!.scrollHeight - box.current!.clientHeight))
    const ro = new ResizeObserver(measure)
    ro.observe(box.current)
    ro.observe(content.current)
    return () => ro.disconnect()
  }, [pos])

  const seen = useTransform(() => {
    if (!pos || !inside) return 1
    const v = inside.get() // read before the branch so it stays a tracked dependency
    return Math.abs(pos.get() - index) < 0.001 ? Math.min(1, Math.max(0, (v - 0.35) / 0.55)) : 0
  })
  const scale = useTransform(seen, (v) => 0.94 + v * 0.06)
  const visibility = useTransform(seen, (v) => (v > 0.01 ? 'visible' : 'hidden'))
  const y = useTransform(() => {
    if (!progress) return 0
    const { start, end } = STAYS[index]
    return -Math.min(1, Math.max(0, (progress.get() - start) / (end - start))) * overflow
  })

  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      className="room"
      style={pos ? { opacity: seen, scale, visibility } : undefined}
    >
      <Backdrop />
      <div ref={box} className="room-box">
        <motion.div ref={content} className="room-content" style={pos ? { y } : undefined}>
          <Room goTo={goTo} />
        </motion.div>
      </div>
    </motion.section>
  )
}

function Header({ active, goTo }: { active: number; goTo: (i: number) => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-4 py-3 md:px-8">
      <a
        href="#home"
        onClick={(e) => (e.preventDefault(), window.scrollTo({ top: 0, behavior: 'smooth' }))}
        className="chrome hidden items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 font-display font-semibold md:flex"
      >
        <span className="monogram">{profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
        {profile.name}
      </a>
      <nav aria-label="Buildings">
        <ul className="chrome flex rounded-full p-1">
          {STOPS.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === i ? 'location' : undefined}
                onClick={(e) => (e.preventDefault(), goTo(i))}
                className="relative block rounded-full px-2.5 py-1.5 text-[13px] font-semibold md:px-4 md:text-sm"
              >
                {active === i && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-[var(--ink)]" />}
                <span className={`relative ${active === i ? 'text-[var(--paper)]' : ''}`}>{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? 'light')
  const next = theme === 'dark' ? 'light' : 'dark'
  const flip = () => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // private mode: the choice just won't persist
    }
    setTheme(next)
  }
  return (
    <button
      type="button"
      onClick={flip}
      aria-label={next === 'dark' ? 'Switch to night' : 'Switch to day'}
      className="chrome grid size-10 shrink-0 place-items-center rounded-full"
    >
      {theme === 'dark' ? <Moon size={18} weight="fill" /> : <Sun size={18} weight="fill" />}
    </button>
  )
}
