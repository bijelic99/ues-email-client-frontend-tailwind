import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/userContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Compose from "./pages/Compose";
import AddContact from "./pages/AddContact";
import Inbox from "./pages/Inbox";
import Contacts from "./pages/Contacts";
import Contact from "./pages/Contarct";
import AddAccount from "./pages/AddAccount";
import Account from "./pages/Account";
import { AccountProvider } from "./contexts/accountContext";
import { FolderProvider } from "./contexts/folderContext";
import Message from "./pages/Message";
import User from "./pages/User"

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/add-contact' component={AddContact} />
            <PrivateRoute path='/edit-contact/:id' component={AddContact} />
            <PrivateRoute path='/contacts/:id' component={Contact} />
            <PrivateRoute path='/contacts' component={Contacts} />
            <PrivateRoute path='/add-account' component={AddAccount} />
            <PrivateRoute path='/account/:id' component={Account} />
            <PrivateRoute path='/message/:id' component={Message} />
            <AccountProvider>
            <Switch>
              <PrivateRoute path='/user/:id' component={User} />
              <PrivateRoute path='/compose' component={Compose} />
              <FolderProvider>
                <PrivateRoute path='/' component={Inbox} />
              </FolderProvider>
            </Switch>
            </AccountProvider>
          </Switch>
        </Router>
      </UserProvider>
      <NotificationContainer />
    </div>
  );
}

export default App;
