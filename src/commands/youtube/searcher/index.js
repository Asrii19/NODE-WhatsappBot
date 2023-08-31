const ytSearch = require('yt-search');

// Función para buscar y obtener el enlace del primer video
async function obtenerEnlacePrimerVideo(palabraClave) {
  try {
    const resultadoBusqueda = await ytSearch(palabraClave);
    
    if (resultadoBusqueda.videos.length > 0) {
      const primerVideo = resultadoBusqueda.videos[0];
      return `https://www.youtube.com/watch?v=${primerVideo.videoId}`;
    } else {
      return "No se encontraron videos";
    }
  } catch (err) {
    console.error("Error al buscar:", err.message);
    return "Error en la búsqueda";
  }
}

module.exports = {
    obtenerEnlacePrimerVideo,
}