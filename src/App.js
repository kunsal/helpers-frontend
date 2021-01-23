import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {HashRouter as Router, Switch} from 'react-router-dom';
import { navigationLinks } from "./components/common/constants/navigation-links";
import LayoutRoute from './components/layouts/LayoutRoute';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <Router>
      <Helmet>
        <style>
        {`
          .btn-primary {
            color: #fff;
            background-color: #6d62ff;
            border-color: #6d62ff;
          }

          .btn-primary:hover {
            background-color: #655cde;
            border-color: #655cde;
          }
        `}  
        </style>    
      </Helmet>
      <Switch>
          {navigationLinks.map(page => (
            <LayoutRoute layout={page.layout} path={page.link} component={page.component} key={page.link} exact={page.exact} /> 
          ))};
        </Switch>
    </Router>
  );
}

export default App;
