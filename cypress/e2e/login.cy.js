beforeEach(() => {
  cy.visit("/");
});

describe("login tests", () => {
  it("Should successfully login", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.login(" ", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should not login with empty password", () => {
    cy.login("bropet@mail.ru");
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});

describe("page display tests", () => {
  it("Should display the main page", () => {
    cy.contains("Books list").should("be.visible");
  });
});

describe("favorites section tests", () => {
  it("Should add the book to favorite using the checkbox", () => {
    cy.login("test@test.com", "test");
    cy.addTheBookToFavoriteUsingCheckbox(
      "1984",
      "Знаменитая антиутопия, предупреждающая об опасности тоталитаризма",
      "Джордж Оруэлл",
    );
    cy.get("#responsive-navbar-nav h4").click();
    cy.contains("1984").should("be.visible");
  });

  it("Should add the book to favorite without using the checkbox", () => {
    cy.login("test@test.com", "test");
    cy.addTheBook(
      "1984",
      "Знаменитая антиутопия, предупреждающая об опасности тоталитаризма",
      "Джордж Оруэлл",
    );
    cy.contains("Books list").click;
    cy.contains("1984").within(() => {
      cy.get("button").click();
    });
    cy.contains("Favorites").click;
    cy.contains("1984").should("be.visible");
  });

  it("Should delete the book from the favorites", () => {
    cy.login("test@test.com", "test");
    cy.addTheBookToFavoriteUsingCheckbox(
      "1954",
      "Знаменитая антиутопия, предупреждающая об опасности тоталитаризма",
      "Джордж Оруэлл",
    );
    cy.get("#responsive-navbar-nav h4").click();
    cy.contains("1954").should("be.visible");
    cy.contains("Favorites").click();
    cy.contains("1954").within(() => {
      cy.get("button").click();
    });
    cy.contains("Favorites").click();
    cy.contains("1954").should("not.exist");
  });
});
