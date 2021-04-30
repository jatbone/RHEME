import type { ThemeConfig } from '../types'
import { r } from '../makeThemeReactive'

const themeConfigMock: ThemeConfig = {
  colors: {
    primary: 'red',
  },
  button: {
    background: r('colors.primary'),
  },
}

describe('Testing theme config', () => {
  it('It should have primary color', () => {
    expect(themeConfigMock.colors.primary).toEqual('red')
  })
  it('It should have button', () => {
    expect(themeConfigMock.button).toBeDefined()
    expect(themeConfigMock.button.background).toBeDefined()
  })
  it('Button background prop should be function', () => {
    const f = jest.fn(themeConfigMock.button.background)
    f({})
    expect(f).toBeCalledTimes(1)
    expect(f.mock.results[0].value).toBeDefined()
    expect(f.mock.results[0].value).toMatchObject({
      cb: undefined,
      refPath: 'colors.primary',
      value: null,
    })
  })
})
