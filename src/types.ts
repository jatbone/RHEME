export enum ThemeMessage {
  PROP_CHANGE = 'theme:prop:changed',
}

export type ThemeConfig = {
  [key: string]: any
}

export type Theme = {
  [key: string]: any
}

export interface ThemeRender {
  (): void
}

export interface ThemeRenderProp {
  (path: string, newValue: any): void
}

export interface CustomThemeRender {
  (processedTheme: Theme): ThemeRender
}

export interface ThemeRenderConstructor {
  new (themeConfig: ThemeConfig, prefix: string): ThemeRenderer
  prototype: ThemeRenderer
}

export interface ThemeRenderer {
  prefix: string
  themeConfig: ThemeConfig
  render: ThemeRender
  renderProp: ThemeRenderProp
  setRender(render: CustomThemeRender, renderProp: ThemeRenderProp): void
  setTest(color: string): void
}

export interface RenderCssVars {
  (theme: Theme, prefix: string): void
}
