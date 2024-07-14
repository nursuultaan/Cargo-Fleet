describe('Login page and login feature test', () => {
  beforeEach('opens correct link', () => {
    cy.visit('http://localhost:3001');
  });

  it('verify Login page', () => {
    cy.title().should('eq', 'Cargo-Fleet: Software Solutions for Trucking Companies!');
    cy.location('pathname').should('eq', '/login');
    cy.contains('Welcome to Cargo Fleet');
    cy.get('#cf-logo').should('be.visible');
  });
  it('verify login with valid credentials', () => {
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('test1234');
    cy.get('.MuiButton-label-173').click();
    cy.contains('Logged in successfully!');
  });
});
