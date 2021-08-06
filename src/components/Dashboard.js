import React, { useContext, useEffect, useState } from "react"
import UserContext from "../userContext/userContext"
import DatePicker from 'react-date-picker';
import Moment from 'react-moment';
import moment from 'moment'
import { Link,Redirect } from "react-router-dom";


export default function Dashboard() {
    let userdata = useContext(UserContext);


    const [value, onChange] = useState(new Date());
    let [data, setdata] = useState('')
   
    let date = moment(value).format('YYYY-MM-DD');

    useEffect(() => {
        async function fetchdata() {
            await fetch('https://invoice-backendapp.herokuapp.com/invoice/userinvoice', {
                method: "POST",
                body: JSON.stringify({
                    date
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
                .then(res => {
                    return res.json();
                }).then((data) => {
                 
                    setdata([...data])
                })
        }
        fetchdata();
    },[date])

    if(!userdata.userLoggedIn){
        return <Redirect to='/'/>
    }

    return <>
        <div className="container m-0" >
            <div className="row">
                <div className="col-12 m-0">
                    <div class="jumbotron">
                        <h1 class="display-4">Hello {userdata.userlist.firstname}!!</h1>
                        <p class="lead"><b>Total invoices Created today....</b></p>
                        <div><DatePicker
                            onChange={onChange}
                            defaultValue={new Date()}
                            value={value}
                            format="dd-MM-y"
                            maxDate={new Date()}
                            dayPlaceholder='dd'
                            monthPlaceholder='mm'
                            yearPlaceholder="yyyy"
                        /></div>
                        <hr class="my-4" />
                        <div className="col-8">
                        <h5>Invoice Created on <Moment format='DD-MM-YYYY'>{date}</Moment></h5>
                        </div>
                        <div className="col-4">
                            
                        </div>
                        <ul class="list-group list-group-flush">
                        {
                            data ?
                            data.map((obj)=>{
                                return <>
                                
                              
                            <li class="list-group-item" style={{"margin":"10px"}}>{obj.invoice.invoiceno}
                           <Link to={`/renderInvoice/${obj._id}`}><button type="button" className="btn btn-secondary " style={{"float": "right"}}>view Invoice</button></Link> </li>
                           
                                </>
                            }):
                            <div class="spinner-border" role="status" style={{"float": "right"}}>
                                <span class="sr-only">Loading...</span>
                            </div>
                        }
                         </ul>
                        {/* <ul class="list-group list-group-flush">
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                        </ul> */}
                    </div>
                </div>

            </div>
        </div>



    </>

}