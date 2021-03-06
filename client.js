/** @jsx jsx */
import * as React from "react";
import { jsx, CacheProvider, css, Global } from "@emotion/core";
import createCache from "@emotion/cache";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

/* Manually kept in sync with server.js for now */
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <div>
          <Global
            styles={css`
              body {
                background-color: red;
                color: white;
              }
            `}
          />
          <p>This should have a red background and white text</p>
          <p>
            <Link to="/not-red" css={{ color: "black" }}>
              Not Red Page
            </Link>
          </p>
        </div>
      </Route>
      <Route path="/not-red" exact>
        <div>
          <p>This should NOT have a red background or white text</p>
          <p>
            <Link to="/">Red Page</Link>
          </p>
        </div>
      </Route>
    </Switch>
  );
}

const cache = createCache();

ReactDOM.hydrate(
  <BrowserRouter>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
console.log("Hydrated!");
