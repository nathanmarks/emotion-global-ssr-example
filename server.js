/** @jsx jsx */
const React = require('react');
const { css, Global, jsx, CacheProvider } = require('@emotion/core');
const { renderToString } = require('react-dom/server');
const createEmotionServer = require('create-emotion-server').default;
const createCache = require('@emotion/cache').default;
const express = require('express');
const path = require('path');

/* Manually kept in sync with server.js for now */
function App() {
    return (
        <>
            <Global
                styles={css`
                    .foo {
                        color: red;
                    }
                `}
            />
            <h1 className="foo" css={{ color: 'green' }}>
                Hello, world!
            </h1>
            <p>View this page with javascript enabled and disabled. The text above should be green.</p>
        </>
    );
}

const cache = createCache();
const { extractCritical } = createEmotionServer(cache);

let element = (
    <CacheProvider value={cache}>
        <App />
    </CacheProvider>
);

let { html, css: cssContent, ids } = extractCritical(renderToString(element));

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const resp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My site</title>
    <style data-emotion-css="${ids.join(' ')}">${cssContent}</style>
</head>
<body>
    <div id="root">${html}</div>

    <script src="./bundle.js"></script>
</body>
</html>`;
    console.log(resp);
    res.send(resp);
});

app.get('/bundle.js', (req, res) => {
    res.sendFile(path.resolve('bundle.js'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
