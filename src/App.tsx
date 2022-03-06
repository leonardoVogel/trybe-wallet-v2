import { Switch, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Wallet } from './pages/Wallet';

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}
