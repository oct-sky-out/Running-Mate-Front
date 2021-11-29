export {};

describe('SignIn Test', () => {
  it('로그인 후 페이지 이동', () => {
    cy.visit('http://localhost:3000/guest');
    cy.get('[data-cy=move-signIn]').click();
    cy.get('[data-cy=signIn-btn]').should('be.disabled');
    cy.get('[data-cy=email]')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');
    cy.get('[data-cy=password]')
      .type('asdfasdf123#')
      .should('have.value', 'asdfasdf123#');
    cy.get('[data-cy=signIn-btn]').click();
    cy.url().should('equal', 'http://localhost:3000/');
  });
});
