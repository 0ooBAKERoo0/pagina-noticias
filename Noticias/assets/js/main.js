// main.js

// Ejemplo: detectar soporte PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.error('Error en SW:', err));
  });
}

// Función para implementar búsqueda Lunr.js (si decides incluirla)
// Aquí solo un ejemplo para integrar Lunr.js