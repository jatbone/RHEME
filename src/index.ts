import makeThemeReactive from './makeThemeReactive'
import base from './presets/base'

const renderer = makeThemeReactive(base, '--bb')

renderer.render()

setTimeout(() => {
  renderer.setTest('red')
}, 2000)
