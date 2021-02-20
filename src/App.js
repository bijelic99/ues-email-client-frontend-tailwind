import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Compose from "./pages/Compose";
import AddContact from "./pages/AddContact";
import Inbox from "./pages/Inbox";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/compose' component={Compose} />
            <PrivateRoute path='/add-contact' component={AddContact} />
            <PrivateRoute path='/contacts' component={Contacts} />
            <PrivateRoute path='/' component={Inbox} />
          </Switch>
        </Router>
      </UserProvider>
      <NotificationContainer />
    </div>
  );
}

export default App;
