import { renderHook, act } from "@testing-library/react-hooks";
import useAutoplay, { DEFAULT_HANDLE_CHANGE_TIMER } from "./useAutoplay";

function current(mock) {
  return mock.result.current;
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe("Autoplay change selected image", () => {
  test("Change image when autoplay is enabled", () => {
    const handleChange = jest.fn();
    const hookMock = renderHook(() => useAutoplay(0, handleChange));

    act(() => current(hookMock).onAutoplayChange(true));

    act(() => jest.runOnlyPendingTimers());
    expect(handleChange).toHaveBeenCalledTimes(1);

    act(() => jest.runOnlyPendingTimers());
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  test("Don't change image when autoplay is disabled", () => {
    const handleChange = jest.fn();
    renderHook(() => useAutoplay(0, handleChange));

    act(() => jest.runOnlyPendingTimers());
    expect(handleChange).not.toHaveBeenCalled();
  });

  test("Disable image change after disable autoplay", () => {
    const handleChange = jest.fn();
    const hookMock = renderHook(() => useAutoplay(0, handleChange));

    act(() => current(hookMock).onAutoplayChange(true));

    act(() => jest.runOnlyPendingTimers());
    expect(handleChange).toHaveBeenCalledTimes(1);

    handleChange.mockClear();
    act(() => current(hookMock).onAutoplayChange(false));
    act(() => jest.runOnlyPendingTimers());
    expect(handleChange).not.toHaveBeenCalled();
  });

  test("Restore image change after re-enable autoplay", () => {
    const handleChange = jest.fn();
    const hookMock = renderHook(() => useAutoplay(0, handleChange));

    act(() => current(hookMock).onAutoplayChange(false));
    expect(handleChange).not.toHaveBeenCalled();

    act(() => current(hookMock).onAutoplayChange(true));
    act(() => jest.runOnlyPendingTimers());
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("Is reset if selected image change", () => {
    let selectedIndex = 0;

    const handleChange = jest.fn();
    const hookMock = renderHook(() => useAutoplay(selectedIndex, handleChange));

    act(() => current(hookMock).onAutoplayChange(true));

    act(() => jest.advanceTimersByTime(DEFAULT_HANDLE_CHANGE_TIMER - 1));
    expect(handleChange).not.toHaveBeenCalled();

    act(() => {
      selectedIndex = 1;
      hookMock.rerender();
    });

    act(() => jest.advanceTimersByTime(DEFAULT_HANDLE_CHANGE_TIMER - 1));
    expect(handleChange).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(1));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe("Elapsed timer", () => {
  beforeEach(() => {
    let time = 0;
    global.performance.now = jest.fn(() => {
      const res = time;
      time++;
      return res;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Autoplay starts timer", () => {
    const hookMock = renderHook(() => useAutoplay(0, () => {}));
    expect(current(hookMock).time).toBe(0);

    act(() => jest.runOnlyPendingTimers());
    expect(current(hookMock).time).toBeCloseTo(0.0333333333, 0.0001);

    act(() => jest.runOnlyPendingTimers());
    expect(current(hookMock).time).toBeCloseTo(0.0666666666, 0.0001);
  });

  test("Disable autoplay reset timer", () => {
    const hookMock = renderHook(() => useAutoplay(0, () => {}));
    expect(current(hookMock).time).toBe(0);

    act(() => jest.runOnlyPendingTimers());
    expect(current(hookMock).time).toBeCloseTo(0.0333333333, 0.0001);

    act(() => current(hookMock).onAutoplayChange(false));
    act(() => jest.runOnlyPendingTimers());
    expect(current(hookMock).time).toBe(0);
  });

  test("Image change reset timer", () => {
    let selectedIndex = 0;
    const hookMock = renderHook(() => useAutoplay(selectedIndex, () => {}));
    expect(current(hookMock).time).toBe(0);

    act(() => jest.runOnlyPendingTimers());
    expect(current(hookMock).time).toBeCloseTo(0.0333333333, 0.0001);

    act(() => {
      selectedIndex = 1;
      hookMock.rerender();
    });
    expect(current(hookMock).time).toBe(0);

    act(() => jest.runOnlyPendingTimers());
    expect(current(hookMock).time).toBeCloseTo(0.0333333333, 0.0001);
  });
});
