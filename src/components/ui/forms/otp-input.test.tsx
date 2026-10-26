// @vitest-environment jsdom
import { Simulate } from "react-dom/test-utils";
import { createRoot, Root } from "react-dom/client";
import { act, useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import OTPInput from "./otp-input";

let container: HTMLDivElement;
let root: Root;
const onChange = vi.fn();

function Harness() {
  const [value, setValue] = useState("");
  return (
    <OTPInput
      name="verifyCode"
      label="Verification code"
      value={value}
      onBlur={() => undefined}
      onChange={(next) => {
        onChange(next);
        setValue(next);
      }}
    />
  );
}

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  onChange.mockClear();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root.render(<Harness />));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: false });
});

describe("OTP input", () => {
  it("controls every digit and advances focus", () => {
    const inputs = container.querySelectorAll("input");
    act(() => {
      inputs[0].value = "0";
      Simulate.change(inputs[0]);
    });
    expect(onChange).toHaveBeenLastCalledWith("0");
    expect(inputs[0].value).toBe("0");
    expect(document.activeElement).toBe(inputs[1]);
  });

  it("normalizes pasted Persian digits, retaining leading zeroes", () => {
    const inputs = container.querySelectorAll("input");
    const preventDefault = vi.fn();
    act(() =>
      Simulate.paste(inputs[0], {
        clipboardData: { getData: () => "۰۱۲۳۴۵" } as unknown as DataTransfer,
        preventDefault,
      }),
    );
    expect(preventDefault).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith("012345");
    expect(Array.from(inputs, (input) => input.value).join("")).toBe("012345");
  });

  it("rejects non-digits and supports keyboard deletion", () => {
    const inputs = container.querySelectorAll("input");
    act(() => {
      inputs[0].value = "x";
      Simulate.change(inputs[0]);
    });
    expect(onChange).not.toHaveBeenCalled();
    act(() => {
      inputs[0].value = "5";
      Simulate.change(inputs[0]);
    });
    act(() => Simulate.keyDown(inputs[1], { key: "Backspace" }));
    expect(onChange).toHaveBeenLastCalledWith("");
    expect(document.activeElement).toBe(inputs[0]);
  });
});
