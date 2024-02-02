import React, { useState } from 'react';
import '../styles/Main/DetailGalery.css'; // Verifique se o caminho do CSS está correto

const DetailGallery = ({ media, youtubeLinks }) => {
  const [featured, setFeatured] = useState(
    media && media.length > 0 ? media[0] : 
    youtubeLinks && youtubeLinks.length > 0 ? { url: youtubeLinks[0], type: 'video' } : 
    null
  );

  const handleClick = (item) => {
    setFeatured(item);
  };

  const renderMediaItem = (item) => {
    if (item.type === 'image') {
      return <img src={item.url} alt="Featured" />;
    } else if (item.type === 'video') {
      // Verifica se o URL é de um vídeo do YouTube
      if (item.url.includes("youtube.com")) {
        const videoId = new URL(item.url).searchParams.get("v");
        return (
          console.log(item.url),

          <iframe
            title="Featured Video"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&controls=1&fs=1&modestbranding=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      } else {
        // Para arquivos MP4 ou MOV, use a tag <video>
        return (
          <video controls autoPlay muted loop>
            <source src={item.url} type={`video/${item.url.split('.').pop()}`} /> {/* Ajusta o tipo baseado na extensão do arquivo */}
            Seu navegador não suporta a tag de vídeo.
          </video>
        );
      }
    }
  };

  const renderThumbnailItem = (item) => {
    if (item.type === 'image') {
      return <img src={item.url} alt="Media thumbnail" />;
    } else if (item.type === 'video') {
      if (item.url.includes("youtube.com")) {
        const videoId = new URL(item.url).searchParams.get("v");
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        return <img src={thumbnailUrl} alt="YouTube Video thumbnail" />;
      } else {
        // Pode-se adicionar uma miniatura padrão para vídeos MP4/MOV ou implementar uma lógica para gerar miniaturas
        return <div>Vídeo</div>;
      }
    }
  };

  return (
    <>
      <div className="detail-gallery">
        <div className="featured-media">
          {featured && renderMediaItem(featured)}
        </div>
        <div className="thumbnail-container">
          {media && media.map((item, index) => (
            <div key={index} className="thumbnail" onClick={() => handleClick({ ...item, type: 'image' })}>
              <div className="thumbnail-media">
                {renderThumbnailItem(item, index)}
              </div>
            </div>
          ))}
          {youtubeLinks && youtubeLinks.map((url, index) => (
            <div key={index} className="thumbnail" onClick={() => handleClick({ url, type: 'video' })}>
              <div className="thumbnail-media">
                {renderThumbnailItem({ url, type: 'video' }, index)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailGallery;
