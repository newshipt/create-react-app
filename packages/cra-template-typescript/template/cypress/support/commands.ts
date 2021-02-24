import './oktaLogin'
import './localStorage'
import './graphql'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(): Chainable
      saveLocalStorage(): Chainable<Element>
      restoreLocalStorage(): Chainable<Element>
      getByTestId(testid: string): Chainable<JQuery<HTMLElement>>
      interceptGraphql(): Chainable
    }
  }
}
