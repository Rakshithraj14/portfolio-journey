import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Broadcast,
  Cards,
  ChartBar,
  ChartLine,
  ChatsCircle,
  Check,
  Copy,
  Cube,
  DownloadSimple,
  EnvelopeSimple,
  Eye,
  ForkKnife,
  Ghost,
  GithubLogo,
  HardDrives,
  Key,
  LinkedinLogo,
  Notebook,
  Pulse,
  Robot,
  ShieldCheck,
  Sparkle,
  UserCircle,
  Wallet,
  X,
} from '@phosphor-icons/react'
import { aisles, evidenceFor, facts, jobs, postUrl, profile, projects, shelves, type AisleId, type Project } from '../lib/portfolio'

export type RoomProps = { goTo: (i: number) => void }

/* ------------------------------------------------------------------ */
/* Backdrops: 1600x900 scenes that crop (slice) to any screen, floor  */
/* anchored to the bottom. Content sits on top as real HTML.          */
/* ------------------------------------------------------------------ */

function Floor({ y = 770, className = 'f-wood' }: { y?: number; className?: string }) {
  return (
    <g>
      <rect className={className} x="-10" y={y} width="1620" height={910 - y} />
      {Array.from({ length: 15 }, (_, i) => (
        <line key={i} className="thin" x1={i * 120 - 40} y1={y} x2={i * 120 - 120} y2="900" />
      ))}
    </g>
  )
}

function RoomWindow({ x, y, w, h, curtains = true }: { x: number; y: number; w: number; h: number; curtains?: boolean }) {
  return (
    <g>
      <rect className="f-cream" x={x} y={y} width={w} height={h} />
      <rect className="f-sky" x={x + 14} y={y + 14} width={w - 28} height={h - 28} />
      <path className="f-far ns" d={`M${x + 14} ${y + h - 14} V${y + h * 0.7} h${w * 0.2} v-${h * 0.08} h${w * 0.18} v${h * 0.12} h${w * 0.22} v-${h * 0.15} h${w * 0.4 - 28} V${y + h - 14} Z`} />
      <line className="thin" x1={x + w / 2} y1={y + 14} x2={x + w / 2} y2={y + h - 14} />
      {[0.33, 0.66].map((f) => (
        <line key={f} className="thin" x1={x + 14} y1={y + h * f} x2={x + w - 14} y2={y + h * f} />
      ))}
      <rect className="f-cream-2" x={x - 12} y={y + h} width={w + 24} height={12} />
      {curtains && (
        <>
          <line x1={x - 30} y1={y - 12} x2={x + w + 30} y2={y - 12} />
          <path className="f-sheer" d={`M${x - 24} ${y - 12} h70 q-30 ${h / 2} 0 ${h + 20} h-70 Z`} />
          <path className="f-sheer" d={`M${x + w + 24} ${y - 12} h-70 q30 ${h / 2} 0 ${h + 20} h70 Z`} />
        </>
      )}
    </g>
  )
}

function Pendant({ x, len = 120 }: { x: number; len?: number }) {
  return (
    <g>
      <circle className="f-glow ns" cx={x} cy={len + 30} r="120" />
      <line x1={x} y1="-10" x2={x} y2={len} />
      <path className="f-mustard" d={`M${x - 34} ${len + 30} q34 -50 68 0 Z`} />
      <circle className="f-lit" cx={x} cy={len + 34} r="9" />
    </g>
  )
}

function Plant({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[[-30, -70], [0, -100], [28, -74], [-14, -128], [18, -132]].map(([dx, dy]) => (
        <ellipse key={`${dx}${dy}`} className="f-leaf" cx={x + dx} cy={y + dy} rx="22" ry="34" />
      ))}
      <path className="f-brick" d={`M${x - 40} ${y - 50} h80 l-10 50 h-60 Z`} />
    </g>
  )
}

function GlowDefs() {
  return (
    <defs>
      <radialGradient id="room-glow">
        <stop offset="0" style={{ stopColor: 'var(--glow)' }} />
        <stop offset="1" style={{ stopColor: 'var(--glow)', stopOpacity: 0 }} />
      </radialGradient>
    </defs>
  )
}

export function HouseBackdrop() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="art backdrop">
      <GlowDefs />
      <rect className="f-sage ns" x="-10" y="-10" width="1620" height="920" />
      <rect className="f-cream" x="-10" y="56" width="1620" height="16" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} className="nf trim" x={30 + i * 230} y="110" width="190" height="510" />
      ))}
      <rect className="f-cream" x="-10" y="650" width="1620" height="14" />
      <Floor />
      <path className="f-powder" d="M360 900 L450 800 H1150 L1240 900 Z" />
      <path className="nf thin" d="M420 880 L480 816 H1120 L1180 880 Z" />

      {/* fireplace + mirror */}
      <rect className="f-mustard" x="120" y="230" width="220" height="220" />
      <rect className="f-glass" x="134" y="244" width="192" height="192" />
      <rect className="f-shine ns" x="150" y="258" width="10" height="150" />
      <rect className="f-cream" x="70" y="470" width="320" height="22" />
      <rect className="f-cream" x="90" y="492" width="280" height="278" />
      <path className="f-hearth" d="M150 770 V600 a80 70 0 0 1 160 0 V770 Z" />
      <path className="f-awning" d="M190 770 q10 -60 40 -80 q-6 40 20 50 q10 -30 0 -60 q50 40 20 90 Z" />
      <path className="f-mustard" d="M210 770 q6 -30 20 -40 q0 24 14 30 q6 -10 4 -24 q20 20 6 34 Z" />
      <path className="f-pink-2" d="M110 470 q-6 -40 14 -54 h20 q20 14 14 54 Z" />
      <rect className="f-mustard" x="300" y="420" width="24" height="50" rx="4" />

      <RoomWindow x={1220} y={150} w={280} h={460} />
      <Pendant x={800} len={70} />

      {/* armchair + side table */}
      <path className="f-cream-2" d="M1040 790 V690 q0 -30 30 -30 h90 q30 0 30 30 V790 Z" />
      <rect className="f-cream-2" x="1020" y="730" width="190" height="60" rx="16" />
      <line x1="1060" y1="790" x2="1056" y2="812" />
      <line x1="1170" y1="790" x2="1174" y2="812" />
      <ellipse className="f-cream" cx="1300" cy="720" rx="50" ry="10" />
      <line x1="1300" y1="730" x2="1300" y2="800" />
      <path className="f-cream" d="M1284 712 q16 -30 32 0 Z" />
      <Plant x={1470} y={800} />
    </svg>
  )
}

export function OfficeBackdrop() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="art backdrop">
      <GlowDefs />
      <rect className="f-cream ns" x="-10" y="-10" width="1620" height="920" />
      {[40, 560, 1080].map((x) => (
        <RoomWindow key={x} x={x} y={70} w={480} h={250} curtains={false} />
      ))}
      <rect className="f-cream-2" x="-10" y="600" width="1620" height="170" />
      <line x1="-10" y1="600" x2="1610" y2="600" />
      <Floor y={770} className="f-slate" />
      {/* desks: left and right, partly hidden behind the plaques */}
      {[120, 1140].map((x, i) => (
        <g key={x}>
          <rect className="f-slate" x={x + 230} y="680" width="70" height="120" rx="10" />
          <rect className="f-wood" x={x} y="660" width="340" height="18" />
          <rect className="f-wood" x={x + 20} y="678" width="20" height="120" />
          <rect className="f-wood" x={x + 300} y="678" width="20" height="120" />
          <rect className="f-line" x={x + 110} y="560" width="140" height="92" rx="6" />
          <rect className={i ? 'f-lit' : 'f-glass'} x={x + 118} y="568" width="124" height="76" />
          <rect className="f-slate" x={x + 170} y="652" width="20" height="8" />
          <rect className="f-cream" x={x + 30} y="636" width="40" height="24" />
        </g>
      ))}
      <rect className="f-cream-2" x="1520" y="520" width="90" height="270" />
      {[560, 640, 720].map((y) => (
        <line key={y} x1="1520" y1={y} x2="1610" y2={y} />
      ))}
      <Plant x={60} y={800} />
    </svg>
  )
}

export function LibraryBackdrop() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="art backdrop">
      <GlowDefs />
      <rect className="f-library ns" x="-10" y="-10" width="1620" height="920" />
      {[60, 1340].map((x) => (
        <g key={x}>
          <path className="f-cream" d={`M${x} 620 V240 a100 100 0 0 1 200 0 V620 Z`} />
          <path className="f-sky" d={`M${x + 16} 604 V240 a84 84 0 0 1 168 0 V604 Z`} />
          <line className="thin" x1={x + 100} y1="156" x2={x + 100} y2="604" />
          <line className="thin" x1={x + 16} y1="420" x2={x + 184} y2="420" />
        </g>
      ))}
      <rect className="f-wood" x="-10" y="640" width="1620" height="130" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} className="nf thin" x={20 + i * 180} y="660" width="150" height="90" />
      ))}
      <Floor y={770} />
      <path className="f-awning" d="M420 900 L490 810 H1110 L1180 900 Z" />
      <path className="nf thin" d="M470 884 L520 826 H1080 L1130 884 Z" />
      {/* rolling ladder */}
      <line x1="300" y1="80" x2="380" y2="800" />
      <line x1="350" y1="80" x2="430" y2="800" />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1={306 + i * 8} y1={130 + i * 68} x2={356 + i * 8} y2={130 + i * 68} />
      ))}
      <Pendant x={800} len={30} />
    </svg>
  )
}

export function ShopBackdrop() {
  const jars = ['f-mustard', 'f-sage', 'f-pink', 'f-powder']
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="art backdrop">
      <GlowDefs />
      <rect className="f-pink ns" x="-10" y="-10" width="1620" height="920" />
      {Array.from({ length: 30 }, (_, i) => (
        <line key={i} className="siding" x1="-10" y1={30 + i * 30} x2="1610" y2={30 + i * 30} />
      ))}
      {/* side shelves stocked with jars */}
      {[20, 1340].map((x) =>
        [220, 360, 500].map((y, r) => (
          <g key={`${x}${y}`}>
            {Array.from({ length: 5 }, (_, i) => (
              <g key={i}>
                <rect className={jars[(i + r) % 4]} x={x + 14 + i * 46} y={y - 50} width="34" height="50" rx="4" />
                <rect className="f-cream-2" x={x + 10 + i * 46} y={y - 60} width="42" height="11" />
              </g>
            ))}
            <rect className="f-wood" x={x} y={y} width="250" height="14" />
          </g>
        )),
      )}
      <Pendant x={520} len={40} />
      <Pendant x={1080} len={40} />
      <Floor y={790} className="f-cream-2" />
      {/* counter */}
      <rect className="f-wood" x="250" y="700" width="1100" height="24" />
      <rect className="f-wood" x="270" y="724" width="1060" height="96" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} className="nf thin" x={290 + i * 174} y="740" width="150" height="64" />
      ))}
      <path className="f-slate" d="M1180 700 v-70 h110 v70 Z" />
      <rect className="f-cream" x="1196" y="640" width="78" height="26" />
      <rect className="f-mustard" x="1230" y="604" width="44" height="26" />
    </svg>
  )
}

export function PostBackdrop() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="art backdrop">
      <GlowDefs />
      <rect className="f-powder ns" x="-10" y="-10" width="1620" height="920" />
      {/* P.O. boxes */}
      {[30, 1210].map((x0) =>
        Array.from({ length: 6 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => (
            <g key={`${x0}${r}${c}`}>
              <rect className="f-mustard" x={x0 + c * 72} y={110 + r * 84} width="64" height="76" />
              <rect className="f-cream" x={x0 + c * 72 + 10} y={110 + r * 84 + 10} width="44" height="30" />
              <circle className="f-line ns" cx={x0 + c * 72 + 32} cy={110 + r * 84 + 58} r="4" />
            </g>
          )),
        ),
      )}
      <circle className="f-cream" cx="800" cy="190" r="40" />
      <circle className="f-cream-2" cx="800" cy="190" r="30" />
      <line x1="800" y1="190" x2="800" y2="168" />
      <line x1="800" y1="190" x2="816" y2="198" />
      <Floor y={790} />
      <rect className="f-brick-2" x="230" y="690" width="1140" height="22" />
      <rect className="f-brick" x="250" y="712" width="1100" height="110" />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} className="nf thin" x={274 + i * 216} y="730" width="190" height="74" />
      ))}
      <path className="f-cream" d="M1240 690 h100 l-10 -30 h-80 Z" />
      <line x1="1290" y1="660" x2="1290" y2="630" />
      <ellipse className="f-cream-2" cx="1290" cy="628" rx="40" ry="8" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Room contents                                                      */
/* ------------------------------------------------------------------ */

export function HouseRoom({ goTo }: RoomProps) {
  return (
    <div className="mx-auto grid w-full max-w-[920px] items-center gap-6 md:grid-cols-[1fr_240px]">
      <article className="gilt">
        <div className="gilt-inner">
          <p className="eyebrow">Come in, make yourself at home</p>
          <h2 id="home-title" className="board-title text-4xl md:text-5xl">
            Hi, I'm {profile.name.split(' ')[0]}.
          </h2>
          <p className="mt-1 font-display text-lg italic text-[var(--ink-soft)]">{profile.role}</p>
          <p className="mt-4 leading-relaxed">{profile.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" className="btn btn-ink" onClick={() => goTo(3)}>
              Browse my projects <ArrowRight weight="bold" />
            </button>
            <button type="button" className="btn" onClick={() => goTo(4)}>
              Say hello
            </button>
          </div>
        </div>
      </article>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-1" aria-label="Quick facts">
        {facts.map((f, i) => (
          <li key={f.label} className="note" style={{ '--tilt': `${[-2.5, 2, -1.5, 3][i % 4]}deg` } as CSSProperties}>
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-70">{f.label}</span>
            <span className="block font-display text-base leading-snug md:text-lg">{f.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function OfficeRoom() {
  return (
    <div className="mx-auto w-full max-w-[1040px]">
      <h2 id="experience-title" className="door-sign">
        <span className="eyebrow block">Floor directory</span>Experience
      </h2>
      <ol className="mt-5 grid gap-5 md:grid-cols-2">
        {jobs.map((j, i) => (
          <li key={j.role + j.company} className="gilt">
            <div className="gilt-inner">
              <p className="eyebrow">Floor {jobs.length - i} · {j.period}</p>
              <h3 className="board-title text-2xl">{j.role}</h3>
              <p className="mt-0.5 text-sm font-semibold text-[var(--ink-soft)]">{j.company}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed">
                {j.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

const BOOK_TONES = ['brick', 'sage', 'mustard', 'powder', 'pink', 'slate', 'wood']

// Lets the library card hand a project to the shop's receipt without lifting state into App.
const OPEN_PROJECT = 'open-project'

export function LibraryRoom({ goTo }: RoomProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [skill, setSkill] = useState<string | null>(null)
  const show = (s: string) => {
    setSkill(s)
    dialog.current?.showModal()
  }
  const close = () => dialog.current?.close()
  const entries = skill ? evidenceFor(skill) : []

  return (
    <div className="mx-auto w-full max-w-[1120px]">
      <h2 id="skills-title" className="door-sign">
        <span className="eyebrow block">The reading room</span>Skills
      </h2>
      <p className="room-hint">Books with a ribbon open a card showing where I used them</p>
      <div className="bookcase mt-6">
        {shelves.map((s, si) => (
          <section key={s.shelf} aria-labelledby={`shelf-${si}`} className="shelf">
            <h3 id={`shelf-${si}`} className="shelf-plate">
              {s.shelf}
            </h3>
            <ul className="shelf-row">
              {s.items.map((it, i) => {
                // Tall enough for the title, plus a little deterministic variety so the shelf looks lived in.
                const style = { height: Math.max(it.length * 7 + 28, 96 + ((it.length * 7 + i * 13) % 40)) }
                const tone = `book tone-${BOOK_TONES[(i * 3 + si) % BOOK_TONES.length]}`
                const used = evidenceFor(it).length
                return (
                  <li key={it} className="flex h-full items-end">
                    {used ? (
                      <button
                        type="button"
                        className={`${tone} has-card`}
                        style={style}
                        onClick={() => show(it)}
                        aria-label={`${it}, used in ${used} ${used === 1 ? 'place' : 'places'}`}
                      >
                        {it}
                      </button>
                    ) : (
                      <span className={tone} style={style}>
                        {it}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="receipt"
        aria-labelledby="card-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => setSkill(null)}
      >
        {skill && (
          <div className="receipt-body">
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow">Library card</p>
              <CloseButton onClick={close} />
            </div>
            <h3 id="card-title" className="board-title mt-1 text-3xl">
              {skill}
            </h3>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">
              Checked out {entries.length} {entries.length === 1 ? 'time' : 'times'}
            </p>
            <ol className="card-lines mt-4">
              {entries.map((e) =>
                e.kind === 'job' ? (
                  <li key={e.job.company}>
                    <button type="button" className="card-line" onClick={() => (close(), goTo(1))}>
                      <span className="card-stamp">Work</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{e.job.role}</span>
                        <span className="block text-xs text-[var(--ink-soft)]">
                          {e.job.company} · Floor {e.floor}
                        </span>
                      </span>
                      <ArrowRight weight="bold" aria-hidden />
                    </button>
                  </li>
                ) : (
                  <li key={e.project.name}>
                    <button
                      type="button"
                      className="card-line"
                      onClick={() => {
                        close()
                        goTo(3)
                        window.dispatchEvent(new CustomEvent(OPEN_PROJECT, { detail: e.project.name }))
                      }}
                    >
                      <span className="card-stamp">Project</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{e.project.name}</span>
                        <span className="block text-xs text-[var(--ink-soft)] max-sm:hidden">{e.project.blurb}</span>
                      </span>
                      <ArrowRight weight="bold" aria-hidden />
                    </button>
                  </li>
                ),
              )}
            </ol>
          </div>
        )}
      </dialog>
    </div>
  )
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-[var(--ink)]"
      onClick={onClick}
      aria-label="Close"
    >
      <X weight="bold" />
    </button>
  )
}

const ICONS = {
  robot: Robot,
  pulse: Pulse,
  shield: ShieldCheck,
  radar: Broadcast,
  ghost: Ghost,
  cards: Cards,
  eye: Eye,
  download: DownloadSimple,
  box: Cube,
  fork: ForkKnife,
  chats: ChatsCircle,
  key: Key,
  avatar: UserCircle,
  wallet: Wallet,
  notebook: Notebook,
  drive: HardDrives,
  sparkle: Sparkle,
  chart: ChartLine,
  bars: ChartBar,
}

// Each aisle stocks a different kind of packaging, like a real mart.
const PACKAGING: Record<AisleId, string> = { cooler: 'bottle', pegboard: 'pack', shelf: 'carton', bin: 'bag' }
const ITEM_TONES = ['mustard', 'sage', 'powder', 'brick', 'pink', 'slate', 'wood']

export function ShopRoom() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<Project | null>(null)
  const show = (p: Project) => {
    setOpen(p)
    if (!dialog.current?.open) dialog.current?.showModal()
  }
  const close = () => dialog.current?.close()
  useEffect(() => {
    const onOpen = (e: Event) => {
      const p = projects.find((x) => x.name === (e as CustomEvent<string>).detail)
      if (p) show(p)
    }
    window.addEventListener(OPEN_PROJECT, onOpen)
    return () => window.removeEventListener(OPEN_PROJECT, onOpen)
  }, [])

  return (
    <div className="mx-auto w-full max-w-[1120px]">
      <h2 id="projects-title" className="door-sign">
        <span className="eyebrow block">Project store, open late</span>Projects
      </h2>
      <p className="room-hint">Pick anything off the shelves for its receipt</p>
      <div className="mart mt-8">
        {aisles.map((a, ai) => (
          <section key={a.id} aria-labelledby={`aisle-${a.id}`} className={`fixture fixture-${a.id}`}>
            <h3 id={`aisle-${a.id}`} className="aisle-sign">
              Aisle {ai + 1} · {a.name}
              <span className="block text-[10px] font-semibold tracking-[0.1em] uppercase opacity-75">{a.note}</span>
            </h3>
            <ul className="fixture-items">
              {projects
                .filter((p) => p.aisle === a.id)
                .map((p, i) => {
                  const Icon = ICONS[p.icon]
                  return (
                    <li key={p.name}>
                      <button
                        type="button"
                        className={`item item-${PACKAGING[a.id]} tone-${ITEM_TONES[(i * 2 + ai) % ITEM_TONES.length]}`}
                        onClick={() => show(p)}
                        title={p.blurb}
                      >
                        <span className="item-face">
                          <Icon className="item-icon" weight="duotone" aria-hidden />
                        </span>
                        <span className="item-name">{p.name}</span>
                      </button>
                    </li>
                  )
                })}
            </ul>
          </section>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="receipt"
        aria-labelledby="receipt-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => setOpen(null)}
      >
        {open && (
          <div className="receipt-body">
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow">Project store · Receipt</p>
              <CloseButton onClick={close} />
            </div>
            <h3 id="receipt-title" className="board-title mt-1 text-3xl">
              {open.name}
            </h3>
            <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">{open.blurb}</p>
            {open.points && (
              <>
                <hr className="receipt-rule" />
                <ul className="space-y-2 text-sm leading-relaxed">
                  {open.points.map((pt, k) => (
                    <li key={pt} className="flex gap-3">
                      <span className="font-mono text-xs opacity-60">{String(k + 1).padStart(2, '0')}</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <hr className="receipt-rule" />
            <p className="text-xs font-bold tracking-wide uppercase">Made with: {open.uses.join(' · ')}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {open.live && (
                <a className="link" href={open.live.url} target="_blank" rel="noreferrer">
                  {open.live.label} <ArrowUpRight weight="bold" />
                </a>
              )}
              {open.code && (
                <a className="link" href={open.code} target="_blank" rel="noreferrer">
                  Code <GithubLogo weight="bold" />
                </a>
              )}
              {open.post && (
                <a className="link" href={postUrl(open.post)} target="_blank" rel="noreferrer">
                  Write-up <BookOpen weight="bold" />
                </a>
              )}
            </div>
            <p className="mt-5 text-center font-mono text-xs opacity-60">THANK YOU, COME AGAIN</p>
          </div>
        )}
      </dialog>
    </div>
  )
}

export function PostRoom() {
  const [copy, setCopy] = useState<'idle' | 'done' | 'failed'>('idle')
  const copyEmail = () =>
    navigator.clipboard
      .writeText(profile.email)
      .then(() => setCopy('done'), () => setCopy('failed'))
      .finally(() => setTimeout(() => setCopy('idle'), 2400))

  return (
    <div className="board board-paper board-postcard mx-auto max-w-[560px]">
      <span className="stamp" aria-hidden />
      <p className="eyebrow">Counter open</p>
      <h2 id="contact-title" className="board-title text-3xl md:text-4xl">
        Send a letter
      </h2>
      <p className="mt-3 leading-relaxed">
        Open to MLOps, AI and full-stack roles, and to good conversations about shipping ML to production. A short note
        is plenty.
      </p>
      <a className="btn btn-ink mt-5 w-full justify-center break-all" href={`mailto:${profile.email}`}>
        <EnvelopeSimple weight="bold" /> {profile.email}
      </a>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn" onClick={copyEmail} aria-live="polite">
          {copy === 'done' ? <Check weight="bold" /> : <Copy weight="bold" />}
          {copy === 'done' ? 'Copied' : copy === 'failed' ? 'Copy failed, select it above' : 'Copy email'}
        </button>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
          <GithubLogo weight="bold" /> GitHub
        </a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
          <LinkedinLogo weight="bold" /> LinkedIn
        </a>
        <a className="btn" href={profile.blog} target="_blank" rel="noreferrer">
          <Notebook weight="bold" /> Shiplog
        </a>
      </div>
    </div>
  )
}
