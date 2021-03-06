/** @jsx jsx */
const React = require("react");
const { css, Global, jsx, CacheProvider } = require("@emotion/core");
const { renderToString } = require("react-dom/server");
const createEmotionServer = require("create-emotion-server").default;
const createCache = require("@emotion/cache").default;
const express = require("express");
const path = require("path");
const { StaticRouter, Switch, Route, Link } = require("react-router-dom");

/* Manually kept in sync with client.js for now */
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

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const cache = createCache();
  const { extractCritical } = createEmotionServer(cache);

  const element = (
    <StaticRouter>
      <CacheProvider value={cache}>
        <App />
      </CacheProvider>
    </StaticRouter>
  );

  const { html, css: cssContent, ids } = extractCritical(
    renderToString(element)
  );
  const resp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My site</title>
    <style data-emotion-css="${ids.join(" ")}">${cssContent}</style>
</head>
<body>
    <div id="root">${html}</div>

    <script src="./bundle.js"></script>
</body>
</html>`;
  console.log(resp);
  res.send(resp);
});

app.get("/bundle.js", (req, res) => {
  res.sendFile(path.resolve("bundle.js"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
