
import {useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom'


export default function Resetpassword(props) {
    let [password, setpassword] = useState('')
    let token = props.match.params.token;

    console.log(props.match.params.token)
    toast.configure()
    let history = useHistory();
    let UserSubmit = async (e) => {
        e.preventDefault()
         await fetch("https://invoice-backendapp.herokuapp.com/auth/newpassword", {
            method: "POST",
            body: JSON.stringify({
                password, token
            }),
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            return res.json();

        }).then((data) => {
            let mesg = data.message
            toast(mesg, { position: toast.POSITION.TOP_CENTER })
            if(mesg === "Password Updated Successfully"){
                history.push('/')
               }
        }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                
                <div className="col-md-8 m-4">

                <div class="card">
                    <div className='card-header'>
                    <h1>Reset password</h1>
                    </div>
  <div class="card-body">
  <form onSubmit={UserSubmit}>

<div class="form-group m-2">
    <label for="exampleInputPassword1">Enter new Password</label>
    <input type="password" class="form-control" onChange={(e)=>{setpassword(e.target.value)}}></input>
</div>


<br />
<button type="submit" class="btn btn-primary">Submit</button>

</form>
  </div>
</div>
                    
                    
                </div>
            </div>

        </div>
    );
}