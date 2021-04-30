import makeThemeReactive from './makeThemeReactive'
import base from './presets/base'

const renderer = makeThemeReactive(base, '--bb')
let primaryColor = renderer.themeConfig.colors.primary

const title = <HTMLHeadingElement>document.getElementById('title')!

title.innerText = `Theme primary color: ${primaryColor}`

renderer.render()

setTimeout(() => {
  renderer.setTest('#68b0ef')
  primaryColor = renderer.themeConfig.colors.primary
  title.innerText = `Theme primary color changed to: ${primaryColor}`
}, 2000)
