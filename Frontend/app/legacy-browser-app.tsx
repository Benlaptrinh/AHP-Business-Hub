'use client';

import { BrowserRouter } from 'react-router-dom';
import App from '../legacy/App';

export default function LegacyBrowserApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
