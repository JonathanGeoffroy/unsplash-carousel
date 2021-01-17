import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import { CarouselContext } from "./Carousel";
import Thumbnails from "./Thumbnails";

const CONTEXT_STATE = {
  initialized: true,
  data: [
    {
      id: "firstId",
      thumbnailUrl: "/firstImage",
    },
    {
      id: "secondId",
      thumbnailUrl: "/secondImage",
    },
  ],
  selectedIndex: 0,
};

test("load thumbnails", async () => {
  const context = {
    state: CONTEXT_STATE,
  };
  render(
    <CarouselContext.Provider value={context}>
      <Thumbnails />
    </CarouselContext.Provider>
  );

  await waitFor(() => screen.getAllByRole("img"));
  const images = screen.getAllByRole("img");
  expect(images).toHaveLength(2);
  expect(images[0]).toHaveAttribute("src", "/firstImage");
  expect(images[1]).toHaveAttribute("src", "/secondImage");
});

test("Handle thumbnails selection", async () => {
  const context = {
    state: CONTEXT_STATE,
    handleGoto: jest.fn(),
  };

  render(
    <CarouselContext.Provider value={context}>
      <Thumbnails />
    </CarouselContext.Provider>
  );

  await waitFor(() => screen.getAllByRole("button"));
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);

  fireEvent.click(buttons[1]);

  expect(context.handleGoto).toBeCalledTimes(1);
  expect(context.handleGoto).toBeCalledWith(1);
});
