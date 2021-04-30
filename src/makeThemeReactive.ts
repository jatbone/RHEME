import ThemeRendererClass from './ThemeRenderer'
import { get, isFunction } from './helpers'
import { ThemeConfig, ThemeMessage } from './types'

interface Watcher {
  toWatch: string
  cb?: (value: string) => string
}

interface Watchers {
  [key: string]: Watcher
}

interface ThemeObserver {
  (message: string, data: any): any
}

interface ThemeSubject {
  observers: ThemeObserver[]
  subscribe: {
    (fn: ThemeObserver): void
  }
  notifyAll: {
    (message: string, data: any): void
  }
}

export function r(refPath: string, cb?: (value: string) => string | null) {
  return function (theme: any) {
    let value = get(theme, refPath)
    if (cb) {
      value = cb(value)
    }
    return {
      refPath,
      value,
      cb,
    }
  }
}

export default function makeThemeReactive(
  themeConfig: ThemeConfig,
  prefix = ''
) {
  const watchers: Watchers = {}

  function addWatcher(key: string, toWatch: string, cb = undefined) {
    if (!watchers[key]) {
      const first: Watcher = {
        toWatch,
        cb,
      }
      const findFirst = (start: string) => {
        if (watchers[start]) {
          first.toWatch = watchers[start].toWatch
          // first.cb = watchers[start].cb
          findFirst(first.toWatch)
        }
      }
      findFirst(toWatch)
      watchers[key] = { ...first }
    }
  }

  const subject: ThemeSubject = {
    observers: [],
    subscribe: function (fn) {
      this.observers.push(fn)
    },
    notifyAll: function (message, data = {}) {
      this.observers.forEach((observer) => observer(message, data))
    },
  }

  function makeReactiveProp(obj: any, key: string, path: string) {
    let val = obj[key]
    let propFullPath = `${path}.${key}`
    Object.defineProperty(obj, key, {
      get() {
        if (isFunction(val)) {
          const { value: finalVal, refPath, cb } = val(themeConfig)
          addWatcher(propFullPath, refPath, cb)
          return finalVal
        }
        return val
      },
      set(newVal) {
        val = newVal
        subject.notifyAll(ThemeMessage.PROP_CHANGE, {
          fullPath: propFullPath,
          newValue: newVal,
        })
      },
    })
  }

  function makeReactive(obj: any, path = '') {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        makeReactive(obj[key], `${path ? `${path}.` : ''}${key}`)
      } else {
        makeReactiveProp(obj, key, path)
      }
    }
  }

  makeReactive(themeConfig)

  const renderer = new ThemeRendererClass(themeConfig, prefix)
  subject.subscribe(function (message, data) {
    if (message === ThemeMessage.PROP_CHANGE) {
      const { fullPath, newValue } = data
      renderer.renderProp(fullPath, newValue)
      Object.keys(watchers).forEach((watcher) => {
        const { toWatch, cb } = watchers[watcher]
        let finalValue = newValue
        if (cb) {
          finalValue = cb(newValue)
        }
        if (toWatch === fullPath) {
          renderer.renderProp(watcher, finalValue)
        }
      })
    }
  })

  return renderer
}
