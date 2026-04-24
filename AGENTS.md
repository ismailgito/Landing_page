# Agents

## Stack
- Pure static site: `index.html` + `script.js` + CSS (inline in HTML)
- No build system, no bundler, no package manager
- No tests, no lint, no typecheck

## Development
- Open `index.html` directly in a browser — no server required
- `script.js` is loaded with `defer`

## Testing GA4 / UTM tracking
- Append `?utm_source=test&utm_medium=email&utm_campaign=demo` to the URL
- Check GA4 DebugView for real-time events