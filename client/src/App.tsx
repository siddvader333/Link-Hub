import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import ErrorAlert from "./components/ErrorAlertComponent/ErrorAlert";
import NavBar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/Home/Home";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import silentSignIn from "./slices/auth-slice/thunks/silentSignIn";

function App() {
  /*Use Effect -- ComponentWillMount */
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Print this when component is mounted");
    dispatch(silentSignIn());
  }, [dispatch]);
  return (
    <div>
      <ErrorAlert />
      <NavBar />
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
