import React, { useState } from 'react'
import { UserContext } from './Usercontext';

function Usercontextprovider({children}) {
    const [user,setuser]=useState("");
  
  return (
    <div>
        {/* <UserContext.provider value={{user,setuser}}>
          {children}
        </UserContext.provider> */}
        <UserContext.Provider value={{user,setuser}}>
        {children}
        </ UserContext.Provider>
    </div>
  )
}

export default Usercontextprovider