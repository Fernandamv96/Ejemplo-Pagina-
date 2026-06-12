# Proyecto Ejemplo — Página Web Estática

Plantilla de inicio limpia con HTML, CSS y JavaScript puro. Sin frameworks ni dependencias externas.

---

## Estructura de archivos

```
proyecto-ejemplo/
├── index.html              # Entrada principal de la página
├── script.js               # (legacy, reemplazado por src/)
├── style.css               # (legacy, reemplazado por src/)
├── README.md               # Este archivo
└── src/
    ├── css/
    │   └── style.css       # Estilos: variables, layout, componentes
    ├── js/
    │   ├── main.js         # Punto de entrada, importa módulos
    │   ├── utils.js        # Helpers: $(), setVisible(), anioActual()
    │   ├── nav.js          # Hero y scroll suave
    │   └── contacto.js     # Validación y respuesta del formulario
    ├── components/         # Componentes HTML reutilizables (para crecer)
    └── assets/
        ├── img/            # Imágenes del proyecto
        └── icons/          # Íconos SVG u otros
```

---

## Cómo usar

1. Descarga o clona la carpeta.
2. Abre `index.html` directamente con **Live Server** en VS Code.
3. Modifica los archivos según tu proyecto.

> Los archivos JS usan ES Modules (`import/export`), por eso se necesita un servidor local — no funcionan con `file://` directamente.

---

## Qué incluye

### `index.html`
- Estructura semántica: `<header>`, `<main>`, `<section>`, `<footer>`
- Carga `src/css/style.css` y `src/js/main.js` como módulo ES

### `src/css/style.css`
- Variables CSS (`--color-*`, `--radio`, `--sombra`, etc.)
- Reset básico, header sticky, grilla responsiva
- Breakpoint para móvil a 520 px

### `src/js/main.js`
- Punto de entrada — importa y llama a los módulos

### `src/js/utils.js`
- `$()` helper para `querySelector`
- `setVisible()` para mostrar/ocultar elementos
- `anioActual()` retorna el año actual

### `src/js/nav.js`
- Scroll suave al botón del hero

### `src/js/contacto.js`
- Validación del formulario con mensaje de respuesta simulado

---

## Personalización rápida

| Qué cambiar          | Dónde                            |
|----------------------|----------------------------------|
| Colores principales  | Variables `--color-*` en CSS     |
| Tipografía           | Variable `--fuente` en CSS       |
| Textos y secciones   | Directamente en `index.html`     |
| Lógica de eventos    | Módulos en `src/js/`             |
| Imágenes             | Carpeta `src/assets/img/`        |

---

## Requisitos

- Navegador moderno con soporte para ES Modules (Chrome, Firefox, Edge, Safari).
- Servidor local para los módulos JS — se recomienda **Live Server** en VS Code.

---

## Licencia

Uso libre — sin restricciones.
