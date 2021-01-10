import React from "react";
import useAutoplay from "./hooks/useAutoplay";
import useImages from "./hooks/useImages";

import Image from "./Image";
import Thumbnails from "./Thumbnails";
import Action from "./Action";

import "./App.scss";

function App() {
  const { state, handleGoto, handleNext, handlePrevious } = useImages();
  const { data, selectedIndex } = state;

  const { time, ...player } = useAutoplay(selectedIndex, handleNext);

  return (
    <div className="App">
      {data ? (
        <div className="Carousel">
          <div className="Carousel-container">
            <button
              className="selector-button selector-button-previous"
              onClick={handlePrevious}
            >
              &#8249;
            </button>

            <Image url={data[selectedIndex].details} {...player} />
            <button
              className="selector-button selector-button-next"
              onClick={handleNext}
            >
              &#8250;
            </button>
            <Action {...player} time={time} />
          </div>
          <Thumbnails
            data={data}
            selectedIndex={selectedIndex}
            onSelectionChange={handleGoto}
          />
        </div>
      ) : (
        <div className="skeleton">Loading ...</div>
      )}
    </div>
  );
}

export default App;
