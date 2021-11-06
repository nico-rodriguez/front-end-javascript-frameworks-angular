describe('My First Test', () => {
  it('should display "Ristorante Con Fusion" on home page', () => {
    cy.visit('/');
    cy.contains('Ristorante Con Fusion');
  })

  it('should navigate to /aboutus page', () => {
    cy.visit('/');
    cy.get('a').contains('About').click();
    cy.get('h3').contains('About Us');
  })

  it('should enter a new comment', () => {
    cy.visit('/dishdetail/0');
    cy.get('input[type=text]').type('Test author');
    cy.get('textarea').type('Test comment');
    cy.get('button').contains('Submit').click();
  })
})