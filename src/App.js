import React from 'react'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import DarkMode from './context/darkMode/DarkTheme';
import SignIn from './components/SignIn';
import Login from './components/Login';
import TextArea from './components/TextArea';

const App = () => {

  return (
    <>
<DarkMode>
    <Router>
      <Navbar />
     <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/TextArea">
            <TextArea />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
        </Switch>
      </Router>
      </DarkMode>
    </>
  )
}

export default App

