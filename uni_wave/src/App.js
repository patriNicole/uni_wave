import "./App.css";
import Routes from './routes/Routes.js';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router basename="/uniwave">
      <div className="page_background">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
