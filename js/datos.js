/* =========================================================
   Datos del mapa
   Fuente: búsqueda en ASF Data Pool (data/asf-escenas-2026-11-14.csv)
   e imágenes de vista previa descargadas por el equipo.
   Todos los textos visibles van en { es, en } (y kek cuando hay palabra verificada).
   ========================================================= */

/* Categorías de lugares (colores de la leyenda) */
const CAPAS = {
  mineria: { icono: "⛏️", color: "#c0533a", nombre: { es: "Minería", en: "Mining", kek: "Miin" } },
  palma:   { icono: "🌴", color: "#e0a43a", nombre: { es: "Palma africana", en: "Oil palm", kek: "Kala' (palma africana)" } },
  bosque:  { icono: "🌳", color: "#1f5f4a", nombre: { es: "Bosques", en: "Forests", kek: "K'iche'" } },
  agua:    { icono: "💧", color: "#2a8c9e", nombre: { es: "Agua y humedales", en: "Water and wetlands", kek: "Ha', saab'" } }
};

/* Lugares para observar en las imágenes (ubicaciones aproximadas) */
const LUGARES = [
  {
    capa: "mineria",
    coords: [15.53, -89.34],
    nombre: { es: "El Estor", en: "El Estor" },
    texto: {
      es: "Zona con actividad minera junto al lago de Izabal. En la imagen de radar, busca áreas sin vegetación (tonos amarillos o naranjas) cerca de la orilla.",
      en: "Area with mining activity next to Lake Izabal. In the radar image, look for areas without vegetation (yellow or orange tones) near the shore."
    }
  },
  {
    capa: "palma",
    coords: [15.45, -89.48],
    nombre: { es: "Valle del Polochic", en: "Polochic Valley" },
    texto: {
      es: "Valle con plantaciones de palma africana. Las plantaciones se ven como parches de textura pareja, distinta a la de la selva.",
      en: "Valley with oil palm plantations. Plantations look like patches with an even texture, different from the rainforest."
    }
  },
  {
    capa: "bosque",
    coords: [15.62, -89.05],
    nombre: { es: "Sierra de Santa Cruz", en: "Sierra de Santa Cruz" },
    texto: {
      es: "Zona boscosa al norte del lago. Comparar imágenes de distintas fechas ayuda a ver si el bosque se ha reducido.",
      en: "Forested area north of the lake. Comparing images from different dates helps show whether the forest has shrunk."
    }
  },
  {
    capa: "agua",
    coords: [15.55, -89.15],
    nombre: { es: "Lago de Izabal", en: "Lake Izabal" },
    texto: {
      es: "El lago más grande de Guatemala. En el radar el agua se ve azul oscuro porque refleja muy poco eco.",
      en: "The largest lake in Guatemala. Water looks dark blue in radar because it sends back very little echo."
    }
  },
  {
    capa: "agua",
    coords: [15.43, -89.30],
    nombre: { es: "Desembocadura del Polochic", en: "Polochic River mouth" },
    texto: {
      es: "Humedales donde el río entra al lago. Su extensión cambia entre la época seca y la lluviosa.",
      en: "Wetlands where the river enters the lake. Their size changes between the dry and rainy seasons."
    }
  },
  {
    capa: "agua",
    coords: [15.66, -88.99],
    nombre: { es: "Río Dulce", en: "Río Dulce" },
    texto: {
      es: "Río que conecta el lago de Izabal con el mar Caribe, rodeado de humedales y manglares.",
      en: "River that connects Lake Izabal to the Caribbean Sea, surrounded by wetlands and mangroves."
    }
  }
];

/* Imágenes de radar que se pueden poner sobre el mapa.
   Los límites salen de las esquinas de cada escena en el CSV de ASF,
   así que la ubicación es aproximada. */
const IMAGENES_MAPA = [
  {
    id: "s1-2016-02",
    archivo: "img/radar/sentinel1_2016-02-14.webp",
    satelite: "Sentinel-1A",
    fecha: "2016-02-14",
    limites: [[14.274779, -90.242897], [16.216314, -87.630264]],
    titulo: { es: "Sentinel-1 · 14 feb 2016 · Izabal", en: "Sentinel-1 · Feb 14, 2016 · Izabal" }
  },
  {
    id: "s1-2016-09",
    archivo: "img/radar/sentinel1_2016-09-29.webp",
    satelite: "Sentinel-1A",
    fecha: "2016-09-29",
    limites: [[15.28476, -90.452293], [17.226063, -87.828682]],
    titulo: { es: "Sentinel-1 · 29 sep 2016 · Norte de Izabal y Petén", en: "Sentinel-1 · Sep 29, 2016 · North Izabal and Petén" }
  }
];

/* Galería de imágenes (incluye NISAR, que no trae coordenadas en el CSV) */
const GALERIA = [
  {
    archivo: "img/radar/nisar_gcov_2026-11-02.webp",
    satelite: "NISAR (L-SAR)",
    fecha: "2026-11-02",
    titulo: { es: "NISAR · Cobertura del suelo (GCOV)", en: "NISAR · Land cover (GCOV)" },
    texto: {
      es: "Imagen del radar NISAR que muestra qué cubre el suelo. Verde claro: vegetación densa. Rosado o morado: terrenos más abiertos como campos y poblados. Negro: agua o zonas sin datos.",
      en: "NISAR radar image showing what covers the ground. Light green: dense vegetation. Pink or purple: more open land such as fields and towns. Black: water or areas without data."
    }
  },
  {
    archivo: "img/radar/nisar_gslc_2026-11-02.webp",
    satelite: "NISAR (L-SAR)",
    fecha: "2026-11-02",
    titulo: { es: "NISAR · Relieve y textura (GSLC)", en: "NISAR · Terrain and texture (GSLC)" },
    texto: {
      es: "La misma zona, procesada para resaltar el relieve: se notan montañas, valles y ríos. Este tipo de dato sirve para medir movimientos del suelo comparando fechas.",
      en: "The same area, processed to highlight the terrain: you can see mountains, valleys and rivers. This kind of data is used to measure ground movement by comparing dates."
    }
  },
  {
    archivo: "img/radar/sentinel1_2016-02-14.webp",
    satelite: "Sentinel-1A (C-SAR)",
    fecha: "2016-02-14",
    titulo: { es: "Sentinel-1 · Lago de Izabal en 2016", en: "Sentinel-1 · Lake Izabal in 2016" },
    texto: {
      es: "Imagen de referencia de 2016. Azul oscuro: el lago de Izabal y la bahía de Amatique. Verde: vegetación. Amarillo y naranja: suelo más descubierto, cultivos o poblados.",
      en: "Reference image from 2016. Dark blue: Lake Izabal and Amatique Bay. Green: vegetation. Yellow and orange: barer ground, crops or towns."
    }
  },
  {
    archivo: "img/radar/sentinel1_2016-09-29.webp",
    satelite: "Sentinel-1A (C-SAR)",
    fecha: "2016-09-29",
    titulo: { es: "Sentinel-1 · Costa del Caribe en 2016", en: "Sentinel-1 · Caribbean coast in 2016" },
    texto: {
      es: "Zona al norte, con la costa del Caribe a la derecha. Los parches cuadrados de color distinto suelen ser terrenos agrícolas.",
      en: "Area to the north, with the Caribbean coast on the right. Square patches of a different color are usually farmland."
    }
  }
];

/* Escenas encontradas en ASF (del CSV) */
const ESCENAS = [
  { satelite: "NISAR", producto: "GSLC", fecha: "2026-11-02", orbita: "134 A", tam: 22570,
    url: "https://nisar.asf.earthdatacloud.nasa.gov/NISAR/NISAR_L2_GSLC_V1/NISAR_L2_PR_GSLC_034_134_A_009_4005_DHDH_A_20261102T113113_20261102T113148_P05036_N_F_J_001/NISAR_L2_PR_GSLC_034_134_A_009_4005_DHDH_A_20261102T113113_20261102T113148_P05036_N_F_J_001.h5" },
  { satelite: "NISAR", producto: "GSLC", fecha: "2026-11-02", orbita: "127 D", tam: 24218,
    url: "https://nisar.asf.earthdatacloud.nasa.gov/NISAR/NISAR_L2_GSLC_V1/NISAR_L2_PR_GSLC_034_127_D_081_4005_DHDH_A_20261102T003259_20261102T003337_P05036_N_F_J_001/NISAR_L2_PR_GSLC_034_127_D_081_4005_DHDH_A_20261102T003259_20261102T003337_P05036_N_F_J_001.h5" },
  { satelite: "NISAR", producto: "GSLC", fecha: "2026-10-21", orbita: "134 A", tam: 22549,
    url: "https://nisar.asf.earthdatacloud.nasa.gov/NISAR/NISAR_L2_GSLC_PROVISIONAL_V1/NISAR_L2_PR_GSLC_033_134_A_009_4005_DHDH_A_20261021T113113_20261021T113148_P05023_N_F_J_001/NISAR_L2_PR_GSLC_033_134_A_009_4005_DHDH_A_20261021T113113_20261021T113148_P05023_N_F_J_001.h5" },
  { satelite: "Sentinel-1A", producto: "GRD_HD", fecha: "2016-09-29", orbita: "63 A", tam: 998,
    url: "https://datapool.asf.alaska.edu/GRD_HD/SA/S1A_IW_GRDH_1SDV_20160929T000617_20160929T000642_013260_0151DE_2FDD.zip",
    esquinas: [[15.28476, -90.134392], [15.719316, -87.828682], [17.226063, -88.128342], [16.795031, -90.452293]] },
  { satelite: "Sentinel-1A", producto: "GRD_HD", fecha: "2016-09-29", orbita: "63 A", tam: 1027,
    url: "https://datapool.asf.alaska.edu/GRD_HD/SA/S1A_IW_GRDH_1SDV_20160929T000552_20160929T000617_013260_0151DE_EDA7.zip",
    esquinas: [[13.7731, -89.822708], [14.211246, -87.533905], [15.719185, -87.828888], [15.28466, -90.134422]] },
  { satelite: "Sentinel-1A", producto: "GRD_HD", fecha: "2016-05-08", orbita: "63 A", tam: 1012,
    url: "https://datapool.asf.alaska.edu/GRD_HD/SA/S1A_IW_GRDH_1SDV_20160508T000547_20160508T000612_011160_010D8A_4A8A.zip",
    esquinas: [[13.939706, -89.857094], [14.376962, -87.569244], [15.885274, -87.861748], [15.451714, -90.166183]] },
  { satelite: "Sentinel-1A", producto: "GRD_HD", fecha: "2016-02-14", orbita: "63 A", tam: 1006,
    url: "https://datapool.asf.alaska.edu/GRD_HD/SA/S1A_IW_GRDH_1SDV_20160214T000550_20160214T000615_009935_00E957_E218.zip",
    esquinas: [[14.274779, -89.9189], [14.710688, -87.630264], [16.216314, -87.936996], [15.783858, -90.242897]] }
];
