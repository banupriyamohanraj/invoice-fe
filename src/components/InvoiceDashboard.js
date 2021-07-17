import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import NewInvoice from "./NewInvoice"
import AllInvoice from './AllInvoice'
import Dashboard from './Dashboard'
import RenderInvoice from "./RenderInvoice"
import Logout from "../Authentication/Logout"

export default function Invoice() {


    return <><Router>
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>
                <div className="container-fluid">
                   
                    <Switch>
                        
                        <Route path='/Dashboard' component={Dashboard} exact={true}></Route>
                        <Route path='/newInvoice' component={NewInvoice} exact={true}></Route>
                        <Route path='/allInvoice' component={AllInvoice} exact={true}></Route>
                        <Route path='/logout' component ={Logout}exact={true}></Route>
                        <Route path='/renderInvoice/:id' component={RenderInvoice} exact={true}></Route>
                    </Switch>
                </div>
            </div>
        </div>
    </Router>

    </>
}