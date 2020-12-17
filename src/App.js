import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {HashRouter as Router, Switch} from 'react-router-dom';
import Home from './components/Home';
import LayoutRoute from './components/layouts/LayoutRoute';
import front from './components/layouts/front';
import Login from './components/Login';
import AppNavbar from './components/common/AppNavbar';

function App() {
  return (
    <Router>
      <Switch>
        <AppNavbar />
        <LayoutRoute exact layout={ front } path="/" component={ Home } />
        <LayoutRoute exact layout={ front } path="/login" component={ Login } />
      </Switch>
    </Router>
  );
}

export default App;
