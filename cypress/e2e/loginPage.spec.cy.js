describe('Login page and login feature test', () => {
  beforeEach('opens correct link', () => {
    cy.visit('https://cargo-fleet-website.netlify.app/');
    cy.wait(2000);
    cy.location('pathname').then(pathname => {
      if (pathname !== '/login') {
        cy.contains('Admin').click();
        cy.contains('Logout').click();
        cy.wait(2000);
        cy.location('pathname').should('eq', '/login');
      }
    });
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
    cy.get('span').contains('Log in').click();
    // cy.contains('Logged in successfully!');
  });
});
