# Proyecto Ejemplo — Página Web Estática

Plantilla de inicio limpia con HTML, CSS y JavaScript puro. Sin frameworks ni dependencias externas.

---

## Estructura de archivos

```
proyecto-ejemplo/
├── index.html   # Estructura y contenido de la página
├── style.css    # Estilos: variables, layout, componentes
├── script.js    # Lógica del cliente (eventos, DOM)
└── README.md    # Este archivo
```

---

## Cómo usar

1. Descarga o clona la carpeta.
2. Abre `index.html` directamente en el navegador — no requiere servidor.
3. Modifica los archivos según tu proyecto.

> Para desarrollo con recarga automática puedes usar la extensión **Live Server** de VS Code.

---

## Qué incluye

### `index.html`
- Estructura semántica: `<header>`, `<main>`, `<section>`, `<footer>`
- Navegación con anclas a secciones
- Sección hero con botón de llamada a la acción
- Grilla de tarjetas informativas
- Formulario de contacto simple
- Enlace a `style.css` y `script.js`

### `style.css`
- Variables CSS (`--color-*`, `--radio`, `--sombra`, etc.)
- Reset básico con `box-sizing: border-box`
- Header sticky con efecto `backdrop-filter`
- Grilla responsiva con `grid` y `auto-fit`
- Breakpoint para móvil a 520 px

### `script.js`
- Módulo envuelto en `DOMContentLoaded`
- Función helper `$()` para `querySelector`
- Año dinámico en el footer
- Scroll suave al hacer clic en el botón del hero
- Validación y respuesta simulada en el formulario (con `setTimeout`)
- Envío con la tecla Enter

---

## Personalización rápida

| Qué cambiar          | Dónde                          |
|----------------------|--------------------------------|
| Colores principales  | Variables `--color-*` en CSS   |
| Tipografía           | Variable `--fuente` en CSS     |
| Textos y secciones   | Directamente en `index.html`   |
| Lógica de eventos    | Funciones en `script.js`       |

---

## Requisitos

- Ninguno. Solo un navegador moderno (Chrome, Firefox, Edge, Safari).

---

## Licencia

Uso libre — sin restricciones.
