import React, { useContext } from "react";
import { CarouselContext } from "./Carousel";
import "./Thumbnails.scss";

export default function Thumbnails() {
  const {
    state: { data, selectedIndex },
    handleGoto,
  } = useContext(CarouselContext);

  return (
    <div className="thumbnails">
      {data.map((item, index) => (
        <button key={item.id} onClick={() => handleGoto(index)}>
          <img
            className={index === selectedIndex ? "selected" : ""}
            src={item.thumbnailUrl}
            alt=""
          />
        </button>
      ))}
    </div>
  );
}
