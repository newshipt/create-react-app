describe('Orders', () => {
  before(() => {
    cy.login()
    cy.visit('/module')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })

  it('should see the heading', () => {
    cy.getByTestId('title').should('contain', 'Hello SG1!')
  })
})
