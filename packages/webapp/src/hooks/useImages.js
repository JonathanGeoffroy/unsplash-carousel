import { useState, useEffect } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const noop = () => {};

export default function useImages() {
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

  return [selectedIndex, data ? setSelectedIndex : noop, data];
}
