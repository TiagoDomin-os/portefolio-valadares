import React, { useState } from 'react';
import '../styles/Main/DetailGalery.css'; // Verifique se o caminho do CSS está correto

const DetailGallery = ({ media }) => {
  // Assume que o primeiro item de 'media' é o item em destaque inicialmente
  const [featured, setFeatured] = useState(media[0]);

  const handleClick = (item) => {
    // Define o item clicado como o item em destaque, sem alterar seu tipo
    setFeatured(item);
  };

  const renderMediaItem = (item) => {
    if (item.type === 'image') {
      return <img src={item.url} alt="Gallery" />;
    } else if (item.type === 'video') {
      // Extrai o ID do vídeo do YouTube a partir do URL e o incorpora no iframe
      const videoId = new URL(item.url).searchParams.get("v");
      return (
        <iframe
          title="Featured Video"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }
  };

  const renderThumbnailItem = (item, index) => {
    if (item.type === 'image') {
      return <img src={item.url} alt={`Thumbnail ${index}`} />;
    } else if (item.type === 'video') {
      // Gera a URL da miniatura do vídeo do YouTube
      const videoId = new URL(item.url).searchParams.get("v");
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
      return <img src={thumbnailUrl} alt={`YouTube Thumbnail ${index}`} />;
    }
  };

  return (
    <div className="detail-gallery">
      <div className="featured-media">
        {featured && renderMediaItem(featured)}
      </div>
      <div className="thumbnail-container">
        {media.map((item, index) => (
          <div key={index} className="thumbnail" onClick={() => handleClick(item)}>
            <div className="thumbnail-media">
              {renderThumbnailItem(item, index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailGallery;
