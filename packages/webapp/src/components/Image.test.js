import { render, screen, waitFor } from "@testing-library/react";
import { CarouselContext } from "./Carousel";
import Image from "./Image";

const CONTEXT_STATE = {
  state: {
    initialized: true,
    data: [
      {
        id: "firstId",
        details: "/firstImage",
      },
      {
        id: "secondId",
        details: "/secondImage",
      },
    ],
    selectedIndex: 0,
  },
};

test("load image", async () => {
  render(
    <CarouselContext.Provider value={CONTEXT_STATE}>
      <Image />
    </CarouselContext.Provider>
  );

  await waitFor(() => screen.getAllByAltText("first description"));
  expect(screen.getByText("first username")).toBeInTheDocument();
  expect(screen.getByText("first description")).toBeInTheDocument();
  expect(screen.getByAltText("first description")).toBeInTheDocument();
  expect(screen.getByText("1/1/2020")).toBeInTheDocument();
  expect(screen.getByText("#first, #key, #word")).toBeInTheDocument();
});
