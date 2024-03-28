import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
  savedItems: [],
  updateItems: () => {},
})

export default ThemeContext
