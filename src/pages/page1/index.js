import React from "react";
import { createRoot } from 'react-dom/client';
import Home from '@containers/Home';
import '@style/index.less';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);