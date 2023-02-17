import React from 'react'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { AppTheme } from './theme'
import { Provider } from 'react-redux'
import { store } from './store'


export const JournalApp = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
          <AppTheme>
              <AppRouter></AppRouter>
          </AppTheme>
      </BrowserRouter>
    </Provider>
  )
}
