import type {
  RenderCssVars,
  ThemeConfig,
  ThemeRenderConstructor,
  ThemeRenderer,
} from './types'

import { processConfig, setDocumentStyleProperty } from './helpers'

const renderCssVars: RenderCssVars = (theme, prefix) => {
  let root = document.documentElement
  for (let [prop, value] of Object.entries(theme)) {
    root.style.setProperty(`${prefix}-${prop}`, value as string)
  }
}

const ThemeRendererClass = (function Renderer(
  this: ThemeRenderer,
  themeConfig: ThemeConfig,
  prefix: string
) {
  this.prefix = prefix
  this.themeConfig = themeConfig
  this.render = function () {
    const processedTheme = processConfig(this.themeConfig)
    renderCssVars(processedTheme, this.prefix)
  }
  this.renderProp = function (path, newValue) {
    setDocumentStyleProperty(path, newValue)
  }
  this.setRender = function (render, renderProp) {
    const processedTheme = processConfig(this.themeConfig)
    this.render = render(processedTheme)
    this.renderProp = renderProp
  }
} as Function) as ThemeRenderConstructor

ThemeRendererClass.prototype.setTest = function (color: string) {
  this.themeConfig.colors.primary = color
}

export default ThemeRendererClass
