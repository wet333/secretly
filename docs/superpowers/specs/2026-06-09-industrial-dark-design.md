# Secretly — Industrial Dark (Cassette Futurism)

Dirección visual del frontend, validada en mockups interactivos (canvas) el 2026-06-09.
Referencias: Alien (1979) / Alien Isolation, Cowboy Bebop, cyberdecks, NASA-punk.

## Concepto

La interfaz es un equipo físico, no una página web: una terminal de bóveda
("VAULT TERMINAL · MK-II"). El chrome es chasis de metal oscuro cálido; el
contenido sensible vive en zonas de "pantalla" más oscuras. Los detalles de
hardware (LEDs, serigrafía, telemetría) se integran con sutileza de producto
profesional — nunca caricatura.

## Paleta (tokens en `frontend/src/index.css`, bloque `@theme`)

| Token                                  | Hex                                     | Uso                                          |
| -------------------------------------- | --------------------------------------- | -------------------------------------------- |
| `base`                                 | `#121310`                               | Fondo general (carbón cálido)                |
| `panel`                                | `#161714`                               | Superficies / cards                          |
| `raised`                               | `#1b1c18`                               | Headers de panel, hover, fila activa         |
| `sunken`                               | `#0e0f0c`                               | Inputs, slots hundidos                       |
| `screen`                               | `#0c0d09`                               | Zonas CRT (activity log)                     |
| `line`                                 | `#272820`                               | Borde hairline                               |
| `line-strong`                          | `#3a3b31`                               | Borde fuerte (modales, botones)              |
| `pri / sec / mut / faint`              | `#e8e6da / #a3a08e / #6b695a / #54534a` | Jerarquía de texto                           |
| `accent`                               | `#ff8c2e`                               | Naranja señal — acción primaria, foco, marca |
| `accent-up / accent-down / accent-ink` | `#ffa14f / #c2641a / #1c1206`           | Hover, borde-tecla, texto sobre naranja      |
| `ok`                                   | `#7ade8e`                               | Fósforo verde — secure, decrypted, create    |
| `warn`                                 | `#e8b04a`                               | Ámbar — updates, ENV                         |
| `err`                                  | `#e0483a`                               | Rojo — destructivo, deletes                  |

## Tipografía

- **Inter** — UI general, títulos display (bold, tracking apretado).
- **JetBrains Mono** — datos, keys, labels, botones, telemetría.
- Microlabels: mono 9-10px, uppercase, tracking 0.18em (clase `.micro-label`).

## Detalles firma

- **LEDs** (`.led`, primitiva `Led`): punto con halo tenue; pulso sutil en
  `VAULT:ACTIVE`. Tonos ok/warn/err/accent/mut.
- **Panel tags** (`.panel-tag`, prop `tag` de `Panel`): serigrafía
  `PNL-01 · KEYS` / `PNL-02 · LOG` cortando el borde superior del panel.
- **Status bar** (footer): strip de telemetría segmentada —
  `● SECURE | AES-256-GCM | N projects · N keys | reloj vivo | v2.0.0`.
- **Activity log**: pantalla oscura (`.log-screen`) con timestamp mono, LED de
  tono por acción y cursor verde parpadeante.
- **Badge DECRYPTED**: fósforo verde junto al valor revelado de un secret.
- **Botón primario**: tecla física sutil — naranja, borde inferior 2px más
  oscuro, se hunde 1px en `:active`. Labels mono uppercase.
- **VU-meter de storage** (sidebar): medidor segmentado de keys usadas.
- **Header**: bloque logo naranja sólido + `SECRETLY / VAULT TERMINAL · MK-II`,
  LED `VAULT:ACTIVE`, pill ámbar `ENV:PROD`, avatar cuadrado.

## Organización de componentes

- `components/ui/primitives/` — design system: Surface, Panel, PanelTag, Button,
  Field, Pill, IconBadge, Eyebrow, Led, Alert, EmptyState, Loader.
- `components/ui/layout/` — Layout, Header, Sidebar, Footer (status bar), SectionTitle.
- `components/ui/forms/` — FormShell + FormField (chasis compartido de formularios).
- `components/ui/overlay/` — Modal, ConfirmDialog.
- `components/features/<área>/` — componentes de dominio junto a su uso
  (projects, secrets, activity).

## Reglas

- Cero border-radius. Bordes 1px. Sin gradientes ni sombras difusas.
- El naranja es escaso: una acción primaria por vista, foco y marca.
- El verde fósforo solo significa "vivo/seguro/descifrado". El rojo solo
  significa destrucción. El ámbar solo significa cambio/ambiente.
- Animaciones mínimas y funcionales (pulso LED, cursor, hundimiento de tecla);
  todas respetan `prefers-reduced-motion`.
