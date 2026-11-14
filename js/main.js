/* Funciones comunes a todas las páginas:
   menú móvil, cambio de idioma, narración en voz alta y formulario. */

(function () {
  /* ---------- Menú móvil ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const abierto = nav.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", abierto);
    });
  }

  /* ---------- Idioma ----------
     El sitio está en inglés. Los botones [data-idioma] cambian entre
     inglés (en), español (es) y Q'eqchi' (kek); la elección se guarda
     para las demás páginas. */
  const botonesIdioma = document.querySelectorAll("[data-idioma]");
  const avisoIdioma = document.getElementById("aviso-idioma");
  const CLAVE_IDIOMA = "idioma-sitio";

  function aplicarIdioma(cod) {
    IDIOMA_ACTUAL = TRADUCCIONES[cod] ? cod : IDIOMA_POR_DEFECTO;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    // Formato: data-i18n-attr="aria-label:clave;title:otra"
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((par) => {
        const [attr, clave] = par.split(":");
        el.setAttribute(attr.trim(), t(clave.trim()));
      });
    });

    // En Q'eqchi' gran parte del texto sigue en español
    document.documentElement.lang = IDIOMA_ACTUAL === "en" ? "en" : "es";
    botonesIdioma.forEach((b) => {
      b.setAttribute("aria-pressed", b.dataset.idioma === IDIOMA_ACTUAL);
    });
    if (avisoIdioma) avisoIdioma.hidden = IDIOMA_ACTUAL !== "kek";

    // Avisar a otros scripts (mapa, galería) para que se redibujen
    document.dispatchEvent(new CustomEvent("idioma-cambiado"));
  }

  botonesIdioma.forEach((boton) => {
    boton.addEventListener("click", () => {
      if (window.speechSynthesis) speechSynthesis.cancel();
      storage(localStorage, CLAVE_IDIOMA, boton.dataset.idioma);
      aplicarIdioma(boton.dataset.idioma);
    });
  });

  // Esperar a que carguen los demás scripts antes de traducir
  document.addEventListener("DOMContentLoaded", () => {
    aplicarIdioma(storage(localStorage, CLAVE_IDIOMA) || IDIOMA_POR_DEFECTO);
  });

  /* ---------- Narración en voz alta ---------- */
  // Botones con data-leer="#id" (lee ese elemento)
  // o data-texto="..." (lee ese texto, usado en el mapa).
  document.addEventListener("click", (e) => {
    const boton = e.target.closest(".boton-escuchar");
    if (!boton || !("speechSynthesis" in window)) return;

    if (boton.getAttribute("aria-pressed") === "true") {
      speechSynthesis.cancel();
      boton.setAttribute("aria-pressed", "false");
      return;
    }

    let texto = boton.dataset.texto;
    if (!texto && boton.dataset.leer) {
      const origen = document.querySelector(boton.dataset.leer);
      if (origen) {
        const copia = origen.cloneNode(true);
        copia.querySelectorAll(".boton-escuchar").forEach((b) => b.remove());
        texto = copia.textContent.replace(/\s+/g, " ").trim();
      }
    }
    if (!texto) return;

    speechSynthesis.cancel();
    document.querySelectorAll('.boton-escuchar[aria-pressed="true"]')
      .forEach((b) => b.setAttribute("aria-pressed", "false"));

    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = VOZ_IDIOMA[IDIOMA_ACTUAL] || "en-US";
    voz.rate = 0.95;
    voz.onend = () => boton.setAttribute("aria-pressed", "false");
    boton.setAttribute("aria-pressed", "true");
    speechSynthesis.speak(voz);
  });

  /* ---------- Formulario de contribución (demo, sin backend) ---------- */
  const form = document.getElementById("form-contribuir");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const mensaje = document.getElementById("mensaje-form");
      if (!form.checkValidity()) {
        mensaje.textContent = t("form.error");
        return;
      }
      mensaje.textContent = t("form.ok");
      form.reset();
    });
  }

  /* ---------- Utilidades ---------- */
  // Lee o guarda en localStorage/sessionStorage sin romper si no está disponible
  function storage(tipo, clave, valor) {
    try {
      if (valor === undefined) return tipo.getItem(clave);
      tipo.setItem(clave, valor);
    } catch {
      return null;
    }
  }
})();
