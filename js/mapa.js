/* Mapa interactivo (Leaflet), galería y tabla de escenas.
   Funciona en index.html (#mapa-preview) y en mapa.html (#mapa). */

(function () {
  const contenedor = document.getElementById("mapa") || document.getElementById("mapa-preview");
  const esPreview = contenedor && contenedor.id === "mapa-preview";

  /* ================= MAPA ================= */
  let mapa, grupos = {}, capaImagen = null, capaHuellas = null;

  if (contenedor && typeof L !== "undefined") {
    mapa = L.map(contenedor, { scrollWheelZoom: false }).setView([15.55, -89.1], 9);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · Radar: ESA Sentinel-1 / NASA-ISRO NISAR vía ASF'
    }).addTo(mapa);

    Object.keys(CAPAS).forEach((clave) => {
      grupos[clave] = L.layerGroup().addTo(mapa);
    });

    // Huellas (área que cubre cada escena de Sentinel-1)
    capaHuellas = L.layerGroup();
    ESCENAS.filter((e) => e.esquinas).forEach((e) => {
      L.polygon(e.esquinas, { color: "#2a8c9e", weight: 2, fill: false, dashArray: "6 6" })
        .bindTooltip(`${e.satelite} · ${e.fecha}`)
        .addTo(capaHuellas);
    });

    // En la página de inicio se muestra la imagen de 2016 desde el principio
    if (esPreview) ponerImagen("s1-2016-02");
  }

  function ponerImagen(id) {
    if (!mapa) return;
    if (capaImagen) mapa.removeLayer(capaImagen);
    capaImagen = null;
    const img = IMAGENES_MAPA.find((i) => i.id === id);
    if (!img) return;
    const opacidad = document.getElementById("opacidad");
    capaImagen = L.imageOverlay(img.archivo, img.limites, {
      opacity: opacidad ? Number(opacidad.value) : 0.75,
      alt: tObj(img.titulo)
    }).addTo(mapa);
    capaImagen.bringToBack();
  }

  function dibujarLugares() {
    if (!mapa) return;
    Object.values(grupos).forEach((g) => g.clearLayers());
    LUGARES.forEach((z) => {
      const capa = CAPAS[z.capa];
      const nombre = tObj(z.nombre);
      const texto = tObj(z.texto);
      L.circleMarker(z.coords, {
        radius: 11, color: "#fff", weight: 2, fillColor: capa.color, fillOpacity: 0.95
      })
        .bindPopup(
          `<strong>${capa.icono} ${nombre}</strong><br>` +
          `<em>${tObj(capa.nombre)}</em><p>${texto}</p>` +
          `<button class="boton-escuchar" data-texto="${nombre}. ${texto}">${t("comun.escuchar")}</button>`
        )
        .addTo(grupos[z.capa]);
    });
  }

  function dibujarLeyenda() {
    const leyenda = document.getElementById("leyenda");
    if (!leyenda) return;
    leyenda.innerHTML = Object.values(CAPAS)
      .map((c) => `<span><i class="capa__color" style="background:${c.color}"></i>${c.icono} ${tObj(c.nombre)}</span>`)
      .join("");
  }

  /* Panel de opciones (solo en mapa.html) */
  function dibujarPanel() {
    const lista = document.getElementById("lista-capas");
    if (lista) {
      const marcadas = {};
      lista.querySelectorAll("input").forEach((i) => (marcadas[i.value] = i.checked));
      lista.innerHTML = "";
      Object.entries(CAPAS).forEach(([clave, c]) => {
        const label = document.createElement("label");
        label.className = "capa";
        const activo = marcadas[clave] !== false;
        label.innerHTML =
          `<input type="checkbox" ${activo ? "checked" : ""} value="${clave}">` +
          `<i class="capa__color" style="background:${c.color}"></i> ${c.icono} ${tObj(c.nombre)}`;
        label.querySelector("input").addEventListener("change", (e) => {
          if (e.target.checked) grupos[clave].addTo(mapa);
          else mapa.removeLayer(grupos[clave]);
        });
        lista.appendChild(label);
      });
    }

    const radios = document.getElementById("lista-imagenes");
    if (radios) {
      const marcada = radios.querySelector("input:checked");
      const elegida = marcada ? marcada.value : "s1-2016-02";
      radios.innerHTML = "";
      [{ id: "", titulo: null }, ...IMAGENES_MAPA].forEach((img) => {
        const label = document.createElement("label");
        label.className = "capa";
        const texto = img.titulo ? tObj(img.titulo) : t("mapa.ninguna");
        label.innerHTML = `<input type="radio" name="imagen" value="${img.id}" ${img.id === elegida ? "checked" : ""}> ${texto}`;
        label.querySelector("input").addEventListener("change", () => ponerImagen(img.id));
        radios.appendChild(label);
      });
      if (!capaImagen && elegida) ponerImagen(elegida);
    }
  }

  const opacidad = document.getElementById("opacidad");
  if (opacidad) {
    opacidad.addEventListener("input", () => {
      if (capaImagen) capaImagen.setOpacity(Number(opacidad.value));
    });
  }

  const huellas = document.getElementById("ver-huellas");
  if (huellas) {
    huellas.addEventListener("change", () => {
      if (huellas.checked) capaHuellas.addTo(mapa);
      else mapa.removeLayer(capaHuellas);
    });
  }

  /* ================= GALERÍA ================= */
  function dibujarGaleria() {
    const galeria = document.getElementById("galeria");
    if (!galeria) return;
    galeria.innerHTML = GALERIA.map((g, i) => `
      <figure class="tarjeta imagen-radar" id="radar-${i}">
        <a href="${g.archivo}" target="_blank" rel="noopener">
          <img src="${g.archivo}" alt="${tObj(g.titulo)}">
        </a>
        <figcaption>
          <h3>${tObj(g.titulo)}</h3>
          <p class="imagen-radar__meta">${t("galeria.satelite")}: ${g.satelite} · ${t("galeria.fecha")}: ${g.fecha}</p>
          <p>${tObj(g.texto)}</p>
          <button class="boton-escuchar" data-leer="#radar-${i} figcaption" aria-pressed="false">${t("comun.escuchar")}</button>
        </figcaption>
      </figure>`).join("");
  }

  /* ================= TABLA DE ESCENAS ================= */
  function dibujarEscenas() {
    const cuerpo = document.getElementById("tabla-escenas");
    if (!cuerpo) return;
    const formato = new Intl.NumberFormat(IDIOMA_ACTUAL === "en" ? "en-US" : "es-GT");
    cuerpo.innerHTML = ESCENAS.map((e) => `
      <tr>
        <td>${e.satelite}</td>
        <td>${e.producto}</td>
        <td>${e.fecha}</td>
        <td>${e.orbita}</td>
        <td>${formato.format(e.tam)} MB</td>
        <td><a href="${e.url}" target="_blank" rel="noopener">${t("escenas.enlace")}</a></td>
      </tr>`).join("");
  }

  /* ================= Redibujar al cambiar idioma ================= */
  function redibujar() {
    dibujarLugares();
    dibujarLeyenda();
    dibujarPanel();
    dibujarGaleria();
    dibujarEscenas();
  }
  document.addEventListener("idioma-cambiado", redibujar);
})();
