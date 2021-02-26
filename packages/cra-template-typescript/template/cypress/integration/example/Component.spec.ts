describe('Component', () => {
  it('should see the heading',() => {
    cy.login()
    cy.visit('/module')
    cy.getByTestId('title').should('contain', 'Hello SG1!')
  })
})
