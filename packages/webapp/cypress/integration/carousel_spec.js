function getLastParameter(url) {
  return url.substring(url.lastIndexOf("/") + 1, url.length);
}

describe("Carousel", () => {
  function expectSelectedImage(index) {
    const names = ["first", "second", "third"];
    const expectedName = names[index];
    const expectedImageNumber = 3;

    cy.contains(`${expectedName} username`);
    cy.contains(`${expectedName} description`);
    cy.contains(`#${expectedName}, #key, #word`);

    cy.get("img").should(
      "have.attr",
      "src",
      `https://fake-image.com/${expectedName}`
    );

    cy.get("div[data-testid='thumbnails'] img").should(
      "have.length",
      expectedImageNumber
    );

    for (let i = 0; i < expectedImageNumber; i++) {
      cy.get("div[data-testid='thumbnails'] img")
        .eq(i)
        .should(i === index ? "have.class" : "not.have.class", "selected");
    }
  }

  beforeEach(() => {
    cy.intercept("GET", "http://localhost:1337/", {
      fixture: "api.json",
    });

    cy.intercept("GET", "http://localhost:1337/*", (req) => {
      const filename = getLastParameter(req.url);
      req.reply({
        fixture: `${filename}.json`,
      });
    });

    cy.intercept("GET", "https://fake-image.com/*", (req) => {
      const filename = getLastParameter(req.url);
      req.reply({
        fixture: `images/${filename}.svg`,
      });
    });
  });

  it("loads first image", () => {
    cy.visit("/");

    expectSelectedImage(0);
  });

  it("go to next image", () => {
    cy.visit("/");

    cy.get("button[aria-label='Next image']").click();
    expectSelectedImage(1);
  });

  it("go to previous image", () => {
    cy.visit("/");
    cy.get("button[aria-label='Previous image']").click();

    expectSelectedImage(2);
  });

  it("go to clicked image", () => {
    cy.visit("/");
    cy.get("div[data-testid='thumbnails'] img").eq(2).click();

    expectSelectedImage(2);
  });

  it("handle autoplay", () => {
    cy.clock();

    cy.visit("/");
    cy.get("button[aria-label='Play']").click();
    cy.tick(3000);

    expectSelectedImage(1);

    cy.get("button[aria-label='Stop']").click();

    cy.get("button[aria-label='Play']").should("exist");
  });
});
