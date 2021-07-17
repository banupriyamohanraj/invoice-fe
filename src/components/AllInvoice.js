import {  useEffect, useState } from "react"
import { useContext } from "react";
import UserContext from "../userContext/userContext";

import { Link } from "react-router-dom";


export default function AllInvoice() {
  
    let Invoicelist = useContext(UserContext)

    let [invoices, setInvoices] = useState([])

    useEffect(() => {
        async function fetchdata(){
            await fetch('https://invoice-backendapp.herokuapp.com/invoice/list')
            .then(res => {
                return res.json();
            }).then((data) => {
                setInvoices(data)
                Invoicelist.setinvoicelist([data])
               
            })
        }
      
        fetchdata();
    }, [Invoicelist])

    return <>
        <div className="container">
            <div className="row">


                {
                invoices.map((obj) => {

                    return <div className="col-md-4">
                        <div class="card border-secondary mb-3" style={{ "max-width": "25rem","height":"23rem" }}>
                            <div class="card-header text-secondary">{obj.invoice.invoiceno}</div>
                            <div class="card-body text-dark">
                                <h5 class="card-title">client : {obj.invoice.clientcompanyname}</h5>
                                <p class="card-text">DueDate: {obj.invoice.duedate}<br/>
                                client address: {obj.invoice.clientaddress}<br/>
                                Client email: {obj.invoice.clientemail}</p>
                                <p> Created By <b>{obj.invoice.user.firstname}{obj.invoice.user.lastname}</b></p>
                               
                            </div>
                            <div class="card-footer bg-transparent border-secondary">created on : <b>{obj.invoice.invoicedate}</b>&emsp;&emsp;&emsp;&emsp;
                             <Link to={`/renderInvoice/${obj._id}`} ><button type="button" className="btn btn-secondary" >View</button></Link></div>
                        </div>
                    </div>


                })
            }



            </div>
        </div>

    </>
}

