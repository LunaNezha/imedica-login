const productionSuite = Cypress.env("production") ? describe : describe.skip;
const basePath = Cypress.env("basePath") || "";

productionSuite("Production integration boundary", () => {
  it("serves branding assets and a recoverable unknown route from the production bundle", () => {
    cy.visit(basePath + "/does-not-exist", {
      onBeforeLoad(window) {
        window.localStorage.clear();
        Object.defineProperty(window.navigator, "language", {
          value: "en-US",
          configurable: true,
        });
        Object.defineProperty(window.navigator, "languages", {
          value: ["en-US"],
          configurable: true,
        });
      },
    });
    cy.contains("h1", "Page not found").should("be.visible");
    cy.title().should("eq", "404 — Page Not Found | iMedica");
    cy.request(basePath + "/branding/app-icon.svg")
      .its("headers.content-type")
      .should("include", "image/svg+xml");
    cy.request(basePath + "/branding/social-card.png")
      .its("headers.content-type")
      .should("include", "image/png");
    cy.contains("a", "Back to Login").click();
    cy.location("pathname").should("eq", basePath + "/login");
    cy.title().should("eq", "iMedica — AI Healthcare Login");
  });
  it("loads split bundles, excludes DevTools, and fails closed without an adapter", () => {
    cy.viewport(390, 844);
    cy.visit(basePath + "/login/username", {
      onBeforeLoad(window) {
        window.localStorage.clear();
        Object.defineProperty(window.navigator, "languages", {
          value: ["en-US"],
          configurable: true,
        });
        Object.defineProperty(window.navigator, "language", {
          value: "en-US",
          configurable: true,
        });
      },
    });
    cy.get(".dev-tools").should("not.exist");
    cy.get('input[name="username"]').type("demo@imedica.app");
    cy.get('input[name="password"]').type("Demo123!");
    cy.get('button[type="submit"]').click();
    cy.contains("Authentication is not connected yet.").should("be.visible");
    cy.contains("You’re signed in. Welcome to iMedica.").should("not.exist");
  });
});
