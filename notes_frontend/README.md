# Ocean Notes (Astro)

A minimalist notes app UI built with Astro following the "Ocean Professional" theme. Create, edit, view, and delete text-based notes. Data is stored locally in your browser (localStorage) and all REST calls are simulated.

## Quick start

```bash
npm install
npm run dev
# open the provided URL (default 3000)
```

## Features

- Top navigation bar with theme badge and floating light/dark toggle
- Optional left sidebar for categories (hidden on small screens)
- Main area with searchable notes list and editor/viewer
- Create, autosave, explicit Save, and Delete
- Ocean Professional palette, generous whitespace, subtle accents
- No backend required (stubbed API using Promises over localStorage)

## Tech

- Astro 5
- Zero runtime frameworks; lightweight client scripts

## Project structure

```
/public/favicon.svg
/src
  /components
    NoteEditor.astro
    NotesList.astro
    SidebarCategories.astro
    ThemeToggle.astro
    TopNav.astro
  /layouts
    Layout.astro
  /lib
    storage.ts
  /pages
    index.astro
  /styles
    theme.css
```

## Notes about data

- Notes are saved to localStorage under the key `notes_app__notes_v1`.
- The simulated API in `src/lib/storage.ts` mimics network latency and returns Promises.

## License

MIT
