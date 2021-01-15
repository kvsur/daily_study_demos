import React from 'react';
import ReactDom from 'react-dom';

import App from './index';

const el = document.getElementById('root');

ReactDom.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>, el);
