import { renderHook, act } from "@testing-library/react-hooks";
import useSelection from "./useImages";

function current(mock) {
  return mock.result.current;
}

test("starts loading images", async () => {
  const hookMock = renderHook(() => useSelection());

  expect(current(hookMock).state.initialized).toBeFalsy();
  await hookMock.waitForValueToChange(
    () => current(hookMock).state.initialized
  );
  expect(current(hookMock).state.initialized).toBeTruthy();
  expect(current(hookMock).state).toStrictEqual({
    initialized: true,
    data: [
      { id: "firstId", details: "/firstImage" },
      { id: "secondId", details: "/secondImage" },
    ],
    selectedIndex: 0,
  });
});

test("Don't change seleted index on initialization", async () => {
  const hookMock = renderHook(() => useSelection());

  expect(current(hookMock).state.initialized).toBeFalsy();
  expect(current(hookMock).state.selectedIndex).toBeNull();

  act(() => current(hookMock).handlePrevious());
  expect(current(hookMock).state.selectedIndex).toBeNull();

  act(() => current(hookMock).handleNext());
  expect(current(hookMock).state.selectedIndex).toBeNull();

  act(() => current(hookMock).handleGoto());
  expect(current(hookMock).state.selectedIndex).toBeNull();

  await hookMock.waitForValueToChange(
    () => current(hookMock).state.initialized
  );
});

test("Go to next image", async () => {
  const hookMock = renderHook(() => useSelection());

  await hookMock.waitForValueToChange(
    () => current(hookMock).state.initialized
  );
  expect(current(hookMock).state.initialized).toBeTruthy();

  act(() => current(hookMock).handleNext());
  expect(current(hookMock).state.selectedIndex).toBe(1);

  act(() => current(hookMock).handleNext());
  expect(current(hookMock).state.selectedIndex).toBe(0);
});

test("Go to previous image", async () => {
  const hookMock = renderHook(() => useSelection());

  await hookMock.waitForValueToChange(
    () => current(hookMock).state.initialized
  );
  expect(current(hookMock).state.initialized).toBeTruthy();

  act(() => current(hookMock).handlePrevious());
  expect(current(hookMock).state.selectedIndex).toBe(1);

  act(() => current(hookMock).handlePrevious());
  expect(current(hookMock).state.selectedIndex).toBe(0);
});

test("Go to goto image", async () => {
  const hookMock = renderHook(() => useSelection());

  await hookMock.waitForValueToChange(
    () => current(hookMock).state.initialized
  );
  expect(current(hookMock).state.initialized).toBeTruthy();

  act(() => current(hookMock).handleGoto(1));
  expect(current(hookMock).state.selectedIndex).toBe(1);

  act(() => current(hookMock).handleGoto(0));
  expect(current(hookMock).state.selectedIndex).toBe(0);

  act(() => current(hookMock).handleGoto(2));
  expect(current(hookMock).state.selectedIndex).toBe(1);
});
