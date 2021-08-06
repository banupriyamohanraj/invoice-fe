import { useContext, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import easyinvoice from 'easyinvoice';
import userContext from "../userContext/userContext";
import { Redirect } from "react-router";

export default function NewInvoice() {
    //userdata
    let userData = useContext(userContext);
    let user = userData.userlist
    let [count, setcounter] = useState(1)
    //tablerow
    let [row, setnewrow] = useState([]);
    let [description, setdescription] = useState('');
    let [qty, setqty] = useState(0);
    let [price, setprice] = useState(0);
    let [total, settotal] = useState(0);
  
    //from
    let [companyname, setcompanyname] = useState('');
    let [email, setemail] = useState('');
    let [address, setaddress] = useState('');
    let [phno, setphno] = useState('');
    //billtype
    let [type, settype] = useState('');
    //to
    let [clientcompanyname, setclientcompany] = useState('');
    let [clientemail, setclientemail] = useState('');
    let [clientaddress, setclientaddress] = useState('');
    //Invoice
    let [invoiceno, setinvoiceno] = useState('');
    let [invoicedate, setinvoicedate] = useState('');
    let [duedate, setduedate] = useState('');
    //total
    let [subtotal, setsubtotal] = useState(0);
    let [tax, settax] = useState(10);
    let [totaltax,settotaltax] = useState(0);
   
  
    let sum = (obj) => {
        let totalamount = 0;
        obj.forEach(element => {
            totalamount += element.total;

        });
        return totalamount

    }

    //invoice data
   let data= {
        "currency": "USD",
        "taxNotation": "vat",
        "marginTop": 50,
        "marginRight": 50,
        "marginLeft": 50,
        "marginBottom": 25,
        "background": "https://public.easyinvoice.cloud/pdf/sample-background.pdf",
        "sender": {
          "company": companyname,
          "address": address,
          "zip": "1234 AB",
          "city": "Sampletown",
          "country": "Samplecountry",
          "email":email
        },
        "client": {
          "company": clientcompanyname,
          "address": clientaddress,
          "zip": "4567 CD",
          "city": "Clientcity",
          "country": "Clientcountry",
          "clientemail":clientemail
        },
        "invoiceNumber": invoiceno,
        "invoiceDate": invoicedate,
        "invoiceDueDate":duedate,
        "products": row,
        "bottomNotice": "Kindly pay your invoice within 15 days."
    }

    let UserSubmit = async (e) => {
        e.preventDefault()

        easyinvoice.createInvoice(data, function (result) {
            easyinvoice.download('myInvoice.pdf', result.pdf);
         

        });

        await fetch("https://invoice-backendapp.herokuapp.com/invoice/createinvoice", {
            method: "POST",
            body: JSON.stringify({companyname,address,email,phno,type,clientcompanyname,clientaddress,clientemail,invoiceno,invoicedate,duedate,row,user}),
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            return res.json();
        }).then((data) => {
            console.log(data)
        })
    }

    if(!userData.userLoggedIn){
        return <Redirect to="/"></Redirect>
    }


    return <>
        <form onSubmit={UserSubmit} enctype="multipart/form-data">
            <div className="maindiv">


                <br /><br />

                <h3><b>From:</b></h3>
                <div className="row">
                    <div className="col-5">

                        <div class="form-group">
                            <input type="companyname" class="form-control" id="companyname" placeholder="Your Company" value={companyname} onChange={(e) => setcompanyname(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" value={email} placeholder="your@email.com" onChange={(e) => setemail(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <input type="address" class="form-control " id="address" placeholder="your address" value={address} onChange={(e) => setaddress(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <input type="phno" class="form-control" id="phno" placeholder="P:(123)456 7890" value={phno} onChange={(e) => setphno(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-7">
                        <h4>
                            <div class="form-group">
                                <input type="billtype" class="form-control form-control-lg" id="billtype" placeholder="Invoice" value={type} onChange={(e) => settype(e.target.value)} />
                            </div>
                        </h4>

                    </div>
                </div>
                <h3><b>Bill To:</b></h3>
                <div className="row">

                    <div className="col-6">

                        <div class="form-group">
                            <input type="clientcompanyname" class="form-control" id="clientcompanyname" placeholder="Your client Company" value={clientcompanyname} onChange={(e) => setclientcompany(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yourclient@email.com" value={clientemail} onChange={(e) => setclientemail(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <input type="address" class="form-control" id="address" placeholder="your client address" value={clientaddress} onChange={(e) => setclientaddress(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div class="form-group row">
                            <label for="colFormLabel" class="col-4 col-form-label ">Invoice#</label>
                            <div class="col-sm-4">
                                <input type="invoiceno" class="form-control form-control-sm" id="colFormLabelSm" defaultValue="INV-12" value={invoiceno} onChange={(e) => setinvoiceno(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="date colFormLabel" class="col-4 col-form-label ">Invoice Date</label>
                            <div class="col-sm-4">
                                <input type="date" class="form-control form-control-sm" id="date colFormLabelSm" placeholder="mm/dd/yyyy" value={invoicedate} onChange={(e) => setinvoicedate(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="date colFormLabel" class="col-4 col-form-label ">Due Date</label>
                            <div class="col-sm-4">
                                <input type="date" class="form-control form-control-sm" id="date colFormLabelSm" value={duedate} onChange={(e) => setduedate(e.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
                <br /><br />
                <div className="row">
                    <div className="col-6">
                        <div class="form-group row">
                            <label for="colFormLabel" class="col-4 col-form-label ">Item name</label>
                            <div class="col-sm-4">
                                <input type="itemname" class="form-control form-control-sm" id="colFormLabelSm" value={description} onChange={(e) => setdescription(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for=" colFormLabel" class="col-4 col-form-label ">quantity</label>
                            <div class="col-sm-4">
                                <input type="quantity" class="form-control form-control-sm" id=" colFormLabelSm" value={qty} onChange={(e) => setqty(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for=" colFormLabel" class="col-4 col-form-label ">Rate</label>
                            <div class="col-sm-4">
                                <input type="rate" class="form-control form-control-sm" id=" colFormLabelSm" value={price} onChange={(e) => setprice(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="colFormLabel" class="col-4 col-form-label ">Amount</label>
                            <div class="col-sm-4">
                                <input type="amount" class="form-control form-control-sm" id=" colFormLabelSm" value={total = qty * price} onChange={(e) => settotal(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="colFormLabel" class="col-4 col-form-label ">vat</label>
                            <div class="col-sm-4">
                                <input type="amount" class="form-control form-control-sm" id=" colFormLabelSm" value={tax} onChange={(e) => settax(e.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <table className="table dark" style={{ "width": "100%" }}>
                        <thead className="thead-dark">
                            <tr>

                                <th>Item Description</th>
                                <th>Qty</th>
                                <th>Rate</th>
                                <th>Amount</th>
                                <th>VAT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                row.map((obj) => {
                                    return <tr>
                                        <td>{obj.description}</td>
                                        <td>{obj.quantity}</td>
                                        <td>{obj.price}</td>
                                        <td>{obj.total}</td>
                                        <td>{obj.tax}</td>
                                        <td><button type="button" className="btn btn-dark" onClick={ () => {
                                            console.log("row deleted")
                                            setcounter(count - 1)
                                            setnewrow(row.filter(item => item.id !== obj.id))
                                        }}><i class="fa fa-times-circle" aria-hidden="true"></i></button></td>
                                    </tr>
                                })



                            }
                        </tbody>

                    </table>
                    <div className="col-8">
                        <button type="button" className="btn btn-success" onClick={ (e) => {
                            e.preventDefault()
                            setcounter(count + 1)
                            setnewrow([...row, { id: count, description: description, quantity: qty, price: price, total: total ,tax:tax}])
                            console.log("row added")
                            console.log(row)



                        }}><i class="fa fa-plus" aria-hidden="true" ></i> Add Line Item</button>
                    </div>
                    <div className="col-4">
                        <div class="form-group row">
                            <label for="colFormLabel" class="col-4 col-form-label ">Sub Total</label>
                            <div class="col-4">

                                <input type="total" class="form-control form-control-sm" id="colFormLabelSm" value={subtotal = sum(row)} onChange={(e) => setsubtotal(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="colFormLabel" class="col-4 col-form-label ">Sales Tax(10%)</label>
                            <div class="col-4">
                                <input type="total" class="form-control form-control-sm" id="colFormLabelSm" value={totaltax = subtotal * 10 / 100} onChange={(e) => settotaltax(e.target.value)} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="colFormLabel" class="col-4 col-form-label ">TOTAL</label>
                            <div class="col-4">
                                <input type="total" class="form-control form-control-sm" id="colFormLabelSm" value={subtotal + totaltax}  />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="col-6">
                        <button type='submit' className='btn btn-dark' >Generate Invoice <i class="fa fa-download"></i></button>
                    </div>

            </div>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
    </>
}






