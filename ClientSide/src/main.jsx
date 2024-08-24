import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

import UserContextProvider from './context/UserContext/UserContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="214256255395-j9gcd1jqan1edmmaj5otkgtm5p5tgkba.apps.googleusercontent.com">

  <React.StrictMode>
  <UserContextProvider>
    <App />
    </UserContextProvider>
  </React.StrictMode>,

  </GoogleOAuthProvider>
)
