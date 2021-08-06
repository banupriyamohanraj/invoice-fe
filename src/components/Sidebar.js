import {
    Link,Redirect
  } from "react-router-dom"
  import { useContext } from "react"
  import userContext from "../userContext/userContext"
  
  
  export default function Sidebar() {
    let userdata= useContext(userContext)

    if(!userdata.userLoggedIn){
      return <Redirect to="/"/>
    }


    return <>
      <ul class="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
  
  
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-file-invoice"></i>
          </div>
          <div class="sidebar-brand-text mx-3">Invoice Generator</div>
        </a>
  
  
        <hr class="sidebar-divider my-0" />
  
  
        <li class="nav-item active">
          <Link to="/Dashboard" class="nav-link">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
  
  
        <hr class="sidebar-divider" />
  
  
        <div class="sidebar-heading">
          Interface
    </div>
  
  
        <li class="nav-item">
          <Link to="/newInvoice" class="nav-link collapsed"  data-toggle="collapse" data-target="#collapseTwo"
            aria-expanded="true" aria-controls="collapseTwo">
            <i class="fa fa-plus-square" aria-hidden="true"></i>
            <span>create new Invoice</span>
          </Link>
  
        </li>
  
  
        <li class="nav-item">
          <Link to='/allInvoice' class="nav-link collapsed"  data-toggle="collapse" data-target="#collapseUtilities"
            aria-expanded="true" aria-controls="collapseUtilities">
            <i class="fa fa-th-list" aria-hidden="true"></i>
            <span>List of Invoices</span>
          </Link>
  
        </li>
  
  
        <hr class="sidebar-divider" />
  
  
      </ul>
      
  
    </>
  }