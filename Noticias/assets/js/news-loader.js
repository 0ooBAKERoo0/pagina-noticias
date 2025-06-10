// news-loader.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('news-grid');
  const latestNewsContainer = document.getElementById('latest-news');

  fetch('../news-data/noticias.json')
    .then(res => res.json())
    .then(noticias => {
      // Ordenar por fecha descendente
      noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      // Mostrar últimas 6 noticias en grid
      noticias.slice(0, 6).forEach(noticia => {
        if (container) {
          container.innerHTML += `
            <article class="news-card">
              <img src="assets/img/${noticia.imagen}" alt="${noticia.titulo}">
              <h3>${noticia.titulo}</h3>
              <p class="date">${noticia.fecha}</p>
              <p>${noticia.resumen}</p>
              <a href="noticia.html?id=${noticia.id}">Leer más</a>
            </article>
          `;
        }
      });

      // Mostrar en hero la última noticia destacada
      if (latestNewsContainer && noticias.length > 0) {
        const destacada = noticias[0]; // la más reciente
        latestNewsContainer.innerHTML = `
          <h2>${destacada.titulo}</h2>
          <img src="assets/img/${destacada.imagen}" alt="${destacada.titulo}">
          ${destacada.contenido}
        `;
      }
    })
    .catch(error => console.error('Error cargando noticias:', error));
});