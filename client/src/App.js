import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import { Provider } from "react-redux";
import store from "./store";

import { theme, ThemeProvider, CSSReset } from "@chakra-ui/react";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={newTheme}>
          <CSSReset />
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Dashboard} />
            <section>
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </section>
          </Fragment>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
