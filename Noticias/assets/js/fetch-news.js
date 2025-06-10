// scripts/fetch-news.js
const fs = require('fs');
const axios = require('axios');

const API_KEY = 'TU_API_KEY'; // reemplaza por tu API key
const OUTPUT_PATH = './news-data/noticias.json';

async function fetchNews() {
  const today = new Date().toISOString().split('T')[0]; // solo fecha
  const url = `https://newsapi.org/v2/everything?q=tecnologia&language=es&from=${today}&sortBy=publishedAt&apiKey=${API_KEY}`;
  try {
    const res = await axios.get(url);
    const articles = res.data.articles.slice(0, 10);
    // Convertir a formato compatible con JSON
    const noticias = articles.map((a, index) => ({
      id: index + 1,
      titulo: a.title,
      categoria: 'tecnologia', // puedes ajustar
      fecha: a.publishedAt.split('T')[0],
      imagen: 'default.jpg', // puedes mejorar con imágenes propias
      resumen: a.description || '',
      contenido: `<p>${a.content || ''}</p><a href="${a.url}" target="_blank">Fuente</a>`
    }));
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(noticias, null, 2));
    console.log('Noticias actualizadas');
  } catch (err) {
    console.error('Error fetching noticias:', err);
  }
}

fetchNews();