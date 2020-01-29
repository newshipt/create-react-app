import React from 'react'
import { defaultTheme } from '@shipt/nova'
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

const BaseProviders: React.FC = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <Router>{children}</Router>
  </ThemeProvider>
)

const customRender = (
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
  return render(ui, { ...options, wrapper })
}

export * from '@testing-library/react'

export { customRender as render }
