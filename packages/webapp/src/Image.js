import React, { useEffect, useState } from "react";

import "./Image.scss";

export default function Image({ url }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setImage);
  }, [url]);

  return (
    <div className="Image">
      {image && (
        <>
          <div className="Image-info">
            <div className="Image-top">
              <span className="Image-top-username">{image.username}</span>
              <span>{new Date(image.date).toLocaleDateString()}</span>
            </div>
            <div className="Image-description">{image.description}</div>
            <div className="Image-keywords">
              {image.keywords.map((k) => `#${k}`).join(", ")}
            </div>
          </div>

          <img
            src={image.imageUrl}
            alt={image.description}
            width="900"
            height={900 / 1.5}
          />
        </>
      )}
    </div>
  );
}
