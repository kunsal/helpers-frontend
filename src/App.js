import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {HashRouter as Router, Switch} from 'react-router-dom';
import { navigationLinks } from "./components/common/constants/navigation-links";
import LayoutRoute from './components/layouts/LayoutRoute';

function App() {
  return (
    <Router>
      <Switch>
          {navigationLinks.map(page => (
            <LayoutRoute layout={page.layout} path={page.link} component={page.component} key={page.link} exact={page.exact} /> 
          ))};
        </Switch>
    </Router>
  );
}

export default App;
