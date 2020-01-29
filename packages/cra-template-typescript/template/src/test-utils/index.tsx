import React from 'react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@shipt/nova'
import { render as baseRender, RenderOptions } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

let BaseProviders: React.FC = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <>{children}</>
  </ThemeProvider>
)

export * from '@testing-library/react'

export const render = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => {
  let wrapper = BaseProviders
  if (options && options.wrapper) {
    const Wrapper = options.wrapper
    wrapper = ({ children }) => (
      <BaseProviders>
        <Wrapper>{children}</Wrapper>
      </BaseProviders>
    )
  }
  return baseRender(ui, { ...options, wrapper })
}
