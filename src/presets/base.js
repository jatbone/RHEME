import { darken, transparentize, readableColor } from 'color2k'

import { r } from '../helpers'

export const getBoxShadow = (
  offsetX = 0,
  offsetY = 0,
  blur = 0,
  spread = 0,
  color = 0,
  inset = false
) => `${inset ? 'inset ' : ''}${offsetX} ${offsetY} ${blur} ${spread} ${color}`

const theme = {
  colors: {
    black: '#000',
    white: '#fff',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#0d131e',
    },
    primary: '#065e60',
  },
  button: {
    color: r('colors.gray.100', (color) => readableColor(color)),
    background: r('colors.gray.100'),
    outline: r('colors.gray.100', (color) =>
      getBoxShadow(0, 0, 0, '4px', transparentize(color, 0.4))
    ),
    'outline-size': '4px',
    'border-radius': '4px',
    'font-size': '0.875rem',
    px: '15px',
    height: '2.5rem',
    hover: {
      background: r('colors.gray.200'),
    },
    small: {
      px: '7.5px',
      height: '2rem',
      'border-radius': '3px',
      'font-size': '0.75rem',
      outline: r('colors.gray.100', (color) =>
        getBoxShadow(0, 0, 0, '2px', transparentize(color, 0.4))
      ),
    },
    big: {
      px: '22.5px',
      height: '3rem',
      'border-radius': '5px',
      'font-size': '1rem',
      outline: r('colors.gray.100', (color) =>
        getBoxShadow(0, 0, 0, '6px', transparentize(color, 0.4))
      ),
    },
    'test-root': r('colors.primary'),
    primary: {
      color: r('colors.primary', (color) => {
        return readableColor(color)
      }),
      'test-child': r('button.test-root'),
      background: r('colors.primary'),
      outline: r('colors.primary', (color) =>
        getBoxShadow(0, 0, 0, '4px', transparentize(color, 0.8))
      ),
      small: {
        'test-gchild': r('button.primary.test-child', (color) =>
          darken(color, 0.05)
        ),
        outline: r('colors.primary', (color) =>
          getBoxShadow(0, 0, 0, '2px', transparentize(color, 0.8))
        ),
      },
      big: {
        outline: r('colors.primary', (colors) =>
          getBoxShadow(0, 0, 0, '6px', transparentize(colors, 0.8))
        ),
      },
      hover: {
        background: r('colors.primary', (color) => darken(color, 0.05)),
      },
    },
  },
}

export default theme
