import React, { useContext } from "react";
import Action from "./Action";
import { CarouselContext } from "./Carousel";
import useAutoplay from "../hooks/useAutoplay";
import Image from "./Image";

import "./Main.scss";

export default function Main() {
  const images = useContext(CarouselContext);
  const {
    state: { selectedIndex },
    handlePrevious,
    handleNext,
  } = images;

  const { time, ...player } = useAutoplay(selectedIndex, handleNext);

  return (
    <div className="Main">
      <button
        className="selector-button selector-button-previous"
        onClick={handlePrevious}
        aria-label="Previous image"
      >
        &#8249;
      </button>
      <Image />
      <button
        className="selector-button selector-button-next"
        onClick={handleNext}
        aria-label="Next image"
      >
        &#8250;
      </button>
      <Action {...player} time={time} />
    </div>
  );
}
