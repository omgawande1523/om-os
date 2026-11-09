import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

const RESUME_FILE = 'public/Om_Gawande_Resume.pdf'

/** Size and last-modified date of the resume PDF, computed at build time. */
function resumeMeta() {
  const file = path.resolve(__dirname, RESUME_FILE)
  const bytes = fs.readFileSync(file)
  // Prefer the PDF's own ModDate: file mtimes are reset by a fresh git clone.
  const m = bytes.toString('latin1').match(/\/ModDate\s*\(D:(\d{4})(\d{2})(\d{2})/)
  const modified = m ? `${m[1]}-${m[2]}-${m[3]}` : fs.statSync(file).mtime.toISOString().slice(0, 10)
  return { sizeBytes: bytes.length, modified }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // `ANALYZE=1 npm run build` writes bundle-stats.html (gitignored) with a treemap of the JS.
    ...(process.env.ANALYZE ? [visualizer({ filename: 'bundle-stats.html', gzipSize: true, template: 'treemap' })] : []),
  ],
  define: {
    __RESUME_META__: JSON.stringify(resumeMeta()),
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
