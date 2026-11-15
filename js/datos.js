/* =========================================================
   Datos del mapa
   Fuente: búsqueda en ASF Data Pool (data/asf-escenas-2026-11-14.csv)
   e imágenes de vista previa descargadas por el equipo.
   Todos los textos visibles van en { es, en } más kek y cak (traducción preliminar).
   ========================================================= */

/* Categorías de lugares (colores de la leyenda) */
const CAPAS = {
  mineria: { icono: "⛏️", color: "#c0533a", nombre: { es: "Minería", en: "Mining", kek: "Miin", cak: "Ya'ab'ajb'äl" } },
  palma:   { icono: "🌴", color: "#e0a43a", nombre: { es: "Palma africana", en: "Oil palm", kek: "Kala' (palma africana)", cak: "Tut (palma africana)" } },
  bosque:  { icono: "🌳", color: "#1f5f4a", nombre: { es: "Bosques", en: "Forests", kek: "K'iche'", cak: "K'ichelaj" } },
  agua:    { icono: "💧", color: "#2a8c9e", nombre: { es: "Agua y humedales", en: "Water and wetlands", kek: "Ha', saab'", cak: "Ya', saq'oq'" } }
};

/* Lugares para observar en las imágenes (ubicaciones aproximadas) */
const LUGARES = [
  {
    capa: "mineria",
    coords: [15.53, -89.34],
    nombre: { es: "El Estor", en: "El Estor" },
    texto: {
      es: "Zona con actividad minera junto al lago de Izabal. En la imagen de radar, busca áreas sin vegetación (tonos amarillos o naranjas) cerca de la orilla.",
      en: "Area with mining activity next to Lake Izabal. In the radar image, look for areas without vegetation (yellow or orange tones) near the shore.",
      kek: "Na'ajej b'ar wan k'anjel re miin chixk'atq li palaw re Izabal. Sa' li jalam'uuch re aj eec chiliich', sik'ok li na'ajej maak'a' xpim (q'an malaj kaq q'an) chixk'atq xtoon li palaw.",
      cak: "K'ojlib'äl akuchi' k'o ya'ab'ajb'äl chunaqaj ri choy richin Izabal. Pa ri wachib'äl richin ilob'äl, takanoj ulew majun q'ayïs (q'än o kaqq'än) chunaqaj ruchi' ri choy."
    }
  },
  {
    capa: "palma",
    coords: [15.45, -89.48],
    nombre: { es: "Valle del Polochic", en: "Polochic Valley" },
    texto: {
      es: "Valle con plantaciones de palma africana. Las plantaciones se ven como parches de textura pareja, distinta a la de la selva.",
      en: "Valley with oil palm plantations. Plantations look like patches with an even texture, different from the rainforest.",
      kek: "Ru takeel b'ar wan awk kala'. Li awk kala' nake'ilman jo' xtoqob'aal juntaq'eet ru, jalan chiru li k'iche'.",
      cak: "Taq'aj akuchi' k'o tiko'n tut. Ri tiko'n tut yetz'et achi'el taq k'ojlib'äl junam kiwäch, jalajöj chuwäch ri k'ichelaj."
    }
  },
  {
    capa: "bosque",
    coords: [15.62, -89.05],
    nombre: { es: "Sierra de Santa Cruz", en: "Sierra de Santa Cruz" },
    texto: {
      es: "Zona boscosa al norte del lago. Comparar imágenes de distintas fechas ayuda a ver si el bosque se ha reducido.",
      en: "Forested area north of the lake. Comparing images from different dates helps show whether the forest has shrunk.",
      kek: "Na'ajej wan k'iche' wi' chixk'atq li palaw. Xjuntaq'eetankil li jalam'uuch re jalan jalanq kutan naxtenq'a re rilb'al wi xch'inaak li k'iche'.",
      cak: "K'ojlib'äl k'o k'ichelaj chunaqaj ri choy. Rujunamaxik taq wachib'äl richin jalajöj rajilab'al q'ij nuto' richin natz'ët we xch'utinär ri k'ichelaj."
    }
  },
  {
    capa: "agua",
    coords: [15.55, -89.15],
    nombre: { es: "Lago de Izabal", en: "Lake Izabal" },
    texto: {
      es: "El lago más grande de Guatemala. En el radar el agua se ve azul oscuro porque refleja muy poco eco.",
      en: "The largest lake in Guatemala. Water looks dark blue in radar because it sends back very little echo.",
      kek: "Li palaw q'axal nim sa' Guatemala. Sa' li aj eec chiliich' li ha' naxk'ut rib' rax q'eq xb'aan naq ka'ch'in ajwi' xyaab' nasutq'iik.",
      cak: "Ri choy janila nïm pa Iximulew. Pa ri ilob'äl ri ya' nitz'et räx q'equ'm ruma jub'a' ok ruch'ab'äl ntzolin pe."
    }
  },
  {
    capa: "agua",
    coords: [15.43, -89.30],
    nombre: { es: "Desembocadura del Polochic", en: "Polochic River mouth" },
    texto: {
      es: "Humedales donde el río entra al lago. Su extensión cambia entre la época seca y la lluviosa.",
      en: "Wetlands where the river enters the lake. Their size changes between the dry and rainy seasons.",
      kek: "Saab' b'ar nanumta li nima' sa' li palaw. Xnimal najala sa' li saq'ehil ut sa' li hab'alq'e.",
      cak: "Saq'oq' akuchi' ri raqän ya' nok pa ri choy. Runimilem nijalatäj pa ri saqij chuqa' pa ri job'."
    }
  },
  {
    capa: "agua",
    coords: [15.66, -88.99],
    nombre: { es: "Río Dulce", en: "Río Dulce" },
    texto: {
      es: "Río que conecta el lago de Izabal con el mar Caribe, rodeado de humedales y manglares.",
      en: "River that connects Lake Izabal to the Caribbean Sea, surrounded by wetlands and mangroves.",
      kek: "Nima' naxjunaji li palaw re Izabal rik'in li palaw Caribe, sutsu rik'in saab' ut manglar.",
      cak: "Raqän ya' nuxim ri choy richin Izabal rik'in ri mar Caribe, k'o saq'oq' chuqa' manglar chirij."
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
    titulo: { es: "Sentinel-1 · 14 feb 2016 · Izabal", en: "Sentinel-1 · Feb 14, 2016 · Izabal", kek: "Sentinel-1 · 2016-02-14 · Izabal", cak: "Sentinel-1 · 2016-02-14 · Izabal" }
  },
  {
    id: "s1-2016-09",
    archivo: "img/radar/sentinel1_2016-09-29.webp",
    satelite: "Sentinel-1A",
    fecha: "2016-09-29",
    limites: [[15.28476, -90.452293], [17.226063, -87.828682]],
    titulo: { es: "Sentinel-1 · 29 sep 2016 · Norte de Izabal y Petén", en: "Sentinel-1 · Sep 29, 2016 · North Izabal and Petén", kek: "Sentinel-1 · 2016-09-29 · Izabal ut Petén", cak: "Sentinel-1 · 2016-09-29 · Izabal chuqa' Petén" }
  }
];

/* Galería de imágenes (incluye NISAR, que no trae coordenadas en el CSV) */
const GALERIA = [
  {
    archivo: "img/radar/nisar_gcov_2026-11-02.webp",
    satelite: "NISAR (L-SAR)",
    fecha: "2026-11-02",
    titulo: { es: "NISAR · Cobertura del suelo (GCOV)", en: "NISAR · Land cover (GCOV)", kek: "NISAR · K'a'ru wan sa' xb'een li ch'och' (GCOV)", cak: "NISAR · Achike k'o chuwäch ri ulew (GCOV)" },
    texto: {
      es: "Imagen del radar NISAR que muestra qué cubre el suelo. Verde claro: vegetación densa. Rosado o morado: terrenos más abiertos como campos y poblados. Negro: agua o zonas sin datos.",
      en: "NISAR radar image showing what covers the ground. Light green: dense vegetation. Pink or purple: more open land such as fields and towns. Black: water or areas without data.",
      kek: "Jalam'uuch re li aj eec chiliich' NISAR naxk'ut k'a'ru wan sa' xb'een li ch'och'. Rax saq: k'iila pim ut che'. Kaq saq malaj puur: ch'och' jaqjo jo' awk ut tenamit. Q'eq: ha' malaj na'ajej maak'a' xesil.",
      cak: "Wachib'äl richin ri ilob'äl NISAR nuk'üt achike k'o chuwäch ri ulew. Räx saq: k'ïy q'ayïs. Kaqsäq o tuq': jaqäl taq ulew achi'el tiko'n chuqa' tinamit. Q'ëq: ya' o k'ojlib'äl majun etal."
    }
  },
  {
    archivo: "img/radar/nisar_gslc_2026-11-02.webp",
    satelite: "NISAR (L-SAR)",
    fecha: "2026-11-02",
    titulo: { es: "NISAR · Relieve y textura (GSLC)", en: "NISAR · Terrain and texture (GSLC)", kek: "NISAR · Tzuul ut ru li ch'och' (GSLC)", cak: "NISAR · Juyu' chuqa' ruwäch ri ulew (GSLC)" },
    texto: {
      es: "La misma zona, procesada para resaltar el relieve: se notan montañas, valles y ríos. Este tipo de dato sirve para medir movimientos del suelo comparando fechas.",
      en: "The same area, processed to highlight the terrain: you can see mountains, valleys and rivers. This kind of data is used to measure ground movement by comparing dates.",
      kek: "Li na'ajej a'an ajwi', b'anb'il re xk'utb'al li tzuul: nake'ilman li tzuul, li ru takeel ut li nima'. Li esil a'in naru naqoksi re xb'isb'al chan ru naxsiksi rib' li ch'och' naq naqjuntaq'eeta li kutan.",
      cak: "Ri k'ojlib'äl re', xb'an richin nuk'üt ri juyu': yetz'et ri juyu', ri taq'aj chuqa' ri raqän ya'. Re etal re' nik'atzin richin nqetaj achike rub'eyal nisilon ri ulew toq yeqajunamaj rajilab'al q'ij."
    }
  },
  {
    archivo: "img/radar/sentinel1_2016-02-14.webp",
    satelite: "Sentinel-1A (C-SAR)",
    fecha: "2016-02-14",
    titulo: { es: "Sentinel-1 · Lago de Izabal en 2016", en: "Sentinel-1 · Lake Izabal in 2016", kek: "Sentinel-1 · Li palaw re Izabal sa' 2016", cak: "Sentinel-1 · Ri choy richin Izabal pa 2016" },
    texto: {
      es: "Imagen de referencia de 2016. Azul oscuro: el lago de Izabal y la bahía de Amatique. Verde: vegetación. Amarillo y naranja: suelo más descubierto, cultivos o poblados.",
      en: "Reference image from 2016. Dark blue: Lake Izabal and Amatique Bay. Green: vegetation. Yellow and orange: barer ground, crops or towns.",
      kek: "Jalam'uuch re 2016 re xjuntaq'eetankil. Rax q'eq: li palaw re Izabal ut li bahía re Amatique. Rax: pim ut che'. Q'an ut kaq q'an: ch'och' maak'a' xpim, awk malaj tenamit.",
      cak: "Wachib'äl richin 2016 richin nqajunamaj. Räx q'equ'm: ri choy richin Izabal chuqa' ri bahía richin Amatique. Räx: q'ayïs. Q'än chuqa' kaqq'än: ulew majun q'ayïs, tiko'n o tinamit."
    }
  },
  {
    archivo: "img/radar/sentinel1_2016-09-29.webp",
    satelite: "Sentinel-1A (C-SAR)",
    fecha: "2016-09-29",
    titulo: { es: "Sentinel-1 · Costa del Caribe en 2016", en: "Sentinel-1 · Caribbean coast in 2016", kek: "Sentinel-1 · Xtoon li palaw Caribe sa' 2016", cak: "Sentinel-1 · Rutaq'aj ri Caribe pa 2016" },
    texto: {
      es: "Zona al norte, con la costa del Caribe a la derecha. Los parches cuadrados de color distinto suelen ser terrenos agrícolas.",
      en: "Area to the north, with the Caribbean coast on the right. Square patches of a different color are usually farmland.",
      kek: "Jun chik na'ajej, ut xtoon li palaw Caribe sa' xnim. Li xtoqob'aal kaaxukutil jalan xb'onol, kaw re naq awk.",
      cak: "Jun chik k'ojlib'äl, ruchi' ri Caribe pa ri ajkiq'a'. Ri kajxukutäl taq k'ojlib'äl jalajöj kib'onil, k'a e tiko'n."
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
