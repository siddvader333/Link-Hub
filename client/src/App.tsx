import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/Home/Home";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
