import { useContext,useState } from "react";
import UserContext from "../userContext/userContext";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    

    let [email, setemail] = useState('');
    let [password, setpassword] = useState('');

    let userData = useContext(UserContext)
    let history = useHistory();
    toast.configure()


    let UserSubmit = async (e) => {
        e.preventDefault()
        await fetch('https://invoice-backendapp.herokuapp.com/auth/login', {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            }).then((data) => {
                //passing userdata to other components
                userData.setuserlist(data.data)
                console.log(userData)

                //notifying user
                let mesg = data.message
                console.log(mesg)
                toast(mesg, { position: toast.POSITION.TOP_CENTER })
               if(mesg === "Login Sucessfull"){
                history.push('/invoiceDashboard')
               }
              
              
            })

    }

    

    return <>
        <div className='container'>
            <div className='row'>
                <div className='col-6' style={{ "padding-left": "50px", "margin-left": "250px", "margin-top": "10px" }}>
                    <div class="card" style={{ "padding": "20px", "border-radius": "3%" ,"marginTop":"50px","color":"white","background-image": "linear-gradient(to bottom right, #173F5F, #20639B)"}} >
                        <div className='card-title' style={{ "textAlign": "center","marginTop":"40px" }}>
                           
                            <h2>LOGIN</h2>
                        </div>
                        <div class="card-body">
                            <form onSubmit={UserSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    <Link to="/forgotpassword" style={{"color":"white"}}>Forgot password ? </Link>
                                </div>
                                <br />
                                <button type="submit" class="btn btn-light">Login</button>

                            </form>
                            <br />
                            <div>
                                <h5>Do not have an account ? <Link to="/registration" style={{"color":"white"}}>signup</Link></h5>
                                <br />

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </>


}