const activePage = ".auth-page:not(.ion-page-hidden)";

function visitLogin() {
  cy.visit("/login", {
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
}
function openLogin(path: string) {
  cy.get(activePage)
    .should("have.length", 1)
    .find('.auth-screen a[href="' + path + '"]')
    .click();
  cy.location("pathname").should("eq", path);
  cy.get(activePage).should("have.length", 1);
}

describe("Authentication", () => {
  beforeEach(() => {
    cy.viewport(390, 844);
    visitLogin();
  });

  it("publishes branded head tags and follows the selected app theme", () => {
    cy.title().should("eq", "iMedica — AI Healthcare Login");
    cy.get('meta[name="description"]')
      .should("have.attr", "content")
      .and("contain", "healthcare");
    cy.get('meta[property="og:image"]')
      .should("have.attr", "content")
      .and("contain", "branding/social-card.png");
    cy.get('meta[name="viewport"]')
      .should("have.attr", "content")
      .and("not.contain", "user-scalable=no");
    cy.get('link[rel="icon"][type="image/svg+xml"]').should(
      "have.attr",
      "href",
      "/branding/app-icon.svg",
    );
    cy.get('link[rel="apple-touch-icon"]').should(
      "have.attr",
      "sizes",
      "180x180",
    );
    cy.request("/manifest.json").then(({ body }) => {
      expect(body.short_name).to.eq("iMedica");
      body.icons.forEach((icon: { src: string }) =>
        cy
          .request("/" + icon.src)
          .its("status")
          .should("eq", 200),
      );
    });
    cy.get(activePage).find('button[aria-label="Toggle theme"]').click();
    cy.get('meta[name="theme-color"]').each((meta) => {
      expect(meta.attr("content")).to.eq("#11221e");
    });
    cy.get(activePage).find('button[aria-label="Toggle theme"]').click();
    cy.get('meta[name="theme-color"]').each((meta) => {
      expect(meta.attr("content")).to.eq("#f7faf8");
    });
  });

  it("recovers from unknown routes in dark mode and RTL without stale page titles", () => {
    cy.visit("/login/missing-page");
    cy.get(activePage).find("h1").should("have.text", "Page not found");
    cy.title().should("eq", "404 — Page Not Found | iMedica");
    cy.get(activePage).find('button[aria-label="Toggle theme"]').click();
    cy.get("html").should("have.class", "dark");
    cy.screenshot("not-found-mobile-dark", { capture: "viewport" });
    cy.get(activePage).find('button[aria-label="Choose language"]').click();
    cy.get('ion-alert:not(.overlay-hidden) [role="radio"]')
      .contains("فارسی")
      .click();
    cy.get("html").should("have.attr", "dir", "rtl");
    cy.get(activePage).find("h1").should("have.text", "صفحه یافت نشد");
    cy.title().should("eq", "۴۰۴ — صفحه یافت نشد | مدیکا");
    cy.get(activePage).contains("a", "بازگشت به ورود").click();
    cy.location("pathname").should("eq", "/login");
    cy.title().should("eq", "مدیکا — ورود به سلامت هوشمند");
    cy.get(activePage).find(".not-found-screen").should("not.exist");
  });

  it("navigates to each login form", () => {
    openLogin("/login/phone");
    cy.get(activePage).find('input[name="phoneNumber"]').should("be.visible");
    cy.get(activePage)
      .find('input[autocomplete="one-time-code"]')
      .should("be.visible");
    cy.get(activePage).should("have.length", 1).find(".back-button").click();
    cy.location("pathname").should("eq", "/login");
    cy.get(activePage).should("have.length", 1);
    openLogin("/login/username");
    cy.get(activePage).find('input[name="username"]').should("be.visible");
  });

  it("submits the controlled masked phone and OTP fields", () => {
    openLogin("/login/phone");
    cy.get(activePage).find('button[type="submit"]').click();
    cy.get(activePage)
      .contains('[role="alert"]', "Phone number is required!")
      .should("be.visible");
    cy.get(activePage).find('input[name="phoneNumber"]').type("09122223333");
    cy.get(activePage)
      .find(".otp-digit")
      .each((input, index) => {
        cy.wrap(input).type("012345"[index]);
      });
    cy.get(activePage).find('button[type="submit"]').click();
    cy.contains("You’re signed in. Welcome to iMedica.").should("be.visible");
  });

  it("tests mock error responses and session logout through the drawer", () => {
    openLogin("/login/username");
    cy.get(".dev-tools summary").click();
    cy.get(".dev-tools").contains("button", "Show form errors").click();
    cy.get(".dev-tools summary").click();
    cy.get(activePage)
      .contains('[role="alert"]', "Username is required.")
      .should("be.visible");
    cy.get(".dev-tools summary").click();
    cy.get(".dev-tools").contains("button", "Clear errors").click();
    cy.get(activePage).find('[role="alert"]').should("not.exist");
    cy.get(".dev-tools select").last().select("unavailable");
    cy.get(".dev-tools summary").click();
    cy.get(activePage).find('input[name="username"]').type("demo@imedica.app");
    cy.get(activePage).find('input[name="password"]').type("Demo123!");
    cy.get(activePage).find('button[type="submit"]').click();
    cy.contains("The operation encountered an error.").should("be.visible");
    cy.get(".toast-dismiss").click();
    cy.get(".dev-tools summary").click();
    cy.get(".dev-tools select").last().select("success");
    cy.get(".dev-tools summary").click();
    cy.get(activePage).find('button[type="submit"]').click();
    cy.contains("You’re signed in. Welcome to iMedica.").should("be.visible");
    cy.get(activePage).find("ion-menu-button").click();
    cy.get("ion-menu").contains("Demo Patient").should("be.visible");
    cy.get("ion-menu").contains("button", "Sign out").click();
    cy.get("ion-menu").contains("Demo Patient").should("not.exist");
  });

  it("reveals and conceals the password", () => {
    openLogin("/login/username");
    cy.get(activePage).find('input[name="password"]').type("private-password");
    cy.get(activePage).find('button[aria-label="Show password"]').click();
    cy.get(activePage)
      .find('input[name="password"]')
      .should("have.attr", "type", "text")
      .and("have.value", "private-password");
    cy.get(activePage).find('button[aria-label="Hide password"]').click();
    cy.get(activePage)
      .find('input[name="password"]')
      .should("have.attr", "type", "password");
  });

  it("switches language, direction, and theme through development controls", () => {
    cy.get(".dev-tools summary").click();
    cy.get(".dev-tools select").first().select("fa");
    cy.get("html").should("have.attr", "dir", "rtl");
    cy.get(".dev-tools").contains("button", "Theme: light").click();
    cy.get("html").should("have.class", "dark");
    cy.get(".dev-tools select").first().select("en");
    cy.get("html").should("have.attr", "dir", "ltr");
    cy.get(".dev-tools summary").click();
  });

  it("switches direction, translates errors, and persists language", () => {
    openLogin("/login/username");
    cy.get(activePage).find('button[type="submit"]').click();
    cy.get(activePage)
      .contains('[role="alert"]', "Username is required.")
      .should("be.visible");
    cy.get(activePage).find('button[aria-label="Choose language"]').click();
    cy.get('ion-alert:not(.overlay-hidden) [role="radio"]')
      .contains("فارسی")
      .click();
    cy.get("html")
      .should("have.attr", "dir", "rtl")
      .and("have.attr", "lang", "fa");
    cy.get(activePage)
      .find('input[name="username"]')
      .should("have.attr", "aria-invalid", "true");
    cy.get(activePage)
      .find('form [role="alert"]')
      .should("not.contain", "Username is required.");
    cy.reload();
    cy.get("html").should("have.attr", "dir", "rtl");
  });

  it("opens the gesture-enabled drawer with settings and project info", () => {
    cy.get(activePage).find("ion-menu-button").click();
    cy.get("ion-menu").should("have.class", "show-menu");
    cy.get("ion-menu").should("have.prop", "swipeGesture", true);
    cy.get("ion-menu").contains("A little about iMedica").should("be.visible");
    cy.get("ion-menu .language-option").should("have.length", 3);
    cy.get('ion-menu button[aria-label="Toggle theme"]').click();
    cy.get("html").should("have.class", "dark");
    cy.screenshot("drawer-mobile-dark", { capture: "viewport" });
    cy.get('ion-menu button[aria-label="Close menu"]').click();
    cy.reload();
    cy.get("html").should("have.class", "dark");
  });

  it("shows honest feedback for SSO placeholders", () => {
    cy.get(activePage)
      .find('button[aria-label="Continue with Google (preview)"]')
      .click();
    cy.contains("Google sign-in is a preview.").should("be.visible");
  });

  it("recalculates the drawer edge for Arabic and retains RTL on reload", () => {
    cy.get(activePage).find("ion-menu-button").click();
    cy.get("ion-menu .language-option")
      .contains("العربية")
      .closest("button")
      .should("not.be.disabled")
      .click();
    cy.get("html")
      .should("have.attr", "dir", "rtl")
      .and("have.attr", "lang", "ar");
    cy.get("ion-menu")
      .should("have.prop", "side", "start")
      .and("have.attr", "dir", "rtl");
    cy.get(activePage).find("ion-menu-button").click();
    cy.get("ion-menu").should("have.class", "show-menu");
    cy.get("ion-menu")
      .shadow()
      .find('[part="container"]')
      .should((container) => {
        expect(container[0].getBoundingClientRect().right).to.be.closeTo(
          390,
          1,
        );
      });
    cy.get('ion-menu button[aria-label="إغلاق القائمة"]')
      .should("not.be.disabled")
      .click();
    cy.get("ion-menu").should("not.have.class", "show-menu");
    cy.screenshot("welcome-mobile-arabic", { capture: "viewport" });
    cy.reload();
    cy.get("html").should("have.attr", "dir", "rtl");
  });
});

describe("Mobile-first visual layout", () => {
  it("constrains the desktop app to a device frame", () => {
    cy.viewport(1440, 1040);
    visitLogin();
    cy.get(".device-frame").should("have.css", "width", "432px");
    cy.get(".care-visual").should("be.visible");
    cy.screenshot("welcome-desktop-light", { capture: "viewport" });
    openLogin("/login/username");
    cy.screenshot("login-desktop-light", { capture: "viewport" });
    cy.get(activePage).find('button[aria-label="Toggle theme"]').click();
    cy.get("html").should("have.class", "dark");
    cy.get(activePage).find('button[aria-label="Toggle theme"]').blur();
    cy.get(activePage)
      .find(".auth-scroll-container")
      .scrollTo("top", { ensureScrollable: false });
    cy.screenshot("login-desktop-dark", { capture: "viewport" });
  });

  it("fits small mobile and landscape viewports without horizontal overflow", () => {
    cy.viewport(375, 812);
    visitLogin();
    cy.get(".device-frame").should("have.css", "width", "375px");
    cy.get(".care-visual").should("be.visible");
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.equal(375);
    });
    cy.screenshot("welcome-mobile-light", { capture: "viewport" });
    cy.viewport(812, 375);
    cy.get(".device-frame").should("have.css", "width", "812px");
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.equal(812);
    });
    cy.get(activePage)
      .find(".auth-scroll-container")
      .should("have.css", "overflow-y", "auto");
  });

  it("keeps enlarged text and small-screen controls within the app viewport", () => {
    cy.viewport(320, 750);
    visitLogin();
    cy.get("html").invoke("css", "font-size", "20px");
    cy.get(".care-visual").should("be.visible");
    openLogin("/login/username");
    cy.get(activePage)
      .find(".auth-scroll-container")
      .should((container) => {
        expect(container[0].scrollWidth).to.equal(container[0].clientWidth);
      });
    cy.get(activePage).find('input[name="password"]').should("be.visible");
  });

  it("respects the reduced-motion media preference", () => {
    cy.then(() =>
      Cypress.automation("remote:debugger:protocol", {
        command: "Emulation.setEmulatedMedia",
        params: {
          features: [{ name: "prefers-reduced-motion", value: "reduce" }],
        },
      }),
    );
    visitLogin();
    cy.get(".auth-screen").should((screen) => {
      const duration = screen[0].ownerDocument.defaultView?.getComputedStyle(
        screen[0],
      ).animationDuration;
      expect(parseFloat(duration ?? "1")).to.be.lessThan(0.01);
    });
    cy.then(() =>
      Cypress.automation("remote:debugger:protocol", {
        command: "Emulation.setEmulatedMedia",
        params: { features: [] },
      }),
    );
  });
});
