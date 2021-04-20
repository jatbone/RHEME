export const isFunction = (value: any) =>
  value &&
  (Object.prototype.toString.call(value) === '[object Function]' ||
    typeof value === 'function' ||
    value instanceof Function)

export const get = (obj: any, path: string, defValue = null) => {
  // If path is not defined or it has false value
  if (!path) return undefined
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray: string[] = Array.isArray(path)
    ? path
    : <string[]>path.match(/([^[.\]])+/g)
  // Find value if exist return otherwise return undefined value;
  return (
    pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) || defValue
  )
}

export const set = (obj: any, path: string[] | string, value: any) => {
  if (Object(obj) !== obj) return obj // When obj is not an object
  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
  path.slice(0, -1).reduce(
    (
      a,
      c,
      i // Iterate all of them except the last one
    ) =>
      Object(a[c]) === a[c] // Does the key exist and is its value an object?
        ? // Yes: then follow that path
          a[c]
        : // No: create the key. Is the next key a potential array-index?
          (a[c] =
            Math.abs(<any>path[i + 1]) >> 0 === +path[i + 1]
              ? [] // Yes: assign a new array object
              : {}), // No: assign a new plain object
    obj
  )[path[path.length - 1]] = value // Finally assign the value to the last key
  return obj // Return the top-level object to allow chaining
}

export const processConfig = (obj: object) => {
  const result: { [key: string]: string } = {}

  const recurse = (obj: { [key: string]: any }, current: string) => {
    for (let prop in obj) {
      const value = obj[prop]
      const key = (current ? `${current}-${prop}` : prop)
        .replace(/-_$/g, '')
        // .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
        .toLowerCase()

      if (value && typeof value === 'object') {
        recurse(value, key)
      } else {
        result[key] = value
      }
    }
  }

  recurse(obj, '')

  return result
}

export const getThemeCssPropName = (path: string, prefix = '--bb-') => {
  return `${prefix}${path.split('.').join('-')}`
}

export const setDocumentStyleProperty = (
  fullPath: string,
  newValue: string
) => {
  const propName = getThemeCssPropName(fullPath).toLowerCase()
  document.documentElement.style.setProperty(propName, newValue)
}

export function r(refPath: string, cb?: (value: string) => string | null) {
  return function (from: any) {
    let value = get(from, refPath)
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

export const getFullPath = (path: string, prop: string) =>
  `${path ? `${path}.` : ''}${prop}`
