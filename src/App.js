import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import Home from './components/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { createGlobalStyle } from 'styled-components'
import {BaseTextStyle} from './components/shared/style'

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </div>
      </Router>
    </AuthProvider>
  );
}
const GlobalStyle = createGlobalStyle`
  body {
    ${BaseTextStyle}
  }
`

export default App;
