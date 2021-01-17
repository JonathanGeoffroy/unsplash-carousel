import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CarouselContext } from "./Carousel";
import Main from "./Main";

const CONTEXT_STATE = {
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
};

test("load first image", async () => {
  const context = {
    state: CONTEXT_STATE,
  };
  render(
    <CarouselContext.Provider value={context}>
      <Main />
    </CarouselContext.Provider>
  );

  await waitFor(() => screen.getAllByAltText("first description"));
});

test("Handle click next", async () => {
  const context = {
    state: CONTEXT_STATE,
    handleNext: jest.fn(() => {
      context.state.selectedIndex = 1;
    }),
  };

  render(
    <CarouselContext.Provider value={context}>
      <Main />
    </CarouselContext.Provider>
  );

  const nextButton = screen.getByLabelText("Next image");
  fireEvent.click(nextButton);

  expect(context.handleNext).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getAllByAltText("second description"));
});

test("Handle click previous", async () => {
  const context = {
    state: CONTEXT_STATE,
    handlePrevious: jest.fn(() => {
      context.state.selectedIndex = 0;
    }),
  };

  render(
    <CarouselContext.Provider value={context}>
      <Main />
    </CarouselContext.Provider>
  );

  const previousButton = screen.getByLabelText("Previous image");
  fireEvent.click(previousButton);

  expect(context.handlePrevious).toHaveBeenCalledTimes(1);
  await waitFor(() => screen.getAllByAltText("second description"));
});
