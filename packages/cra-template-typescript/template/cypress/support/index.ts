import './commands'

Cypress.Commands.add('getByTestId', testid => {
  return cy.get(`[data-testid="${testid}"]`)
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
