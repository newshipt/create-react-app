import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
import { AuthContext } from '@shipt/nova'

const defaultUri = process.env.REACT_APP_GRAPHQL_URL

export const ClientProvider: React.FC = ({ children }) => {
  const { user } = React.useContext(AuthContext)

  const client = React.useMemo(() => {
    const httpLink = new HttpLink({
      uri: defaultUri,
      headers: {
        Authorization: `Bearer ${user?.authToken.token}`,
      },
    })

    const wsLink = new WebSocketLink({
      uri: defaultUri.replace(/http(s)?/, 'ws'),
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            authorization: `Bearer ${user?.authToken.token}`,
          },
        },
      },
    })

    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      httpLink,
    )

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
  }, [user])

  return <ApolloProvider {...{ children, client }} />
}
