import React from "react";

import {NotificationContainer, NotificationManager} from 'react-notifications';

import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/shards-dashboards.1.1.0.min.css";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            
            component={withTracker(props => {
              return (
                <route.layout notification={NotificationManager} {...props}>
                  <route.component notification={NotificationManager} {...props} />
                </route.layout>
              );
            })}
          />
        );
      })}
      <NotificationContainer/>
    </div>
  </Router>
);
