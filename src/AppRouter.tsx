import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Beranda from "./views/beranda";
import * as Home from "./views/home";

import { AuthRouters, AdminRouters, HomeRouters } from "./routers";
import { AnimatePresence } from "framer-motion";
import { DashboardNavigation } from "./shared/component/DashboardNavigation";
import { DashboardFooter } from "./shared/component/DashboardFooter";
import { HomeNavbar } from "./shared/component/HomeNavbar";
import { HomeFooter } from "./shared/component/HomeFooter";
import { DashboardProtectedRoute } from "./routers/DashboardProtectedRouters";

export default function AppRouter() {
  return (
    <Switch>
      <Router>
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter initial={false}>
              <Switch location={location} key={location.pathname}>
                <Route path="/auth/:path1?/:path2?">
                  <div style={{ minHeight: "100vh", paddingBottom: "24rem" }}>
                    <HomeNavbar />
                    <Switch>
                      <AuthRouters />
                    </Switch>
                    <HomeFooter />
                  </div>
                </Route>
                <DashboardProtectedRoute
                  path="/admin/:path1?/:path2?/:path3?"
                  exact
                >
                  <Switch>
                    <div style={{ minHeight: "100vh", background: "#f4f4f4" }}>
                      <DashboardNavigation />
                      <DashboardFooter />
                    </div>
                  </Switch>
                </DashboardProtectedRoute>
                <Route path="/home/:path1?/:path2?" exact>
                  <HomeNavbar />
                  <Switch>
                    <HomeRouters />
                  </Switch>
                </Route>
                <Route>
                  <div style={{ minHeight: "100vh", paddingBottom: "37.5rem" }}>
                    <HomeNavbar />
                    <Switch>
                      <Route
                        path="/about-us"
                        exact
                        component={Beranda.AboutUs}
                      />
                      <Route path="/faq" exact component={Beranda.FAQ} />
                      <Route path="/" component={Beranda.Beranda} />
                    </Switch>
                    <HomeFooter />
                  </div>
                </Route>
              </Switch>
            </AnimatePresence>
          )}
        />
      </Router>
    </Switch>
  );
}
