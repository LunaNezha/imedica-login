// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "./theme-provider";

vi.mock("react-secure-storage", () => ({ default: { setItem: vi.fn() } }));

function ThemeControl() {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle</button>;
}

describe("browser theme metadata", () => {
  it("follows explicit app selection even when the system preference differs", async () => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    document.head.innerHTML =
      '<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f7faf8"><meta name="theme-color" media="(prefers-color-scheme: dark)" content="#11221e"><meta name="apple-mobile-web-app-status-bar-style" content="default">';
    const container = document.createElement("div");
    const root = createRoot(container);
    try {
      await act(async () =>
        root.render(
          <ThemeProvider initialTheme="dark">
            <ThemeControl />
          </ThemeProvider>,
        ),
      );
      document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((meta) =>
          expect(meta.getAttribute("content")).toBe("#11221e"),
        );
      expect(
        document
          .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
          ?.getAttribute("content"),
      ).toBe("black");
      await act(async () => container.querySelector("button")?.click());
      document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((meta) =>
          expect(meta.getAttribute("content")).toBe("#f7faf8"),
        );
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    } finally {
      act(() => root.unmount());
      document.head.innerHTML = "";
    }
  });
});
