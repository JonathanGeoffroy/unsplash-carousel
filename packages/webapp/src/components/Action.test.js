import { fireEvent, render, screen } from "@testing-library/react";
import Action from "./Action";

test("autoplay enabled", () => {
  render(<Action autoplay={true} />);

  const playButton = screen.getByRole("button");
  expect(playButton).toBeInTheDocument();
  expect(playButton.textContent).toBe("▶");
});

test("autoplay disabled", () => {
  render(<Action autoplay={false} />);

  const playButton = screen.getByRole("button");
  expect(playButton).toBeInTheDocument();
  expect(playButton.textContent).toBe("■");
});

test("react to click", () => {
  const onAutoplayChange = jest.fn();
  render(<Action autoplay={false} onAutoplayChange={onAutoplayChange} />);

  const playButton = screen.getByRole("button");
  fireEvent.click(playButton);
  expect(onAutoplayChange).toBeCalledTimes(1);
});
