import React, { useState } from 'react';
import '../styles/Main/ProjectDetail/DetailGalery.css'; // Verifique se o caminho do CSS está correto

const DetailGallery = ({ media }) => {
  const [featured, setFeatured] = useState(media[0]);

  const handleClick = (item) => {
    setFeatured(item);
  };

  const renderThumbnailItem = (item, index) => {
    if (item.type === 'image') {
      return <img src={item.url} alt={`Thumbnail ${index}`} onClick={() => handleClick(item)} />;
    } else if (item.type === 'video') {
      const videoId = new URL(item.url).searchParams.get("v");
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
      return <img src={thumbnailUrl} alt={`YouTube Thumbnail ${index}`} onClick={() => handleClick(item)} />;
    } else if (item.type === 'mp4') {
      return (
        <div className="thumbnail-video" key={index} onClick={() => handleClick(item)}>
        <video key={index} loop autoPlay muted  style={{ width: '100%', height: 'auto' }} onClick={() => handleClick(item)}>
          <source src={item.url} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
       </div>
      );
    }
  };

  const renderMediaItem = (item) => {
    if (item.type === 'image') {
      return <img src={item.url} alt="Gallery" />;
    } else if (item.type === 'video') {
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
    } else if (item.type === 'mp4') {
      // Use a chave única para o componente vídeo, como a URL do vídeo
      return (
        <video key={item.url} loop autoPlay muted playsInline >
          <source src={item.url} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      );
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
