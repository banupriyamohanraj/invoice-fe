import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'


export default function Logout(){
    let history = useHistory();
    let logout=()=>{
        history.push("/")
    }
    useEffect(()=>{
        logout()
    })
    return <></>
}