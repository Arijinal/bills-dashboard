# Design

## Visual Theme

**Industrial Command Center** — Bloomberg Terminal meets tactical operations. Dense information architecture on dark opaque surfaces with hard geometry. Gritty and engineered, not polished or decorative. Data moves with purpose; surfaces don't.

Scene sentence: A Bills analytics obsessive scanning pre-game intel on a 27-inch monitor in a dim home office at 6am Sunday, coffee in hand, cross-referencing PFF grades with cap numbers before the broadcast crews wake up.

## Color Palette

Color strategy: **Committed** — Bills royal blue carries 30-60% of accent surfaces.

All values in OKLCH. Neutrals tinted toward blue (chroma 0.008).

### Backgrounds (opaque, no transparency)
| Token | Value | OKLCH | Use |
|-------|-------|-------|-----|
| `--bg-base` | `#080C14` | `oklch(0.10 0.008 250)` | Page background |
| `--bg-surface` | `#0F1520` | `oklch(0.14 0.008 250)` | Panel/card background |
| `--bg-elevated` | `#161E2C` | `oklch(0.18 0.008 250)` | Elevated panels, hover states |
| `--bg-recessed` | `#060A10` | `oklch(0.08 0.008 250)` | Inset areas, input fields |

### Brand
| Token | Value | OKLCH | Use |
|-------|-------|-------|-----|
| `--bills-blue` | `#0044CC` | `oklch(0.42 0.20 260)` | Primary accent, active states, links |
| `--bills-blue-bright` | `#2266EE` | `oklch(0.52 0.20 260)` | Hover, emphasis |
| `--bills-blue-muted` | `#0A1A40` | `oklch(0.16 0.06 260)` | Background tint for blue contexts |
| `--bills-red` | `#C41230` | `oklch(0.45 0.18 20)` | Alerts, negative indicators, sparse emphasis |
| `--bills-red-muted` | `#2A0A10` | `oklch(0.12 0.05 20)` | Background tint for red contexts |

### Text
| Token | Value | OKLCH | Use |
|-------|-------|-------|-----|
| `--text-primary` | `#D4DCE8` | `oklch(0.88 0.01 250)` | Body text, headings |
| `--text-secondary` | `#6B7D93` | `oklch(0.55 0.03 240)` | Labels, secondary info |
| `--text-muted` | `#3A4A5C` | `oklch(0.35 0.02 240)` | Disabled, tertiary, timestamps |
| `--text-data` | `#A0B4CC` | `oklch(0.74 0.03 240)` | Monospace data values |

### Signals
| Token | Value | OKLCH | Use |
|-------|-------|-------|-----|
| `--signal-positive` | `#0FA958` | `oklch(0.62 0.16 155)` | Positive trends, wins, good grades |
| `--signal-warning` | `#D4920A` | `oklch(0.66 0.15 80)` | Caution, average grades, neutral |
| `--signal-negative` | `#D42030` | `oklch(0.50 0.18 25)` | Losses, poor grades, alerts |
| `--signal-info` | `#2266EE` | `oklch(0.52 0.20 260)` | Informational, uses bills-blue-bright |

### Borders & Dividers
| Token | Value | Use |
|-------|-------|-----|
| `--border-default` | `rgba(75, 100, 130, 0.12)` | Panel borders |
| `--border-hover` | `rgba(75, 100, 130, 0.25)` | Hover state borders |
| `--border-active` | `var(--bills-blue)` | Active/selected borders |
| `--border-divider` | `rgba(75, 100, 130, 0.08)` | Section dividers, table rows |

## Typography

Two fonts only. No decorative display faces.

| Token | Family | Weight Range | Use |
|-------|--------|-------------|-----|
| `--font-sans` | `'Inter Variable', 'Inter', system-ui, sans-serif` | 400-700 | All text: headings, body, labels, navigation |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', ui-monospace, monospace` | 400-600 | All numeric data, percentages, dates, codes, table values |

### Scale

| Level | Size | Weight | Font | Use |
|-------|------|--------|------|-----|
| Page title | `1.75rem` / 28px | 700 | Sans | Page-level headings (one per route) |
| Section heading | `1.25rem` / 20px | 600 | Sans | Section headers within a page |
| Subsection | `1rem` / 16px | 600 | Sans | Card titles, group labels |
| Body | `0.875rem` / 14px | 400 | Sans | Body text, descriptions |
| Caption | `0.75rem` / 12px | 500 | Sans | Labels, metadata, timestamps |
| Data large | `2rem` / 32px | 600 | Mono | Hero metrics on dashboard home |
| Data medium | `1.25rem` / 20px | 500 | Mono | Card-level metrics |
| Data small | `0.8125rem` / 13px | 400 | Mono | Table cells, inline data |
| Data tiny | `0.6875rem` / 11px | 400 | Mono | Axis labels, footnotes |

Line height: 1.5 for body, 1.2 for headings and data. Max body line length: 72ch.

Letter spacing: `0.02em` on captions and labels. `0.04em` on uppercase section markers. `0` on everything else.

## Elevation & Surfaces

No glassmorphism. No backdrop-filter. No translucent panels. Every surface is opaque.

| Level | Background | Border | Shadow | Use |
|-------|-----------|--------|--------|-----|
| Base | `--bg-base` | none | none | Page canvas |
| Surface | `--bg-surface` | `1px solid var(--border-default)` | none | Cards, panels |
| Elevated | `--bg-elevated` | `1px solid var(--border-default)` | `0 2px 8px rgba(0,0,0,0.3)` | Modals, dropdowns, tooltips |
| Recessed | `--bg-recessed` | `1px solid var(--border-default)` | `inset 0 1px 3px rgba(0,0,0,0.3)` | Input fields, code blocks |

Border radius: `2px` everywhere. No rounded corners. No pills. Hard geometry.

## Components

### Panel
The primary container. Replaces the old glassmorphic `.card`.
- Opaque `--bg-surface` background
- `1px solid var(--border-default)` border
- `2px` border-radius
- `1.25rem` padding
- No glow, no blur, no shadow at rest

### Status Dot
6px circle with solid fill. Always paired with a text label (never color-alone).
- `--signal-positive` for good/active
- `--signal-warning` for caution/neutral
- `--signal-negative` for bad/critical
- Subtle `box-shadow: 0 0 4px` of the same color at 40% opacity (the only glow allowed)

### Grade Ring
SVG circle for 0-100 scores (PFF-style). 270-degree arc.
- `strokeWidth: 4`
- Color tiers: 90+ positive, 80-89 bills-blue, 70-79 warning, <70 negative
- Center text in `--font-mono`, data-medium size
- Animate on viewport entry: stroke-dashoffset transition, 0.8s ease-out

### Data Table
- Header row: `--bg-elevated`, `--font-sans` caption weight 600, uppercase, `0.04em` tracking
- Body rows: alternating `--bg-surface` / `--bg-base`
- Numeric columns: right-aligned, `--font-mono`
- Row hover: `--bg-elevated`
- Sortable columns: chevron indicator, `cursor: pointer`
- No vertical borders. Horizontal `--border-divider` only.

### Navigation (Left Sidebar)
- Width: `240px` fixed on desktop
- Background: `--bg-surface`
- Right border: `1px solid var(--border-default)`
- Groups: uppercase label in caption style, `--text-muted`
- Items: `--font-sans` body size, `--text-secondary` default
- Active item: `--text-primary`, `2px` left border in `--bills-blue`, `--bg-elevated` background
- Hover: `--text-primary`, `--bg-elevated`
- Collapses to bottom tab bar on mobile (<768px)

### Chart Container
- Background: `--bg-surface`
- ApexCharts theme overrides:
  - Grid lines: `var(--border-divider)`
  - Axis labels: `--font-mono`, `--text-muted`
  - Tooltip: `--bg-elevated` background, `--border-default` border
  - Data colors: `--bills-blue`, `--signal-positive`, `--signal-warning`, `--signal-negative`, `--text-secondary`

## Layout

### Desktop (>=1024px)
- Left sidebar: `240px` fixed
- Main content: fluid, `max-width: 1200px`, centered with `padding: 1.5rem`
- Section gap: `2rem` between major sections
- Grid: CSS Grid, `gap: 1rem` between cards
- Common grids: `1fr 1fr` (two-col), `1fr 1fr 1fr` (three-col), `2fr 1fr` (main + sidebar)

### Tablet (768-1023px)
- Sidebar collapses to hamburger overlay
- Content: full width, `padding: 1rem`
- Grids collapse: three-col becomes two-col

### Mobile (<768px)
- Bottom tab bar: 5 icons + "More" overflow
- Content: full width, `padding: 0.75rem`
- All grids become single column
- Data tables become horizontally scrollable

## Motion

Library: Framer Motion. Ease: `[0.16, 1, 0.3, 1]` (expo ease-out).

| Element | Animation | Duration | Trigger |
|---------|-----------|----------|---------|
| Page transition | `opacity: 0→1, y: 12→0` | `0.3s` | Route change |
| Panel enter | `opacity: 0→1, y: 8→0` | `0.4s` | Viewport entry (stagger 0.05s per item) |
| Grade ring fill | `stroke-dashoffset` transition | `0.8s` | Viewport entry |
| Chart data | ApexCharts default animation | `0.6s` | Data load |
| Data cell update | `scale: 1→1.02→1` + brief color flash | `0.3s` | Value change |
| Modal | `opacity: 0→1, scale: 0.98→1` | `0.2s` | Open |
| Sidebar active | `width: 0→2px` on left border | `0.15s` | Navigation |
| Hover states | `background-color` transition | `0.15s` | Pointer enter |

No bounce. No elastic. No spring physics. No decorative particles or ambient animations except the single restrained radar sweep on the dashboard home canvas.

Respect `prefers-reduced-motion`: all motion becomes instant (`duration: 0`), canvas animation disabled.

## Iconography

Library: `react-icons` (already installed).
- Primary set: `Ri` (Remix Icon) — clean, geometric, consistent weight
- Size: `16px` for inline, `20px` for navigation, `24px` for section headers
- Color: `--text-secondary` default, `--text-primary` on hover/active
- Never decorative. Every icon has a functional purpose or a text label beside it.
