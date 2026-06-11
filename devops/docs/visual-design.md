# Secretly — Industrial Dark (Cassette Futurism)

Visual design guide for the Secretly frontend. The interface is a warm machine: a physical vault terminal, not a generic web app. Dark theme is the default; a light variant preserves the same industrial character.

**Source of truth:** [`frontend/src/index.css`](../../frontend/src/index.css) (tokens + global styles) and [`frontend/src/components/`](../../frontend/src/components/) (primitives and layout).

---

## How to read this

| Audience      | Use this doc for                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Humans**    | Design intent, aesthetic references, semantic color meaning, signature UI patterns, and the rationale behind constraints.                                     |
| **AI agents** | Concrete file paths, token names, Tailwind utilities, CSS class names, component inventory, and actionable do/don't rules when generating or editing UI code. |

When implementing UI, always prefer existing primitives over ad-hoc markup. Extend the design system before inventing one-off styles.

---

## Design philosophy — the warm machine

Secretly is **equipment you would trust your life to**. Not a website, not a dashboard theme: a purpose-built instrument for keeping secrets, with the gravity of NASA flight hardware and the calm clarity of an advanced medical monitor — yet warm and cozy, like a machine that has been at your side for years.

The machine is:

- **Quiet.** It never performs for you. No flourish, no celebration, no decoration. It reports.
- **Dense and honest.** Every pixel earns its place. Information is shown plainly, in the language of telemetry.
- **Serious but not cold.** Its seriousness comes from discipline (labeling, color coding, alignment), its warmth from material (warm charcoal, phosphor glow, amber silkscreen).
- **Physical.** The chrome is a chassis of warm dark metal; sensitive content lives in darker "screen" zones recessed behind the panel. LEDs, silkscreen labels and telemetry strips are integrated with professional product subtlety, never cartoonish.

When in doubt, ask: *would this exist on a piece of professional equipment?* If the answer is no, it does not belong here.

### What each reference contributes

| Reference | The lesson we take |
| --------- | ------------------ |
| **Alien (1979) / Alien Isolation** | Lived-in pragmatism. Machines built for work, with purpose in every detail. Nothing futuristic for its own sake. |
| **Cowboy Bebop** | Analog warmth and soul. Technology with personality, never sterile. |
| **NASA / NASA-punk** | Labeling discipline, seriousness, trust. Every switch is named, every state is visible. |
| **Advanced medical equipment** | Calm clarity under stress. Color used sparingly and meaningfully because legibility matters. |
| **Cyberdecks** | Compact density. The pleasure of a self-contained, personal machine. |

### Lexicon — speak in-world

The vocabulary already in use across code and copy. Name new components, CSS classes and labels with these words — not generic web terms ("card", "chip", "toast", "snackbar"):

| Term | Meaning here |
| ---- | ------------ |
| **Chassis** | The metal body of the machine: `Surface`, `Panel`, borders |
| **Silkscreen** | Printed equipment labels: `.micro-label`, `Eyebrow` |
| **Screen** | Recessed CRT zone for live data: `.log-screen`, `bg-screen` |
| **Slot** | Sunken receptacle for input: `.field`, `bg-sunken` |
| **Key** | A physical button you press: `Button`, `active:translate-y-px` |
| **LED** | A small indicator light with one meaning: `Led` |
| **Telemetry** | Live machine readouts: status bar, counts, clock |
| **Phosphor** | The green of a live CRT: `ok`, `.secret-value` |

**Brand copy (current):**

- App name: `Secretly` — [`frontend/src/lib/constants.ts`](../../frontend/src/lib/constants.ts) (`LOGO_TITLE`, `APP_NAME`)
- Header subtitle: `Centralized Key Vault`

---

## Theming

Dark is the default. Light is a full alternate palette with the same structure and semantics.

| Piece             | Path                                                                                                                   | Role                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Token definitions | [`frontend/src/index.css`](../../frontend/src/index.css) — `@theme` block                                              | Tailwind color utilities (`bg-base`, `text-pri`, etc.)        |
| Theme overrides   | Same file — `:root, [data-theme="dark"]` and `[data-theme="light"]`                                                    | CSS custom properties (`--surface-base`, `--text-primary`, …) |
| Runtime state     | [`frontend/src/context/ThemeContext.tsx`](../../frontend/src/context/ThemeContext.tsx)                                 | `data-theme` on `<html>`, `localStorage` key `secretly-theme` |
| Toggle UI         | [`frontend/src/components/ui/primitives/ThemeSwitch.tsx`](../../frontend/src/components/ui/primitives/ThemeSwitch.tsx) | Settings modal — segmented Dark / Light control               |

**Rules for theming:**

- Use semantic Tailwind tokens (`bg-panel`, `text-sec`, `border-line`) or CSS variables (`var(--surface-base)`), never hardcoded hex in components.
- Accent orange (`accent`) is shared across both themes.
- Test new UI in both themes before shipping.

---

## Color tokens

### The material story

Tokens are not abstract grays — each one is a physical material. Read the palette as a cross-section of the machine:

- `base` is **painted steel** — the outer chassis. Real equipment is never pure black; it is dark warm metal under workshop light.
- `panel` and `raised` are **mounted plates** — surfaces bolted onto the chassis, each a step closer to the operator.
- `sunken` is a **recessed slot** — where you insert something (an input, a value).
- `screen` is **CRT glass** — set behind the panel, the darkest zone, where live data glows.
- `line` is a **machined seam** — the hairline where two plates meet.

When the tables below don't cover a case, derive the answer from the material: does the new element sit *on* the chassis (raised), *in* it (sunken), or *behind* it (screen)?

### The warmth rule

**No pure neutrals, ever.** Every gray in both themes is tinted warm, toward yellow-green. There is no `#000`, no `#fff`, no neutral `#808080` anywhere in the palette. This is the single biggest reason the machine feels cozy instead of cold-cyberpunk — protect it. Any new color must carry the same warm cast.

### Color is information, never decoration

Roughly 95% of the pixels on screen are warm grays. Only four hues exist — orange, green, amber, red — and each has exactly one meaning (action, alive, change, danger). If a color is not telling the operator something, it does not belong. This is why aircraft panels and medical monitors feel serious despite being colorful: color coding exists because someone depends on legibility. That is the standard.

### Surfaces

| Token    | Dark hex  | Light hex | Meaning                                      | Tailwind    |
| -------- | --------- | --------- | -------------------------------------------- | ----------- |
| `base`   | `#121310` | `#e8e4d8` | Page background (warm charcoal / warm paper) | `bg-base`   |
| `panel`  | `#161714` | `#dedad0` | Cards, chassis surfaces                      | `bg-panel`  |
| `raised` | `#1b1c18` | `#f2eee4` | Panel headers, hover, active row             | `bg-raised` |
| `sunken` | `#0e0f0c` | `#d4d0c4` | Inputs, recessed slots                       | `bg-sunken` |
| `screen` | `#0c0d09` | `#d0dcc4` | CRT-style zones (activity log)               | `bg-screen` |

### Borders

| Token         | Dark hex  | Light hex | Use                             | Tailwind             |
| ------------- | --------- | --------- | ------------------------------- | -------------------- |
| `line`        | `#272820` | `#c4bfb3` | Hairline (default)              | `border-line`        |
| `line-strong` | `#3a3b31` | `#a8a394` | Strong border (modals, buttons) | `border-line-strong` |

### Text

| Token   | Dark hex  | Light hex | Hierarchy             | Tailwind     |
| ------- | --------- | --------- | --------------------- | ------------ |
| `pri`   | `#e8e6da` | `#1c1a14` | Primary               | `text-pri`   |
| `sec`   | `#a3a08e` | `#4a463c` | Secondary             | `text-sec`   |
| `mut`   | `#6b695a` | `#6e6a5e` | Muted                 | `text-mut`   |
| `faint` | `#54534a` | `#8a8678` | Faintest (timestamps) | `text-faint` |

### Accent (both themes)

| Token         | Hex       | Use                                    | Tailwind                               |
| ------------- | --------- | -------------------------------------- | -------------------------------------- |
| `accent`      | `#ff8c2e` | Primary action, focus, brand highlight | `bg-accent`, `text-accent`             |
| `accent-up`   | `#ffa14f` | Hover on accent                        | `bg-accent-up`, `hover:text-accent-up` |
| `accent-down` | `#c2641a` | Key bottom edge, borders               | `border-accent-down`                   |
| `accent-ink`  | `#1c1206` | Text on orange                         | `text-accent-ink`                      |

### Semantic status

| Token  | Dark hex  | Light hex | Meaning                             | Tailwind           |
| ------ | --------- | --------- | ----------------------------------- | ------------------ |
| `ok`   | `#7ade8e` | `#2d7a42` | Alive / secure / decrypted / create | `text-ok`, `bg-ok` |
| `warn` | `#e8b04a` | `#9a6b12` | Change / update / caution           | `text-warn`        |
| `err`  | `#e0483a` | `#b83228` | Destructive / delete / offline      | `text-err`         |

Semantic backgrounds use alpha tints: `--ok-bg`, `--warn-bg`, `--err-bg` (see `index.css`).

---

## Typography

| Role            | Family                             | Usage                                       |
| --------------- | ---------------------------------- | ------------------------------------------- |
| UI & display    | **Inter** (`--font-sans`)          | Body, headings, project titles              |
| Data & controls | **JetBrains Mono** (`--font-mono`) | Keys, labels, buttons, telemetry, log lines |

**Font features** (in `@theme`): Inter uses `cv02`, `cv03`, `cv04`, `cv11`; mono disables ligatures (`liga: 0`, `calt: 0`).

### Scale (Tailwind)

| Class        | Size      |
| ------------ | --------- |
| `text-2xs`   | 0.625rem  |
| `text-micro` | 0.6875rem |
| `text-xs`    | 0.75rem   |
| `text-sm`    | 0.875rem  |
| `text-base`  | 1rem      |
| `text-2xl`   | 1.5rem    |
| `text-3xl`   | 1.875rem  |

### `.micro-label` — equipment silkscreen

Defined in [`frontend/src/index.css`](../../frontend/src/index.css):

- JetBrains Mono, `text-micro`
- Uppercase, `letter-spacing: 0.14em`
- Color: `var(--text-muted)` (use `text-mut` or `text-sec!` overrides in components)

Used for panel titles, form labels, activity log header, modal titles.

---

## Voice & microcopy

The machine speaks in a specific register: terse, technical, lowercase-emotion. The writing is as much a part of the aesthetic as the palette — one cheerful SaaS sentence shatters the illusion.

**The register:**

- Labels read like **engravings**: `Activity Log`, `API:ONLINE`, `Add Secret`. Short, uppercase via silkscreen styling, no filler words.
- Status reads like **telemetry**: `3 projects · 12 secrets`, `Last 5`, a 24h clock. Counts use `tabular-nums`.
- Confirmations state **facts and consequences**: "Delete `STRIPE_API_KEY`? This cannot be undone." No softening, no apology.

**Never:**

- Exclamation marks or celebration ("All set! 🎉", "Awesome!").
- Apologetic filler ("Oops!", "Something went wrong :(").
- Marketing or playful tone anywhere inside the terminal.
- Emojis in UI copy.

A good test: read the string aloud as if it were printed on the faceplate of a lab instrument. If it sounds out of place, rewrite it.

---

## Motion — mechanics, not flourishes

Every animation must be explainable as a **physical behavior of the machine**. If you cannot describe a transition mechanically, cut it.

| Animation | Mechanical explanation |
| --------- | ---------------------- |
| LED pulse (`.led--pulse`) | The indicator breathes — the machine is alive |
| Key press (`active:translate-y-px`) | A physical key sinks into the chassis |
| Blink cursor (`.blink-cursor`) | The CRT cursor of a live terminal |
| Project name marquee | A too-long label slides across a small display window |
| Field focus | The slot engages: border lights up, surface deepens to screen |

Durations stay short (~150ms) and easing stays functional. All motion respects `prefers-reduced-motion` (global override in `index.css`).

---

## Layout & shell

App structure in [`frontend/src/components/ui/layout/Layout.tsx`](../../frontend/src/components/ui/layout/Layout.tsx):

```
app-shell
└── app-frame          (max-width 72rem, centered, safe-area padding)
    ├── app-header     → Header
    ├── app-workspace
    │   ├── app-sidebar (15.5rem, sticky on lg+) → Sidebar
    │   └── app-main    → page content
    └── app-footer     → ActivityList + status bar
```

| Class          | Behavior                             |
| -------------- | ------------------------------------ |
| `page-content` | Vertical stack, `gap: 1.5rem`        |
| `form-shell`   | Form max-width `32rem` (36rem on xl) |

Responsive: sidebar stacks above main below `1024px`; secrets table and log rows adapt at `639px`.

---

## Component system

### Primitives — `frontend/src/components/ui/primitives/`

Exported from [`index.ts`](../../frontend/src/components/ui/primitives/index.ts):

| Component     | File              | Purpose                                                  |
| ------------- | ----------------- | -------------------------------------------------------- |
| `Surface`     | `Surface.tsx`     | Base chassis: `bg-panel border border-line`, zero radius |
| `Panel`       | `Panel.tsx`       | Surface + header bar (icon · title · count · actions)    |
| `Button`      | `Button.tsx`      | Physical-key buttons; variants below                     |
| `Field`       | `Field.tsx`       | Sunken input (`.field` in CSS)                           |
| `Pill`        | `Pill.tsx`        | Square mono badge (`default`, `active`, `warn`)          |
| `IconBadge`   | `IconBadge.tsx`   | Square icon frame; `accent` tone = orange logo block     |
| `Eyebrow`     | `Eyebrow.tsx`     | Section label above display titles                       |
| `Led`         | `Led.tsx`         | Hardware indicator dot (`.led`, tones + optional pulse)  |
| `Alert`       | `Alert.tsx`       | Inline status message                                    |
| `EmptyState`  | `EmptyState.tsx`  | Placeholder with icon + description                      |
| `Loader`      | `Loader.tsx`      | Loading indicator                                        |
| `ThemeSwitch` | `ThemeSwitch.tsx` | Dark / Light segmented toggle                            |

**Button variants:** `default`, `primary`, `secondary`, `ghost`, `outline`, `danger`, `dangerOutline`, `icon`, `iconColor`, `iconDanger`.

**Button sizes:** `xs`, `sm`, `md`, `lg`, `xl`.

### Layout — `frontend/src/components/ui/layout/`

| Component      | File               | Purpose                                |
| -------------- | ------------------ | -------------------------------------- |
| `Layout`       | `Layout.tsx`       | App shell, settings modal, skip link   |
| `Header`       | `Header.tsx`       | Logo, API status LED, settings, avatar |
| `Sidebar`      | `Sidebar.tsx`      | Project list, search, add project      |
| `Footer`       | `Footer.tsx`       | Activity log + telemetry status bar    |
| `SectionTitle` | `SectionTitle.tsx` | Reusable section heading               |

### Forms — `frontend/src/components/ui/forms/`

| Export      | File            | Purpose                                          |
| ----------- | --------------- | ------------------------------------------------ |
| `FormShell` | `FormShell.tsx` | Shared form chassis (surface, error, actions)    |
| `FormField` | `FormShell.tsx` | Labeled field row (micro-label + control + hint) |

### Overlay — `frontend/src/components/ui/overlay/`

| Component       | File                | Purpose                                           |
| --------------- | ------------------- | ------------------------------------------------- |
| `Modal`         | `Modal.tsx`         | Portal dialog on `#modal-root`, `.modal-backdrop` |
| `ConfirmDialog` | `ConfirmDialog.tsx` | Destructive-action confirmation                   |

### Features — `frontend/src/components/features/<area>/`

| Area        | Components                                                          | Role                                             |
| ----------- | ------------------------------------------------------------------- | ------------------------------------------------ |
| `projects/` | `ProjectList`, `ProjectListItem`, `ProjectBanner`, `NewProjectForm` | Sidebar selection, dashboard banner, create flow |
| `secrets/`  | `SecretList`, `SecretListItem`, `NewSecretForm`                     | Key table, mask/reveal, CRUD                     |
| `activity/` | `ActivityList`, `ActivityItem`                                      | Footer phosphor log                              |

Domain components compose primitives. Do not duplicate primitive styles inside feature folders.

---

## Signature details

### Header

[`Header.tsx`](../../frontend/src/components/ui/layout/Header.tsx):

- `IconBadge` (`tone="accent"`, `size="sm"`) with Shield icon — solid orange logo block
- `LOGO_TITLE` in mono bold uppercase + subtitle `Centralized Key Vault`
- API status: `Led` (`ok` when online, `err` when offline, `mut` while checking) + label `API:ONLINE` / `API:OFFLINE` / `API:…`
- Settings icon button → opens Settings modal
- Square initials avatar (`bg-raised border-line-strong`)

### Status bar (footer telemetry)

[`Footer.tsx`](../../frontend/src/components/ui/layout/Footer.tsx) — `.status-bar` with segmented `.status-bar__seg`:

1. `N projects · N secrets`
2. `Made by {ADMIN_NAME}` (hidden on mobile via `status-bar__seg--optional`)
3. Live clock (`en-GB`, 24h)
4. `APP_VERSION`

### Activity log (phosphor screen)

[`ActivityList.tsx`](../../frontend/src/components/features/activity/ActivityList.tsx) + [`ActivityItem.tsx`](../../frontend/src/components/features/activity/ActivityItem.tsx):

- Wrapper: `.footer-log` with silkscreen header (`Activity Log`, last N count)
- Body: `.log-screen` (dark CRT background)
- Rows: `.log-row` — timestamp (`.log-row__time`), `Led` by action tone, message (`.log-row__message`)
- Entity highlights: `.log-entity--create` (green), `--update` (amber), `--delete` (red)
- Relative time: `.log-row__ago`

### LEDs

[`Led.tsx`](../../frontend/src/components/ui/primitives/Led.tsx) — `.led` with `.led--ok|warn|err|accent|mut`. Optional `.led--pulse` (respects `prefers-reduced-motion` globally).

Used in: header API status, project list items (selected = `ok`), activity log rows.

### Physical-key buttons

[`Button.tsx`](../../frontend/src/components/ui/primitives/Button.tsx) — `primary` variant:

- Orange fill, `border-b-2 border-accent-down`
- `active:translate-y-px` (key press)
- Mono uppercase labels on all non-icon variants

### Secret mask / reveal

[`SecretListItem.tsx`](../../frontend/src/components/features/secrets/SecretListItem.tsx) + CSS in `index.css`:

- Masked: `.secret-mask` — mono, letter-spaced bullets
- Revealed: `.secret-value` — mono, `color: ok` (phosphor green)
- No separate "DECRYPTED" badge; green value text is the signal

### Project sidebar rows

[`ProjectListItem.tsx`](../../frontend/src/components/features/projects/ProjectListItem.tsx):

- Selected: `border-l-accent`, `bg-raised`, `Led` tone `ok`
- Unselected: transparent left border, `Led` tone `mut`
- Secret count in mono micro uppercase
- Long names: horizontal marquee on hover/focus (skipped when `prefers-reduced-motion`)

### Theme switch

[`ThemeSwitch.tsx`](../../frontend/src/components/ui/primitives/ThemeSwitch.tsx) — `.theme-switch` with `.theme-switch__track` and `.theme-switch__option--active` (orange segment). Lives in Settings modal.

### Project banner

[`ProjectBanner.tsx`](../../frontend/src/components/features/projects/ProjectBanner.tsx) — open section (no panel border): accent `Eyebrow`, bold display title, secret count meta, `dangerOutline` Delete + `primary` Add Secret.

---

## Design rules

### The litmus test

Before shipping any new UI, ask three questions. All three must pass:

1. **Could this element exist on a 1980s lab instrument or flight panel?** If it only makes sense as a website widget, redesign it.
2. **Is every color on screen carrying information?** Decorative color is forbidden — see "Color is information".
3. **Does it feel installed in the chassis, or pasted on top of a website?** New elements must sit on, in, or behind the panel (see "The material story").

### Do

- Zero border-radius everywhere.
- 1px borders only (`border-line` or `border-line-strong`).
- Keep accent orange scarce: one primary action per view, focus rings, brand marks.
- Use semantic colors consistently:
    - **Green (`ok`):** alive, secure, decrypted, create
    - **Amber (`warn`):** updates, changes
    - **Red (`err`):** destructive actions, deletes, offline
- Build on `Surface` / `Panel` for any card-like UI.
- Use `micro-label` for equipment-style section and field labels.
- Use `Led` for live status — never decorative dots without meaning.
- Keep animations mechanical and functional (see "Motion — mechanics, not flourishes").
- Honor `prefers-reduced-motion` (global override in `index.css`).
- Use `tabular-nums` for counts, clocks, and telemetry.
- Keep every gray warm-tinted (see "The warmth rule").
- Write copy in the equipment register (see "Voice & microcopy").

### Don't

- No gradients or diffuse drop shadows (inset shadows on theme switch track are the only exception).
- No rounded corners, pills with radius, or soft Material-style cards.
- No hardcoded colors — use theme tokens.
- No extra primary orange buttons on a single screen.
- No green for non-secure/non-live states; no red for non-destructive actions.
- No new one-off panel patterns — extend `Panel` or `Surface`.
- No decorative sci-fi clutter (fake hex dumps, gratuitous scanlines, excessive glow).
- No pure black, pure white, or neutral grays — every tone carries the warm cast.
- No cheerful, apologetic, or marketing copy; no emojis in the UI.

---

## AI quick reference

### When adding a new UI element

1. Run the litmus test (see "Design rules"): lab instrument? color = information? installed in the chassis?
2. Check if a primitive in `components/ui/primitives/` already covers it.
3. Use Tailwind semantic tokens (`bg-panel`, `text-sec`, `border-line`) — not raw hex.
4. Wrap content in `Surface` or `Panel` for chassis consistency.
5. Labels: `micro-label` class or `<Eyebrow>`; copy in the equipment register (terse, no exclamation marks, no emojis).
6. Actions: `Button` with correct variant (`primary` once per view, `danger`/`dangerOutline` for destructive).
7. Status: `Led` + semantic text color.
8. Motion only if it has a mechanical explanation; respect `prefers-reduced-motion`.
9. Verify in dark and light themes.
10. Add `aria-label` / `aria-live` where status changes (see existing Header, Footer, SecretListItem).

### Token → Tailwind cheat sheet

| Need             | Class                                                  |
| ---------------- | ------------------------------------------------------ |
| Page background  | `bg-base`                                              |
| Card / panel     | `bg-panel border border-line`                          |
| Panel header     | `bg-raised border-b border-line`                       |
| Input background | `bg-sunken` or `.field`                                |
| CRT zone         | `bg-screen` or `.log-screen`                           |
| Primary text     | `text-pri`                                             |
| Secondary text   | `text-sec`                                             |
| Muted label      | `text-mut`                                             |
| Primary action   | `Button variant="primary"`                             |
| Destructive      | `Button variant="danger"` or `dangerOutline`           |
| Focus ring       | `focus-visible:ring-accent` (or `ring-err` for danger) |

### Key CSS classes

| Class                                        | Location    | Use               |
| -------------------------------------------- | ----------- | ----------------- |
| `.micro-label`                               | `index.css` | Silkscreen labels |
| `.led`, `.led--{tone}`                       | `index.css` | Status dots       |
| `.field`                                     | `index.css` | Text inputs       |
| `.secret-mask`, `.secret-value`              | `index.css` | Secret visibility |
| `.status-bar`, `.status-bar__seg`            | `index.css` | Footer telemetry  |
| `.footer-log`, `.log-screen`, `.log-row`     | `index.css` | Activity log      |
| `.theme-switch`, `.theme-switch__track`      | `index.css` | Theme toggle      |
| `.modal-backdrop`                            | `index.css` | Modal overlay     |
| `.app-shell`, `.app-frame`, `.app-workspace` | `index.css` | Layout shell      |

### File paths (copy-paste)

```
frontend/src/index.css
frontend/src/context/ThemeContext.tsx
frontend/src/lib/constants.ts
frontend/src/components/ui/primitives/
frontend/src/components/ui/layout/
frontend/src/components/ui/forms/FormShell.tsx
frontend/src/components/ui/overlay/
frontend/src/components/features/projects/
frontend/src/components/features/secrets/
frontend/src/components/features/activity/
```

---

_Last synced with codebase: 2026-06-10._
