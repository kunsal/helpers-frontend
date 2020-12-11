import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
