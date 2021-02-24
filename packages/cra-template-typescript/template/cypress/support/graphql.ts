Cypress.Commands.add('interceptGraphql', () => {
  cy.intercept('POST', '/graphql', req => {
    req.alias = req.body.operationName
  })
})
