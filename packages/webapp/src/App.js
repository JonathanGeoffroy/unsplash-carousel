import React, { useState, useEffect } from "react";
import Image from "./Image";
import Thumbnails from "./Thumbnails";

import "./App.scss";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [data, setData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetch(SERVER_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setSelectedIndex(0);
      });
  }, []);

  const handlePrevious = () =>
    setSelectedIndex((data.length + selectedIndex - 1) % data.length);
  const handleNext = () => setSelectedIndex((selectedIndex + 1) % data.length);

  return (
    <div className="App">
      {data ? (
        <div className="Carousel">
          <button
            className="selector-button selector-button-previous"
            onClick={handlePrevious}
          >
            &#8249;
          </button>
          <Image url={data[selectedIndex].details} />
          <button
            className="selector-button selector-button-next"
            onClick={handleNext}
          >
            &#8250;
          </button>
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
