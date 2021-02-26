import { AuthService } from '@okta/okta-react'

Cypress.Commands.add('login', () => {
  const authService = new AuthService({
    clientId: Cypress.env('okta_client_id'),
    issuer: Cypress.env('okta_issuer'),
    redirectUri: Cypress.config('baseUrl') + '/login-callback',
  })

  return authService._oktaAuth
    .signIn({
      username: Cypress.env('okta_username'),
      password: Cypress.env('okta_password'),
    })
    .then((res: any) => {
      const sessionToken = res.sessionToken
      return authService._oktaAuth.token.getWithoutPrompt({
        responseType: ['id_token', 'token'],
        sessionToken,
      })
    })
    .catch((err: any) => console.log(err))
})
