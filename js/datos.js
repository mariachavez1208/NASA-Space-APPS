/* Datos de EJEMPLO para el prototipo.
   Ubicaciones aproximadas y textos ilustrativos: reemplazar con
   resultados reales del procesamiento de datos NISAR. */

const CAPAS = {
  mineria: { nombre: "Minería",          icono: "⛏️", color: "#c0533a" },
  palma:   { nombre: "Palma africana",   icono: "🌴", color: "#e0a43a" },
  bosque:  { nombre: "Pérdida de bosque", icono: "🌳", color: "#1f5f4a" },
  agua:    { nombre: "Agua y humedales", icono: "💧", color: "#2a8c9e" }
};

const ZONAS = [
  {
    capa: "mineria",
    nombre: "El Estor",
    coords: [15.53, -89.34],
    desde: 2016,
    texto: "Cerca de El Estor el radar muestra suelo removido en zonas de extracción, junto a la orilla del lago de Izabal."
  },
  {
    capa: "palma",
    nombre: "Valle del Polochic",
    coords: [15.45, -89.48],
    desde: 2018,
    texto: "Áreas que antes eran bosque o potrero aparecen ahora como plantaciones ordenadas en filas."
  },
  {
    capa: "palma",
    nombre: "Morales",
    coords: [15.48, -88.82],
    desde: 2020,
    texto: "El radar detecta un cambio en la textura del suelo típico de nuevas plantaciones."
  },
  {
    capa: "bosque",
    nombre: "Sierra de Santa Cruz",
    coords: [15.62, -89.05],
    desde: 2017,
    texto: "Parches de bosque que ya no devuelven el mismo eco que antes: señal de árboles cortados."
  },
  {
    capa: "agua",
    nombre: "Río Dulce",
    coords: [15.66, -88.99],
    desde: 2016,
    texto: "Humedales a la orilla del río cuya extensión cambia entre la época seca y la lluviosa."
  },
  {
    capa: "agua",
    nombre: "Desembocadura del Polochic",
    coords: [15.43, -89.30],
    desde: 2019,
    texto: "Zona de humedales donde el río entra al lago; el radar muestra cambios en las áreas inundadas."
  }
];
