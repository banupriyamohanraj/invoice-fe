
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { UserProvider } from './userContext/userContext';
import Login from './Authentication/Login';
import Forgotpassword from './Authentication/Forgotpassword';
import Registration from './Authentication/Registration';
import ConfirmEmail from './Authentication/ConfirmEmail';
import Resetpassword from './Authentication/Resetpassword';
import Invoice from './components/InvoiceDashboard';
import Logout from './Logout';


function App() {
  return <>
    <Router>
      <div id='wrapper'>
        <UserProvider>
          <Switch>
            <Route path="/" component={Login} exact={true}></Route>
            <Route path="/forgotpassword" component={Forgotpassword} exact={true}></Route>
            <Route path="/registration" component={Registration} exact={true}></Route>
            <Route path='/invoiceDashboard' component={Invoice} exact={true}></Route>
            <Route path='/logout' component={Logout} exact={true}></Route>
            <Route path="/confirm/:confirmationcode" component={ConfirmEmail} exact={true}></Route>
            <Route path='/resetpassword/:token' component={Resetpassword} exact={true}></Route>
          </Switch>
        </UserProvider>

      </div>
    </Router>
  </>
}

export default App;
