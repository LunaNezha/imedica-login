// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { updateDocumentMetadata } from "./document-metadata";

afterEach(() => {
  document.head.innerHTML = "";
});

describe("document metadata", () => {
  it("updates browser and sharing metadata together", () => {
    document.head.innerHTML =
      '<title>Old</title><meta name="description" content="Old"><meta property="og:title"><meta property="og:description"><meta name="twitter:title"><meta name="twitter:description">';
    updateDocumentMetadata(
      "iMedica — AI Healthcare Login",
      "Healthcare sign-in",
    );
    expect(document.title).toBe("iMedica — AI Healthcare Login");
    for (const selector of [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ]) {
      expect(document.querySelector(selector)?.getAttribute("content")).toBe(
        document.title,
      );
    }
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      expect(document.querySelector(selector)?.getAttribute("content")).toBe(
        "Healthcare sign-in",
      );
    }
  });
  it("works in a host without optional sharing tags", () => {
    expect(() =>
      updateDocumentMetadata("Page not found | iMedica", "Description"),
    ).not.toThrow();
    expect(document.title).toBe("Page not found | iMedica");
  });
});
