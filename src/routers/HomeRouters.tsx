import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Home from "../views/home";

const HomeRouters = () => {
  return (
    <>
      <Route path="/home" exact component={Home.HomeCover} />
      <Route path="/home/welcome" exact component={Home.HomeWelcome} />
      <Route path="/home/enter" exact component={Home.HomePintu} />
      <Route path="/home/category" exact component={Home.HomeCategory} />
      <Route
        path="/home/organisator-list/:homeChapter"
        exact
        component={Home.HomeOrganisatorList}
      />
      <Route
        path="/home/organisator-detail/:searchKey"
        exact
        component={Home.HomeOrganisatorDetail}
      />
      <Route path="/home/twibbon" exact component={Home.HomeTwibbon} />
      <Route path="/home/zeppelin" exact component={Home.HomeZeppelin} />
      <Route path="/home/finish" exact component={Home.HomeFinish} />
    </>
  );
};

export default HomeRouters;
