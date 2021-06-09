import React from "react";
import { Route, Switch } from "react-router";
import CollectionView from "../../components/CollectionView/CollectionView";
import LinkView from "../../components/LinkView/LinkView";

const Dashboard = () => {
  /*Get Links From API */
  return (
    <div>
      <Switch>
        <Route exact path="/dashboard/links" component={LinkView} />
        <Route component={CollectionView} />
      </Switch>
    </div>
  );
};

export default Dashboard;
