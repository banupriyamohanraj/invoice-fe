import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'


export default function Logout(){
    let history = useHistory();
  
      
   
    
    useEffect(()=>{
        history.push("/")
    })
    return <></>
}