import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GuestPage from './components/GuestPage/GuestPage';
import Home from './components/Home/Home';

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
