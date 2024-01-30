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
      const videoId = new URL(item.url).searchParams.get("v");
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <iframe
        title="Featured Video"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&controls=1&fs=1&modestbranding=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      );
    }
  };


  const renderThumbnailItem = (item) => {
    if (item.type === 'image') {
      return <img src={item.url} alt="Media thumbnail" />;
    } else if (item.type === 'video') {
      const videoId = new URL(item.url).searchParams.get("v");
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
      return <img src={thumbnailUrl} alt="YouTube Video thumbnail" />;
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
