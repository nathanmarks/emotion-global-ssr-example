/** @jsx jsx */
import * as React from 'react';
import { jsx, CacheProvider, css, Global } from '@emotion/core';
import createCache from '@emotion/cache';
import ReactDOM from 'react-dom';

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
let element = (
    <CacheProvider value={cache}>
        <App />
    </CacheProvider>
);

ReactDOM.hydrate(element, document.getElementById('root'));
console.log('Hydrated!');
