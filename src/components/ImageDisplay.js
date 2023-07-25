import React, { useEffect, useState } from 'react';
import { toPng } from 'html-to-image';


export default function ImageDisplay  ({ imageUrlOrHtml })  {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const isPNG = typeof imageUrlOrHtml === 'string' && imageUrlOrHtml.endsWith('.png');

    if (isPNG) {
      setImageUrl(imageUrlOrHtml);
    } else {
      const node = document.createElement('div');
      node.innerHTML = imageUrlOrHtml;

      toPng(node)
        .then(function (dataUrl) {
          setImageUrl(dataUrl);
        })
        .catch(function (error) {
          console.error('Error converting HTML to image', error);
        });
    }
  }, [imageUrlOrHtml]);

  return <img src={imageUrl} alt="" className="w-full h-auto mb-4" />;
};

