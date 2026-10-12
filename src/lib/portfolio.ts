// Everything on the street reads from this file.
// Sources: Rakshith_Resume.pdf, the manifests/READMEs of github.com/Rakshithraj14 and the
// Shiplog posts' links (live URLs), all checked 2026-10-12.
// Phone number left out on purpose: a public page gets scraped.

// `uses` must name books exactly as they appear on the library shelves (checked below in dev).
export type Job = { role: string; company: string; period: string; points: string[]; uses: string[] }
export type Shelf = { shelf: string; items: string[] }
export type ProjectIcon =
  | 'robot' | 'pulse' | 'shield' | 'radar' | 'ghost' | 'cards' | 'eye' | 'download' | 'box' | 'fork'
  | 'chats' | 'key' | 'avatar' | 'wallet' | 'notebook' | 'drive' | 'sparkle' | 'chart' | 'bars'
export type AisleId = 'cooler' | 'pegboard' | 'shelf' | 'bin'
export type Project = {
  name: string
  blurb: string
  uses: string[]
  aisle: AisleId
  icon: ProjectIcon
  points?: string[]
  live?: { url: string; label: string }
  code?: string
  post?: string // Shiplog slug
}

const gh = (repo: string) => `https://github.com/Rakshithraj14/${repo}`
const SHIPLOG = 'https://rakshithraj14.github.io/shiplog'
export const postUrl = (slug: string) => `${SHIPLOG}/blog/${slug}/`

export const profile = {
  name: 'Rakshith Raj M',
  role: 'MLOps & AI Engineer',
  location: 'Bengaluru, India',
  intro:
    'I build end-to-end ML and LLM systems, from training and experiment tracking to production deployment and observability, on a full-stack foundation in React, TypeScript and AWS.',
  email: 'rakshithraj14112001@gmail.com',
  github: 'https://github.com/Rakshithraj14',
  linkedin: 'https://www.linkedin.com/in/rakshith-raj-m-48344b2aa',
  blog: SHIPLOG,
}

// Most recent first. The first job sits on the top floor of the office.
export const jobs: Job[] = [
  {
    role: 'Software Developer (SDE)',
    company: 'GPUNET',
    period: 'Aug 2025 - Present',
    points: [
      'Architecting scalable SaaS applications with React and TypeScript.',
      'Cloud-native solutions on AWS, tuned for performance and reliability.',
      'MySQL schemas, REST APIs, Git workflows and CI/CD pipelines for the team.',
    ],
    uses: ['React', 'TypeScript', 'AWS', 'MySQL', 'Git', 'CI/CD'],
  },
  {
    role: 'DevOps Engineer Intern',
    company: 'IBM / Rooman Technologies, Bengaluru',
    period: 'Feb 2025',
    points: [
      'AI-DevOps on-the-job training, certified by Visvesvaraya Technological University.',
      'Hands-on with Docker, Kubernetes and cloud platforms.',
      'Built CI/CD pipelines for automated test, build and deploy.',
    ],
    uses: ['Docker', 'Kubernetes', 'CI/CD'],
  },
]

// One shelf per category in the library; every item becomes a book spine.
export const shelves: Shelf[] = [
  { shelf: 'AI & ML', items: ['RAG', 'LangGraph', 'Ollama', 'LLM APIs', 'TensorFlow', 'Deep learning', 'Scikit-learn', 'pandas', 'Jupyter'] },
  {
    shelf: 'MLOps & observability',
    items: ['MLflow', 'DVC', 'Model monitoring', 'Qdrant', 'Celery', 'Redis', 'Prometheus', 'Grafana', 'Langfuse', 'DeepEval', 'Ragas', 'Loki'],
  },
  { shelf: 'Cloud & DevOps', items: ['Docker', 'GitHub Actions', 'CI/CD', 'Cloudflare Workers', 'AWS', 'Kubernetes', 'Linux', 'Git'] },
  { shelf: 'Backend', items: ['Python', 'FastAPI', 'Flask', 'Hono', 'Express', 'Bun', 'Node.js', 'Rust', 'SQLAlchemy', 'Drizzle', 'Zod'] },
  {
    shelf: 'Frontend',
    items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Motion', 'Electron', 'Web Components', 'Streamlit'],
  },
  { shelf: 'Data', items: ['PostgreSQL', 'MySQL', 'SQLite', 'Cloudflare D1', 'Supabase'] },
]

// Quick facts pinned up in the living room.
export const facts = [
  { label: 'Based in', value: 'Bengaluru, India' },
  { label: 'Right now', value: 'SDE at GPUNET' },
  { label: 'Focus', value: 'RAG, local LLMs, MLOps' },
  { label: 'Writing', value: 'Shiplog, a build log' },
]

// The project store's floor plan: each aisle is a different fixture.
export const aisles: { id: AisleId; name: string; note: string }[] = [
  { id: 'cooler', name: 'AI & MLOps', note: 'Kept cold, served in production' },
  { id: 'pegboard', name: 'Dev tools', note: 'Hang them on your workflow' },
  { id: 'shelf', name: 'Web apps', note: 'Boxed and shipped' },
  { id: 'bin', name: 'Early experiments', note: 'Where it started' },
]

export const projects: Project[] = [
  // AI & MLOps cooler
  {
    name: 'SupportForge',
    blurb: 'A RAG-powered Telegram support bot on local LLMs, with every answer versioned, traced and scored.',
    uses: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'LangGraph', 'Ollama', 'RAG', 'Qdrant', 'Celery', 'Redis', 'DeepEval', 'Ragas', 'Langfuse', 'Prometheus', 'Grafana', 'Docker'],
    aisle: 'cooler',
    icon: 'robot',
    live: { url: 'https://t.me/VITE_testingbot', label: 'Try on Telegram' },
    code: gh('SupportForge'),
    post: 'supportforge',
    points: [
      'LangGraph retrieve-then-generate workflow over locally hosted Ollama models, no external API dependencies.',
      'Qdrant vector search with 768-dim nomic-embed-text embeddings, top-5 retrieval over PDF, Markdown and text.',
      'Every answer scored with DeepEval (faithfulness, hallucination) and Ragas (context precision and recall).',
      'Versioned prompts for safe promotion without redeploying, plus nightly persona-based incident simulation.',
      'Celery and Redis for ingestion and evaluation, Prometheus and Grafana for latency and tokens, Langfuse for tracing.',
    ],
  },
  {
    name: 'ModelForge',
    blurb: 'Model Doctor: watches a production fraud model for data quality, drift and performance, and alerts when it slips.',
    uses: ['Python', 'FastAPI', 'Scikit-learn', 'pandas', 'Docker', 'Model monitoring', 'Hono', 'Cloudflare Workers', 'Cloudflare D1', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Zod'],
    aisle: 'cooler',
    icon: 'pulse',
    live: { url: 'https://model-forge-psi.vercel.app', label: 'Live dashboard' },
    code: gh('ModelForge'),
    points: [
      'FastAPI model service on a VPS serves a PaySim-trained fraud model and sends telemetry for every prediction.',
      'Hono on Cloudflare Workers validates telemetry against the registered schema and stores it in D1 with a data-quality score.',
      'PSI drift per feature against the training baseline, computed by a 15-minute cron.',
      'Ground-truth labels joined by prediction id for live accuracy, precision, recall and F1.',
      'Telegram and webhook alerts on high drift or recall below 0.8, with a 24-hour cooldown per alert kind.',
    ],
  },
  {
    name: 'Fraud MLOps',
    blurb: 'An end-to-end MLOps pipeline on a 0.173% fraud-rate dataset: versioned data, tracked experiments, served model, CI.',
    uses: ['Python', 'Scikit-learn', 'pandas', 'Jupyter', 'MLflow', 'DVC', 'FastAPI', 'Docker', 'GitHub Actions', 'CI/CD'],
    aisle: 'cooler',
    icon: 'shield',
    code: gh('credit-card-fraud-mlops'),
    post: 'credit-card-fraud-mlops',
    points: [
      'Optimised for precision, recall and PR-AUC instead of accuracy on 284,807 transactions with 492 frauds.',
      'Balanced-weight Random Forest with modular training, inference and pytest suites.',
      'Datasets and model artifacts versioned with DVC, experiments tracked in MLflow.',
      'Dockerised FastAPI inference API with health and status endpoints.',
      'GitHub Actions trains a lightweight model and runs the API tests on every push.',
    ],
  },
  {
    name: 'Neural-IDS',
    blurb: 'Real-time DDoS detection with a hybrid CNN-LSTM, served over Flask and watched in Grafana.',
    uses: ['Python', 'TensorFlow', 'Deep learning', 'pandas', 'Jupyter', 'Flask', 'Prometheus', 'Grafana'],
    aisle: 'cooler',
    icon: 'radar',
    code: gh('Neural-IDS'),
    post: 'neural-ids',
    points: [
      'Hybrid CNN-LSTM in TensorFlow and Keras, trained on CIC-IDS2017 DDoS traffic.',
      'Flask API serves predictions in real time and exposes a /metrics endpoint.',
      'Prometheus scrapes the API; Grafana dashboards show detections live.',
    ],
  },

  // Dev tools pegboard
  {
    name: 'DeskForge',
    blurb: 'An AI desktop pet for Windows that roams your screen and turns typed requests into safe desktop actions.',
    uses: ['JavaScript', 'Electron', 'Node.js', 'Ollama', 'LLM APIs', 'GitHub Actions', 'CI/CD'],
    aisle: 'pegboard',
    icon: 'ghost',
    code: gh('DeskForge'),
    post: 'deskforge',
    points: [
      'Pixel-art pet in a transparent, always-on-top Electron window, with hunger, energy and happiness that persist.',
      'Requests become a JSON action plan from Ollama, Claude or OpenAI, validated against a tool allowlist. No shell access.',
      'API keys encrypted with Electron safeStorage and never sent to the renderer.',
      'GitHub Actions builds the Windows installer, publishes a release and posts the link to Telegram.',
    ],
  },
  {
    name: 'PeekPal',
    blurb: 'A tiny mascot web component that follows the cursor, watches your forms and looks away from passwords.',
    uses: ['TypeScript', 'Web Components', 'Next.js', 'React', 'Tailwind CSS', 'Motion', 'GitHub Actions'],
    aisle: 'pegboard',
    icon: 'eye',
    live: { url: 'https://peek-pal.vercel.app', label: 'Try the demo' },
    code: gh('PeekPal'),
    post: 'peekpal',
    points: [
      'One custom element with zero dependencies, published on npm.',
      'Works in plain HTML, React, Vue, Svelte or anything else.',
      'Reacts to pokes, naps when idle, watches the focused field and celebrates when a form is sent.',
      'A GitHub Action turns "Submit a pal" issues into pull requests for the demo gallery.',
    ],
  },
  {
    name: 'LinkForge',
    blurb: 'Paste a link, get the file. A self-hosted downloader for video, audio and subtitles from 1800+ sites.',
    uses: ['Python', 'FastAPI', 'Docker', 'GitHub Actions', 'CI/CD'],
    aisle: 'pegboard',
    icon: 'download',
    live: { url: 'https://hub.docker.com/r/rakshithraj/linkforge', label: 'Docker Hub' },
    code: gh('LinkForge'),
    post: 'linkforge',
    points: [
      'yt-dlp and ffmpeg behind FastAPI: preview real formats, then pick quality, container and subtitles.',
      'Files stream straight to the browser and are deleted right after. No accounts, no database.',
      'Non-root Docker image; GitHub Actions tests, then pushes to Docker Hub with commit and version tags.',
    ],
  },
  {
    name: 'container-lab',
    blurb: 'A FastAPI and SQLite service squeezed into a ~121MB, non-root, health-checked image.',
    uses: ['Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Docker'],
    aisle: 'pegboard',
    icon: 'box',
    code: gh('container-lab'),
    post: 'container-lab',
    points: [
      'Two-stage Alpine build compiles uvloop and httptools wheels; only the runtime venv ships.',
      'Runs as a non-root user with a built-in /health HEALTHCHECK.',
      'SQLite on a named volume whose ownership is set at build time, so data survives restarts.',
    ],
  },
  {
    name: 'cargo-disk',
    blurb: 'A zero-dependency Cargo subcommand that shows where target/ went and cleans only what is safe.',
    uses: ['Rust', 'GitHub Actions', 'CI/CD'],
    aisle: 'pegboard',
    icon: 'drive',
    live: { url: 'https://crates.io/crates/cargo-disk', label: 'crates.io' },
    code: gh('cargo-disk'),
    post: 'cargo-disk',
  },
  {
    name: 'pixel',
    blurb: 'A CLI that turns an AI-generated character sheet into a validated sprite atlas and pet.json for DeskForge.',
    uses: ['JavaScript', 'Node.js'],
    aisle: 'pegboard',
    icon: 'sparkle',
    code: gh('pixel'),
    post: 'pixel',
  },

  // Web apps shelf
  {
    name: 'PreviewForge',
    blurb: 'Paste a URL, see it as a Twitter, LinkedIn, Facebook or Telegram card, edit it and copy the meta tags.',
    uses: ['TypeScript', 'Hono', 'Cloudflare Workers', 'Cloudflare D1', 'Drizzle', 'Zod', 'React', 'Vite', 'Tailwind CSS'],
    aisle: 'shelf',
    icon: 'cards',
    live: { url: 'https://previewforgeui.ravanasura1422.workers.dev/', label: 'Live' },
    code: gh('PreviewForge'),
    post: 'previewforge',
    points: [
      'Server-side fetch with a streamed HTMLRewriter pass that stops reading as soon as </head> closes.',
      'Cache-aside: Cloudflare KV hot cache in front of durable D1 rows managed with Drizzle.',
      'Native Cloudflare rate limiting per IP, request validation with Zod.',
      'Copy-ready tags for HTML, React, Next.js, Vue, Svelte and Angular.',
    ],
  },
  {
    name: 'The Morning Edit',
    blurb: 'Website for a breakfast kitchen: live menu with filters, a plate tray and pre-booking. Next.js and an Express API.',
    uses: ['TypeScript', 'Next.js', 'React', 'Express', 'Node.js', 'Zod', 'Tailwind CSS', 'Motion'],
    aisle: 'shelf',
    icon: 'fork',
    live: { url: 'https://morning-edit.vercel.app', label: 'Live' },
  },
  {
    name: 'expense-bot',
    blurb: 'A Telegram bot that tracks income and expenses from plain-language messages, with monthly comparisons.',
    uses: ['TypeScript', 'Bun', 'PostgreSQL', 'Supabase', 'Docker', 'GitHub Actions', 'CI/CD'],
    aisle: 'shelf',
    icon: 'wallet',
    live: { url: 'https://t.me/asuratrackerbot', label: 'Try on Telegram' },
    code: gh('expense-bot'),
    post: 'expense-bot',
  },
  {
    name: 'AvatarForge',
    blurb: 'One Cloudflare Worker serving 60+ DiceBear avatar styles. Same seed, same avatar, every time.',
    uses: ['TypeScript', 'Hono', 'Cloudflare Workers'],
    aisle: 'shelf',
    icon: 'avatar',
    live: { url: 'https://avatarforge.ravanasura1422.workers.dev/', label: 'Live' },
    code: gh('AvatarForge'),
    post: 'avatarforge',
  },
  {
    name: 'CosmoAI',
    blurb: 'A React and Hono chat app that routes between Groq Llama for text and Stable Diffusion for images.',
    uses: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Bun', 'Hono', 'LLM APIs', 'Docker'],
    aisle: 'shelf',
    icon: 'chats',
    code: gh('CosmoAI'),
    post: 'cosmoai',
  },
  {
    name: 'BetterOAuth',
    blurb: 'Google OAuth with Better Auth: a Hono and Drizzle backend paired with a React frontend.',
    uses: ['TypeScript', 'Hono', 'Drizzle', 'PostgreSQL', 'Node.js', 'React', 'Vite', 'Docker'],
    aisle: 'shelf',
    icon: 'key',
    code: gh('BetterOAuth-Backend'),
    post: 'betteroauth-backend',
  },
  {
    name: 'Shiplog',
    blurb: 'My engineering blog: write-ups of what I build. Next.js static export on GitHub Pages.',
    uses: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Motion', 'GitHub Actions', 'CI/CD'],
    aisle: 'shelf',
    icon: 'notebook',
    live: { url: `${SHIPLOG}/`, label: 'Read it' },
    code: gh('shiplog'),
  },

  // Early experiments bin
  {
    name: 'PennyWatcher AI',
    blurb: 'Stock signals from RSI, MACD and Bollinger bands, with paper trading, a REST API and Telegram alerts.',
    uses: ['Python', 'Flask', 'PostgreSQL', 'pandas', 'Scikit-learn'],
    aisle: 'bin',
    icon: 'chart',
    code: gh('pennywatcher-ai'),
    post: 'pennywatcher-ai',
  },
  {
    name: 'Data dashboard',
    blurb: 'Upload a CSV or Excel file and explore it through interactive charts and statistics.',
    uses: ['Python', 'Streamlit', 'pandas', 'Docker'],
    aisle: 'bin',
    icon: 'bars',
    code: gh('data-analysis-dashboard'),
    post: 'data-analysis-dashboard',
  },
]

export type Evidence = { kind: 'job'; job: Job; floor: number } | { kind: 'project'; project: Project }

// Where a skill was actually used: jobs first, then projects.
export function evidenceFor(skill: string): Evidence[] {
  return [
    ...jobs.flatMap((job, i) => (job.uses.includes(skill) ? [{ kind: 'job' as const, job, floor: jobs.length - i }] : [])),
    ...projects.filter((p) => p.uses.includes(skill)).map((project) => ({ kind: 'project' as const, project })),
  ]
}

// A typo in `uses` would silently hide a project from a book's card, so fail loudly in dev.
if (import.meta.env.DEV) {
  const books = new Set(shelves.flatMap((s) => s.items))
  for (const x of [...jobs, ...projects])
    for (const u of x.uses)
      if (!books.has(u)) throw new Error(`"${u}" (used by ${'name' in x ? x.name : x.role}) is not a book in the library`)
}
