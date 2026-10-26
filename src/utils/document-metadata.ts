export function updateDocumentMetadata(
  title: string,
  description: string,
): void {
  document.title = title;
  for (const selector of [
    'meta[property="og:title"]',
    'meta[name="twitter:title"]',
  ]) {
    document.querySelector(selector)?.setAttribute("content", title);
  }
  for (const selector of [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ]) {
    document.querySelector(selector)?.setAttribute("content", description);
  }
}
