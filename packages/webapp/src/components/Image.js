import { useContext, useEffect, useState } from "react";

import { CarouselContext } from "./Carousel";

import "./Image.scss";

export default function Image() {
  const { state } = useContext(CarouselContext);
  const url = state.initialized
    ? state.data[state.selectedIndex].details
    : null;
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) => res.json())
        .then(setImage);
    }
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
