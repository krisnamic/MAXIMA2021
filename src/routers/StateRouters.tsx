import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as State from "../views/state";
import { ErrorPage } from "../views/error";

const StateRouters = () => {
  return (
    <>
      <Route path="/state" exact component={State.StateSchedule} />
      <Route path="/state/lists" component={State.StateLists} />
    </>
  );
};

export default StateRouters;
