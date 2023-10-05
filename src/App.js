import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './Components/Home';
import Login from './Components/Login';
import Item from './Components/Item';
import ProtectedRoute from './Components/protectedRoute'
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/:id" component={Item} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
