import * as React from "react";
import Login from "./Login";
import Registration from "./Registration";
import Header from "./Components/Header";
import { Theme } from "@twilio-paste/core/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";




class App extends React.Component {
  render() {
   
    return (
      <Theme.Provider theme="default">
        <Header />
        <Router>
        <h1> Hello? </h1>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
      </Theme.Provider>
    );
  }
}
export default App;
