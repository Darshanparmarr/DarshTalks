# Custom fonts (optional)

Drop the six optional custom font files here to enable them. The app references
these exact filenames via `@font-face` in `src/styles/fonts.css`:

- `Sugra.woff2`
- `Quinia.woff2`
- `Ritteru.woff2`
- `Jubble.woff2`
- `Etrixo.woff2`
- `Lancelot.woff2`

If a file is missing, the browser automatically falls back to a bundled Google
Font (see `FONT_STACK` in `src/config/fonts.js`), so the site never breaks.

> These fonts are **not** bundled because their licenses/files are not
> guaranteed to be free. Add only files you are licensed to use.
