/// <reference types="@shipt/sg1-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'staging' | 'production' | 'test'
    PUBLIC_URL: string

    // okta
    REACT_APP_AUTH_ENDPOINT: string
    REACT_APP_TOKEN_ENDPOINT: string
    REACT_APP_OAUTH_CLIENTID: string

    // sg1 config
    REACT_APP_ADMIN: string
    REACT_APP_CDN: string
    REACT_APP_SITE_ROOT: string
    REACT_APP_LOCALHOSTS: string

    // graphql config
    REACT_APP_GRAPHQL_URL: string
  }
}
