describe('template spec', () => {
  it('should display validation errors for invalid inputs', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid=email-input]').type("invalid_email@gmail.com");
    cy.get('[data-testid=password-input]').type("invalid_password");
    cy.get('[data-testid=login-button').click();
  })

})
