import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Heading } from '@shipt/nova'
import { RootProviders, Routes, LogoutPage } from '@shipt/sg1'
import { ClientProvider } from '../../hooks'

export const App = () => (
  <RootProviders>
    <ClientProvider>
      <Heading>Hello SG1!</Heading>
      <Switch>
        <Route path="/logout" exact={true}>
          <LogoutPage />
        </Route>
        <Routes />
      </Switch>
    </ClientProvider>
  </RootProviders>
)
