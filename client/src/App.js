import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Layout from './core/layouts/layoutWrapper';
import HomeView from './core/layouts/homeView';
import BristolView from './views/bristol';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route exact path="/Bristol">
            <BristolView />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
