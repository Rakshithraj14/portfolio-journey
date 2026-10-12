# Portfolio Journey

The portfolio of Rakshith Raj M, MLOps & AI Engineer in Bengaluru, built as a walk down an illustrated street.

Scroll and a small character walks from building to building. At each door the camera pushes inside, and every room holds one chapter:

| Building | Inside |
|---|---|
| House | Summary on a framed letter, quick facts on sticky notes |
| Office | Each job framed on the wall above the desks |
| Library | Every book spine is a skill. Books with a ribbon open a library card listing the jobs and projects that used it |
| Project store | A mart: AI & MLOps bottles in the cooler, dev tools on the pegboard, web apps boxed on the shelves, early experiments in the basket. Every item prints a receipt with live, code and write-up links |
| Post office | A postcard with email, GitHub, LinkedIn and Shiplog |

Day and night modes are a palette swap: at night the lamps glow and the windows light up. With reduced motion turned on, the rooms simply stack.

## Stack

- Vite, React 19, TypeScript
- Motion for the scroll-driven walk, door push and parallax
- Tailwind CSS v4 plus hand-written CSS
- Every illustration is hand-written SVG in a ligne claire style (even outlines, flat fills)
- Phosphor icons, Fraunces and Figtree fonts

## Run it

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # type-check and build into dist/
```

## Editing content

All content lives in [`src/lib/portfolio.ts`](src/lib/portfolio.ts): profile, jobs, library shelves, store aisles and projects. Each job and project lists the skills it `uses`; those names must match a book on the shelves, and the dev server throws if one doesn't, so a typo can't silently drop a project from a library card.

| File | What's in it |
|---|---|
| `src/App.tsx` | The scroll timeline: walk, look, enter, read, exit |
| `src/components/art.tsx` | Street buildings, lamps, skyline and the walking character |
| `src/components/rooms.tsx` | Room backdrops and their content |
| `src/styles.css` | Palette (day and night), ligne claire strokes, room fixtures |
