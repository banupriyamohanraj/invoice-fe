import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Registration() {


    let [firstname, setfirstname] = useState('')
    let [lastname, setlastname] = useState('')
    let [email, setemail] = useState('')
    let [password, setpassword] = useState('')
    let [user,setUser]=useState('');


    let history = useHistory();
    toast.configure()
    let status = "pending"
    let UserSubmit = async (e) => {
        e.preventDefault()
        await fetch("https://invoice-backendapp.herokuapp.com/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                firstname,
                lastname,
                password,
                status,
                user
            }),
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            return res.json();

        }).then((data) => {

            let mesg = data.message
            toast(mesg, { position: toast.POSITION.TOP_CENTER })
            history.push('/')
        }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
        });
    }
console.log(user)

    return <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-7' style={{ "padding-left": "50px", "margin-left": "200px", "marginTop": "40px" }}>
                    <div class="card" style={{ "padding-top": "50px", "border-radius": "3%", "color":"white","background-image": "linear-gradient(to bottom right, #173F5F, #20639B)"}}>
                        <div className='card-title' style={{ "textAlign": "center" }}>
                            <h2>SIGN UP</h2>
                        </div>
                        <div class="card-body">
                            <form onSubmit={UserSubmit}>
                                <div class="form-group">
                                    <label for="email">username</label>
                                    <input type="email" class="form-control" id="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter your email address" />

                                </div>
                                <div class="form-group">
                                    <label for="firstname">Firstname</label>
                                    <input type="firstname" class="form-control" id="firstname" value={firstname} onChange={(e) => setfirstname(e.target.value)} />

                                </div>
                                <div class="form-group">
                                    <label for="lastname">Lastname</label>
                                    <input type="lastname" class="form-control" id="lastname" value={lastname} onChange={(e) => setlastname(e.target.value)} />

                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setpassword(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Type of User</label>
                                    <select class="form-control" id="exampleFormControlSelect1"value={user} onChange={(e)=>{setUser(e.target.value)}}>
                            
                                        <option>Admin</option>
                                        <option>Manager</option>
                                        <option>Employee</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-light">sign Up</button>

                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </div>

    </>


}