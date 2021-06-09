import React from "react";
import { Redirect, Route } from "react-router";
import { useAppSelector } from "../../app/hooks";

const ProtectedRoute = ({ ...routeProps }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuthed);

  if (isAuth) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};

export default ProtectedRoute;
