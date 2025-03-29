# KASBU ✨

Un editor visual interactivo que permite crear páginas web personalizables con un diseño moderno tipo "Bento". Diseñado específicamente para crear landing pages profesionales, portafolios creativos y páginas de perfil únicas con una experiencia de edición fluida e intuitiva.

> ⚠️ **Nota**: Este es un proyecto privado y propietario. No está disponible para uso público o distribución.

## ✨ Características

- 🎯 Editor visual interactivo con drag & drop
- 🎨 Personalización completa de la identidad visual
- 📱 Diseño responsive optimizado (móvil y escritorio)
- 🔄 Animaciones y transiciones fluidas
- 🏷️ Widgets profesionales:
  - Integraciones con redes sociales
  - Contenido multimedia (imágenes, videos, YouTube)
  - Bloques de texto personalizables
  - Mapas interactivos
  - Códigos QR dinámicos
  - Enlaces personalizados
  - Terminal con sintaxis highlighting
- 🎉 Elementos decorativos y stickers
- 💾 Sistema de guardado y restauración de diseños
- 🌈 Temas y estilos predefinidos

## 🛠️ Stack Tecnológico

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático y seguridad de código
- **Tailwind CSS** - Sistema de diseño y estilos
- **React Grid Layout** - Sistema de grid interactivo
- **Vite** - Build system y desarrollo
- **Canvas Confetti** - Efectos visuales
- **React Router** - Gestión de rutas

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes de la aplicación
│   ├── cards/           # Widgets del editor
│   ├── common/          # Componentes compartidos
│   ├── editor/          # Componentes del editor visual
│   ├── layout/          # Componentes estructurales
│   ├── modals/          # Ventanas modales
│   └── pages/           # Páginas de la aplicación
├── hooks/               # Custom hooks
├── styles/             # Estilos y temas
├── types/              # Definiciones de TypeScript
└── utils/              # Utilidades
    ├── auth/           # Autenticación
    ├── constants.ts    # Constantes
    ├── layout.helper.ts # Helpers del editor
    └── url-parser.ts   # Parser de URLs
```

## 🚀 Desarrollo Local

1. **Prerrequisitos**
   - Node.js 18 o superior
   - npm 9 o superior
   - Acceso al repositorio privado

2. **Configuración Inicial**
   ```bash
   # Clonar el repositorio privado (requiere autenticación)
   git clone https://github.com/tu-organizacion/kasbu.git
   cd kasbu

   # Instalar dependencias
   npm install
   ```

3. **Variables de Entorno**
   ```bash
   # Crear archivo de variables de entorno
   cp .env.example .env

   # Configurar variables necesarias:
   # - API_KEY=tu_api_key
   # - AUTH_DOMAIN=tu_dominio
   # - etc...
   ```

4. **Desarrollo**
   ```bash
   # Iniciar servidor de desarrollo
   npm run dev
   ```

5. **Producción**
   ```bash
   # Construir para producción
   npm run build

   # Previsualizar build
   npm run preview
   ```

## 🎮 Guía del Editor

### Modo Editor

1. **Agregar Widgets**
   - Accede al Market desde el botón de cuadrícula
   - Explora las categorías disponibles
   - Selecciona y añade widgets al lienzo

2. **Personalización de Widgets**
   - Arrastra para reposicionar
   - Redimensiona usando las esquinas
   - Edita contenido con doble clic
   - Configura opciones específicas de cada widget

3. **Diseño Global**
   - Personaliza el fondo y patrones
   - Añade elementos decorativos
   - Configura título y subtítulo
   - Selecciona tipografías

4. **Gestión de Diseños**
   - Guarda diseños como plantillas
   - Importa diseños existentes
   - Exporta configuraciones

### Modo Vista Previa

- Previsualización en tiempo real
- Vista móvil y escritorio
- Modo presentación sin elementos de edición
- Compartir vista previa

## 📝 Guías de Desarrollo

### Convenciones

- **Nomenclatura**
  - PascalCase para componentes
  - camelCase para funciones y variables
  - UPPER_CASE para constantes

- **Arquitectura**
  - Componentes atómicos
  - Custom hooks para lógica reutilizable
  - Context para estado global
  - Servicios para API calls

- **Calidad de Código**
  - Tests unitarios para componentes críticos
  - E2E tests para flujos principales
  - TypeScript strict mode
  - ESLint + Prettier

### Performance

- Lazy loading de componentes pesados
- Memoización de componentes puros
- Optimización de assets
- Code splitting por rutas

## 🔒 Seguridad

- Autenticación requerida
- Rate limiting en APIs
- Sanitización de inputs
- Validación de datos

## 📄 Propiedad Intelectual

© 2024 KASBU. Todos los derechos reservados.

Este software es propietario y confidencial. No está permitida su distribución o uso no autorizado.

## 👥 Equipo

- Desarrollo Frontend
- Diseño UI/UX
- DevOps
- QA

## 🤝 Contribuciones

Este es un proyecto privado. Las contribuciones solo están permitidas para miembros autorizados del equipo.

Para contribuir:
1. Asegúrate de tener acceso al repositorio
2. Sigue las guías de desarrollo
3. Crea una rama para tu feature
4. Somete tu PR para revisión

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@kasbu.com
- Slack: #kasbu-dev