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

  return (
    <div className="App">
      {data ? (
        <div className="Carousel">
          <Image url={data[selectedIndex].details} />
          <Thumbnails data={data} />
        </div>
      ) : (
        <div className="skeleton">Loading ...</div>
      )}
    </div>
  );
}

export default App;
