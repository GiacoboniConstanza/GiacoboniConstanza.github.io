# giacoboniconstanza.github.io

Portfolio de Constanza Giacoboni — Tech Lead & Desarrolladora Full Stack.
Sitio estático bilingüe (ES/EN) hecho con **Vite + React + TypeScript + Tailwind CSS v4** y publicado con **GitHub Actions → GitHub Pages**.

URL final: https://giacoboniconstanza.github.io/

## Desarrollo local

Requisitos: Node.js 20+.

```bash
npm ci          # instala dependencias (usa package-lock.json)
npm run dev     # servidor local en http://localhost:5173
npm run build   # tsc -b && vite build → genera dist/
npm run preview # sirve dist/ en http://localhost:4173
```

## Publicación en GitHub Pages (paso a paso)

1. En GitHub, con la cuenta **GiacoboniConstanza**: **New repository**.
   - Nombre exacto: `GiacoboniConstanza.github.io`
   - Visibilidad: **Public**
   - **Sin** README, .gitignore ni licencia (el repo debe quedar vacío).
2. Desde esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio inicial"
   git branch -M main
   git remote add origin https://github.com/GiacoboniConstanza/GiacoboniConstanza.github.io.git
   git push -u origin main
   ```
3. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Pestaña **Actions**: el workflow **Deploy to GitHub Pages** (`.github/workflows/deploy.yml`) corre en cada push a `main`
   (o manualmente con *Run workflow*). Si el primer run falló por haber activado Pages después del push, usar **Re-run all jobs**.
5. Al terminar (verde), el sitio queda en https://giacoboniconstanza.github.io/ (puede tardar 1–2 minutos).

Como es un repo de usuario (`<usuario>.github.io`), el sitio se sirve en la raíz: `base: '/'` en `vite.config.ts` ya está configurado.

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Textos ES/EN (perfil, stack, experiencia, casos, proyectos, formación, idiomas, contacto) | `src/content.ts` |
| Hero: secuencia del terminal y diagrama del pipeline | `src/script.ts`, `src/Hero.tsx`, `src/Pipeline.tsx` |
| Secciones, header y footer | `src/App.tsx` |
| Paleta (turquesa) y estilos | `src/index.css` |
| Meta tags, Open Graph, JSON-LD | `index.html` |
| Imagen para redes (1200×630) | `public/og-image.png` |
| CV descargables (versión web, sin teléfono ni ubicación) | `public/CV_Constanza_Giacoboni_ES_web.pdf`, `public/CV_Constanza_Giacoboni_EN_web.pdf` |

Los CV web se generan desde las fuentes de diseño (`cv/2026-10-23/disenio/src`) con:

```bash
./render_web.sh <carpeta_salida>   # usa build_web.py es|en + Chrome headless
```

y luego se copian a `public/` con el mismo nombre.

## Comandos del terminal del hero

`help`, `whoami`, `stack`, `contact`, `cv`, `replay`, `clear`, `lang <es|en>`. Botones: saltar animación y repetir.

## Notas

- `concepts/` (prototipos de diseño) es solo referencia local: está en `.gitignore`, excluida del escaneo de Tailwind y no forma parte del build.
- Respeta `prefers-reduced-motion`: muestra el estado final sin animaciones.
- El repositorio de *A Medias* es privado; el portfolio enlaza solo la demo pública.
