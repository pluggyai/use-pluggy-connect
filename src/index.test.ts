import { usePluggyConnect } from "./index";
import { renderHook, act } from "@testing-library/react-hooks";

// mock timer using jest
jest.useFakeTimers();

describe("usePluggyConnect", () => {
  it("updates every second", () => {
    const { result } = renderHook(() =>
      usePluggyConnect({ connectToken: "mock-connect-token" })
    );

    expect(result.current?.ready).toBe(null);

    // Fast-forward 1sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 1 sec
    expect(result.current?.ready).toBe(true);

    // Fast-forward 1 more sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 2 sec
    expect(result.current).toBe(2);
  });
});
