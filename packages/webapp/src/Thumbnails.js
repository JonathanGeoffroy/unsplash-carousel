import React, { useContext, useLayoutEffect, useRef } from "react";
import { CarouselContext } from "./Carousel";
import "./Thumbnails.scss";

export default function Thumbnails() {
  const {
    state: { data, selectedIndex },
    handleGoto,
  } = useContext(CarouselContext);

  const selectedRef = useRef();

  useLayoutEffect(() => {
    if (selectedRef.current) {
      const node = selectedRef.current;
      const nodeLeft = node.offsetLeft;
      const nodeRight = node.offsetLeft + node.clientWidth;

      const parent = selectedRef.current.parentElement;
      const parentLeft = parent.scrollLeft;
      const parentRight = parent.scrollLeft + parent.clientWidth;

      if (nodeLeft > parentRight || nodeRight < parentLeft) {
        parent.scrollTo({
          left: nodeLeft,
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="thumbnails">
      {data.map((item, index) => (
        <button
          key={item.id}
          onClick={() => handleGoto(index)}
          ref={index === selectedIndex ? selectedRef : undefined}
        >
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
