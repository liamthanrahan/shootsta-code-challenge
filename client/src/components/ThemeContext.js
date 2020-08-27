import { createContext } from 'react'

export const themes = {
  dark: {
    foreground: '#fff',
    background: '#222',
  },
  light: {
    foreground: '#000',
    background: '#eee',
  },
}

export const ThemeContext = createContext(themes.light)
