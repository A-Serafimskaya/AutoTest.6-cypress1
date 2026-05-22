// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (login, password = null) => {
  cy.contains("Log in").click();
  cy.get("#mail").type(login);
  if (password !== null) {
    cy.get("#pass").type(password);
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add("addTheBook", (title, description = null, authors) => {
  cy.contains("Add new").click();
  cy.get("#title").type(title);
  if (description !== null) {
    cy.get("#description").type(description);
    cy.get("#authors").type(authors);
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add(
  "addTheBookToFavoriteUsingCheckbox",
  (title, description = null, authors) => {
    cy.contains("Add new").click();
    cy.get("#title").type(title);
    if (description !== null) {
      cy.get("#description").type(description);
      cy.get("#authors").type(authors);
    }
    cy.get('#favorite').click();
    cy.contains("Submit").click();
  },
);

/* Cypress.Commands.add('addTheBookToFavoriteUsingCheckbox', (title, description = null, authors) => { 
    cy.contains("Add new").click();
    cy.get('#title').type(title);
    if (description !== null) {
    cy.get('#description').type(description);
    cy.get('#authors').type(authors);
  }
 cy.get('[name="favorite"]').check();
    cy.contains("Submit").click();
 }); */
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
