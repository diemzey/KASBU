# Bento Grid Project

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F%2Fmoving-bento-grid)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://kasbu.com)

## 🚀 Descripción

Un proyecto moderno de React que implementa un diseño de tipo Bento Grid con animaciones fluidas y una interfaz de usuario atractiva. Construido con tecnologías modernas y desplegado en Vercel.

## ⚡️ Tecnologías

- React 18
- TypeScript
- Vite
- Framer Motion
- Tailwind CSS
- React Router DOM
- React Grid Layout
- Mapbox GL
- React Google Maps API
- QR Code Generator

## 🛠 Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Vista previa de la build de producción

## 🌐 Despliegue

El proyecto está desplegado en Vercel y accesible en:
[https://kasbu.com](https://kasbu.com)

## 📝 Características

- Diseño de tipo Bento Grid responsive
- Animaciones fluidas con Framer Motion
- Integración de mapas con Mapbox y Google Maps
- Generación de códigos QR
- Enrutamiento dinámico con React Router
- Estilizado con Tailwind CSS
- Soporte completo para TypeScript

## 🤝 Contribuir

Las contribuciones son siempre bienvenidas. Por favor, lee las guías de contribución antes de enviar un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

# Moving bento grid demo

This is a simple demo of moving bento grid animation on my [personal site](https://mnsh.me/), countless people have asked the source code so I just open sourced the grid part.



https://github.com/user-attachments/assets/c9288ea7-f886-4348-beba-f021c6e1e65b



## How it works?

Most of the grid heavy lifting is done by [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout), react helps in changing the grid config when clicking on nav buttons and since ```react-grid-layout``` uses transforms, adding css animation to ```react-grid-item``` allows for smooth transitions.

### index.css
```css
.react-grid-item.react-grid-placeholder {
  background: rgba(0, 0, 0, 0.438) none repeat scroll 0% 0%;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  border-radius: 32px;
  transition: all 500ms ease 0s !important;
  will-change: transform;
}

.react-grid-item {
  transition: visibility 500ms ease 0s;
}
```
### Some gotchas
- You need to import react-grid-layout styles from node_modules in your global CSS.
- I manually wrote the grid configuration for my site for each of the different layouts. There might be a better way to create or generate this configuration.
---

## How to run locally

- Clone/fork the repo: ```git clone https://github.com/manish-basargekar/moving-bento-grid.git```

- Install ```node_modules``` ```npm i```

- Run the vite app ```npm run dev```

Feel free to contribute and suggest improvements!
