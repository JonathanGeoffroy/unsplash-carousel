import React, { useState, useEffect } from "react";
import Thumbnails from "./Thumbnails";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(SERVER_URL)
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="App">
      {data ? (
        <div className="Carousel">
          <Thumbnails data={data} />
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}

export default App;
