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

  /* ---------- Idioma ---------- */
  const selector = document.getElementById("selector-idioma");
  let idioma = localStorageGet("idioma") || "es";

  function aplicarIdioma(cod) {
    const dic = TRADUCCIONES[cod] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const clave = el.dataset.i18n;
      el.textContent = dic[clave] || TRADUCCIONES.es[clave] || el.textContent;
    });
    document.documentElement.lang = cod === "en" ? "en" : "es";

    if ((cod === "q" || cod === "cab") && !sessionStorageGet("aviso-" + cod)) {
      alertaSuave("La traducción a este idioma está en proceso. Por ahora verás el texto en español.");
      sessionStorageSet("aviso-" + cod, "1");
    }
  }

  if (selector) {
    selector.value = idioma;
    selector.addEventListener("change", () => {
      idioma = selector.value;
      localStorageSet("idioma", idioma);
      aplicarIdioma(idioma);
    });
  }
  aplicarIdioma(idioma);

  /* ---------- Narración en voz alta ---------- */
  // Funciona con botones data-leer="#id" (lee ese elemento)
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
      texto = origen ? origen.innerText.replace("🔊 Escuchar", "") : "";
    }
    if (!texto) return;

    speechSynthesis.cancel();
    document.querySelectorAll('.boton-escuchar[aria-pressed="true"]')
      .forEach((b) => b.setAttribute("aria-pressed", "false"));

    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = VOZ_IDIOMA[idioma] || "es-GT";
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
        mensaje.textContent = "⚠️ Revisa que todos los campos obligatorios estén completos.";
        return;
      }
      mensaje.textContent = "✅ ¡Gracias! Recibimos tu aporte y lo revisaremos pronto.";
      form.reset();
    });
  }

  /* ---------- Utilidades ---------- */
  function alertaSuave(texto) {
    const div = document.createElement("div");
    div.className = "aviso";
    div.setAttribute("role", "status");
    div.style.cssText = "position:fixed;bottom:1rem;right:1rem;max-width:340px;z-index:999;background:#fff;box-shadow:var(--sombra)";
    div.textContent = texto;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 6000);
  }
  function localStorageGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
  function localStorageSet(k, v) { try { localStorage.setItem(k, v); } catch {} }
  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch {} }
})();
