import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import Carousel from "./Carousel";

test("Display loading until data is initialized", () => {
  render(<Carousel />);

  expect(screen.getByText(/Loading/g).textContent).toBe("Loading ...");

  return waitFor(() => screen.getByAltText("first description"));
});

test("Display Carousel when data is initialized", async () => {
  const { container } = render(<Carousel />);

  await waitFor(() => screen.getByAltText("first description"));

  expect(screen.getByAltText("first description")).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(3);

  expect(container).toMatchSnapshot();
});

test("Manage image selection button", async () => {
  const { container } = render(<Carousel />);

  await waitFor(() => screen.getByAltText("first description"));

  expect(screen.getByAltText("first description")).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(3);

  const nextButton = screen.getByLabelText(/Next image/g);
  fireEvent.click(nextButton);

  await waitFor(() => screen.getByAltText("second description"));
  expect(screen.queryByAltText("first description")).not.toBeInTheDocument();
  expect(screen.getByAltText("second description")).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(3);
  expect(container).toMatchSnapshot();

  fireEvent.click(nextButton);
  await waitFor(() => screen.getByAltText("first description"));
  expect(screen.queryByAltText("second description")).not.toBeInTheDocument();
  expect(screen.getByAltText("first description")).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(3);
  expect(container).toMatchSnapshot();

  const previousButton = screen.getByLabelText(/Previous image/g);
  fireEvent.click(previousButton);

  await waitFor(() => screen.getByAltText("second description"));
  expect(screen.queryByAltText("first description")).not.toBeInTheDocument();
  expect(screen.getByAltText("second description")).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(3);
  expect(container).toMatchSnapshot();

  fireEvent.click(previousButton);

  await waitFor(() => screen.getByAltText("first description"));
  expect(screen.queryByAltText("second description")).not.toBeInTheDocument();
  expect(screen.getByAltText("first description")).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(3);
  expect(container).toMatchSnapshot();
});

test("Manage thumbnails selection", async () => {
  const { container } = render(<Carousel />);

  await waitFor(() => screen.getByAltText("first description"));
  expect(screen.getByAltText("first description")).toBeInTheDocument();

  const thumbnails = screen.getByTestId("thumbnails");
  const thumbnailButtons = within(thumbnails).getAllByRole("button");
  expect(thumbnailButtons).toHaveLength(2);

  fireEvent.click(thumbnailButtons[1]);
  await waitFor(() => screen.getByAltText("second description"));
  expect(screen.queryByAltText("first description")).not.toBeInTheDocument();
  expect(screen.getByAltText("second description")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
