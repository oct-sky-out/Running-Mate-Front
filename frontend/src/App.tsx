import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GuestPage from './GuestPage/GuestPage';
import Home from './Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={GuestPage} />
        <Route exact path="/home" component={Home} />
      </Switch>
      <div id="modal" />
    </BrowserRouter>
  );
}

export default App;
