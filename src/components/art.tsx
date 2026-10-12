import type { ReactNode } from 'react'

// Ligne claire rules: every outline is the same weight (see .art in styles.css), every fill is flat
// and comes from a CSS variable, so day and night are just a palette swap.

type WinProps = { x: number; y: number; w: number; h: number; lit?: boolean; children?: ReactNode }

function Win({ x, y, w, h, lit, children }: WinProps) {
  return (
    <g>
      <rect className="f-cream" x={x} y={y} width={w} height={h} />
      <rect className={lit ? 'f-lit' : 'f-glass'} x={x + 8} y={y + 8} width={w - 16} height={h - 16} />
      <rect className="f-shine ns" x={x + 13} y={y + 13} width={5} height={h - 40} />
      {children}
      <line className="thin" x1={x + w / 2} y1={y + 8} x2={x + w / 2} y2={y + h - 8} />
      <line className="thin" x1={x + 8} y1={y + h * 0.45} x2={x + w - 8} y2={y + h * 0.45} />
      <rect className="f-cream-2" x={x - 6} y={y + h} width={w + 12} height={8} />
    </g>
  )
}

function Flowers({ x, y, w }: { x: number; y: number; w: number }) {
  const n = Math.floor(w / 20)
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} className={i % 3 === 1 ? 'f-pink' : 'f-leaf'} cx={x + 10 + i * 20} cy={y} r={9} />
      ))}
      <rect className="f-wood" x={x} y={y + 2} width={w} height={18} />
    </g>
  )
}

export function House() {
  return (
    <svg viewBox="0 0 520 640" className="art">
      <path className="f-slate" d="M66 116 L98 34 H422 L454 116 Z" />
      {[150, 314].map((x) => (
        <g key={x}>
          <path className="f-cream" d={`M${x} 116 V66 L${x + 28} 44 L${x + 56} 66 V116 Z`} />
          <rect className="f-lit" x={x + 12} y={70} width={32} height={40} />
          <line className="thin" x1={x + 28} y1={70} x2={x + 28} y2={110} />
        </g>
      ))}
      <rect className="f-cream" x="36" y="112" width="448" height="24" />
      <rect className="f-pink" x="52" y="136" width="416" height="504" />
      {Array.from({ length: 16 }, (_, i) => (
        <line key={i} className="siding" x1="52" y1={160 + i * 30} x2="468" y2={160 + i * 30} />
      ))}

      {/* the cutaway room */}
      <rect className="f-cream" x="86" y="168" width="348" height="214" />
      <rect className="f-sage" x="102" y="184" width="316" height="182" />
      <rect className="nf trim" x="114" y="198" width="140" height="118" />
      <rect className="nf trim" x="268" y="198" width="138" height="118" />
      <rect className="f-mustard" x="150" y="214" width="62" height="46" />
      <rect className="f-glass" x="158" y="222" width="46" height="30" />
      <path className="f-leaf ns" d="M158 252 l12 -14 l10 8 l8 -10 l16 16 Z" />
      <rect className="f-mustard" x="300" y="222" width="40" height="40" />
      <circle className="f-pink" cx="320" cy="242" r="10" />
      <rect className="f-wood" x="102" y="336" width="316" height="30" />
      {[140, 180, 220, 260, 300, 340, 380].map((x) => (
        <line key={x} className="thin" x1={x} y1="336" x2={x} y2="366" />
      ))}
      <path className="f-powder" d="M148 366 l14 -16 h154 l14 16 Z" />
      <path className="f-cream-2" d="M128 350 V292 q0 -16 16 -16 h36 q16 0 16 16 V350 Z" />
      <rect className="f-cream-2" x="120" y="314" width="84" height="36" rx="8" />
      <rect className="f-wood" x="262" y="294" width="128" height="10" />
      <line x1="272" y1="304" x2="272" y2="348" />
      <line x1="380" y1="304" x2="380" y2="348" />
      <path className="f-slate" d="M284 294 l10 -30 h44 l-8 30 Z" />
      <rect className="f-cream" x="344" y="282" width="12" height="12" />
      <line x1="372" y1="294" x2="372" y2="268" />
      <path className="f-pink-2" d="M360 268 h24 l-5 -18 h-14 Z" />
      <path className="f-sheer" d="M102 184 h34 q-18 90 0 182 h-34 Z" />
      <path className="f-sheer" d="M418 184 h-34 q18 90 0 182 h34 Z" />
      <line x1="94" y1="184" x2="426" y2="184" />
      <rect className="f-cream-2" x="78" y="382" width="364" height="10" />
      <Flowers x={110} y={398} w={300} />

      {/* ground floor */}
      <Win x={84} y={462} w={96} h={128} />
      <Win x={340} y={462} w={96} h={128} lit />
      <path className="f-sage-2" d="M216 640 V508 a44 44 0 0 1 88 0 V640 Z" />
      <path className="f-lit" d="M230 508 a30 30 0 0 1 60 0 Z" />
      <rect className="nf" x="230" y="524" width="26" height="44" />
      <rect className="nf" x="264" y="524" width="26" height="44" />
      <rect className="nf" x="230" y="580" width="26" height="40" />
      <rect className="nf" x="264" y="580" width="26" height="40" />
      <circle className="f-mustard" cx="294" cy="574" r="4" />
      <rect className="f-cream-2" x="200" y="628" width="120" height="12" />
      <rect className="f-powder" x="246" y="430" width="28" height="22" rx="3" />
      <text className="plaque" x="260" y="446">14</text>
      <path className="vine nf" d="M466 136 C440 200 470 260 452 320 S470 420 456 480" />
      {[[458, 170], [450, 214], [462, 258], [452, 300], [460, 350], [462, 400], [454, 446]].map(([x, y]) => (
        <ellipse key={y} className="f-leaf" cx={x} cy={y} rx="9" ry="6" />
      ))}
    </svg>
  )
}

export function Office() {
  const cols = [76, 230, 384]
  const rows = [118, 248, 378]
  return (
    <svg viewBox="0 0 560 760" className="art">
      <line x1="280" y1="2" x2="280" y2="42" />
      <path className="f-mustard" d="M280 4 h42 l-9 11 l9 11 h-42 Z" />
      <rect className="f-cream-2" x="200" y="40" width="160" height="22" />
      <rect className="f-cream-2" x="18" y="60" width="524" height="28" />
      <rect className="f-cream" x="34" y="88" width="492" height="672" />
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} className="f-cream-2" x={40 + i * 20.4} y="88" width="10" height="8" />
      ))}
      {[236, 366, 496].map((y) => (
        <rect key={y} className="f-cream-2" x="34" y={y} width="492" height="8" />
      ))}
      {rows.map((y, r) =>
        cols.map((x, c) => (
          <Win key={`${r}${c}`} x={x} y={y} w={100} h={104} lit={(r + c) % 2 === 0}>
            {r === 1 && c === 1 && (
              <g>
                <circle className="f-hair" cx="268" cy="292" r="9" />
                <path className="f-slate" d="M254 340 v-24 q14 -14 28 0 v24 Z" />
                <rect className="f-slate" x="290" y="310" width="24" height="18" />
              </g>
            )}
          </Win>
        )),
      )}
      <rect className="f-sage-2" x="150" y="512" width="260" height="40" />
      <text className="sign sign-light" x="280" y="540">OFFICES</text>
      <rect className="f-cream-2" x="196" y="566" width="26" height="194" />
      <rect className="f-cream-2" x="338" y="566" width="26" height="194" />
      <rect className="f-lit" x="222" y="566" width="116" height="14" />
      <rect className="f-wood" x="222" y="580" width="116" height="180" />
      <rect className="f-glass" x="234" y="594" width="40" height="120" />
      <rect className="f-glass" x="286" y="594" width="40" height="120" />
      <line x1="270" y1="650" x2="270" y2="672" />
      <line x1="290" y1="650" x2="290" y2="672" />
      <rect className="f-mustard" x="341" y="630" width="20" height="26" />
      <Win x={64} y={590} w={112} h={120} />
      <Win x={384} y={590} w={112} h={120} lit />
      <rect className="f-cream-2" x="206" y="748" width="148" height="12" />
    </svg>
  )
}

export function Shop() {
  const stripes = Array.from({ length: 10 }, (_, i) => ({
    t: 50 + 44 * i,
    b: 36 + 46.8 * i,
    cls: i % 2 ? 'f-cream' : 'f-awning',
  }))
  const jarColors = ['f-mustard', 'f-sage', 'f-pink', 'f-powder']
  const bricks = [[60, 80], [440, 92], [250, 70], [460, 300], [44, 300], [470, 220], [240, 270], [52, 380], [480, 600], [356, 640 - 40]]
  return (
    <svg viewBox="0 0 540 640" className="art">
      <rect className="f-cream" x="24" y="30" width="492" height="12" />
      <rect className="f-brick-2" x="16" y="40" width="508" height="22" />
      <rect className="f-brick" x="30" y="62" width="480" height="578" />
      {bricks.map(([x, y]) => (
        <g key={`${x}${y}`} className="brick-mark">
          <line x1={x} y1={y} x2={x + 18} y2={y} />
          <line x1={x + 7} y1={y + 7} x2={x + 25} y2={y + 7} />
        </g>
      ))}
      <Win x={80} y={96} w={130} h={150} lit />
      <Win x={330} y={96} w={130} h={150} />
      <Flowers x={84} y={266} w={122} />
      <Flowers x={334} y={266} w={122} />
      <rect className="f-cream" x="110" y="290" width="320" height="38" />
      <text className="sign sign-brick" x="270" y="317">PROJECT STORE</text>

      {stripes.map(({ t, b, cls }) => (
        <g key={t}>
          <path className={cls} d={`M${t} 334 H${t + 44} L${b + 46.8} 392 H${b} Z`} />
          <path className={cls} d={`M${b} 392 a23.4 12 0 0 0 46.8 0 Z`} />
        </g>
      ))}
      <line x1="30" y1="334" x2="510" y2="334" />

      <rect className="f-wood" x="56" y="410" width="290" height="200" />
      <rect className="f-glass" x="70" y="424" width="262" height="172" />
      <rect className="f-shine ns" x="78" y="432" width="6" height="140" />
      {[0, 1].map((s) =>
        Array.from({ length: 6 }, (_, i) => {
          const x = 86 + i * 40
          const top = s ? 508 : 448
          return (
            <g key={`${s}${i}`}>
              <rect className={jarColors[(i + s) % 4]} x={x} y={top + 6} width="24" height="26" rx="3" />
              <rect className="f-cream-2" x={x - 2} y={top} width="28" height="7" />
            </g>
          )
        }),
      )}
      <rect className="f-wood" x="70" y="480" width="262" height="6" />
      <rect className="f-wood" x="70" y="540" width="262" height="6" />
      <rect className="f-wood" x="96" y="566" width="120" height="30" />
      {[112, 134, 156, 178, 200].map((x) => (
        <circle key={x} className="f-awning" cx={x} cy="564" r="9" />
      ))}
      <rect className="f-brick-2" x="56" y="610" width="290" height="30" />

      <rect className="f-sage-2" x="372" y="410" width="104" height="230" />
      <rect className="f-lit" x="388" y="426" width="72" height="96" />
      <rect className="nf" x="388" y="540" width="72" height="84" />
      <line className="thin" x1="410" y1="426" x2="404" y2="440" />
      <line className="thin" x1="438" y1="426" x2="444" y2="440" />
      <rect className="f-cream" x="398" y="440" width="52" height="20" />
      <text className="plaque" x="424" y="455">OPEN</text>
      <circle className="f-mustard" cx="460" cy="580" r="4" />

      {/* the street cat */}
      <path className="vine-cat nf" d="M292 636 q-22 -2 -16 -26" />
      <ellipse className="f-cat" cx="304" cy="622" rx="17" ry="16" />
      <path className="f-cat" d="M306 596 l2 -12 l8 8 l8 -8 l2 12 Z" />
      <circle className="f-cat" cx="316" cy="602" r="11" />
      <circle className="f-line ns" cx="320" cy="600" r="1.6" />
    </svg>
  )
}

export function Library() {
  return (
    <svg viewBox="0 0 540 680" className="art">
      <path className="f-sage-2" d="M30 110 L270 20 L510 110 Z" />
      <circle className="f-lit" cx="270" cy="76" r="18" />
      <line className="thin" x1="252" y1="76" x2="288" y2="76" />
      <line className="thin" x1="270" y1="58" x2="270" y2="94" />
      <rect className="f-cream" x="22" y="106" width="496" height="18" />
      <rect className="f-sage" x="36" y="124" width="468" height="556" />
      <rect className="f-cream" x="36" y="124" width="18" height="556" />
      <rect className="f-cream" x="486" y="124" width="18" height="556" />
      {[96, 230, 364].map((x, i) => (
        <g key={x}>
          <path className="f-cream" d={`M${x} 310 V200 a40 40 0 0 1 80 0 V310 Z`} />
          <path className={i === 1 ? 'f-lit' : 'f-glass'} d={`M${x + 8} 302 V200 a32 32 0 0 1 64 0 V302 Z`} />
          <line className="thin" x1={x + 40} y1="168" x2={x + 40} y2="302" />
          <rect className="f-cream-2" x={x - 6} y="310" width="92" height="8" />
        </g>
      ))}
      <rect className="f-mustard" x="130" y="350" width="280" height="40" />
      <text className="sign" x="270" y="378">LIBRARY</text>

      <path className="f-wood" d="M70 640 V500 a110 110 0 0 1 220 0 V640 Z" />
      <path className="f-glass" d="M84 640 V500 a96 96 0 0 1 192 0 V640 Z" />
      {[520, 580, 636].map((base, r) => (
        <g key={base}>
          <SpineRow x0={r === 0 ? 112 : 92} x1={r === 0 ? 250 : 268} base={base} seed={r} />
          <rect className="f-wood" x="84" y={base} width="192" height="6" />
        </g>
      ))}
      <rect className="f-sage-2" x="60" y="640" width="240" height="40" />

      <path className="f-lit" d="M344 470 a55 40 0 0 1 110 0 Z" />
      <rect className="f-wood" x="344" y="470" width="110" height="210" />
      <rect className="f-glass" x="358" y="486" width="34" height="90" />
      <rect className="f-glass" x="406" y="486" width="34" height="90" />
      <rect className="nf" x="358" y="592" width="34" height="74" />
      <rect className="nf" x="406" y="592" width="34" height="74" />
      <path className="f-brick" d="M466 680 l5 -34 h44 l5 34 Z" />
      {[[478, 636], [494, 626], [510, 638], [488, 646], [504, 612]].map(([x, y]) => (
        <circle key={`${x}${y}`} className="f-leaf" cx={x} cy={y} r="13" />
      ))}
    </svg>
  )
}

const SPINES = ['f-brick', 'f-sage-2', 'f-mustard', 'f-powder', 'f-pink-2', 'f-slate']

// A row of book spines with deterministic widths and heights, so every render looks the same.
function SpineRow({ x0, x1, base, seed }: { x0: number; x1: number; base: number; seed: number }) {
  const books: ReactNode[] = []
  for (let x = x0, i = 0; x < x1 - 8; i++) {
    const w = 9 + ((i * 7 + seed * 3) % 6)
    const h = 34 + ((i * 11 + seed * 5) % 14)
    books.push(<rect key={i} className={SPINES[(i + seed) % SPINES.length]} x={x} y={base - h} width={w} height={h} />)
    x += w + 1
  }
  return <g>{books}</g>
}

export function PostOffice() {
  return (
    <svg viewBox="0 0 540 660" className="art">
      <path className="f-cream" d="M40 130 L270 30 L500 130 Z" />
      <circle className="f-cream-2" cx="270" cy="94" r="26" />
      <circle className="f-cream" cx="270" cy="94" r="19" />
      <line x1="270" y1="94" x2="270" y2="80" />
      <line x1="270" y1="94" x2="280" y2="98" />
      <rect className="f-cream-2" x="28" y="126" width="484" height="20" />
      <rect className="f-powder" x="44" y="146" width="452" height="514" />
      <Win x={86} y={180} w={96} h={120} lit />
      <Win x={222} y={180} w={96} h={120} />
      <Win x={358} y={180} w={96} h={120} lit />
      <rect className="f-brick" x="120" y="336" width="300" height="40" />
      <text className="sign sign-light" x="270" y="364">POST OFFICE</text>
      <Win x={76} y={420} w={110} h={150} />
      <Win x={354} y={420} w={110} h={150} />
      <path className="f-brick-2" d="M222 660 V470 a48 48 0 0 1 96 0 V660 Z" />
      <path className="f-lit" d="M236 520 V470 a34 34 0 0 1 68 0 V520 Z" />
      <line className="thin" x1="270" y1="436" x2="270" y2="520" />
      <rect className="nf" x="236" y="540" width="68" height="104" />
      <rect className="f-cream-2" x="206" y="648" width="128" height="12" />
      <path className="f-awning" d="M438 576 q28 -34 56 0 Z" />
      <rect className="f-awning" x="442" y="574" width="48" height="86" />
      <rect className="f-line ns" x="454" y="592" width="24" height="4" />
      <rect className="f-cream" x="452" y="606" width="28" height="18" />
    </svg>
  )
}

export function Lamp() {
  return (
    <svg viewBox="0 0 60 300" className="art">
      <rect className="f-slate" x="21" y="280" width="18" height="20" />
      <rect className="f-slate" x="27" y="70" width="6" height="210" />
      <path className="f-slate" d="M16 70 h28 l-4 -8 h-20 Z" />
      <path className="f-lit" d="M19 62 l-5 -38 h32 l-5 38 Z" />
      <line className="thin" x1="30" y1="24" x2="30" y2="62" />
      <path className="f-slate" d="M10 24 h40 l-20 -16 Z" />
      <circle className="f-slate" cx="30" cy="6" r="4" />
    </svg>
  )
}

// Distant rooftops: no outlines, so they recede behind the street.
export function SkylineTile() {
  return (
    <svg viewBox="0 0 800 300" preserveAspectRatio="xMinYMax meet" className="skyline-tile">
      <path className="f-far-2" d="M0 300 V150 h70 v-30 h20 v30 h40 V110 l50 -40 l50 40 V300 Z" />
      <path className="f-far-2" d="M300 300 V130 h90 v-20 h16 v20 h60 V160 h70 V90 a50 50 0 0 1 100 0 V300 Z" />
      <path className="f-far-2" d="M700 300 V140 l50 -50 l50 50 V300 Z" />
      <path className="f-far" d="M0 300 V200 h110 V170 l40 -34 l40 34 V200 h90 V180 h18 v20 h60 V160 h120 V210 h80 V176 l46 -40 l46 40 V300 Z" />
      <path className="f-far" d="M640 300 V190 h90 V214 h70 V300 Z" />
    </svg>
  )
}

export function Castle() {
  return (
    <svg viewBox="0 0 420 300" className="castle">
      <path
        className="f-far-2"
        d="M0 300 V200 h40 V120 l20 -50 l20 50 V200 h60 V90 l26 -70 l26 70 V200 h50 V140 h14 v-14 h14 v14 h14 v14 h14 V60 l22 -50 l22 50 V200 h40 V130 l18 -40 l18 40 V300 Z"
      />
    </svg>
  )
}

export function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 60" className={`art cloud ${className ?? ''}`}>
      <path className="f-cloud thin" d="M8 52 q4 -22 34 -18 q10 -26 46 -18 q20 -18 50 -4 q30 -8 44 14 q30 0 30 26 Z" />
    </svg>
  )
}

// An original chibi in a mage-squad outfit: spiky hair, headband, short gold-trimmed cape,
// white tunic, belt, cropped navy trousers and boots. Faces right; CSS mirrors it when walking back.
function Leg({ x, className }: { x: number; className: string }) {
  return (
    <g className={`leg ${className}`}>
      <rect className="f-pants" x={x} y="84" width="10" height="22" rx="2" />
      <path className="f-pants" d={`M${x} 103 h10 l-1 5 l-3 -2 l-3 3 l-3 -3 Z`} />
      <rect className="f-coat" x={x + 1} y="106" width="8" height="5" />
      <path className="f-line" d={`M${x} 110 h10 l2 6 h6 q2 0 2 3 v3 h-20 Z`} />
      <rect className="f-coat ns" x={x + 1} y="119" width="18" height="1.6" />
    </g>
  )
}

function Arm({ x, className }: { x: number; className: string }) {
  return (
    <g className={`arm ${className}`}>
      <rect className="f-pants" x={x} y="56" width="8" height="18" rx="3" />
      <path className="f-coat" d={`M${x - 1} 72 h10 l-1 5 h-8 Z`} />
      <circle className="f-skin" cx={x + 4} cy="80" r="3.6" />
    </g>
  )
}

export function Walker() {
  return (
    <svg viewBox="0 -8 80 132" className="art">
      <g className="bob">
        <Arm x={45} className="arm-b" />
        <Leg x={36} className="leg-b" />
        <Leg x={29} className="leg-a" />
        <path className="f-coat" d="M29 60 h25 l2 25 h-29 Z" />
        <rect className="f-wood" x="26" y="77" width="31" height="5" />
        <rect className="f-mustard" x="44" y="77.5" width="5" height="4" />
        <rect className="f-wood" x="52" y="80" width="6" height="11" rx="1.5" />
        <Arm x={33} className="arm-a" />

        {/* high collar + short cape over the shoulders */}
        <path className="f-pants" d="M32 44 h19 l1 8 h-21 Z" />
        <path className="f-cape" d="M28 50 Q42 45 57 50 L61 65 Q42 71 23 65 Z" />
        <path className="nf gold-trim" d="M24.6 63.8 Q42 70 59.4 63.8" />
        <circle className="f-mustard" cx="42" cy="51" r="2.3" />
        <path className="f-mustard" d="M51 55 l2.6 2.6 l-2.6 2.6 l-2.6 -2.6 Z" />

        {/* head */}
        <ellipse className="f-skin" cx="29.5" cy="34" rx="3" ry="4" />
        <circle className="f-skin" cx="43" cy="32" r="16" />
        <path
          className="f-hair"
          d="M27 28 L19 21 L28 20 L23 10 L32 14 L33 3 L40 11 L46 1 L49 12 L57 6 L56 16 L64 17 L58 23 L60 28 L54 23 Q42 20 30 25 Z"
        />
        <path className="nf hair-line" d="M45 2 q5 -7 -1 -9" />
        <path className="f-brick" d="M27 22 Q43 16 59 22 l0 4.5 Q43 20.5 27 26.5 Z" />
        <rect className="f-mustard" x="44" y="18.6" width="6" height="4" rx="1" />
        <path className="nf" d="M44.5 28.5 l5 -1.2" />
        <path className="nf" d="M53.5 28 l4 0.6" />
        <ellipse className="f-line ns" cx="47.5" cy="34" rx="2.4" ry="3.4" />
        <ellipse className="f-line ns" cx="55.5" cy="34" rx="2" ry="3.2" />
        <circle className="f-coat ns" cx="48.3" cy="32.7" r="0.9" />
        <circle className="f-coat ns" cx="56.1" cy="32.8" r="0.8" />
        <path className="nf" d="M50 42 q2.5 1.5 5 -0.5" />
      </g>
    </svg>
  )
}
