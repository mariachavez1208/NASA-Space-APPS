# 🛰️ Behind the Green

Proyecto para el **NASA Space Apps Challenge**: una plataforma web abierta que usa datos de radar
de la misión **NASA-ISRO NISAR** para mostrar los cambios en el territorio de **Izabal, Guatemala**
(minería, palma africana, bosques y humedales) de una forma que **cualquier persona** pueda entender.

## Objetivos

- Mostrar los cambios de superficie con un mapa interactivo y una línea de tiempo.
- Explicar la ciencia con lenguaje sencillo, íconos y colores claros.
- Sitio en inglés con opción de español, Q'eqchi' y Kaqchikel (parcial), narración en voz alta y, a futuro, Garífuna.
- Permitir que investigadores y comunidades suban nuevos datos de forma colaborativa.

## Estructura

```
├── index.html        Inicio
├── mapa.html         Mapa interactivo con capas y línea de tiempo
├── aprende.html      Explicación sencilla de NISAR, radar y glosario
├── contribuir.html   Formulario para subir datos
├── css/
│   └── styles.css    Estilos (la paleta de colores está en :root)
├── data/
│   └── asf-escenas-2026-11-14.csv   Escenas NISAR y Sentinel-1 encontradas en ASF
├── img/radar/        Vistas previas de radar optimizadas (WebP)
└── js/
    ├── datos.js      Lugares, imágenes del mapa, galería y escenas
    ├── mapa.js       Mapa (Leaflet), galería y tabla de escenas
    ├── i18n.js       Traducciones (inglés, español, Q'eqchi', Kaqchikel)
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

## Datos

- **NISAR (L-SAR)**: escenas GSLC de octubre y noviembre de 2026 (órbitas 134 ascendente y 127 descendente).
  Las vistas previas GCOV y GSLC del 2 de noviembre de 2026 están en la galería.
- **Sentinel-1A (C-SAR)**: escenas GRD de 2016 como referencia de "antes". Las de febrero y septiembre
  se pueden poner encima del mapa; su ubicación se calcula con las esquinas que trae el CSV, así que es aproximada.
- Los archivos originales (.h5 / .zip, de 1 a 24 GB) no están en el repo; la tabla del mapa enlaza a ASF.

## Idiomas

El sitio está **en inglés por defecto**. Los botones **EN · ES · Q'EQ · KAQ** del encabezado cambian la página
a inglés, español, Q'eqchi' o Kaqchikel, y la elección se recuerda al pasar a otras páginas.

- Todos los textos están en `js/i18n.js` (`en`, `es`, `kek` y `cak`). En el HTML se marcan con `data-i18n="clave"`.
- Para agregar un texto nuevo: escríbelo en inglés en el HTML con su `data-i18n` y agrega la clave en `en` y `es`.
- **Q'eqchi' (`kek`)**: solo menú, títulos y palabras clave, verificados en el vocabulario
  *Ch'ina Tusleb' Aatin Q'eqchi' – Kaxlan Aatin* (Carlos H. Cu Cab y Mario R. Cu Cab, Universidad Rafael Landívar, 1998).
  Lo que no tiene traducción en `kek` se muestra en español, con un aviso arriba de la página.
  Los párrafos completos deben traducirlos o revisarlos hablantes de Q'eqchi'.
- **Kaqchikel (`cak`)**: menú, títulos y palabras clave, verificados en
  *Kaqchikel choltzij, kolon chuqa' k'ak'a' taq tzij* (Kaqchikel Cholchi', Academia de Lenguas Mayas de Guatemala).
  Funciona igual que Q'eqchi': lo que no tiene traducción se muestra en español, con aviso.

## Pendiente

- [ ] Paleta de colores final
- [ ] Procesar los archivos NISAR completos para detectar cambios (no solo vistas previas)
- [ ] Párrafos completos en Q'eqchi' y Kaqchikel revisados por hablantes de la comunidad
- [ ] Traducción a Garífuna
- [ ] Backend para recibir los aportes del formulario
- [ ] Vista "antes y después" de imágenes de radar

## Tecnologías

HTML, CSS y JavaScript sin frameworks · [Leaflet](https://leafletjs.com/) para el mapa ·
Web Speech API para la narración.
