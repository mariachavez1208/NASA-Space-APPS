/* Mapa interactivo con Leaflet.
   Funciona en index.html (#mapa-preview) y en mapa.html (#mapa). */

(function () {
  const contenedor = document.getElementById("mapa") || document.getElementById("mapa-preview");
  if (!contenedor || typeof L === "undefined") return;

  const mapa = L.map(contenedor, { scrollWheelZoom: false }).setView([15.55, -89.05], 9);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapa);

  // Un grupo de marcadores por capa
  const grupos = {};
  Object.keys(CAPAS).forEach((clave) => {
    grupos[clave] = L.layerGroup().addTo(mapa);
  });

  const anioInput = document.getElementById("anio");
  const anioValor = document.getElementById("anio-valor");

  function dibujar() {
    const anio = anioInput ? Number(anioInput.value) : 2026;
    Object.values(grupos).forEach((g) => g.clearLayers());

    ZONAS.filter((z) => z.desde <= anio).forEach((z) => {
      const capa = CAPAS[z.capa];
      L.circleMarker(z.coords, {
        radius: 12,
        color: "#fff",
        weight: 2,
        fillColor: capa.color,
        fillOpacity: 0.9
      })
        .bindPopup(
          `<strong>${capa.icono} ${z.nombre}</strong><br>` +
          `<em>${capa.nombre} · desde ${z.desde}</em><p>${z.texto}</p>` +
          `<button class="boton-escuchar" data-texto="${z.nombre}. ${z.texto}">🔊 Escuchar</button>`
        )
        .addTo(grupos[z.capa]);
    });
  }

  // Leyenda
  const leyenda = document.getElementById("leyenda");
  if (leyenda) {
    leyenda.innerHTML = Object.values(CAPAS)
      .map((c) => `<span><i class="capa__color" style="background:${c.color}"></i>${c.icono} ${c.nombre}</span>`)
      .join("");
  }

  // Casillas para activar/desactivar capas (solo en mapa.html)
  const lista = document.getElementById("lista-capas");
  if (lista) {
    Object.entries(CAPAS).forEach(([clave, c]) => {
      const label = document.createElement("label");
      label.className = "capa";
      label.innerHTML =
        `<input type="checkbox" checked value="${clave}">` +
        `<i class="capa__color" style="background:${c.color}"></i> ${c.icono} ${c.nombre}`;
      label.querySelector("input").addEventListener("change", (e) => {
        if (e.target.checked) grupos[clave].addTo(mapa);
        else mapa.removeLayer(grupos[clave]);
      });
      lista.appendChild(label);
    });
  }

  if (anioInput) {
    anioInput.addEventListener("input", () => {
      anioValor.textContent = anioInput.value;
      dibujar();
    });
  }

  dibujar();
})();
