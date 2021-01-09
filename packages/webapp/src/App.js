import React, { useEffect, useCallback, useState } from "react";
import Image from "./Image";
import Thumbnails from "./Thumbnails";
import Action from "./Action";

import "./App.scss";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const DEFAULT_TIMER = 3000;

function App() {
  const [data, setData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [autoplay, setAutoplay] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    fetch(SERVER_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setSelectedIndex(0);
      });
  }, []);

  const handlePrevious = useCallback(() => {
    if (!data) {
      return;
    }

    setSelectedIndex(
      (selectedIndex) => (data.length + selectedIndex - 1) % data.length
    );
  }, [data]);

  const handleNext = useCallback(() => {
    if (!data) {
      return;
    }

    setSelectedIndex((selectedIndex) => (selectedIndex + 1) % data.length);
  }, [data]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        handleNext();
      }, DEFAULT_TIMER);

      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  useEffect(() => {
    setElapsed(0);

    if (autoplay) {
      const start = performance.now();

      const interval = setInterval(() => {
        setElapsed(performance.now() - start);
      }, 30);

      return () => clearInterval(interval);
    }
  }, [autoplay, selectedIndex]);

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

            <Image
              url={data[selectedIndex].details}
              autoplay={autoplay}
              onAutoplayChange={setAutoplay}
            />
            <button
              className="selector-button selector-button-next"
              onClick={handleNext}
            >
              &#8250;
            </button>
            <Action
              autoplay={autoplay}
              onAutoplayChange={setAutoplay}
              time={(elapsed / DEFAULT_TIMER) * 100}
            />
          </div>
          <Thumbnails
            data={data}
            selectedIndex={selectedIndex}
            onSelectionChange={setSelectedIndex}
          />
        </div>
      ) : (
        <div className="skeleton">Loading ...</div>
      )}
    </div>
  );
}

export default App;
