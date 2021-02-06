import { createContext } from "react";
import useImages from "../hooks/useImages";
import Main from "./Main";
import Thumbnails from "./Thumbnails";

import "./Carousel.scss";

export const CarouselContext = createContext();

function Carousel() {
  const images = useImages();
  const { initialized } = images.state;

  return (
    <div className="Carousel">
      <CarouselContext.Provider value={images}>
        {initialized ? (
          <>
            <Main />
            <Thumbnails />
          </>
        ) : (
          <div className="skeleton">Loading ...</div>
        )}
      </CarouselContext.Provider>
    </div>
  );
}

export default Carousel;
