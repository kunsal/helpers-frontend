import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {HashRouter as Router, Switch} from 'react-router-dom';
import { navigationLinks } from "./components/common/constants/navigation-links";
import LayoutRoute from './components/layouts/LayoutRoute';
import { Helmet } from 'react-helmet';
import favicon from './images/fav.png';

function App({props}) {
  return (
    <Router>
      <Helmet>
        <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
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
          <LayoutRoute layout={page.layout} path={page.link} component={page.component} key={page.link} exact={page.exact} {...props} /> 
        ))};
      </Switch>
    </Router>
  );
}

export default App;
