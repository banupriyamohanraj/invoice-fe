import React, { useState } from 'react';

let UserContext = React.createContext();

export default UserContext;


export const UserProvider = ({children})=>{

    let [userlist,setuserlist] = useState([])
    let [ userLoggedIn,setuserLoggedIn] = useState(false)
    let[invoicelist,setinvoicelist] = useState([])
    return <UserContext.Provider value={{userlist,setuserlist,invoicelist,setinvoicelist,userLoggedIn,setuserLoggedIn}}>
        {children}
    </UserContext.Provider>
}