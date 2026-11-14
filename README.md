# 🛰️ Izabal Vivo

Proyecto para el **NASA Space Apps Challenge**: una plataforma web abierta que usa datos de radar
de la misión **NASA-ISRO NISAR** para mostrar los cambios en el territorio de **Izabal, Guatemala**
(minería, palma africana, bosques y humedales) de una forma que **cualquier persona** pueda entender.

## Objetivos

- Mostrar los cambios de superficie con un mapa interactivo y una línea de tiempo.
- Explicar la ciencia con lenguaje sencillo, íconos y colores claros.
- Ofrecer la información en los idiomas de Izabal (español, Q'eqchi', Garífuna) y narración en voz alta.
- Permitir que investigadores y comunidades suban nuevos datos de forma colaborativa.

## Estructura

```
├── index.html        Inicio
├── mapa.html         Mapa interactivo con capas y línea de tiempo
├── aprende.html      Explicación sencilla de NISAR, radar y glosario
├── contribuir.html   Formulario para subir datos
├── css/
│   └── styles.css    Estilos (la paleta de colores está en :root)
└── js/
    ├── datos.js      Zonas y capas del mapa (datos de ejemplo)
    ├── mapa.js       Mapa con Leaflet
    ├── i18n.js       Traducciones de la interfaz
    └── main.js       Menú, idioma, narración y formulario
```

## Cómo verlo

Abre `index.html` en el navegador, o levanta un servidor local:

```bash
python3 -m http.server 8000
```

y entra a http://localhost:8000.

## Cambiar los colores

Toda la paleta está en las variables de `css/styles.css` → sección **1. Paleta de colores**.
Cambia esos valores y se aplican en todo el sitio.

## Pendiente

- [ ] Paleta de colores final
- [ ] Conectar datos reales de NISAR (y Sentinel-1 como referencia)
- [ ] Traducciones a Q'eqchi' y Garífuna con hablantes de la comunidad
- [ ] Backend para recibir los aportes del formulario
- [ ] Vista "antes y después" de imágenes de radar

## Tecnologías

HTML, CSS y JavaScript sin frameworks · [Leaflet](https://leafletjs.com/) para el mapa ·
Web Speech API para la narración.
