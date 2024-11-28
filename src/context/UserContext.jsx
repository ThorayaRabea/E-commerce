import { useState } from "react";
import { createContext } from "react";

export let UserContext=createContext()

export default function UserContextProvider(props){
   
    const [UserLogin, setUserLogin] = useState(
        localStorage.getItem("UserToken")?localStorage.getItem("UserToken"):null
    )
    const [userMail, setuserMail] = useState(null)
    const [userpassword, setuserpassword] = useState(null)
    

    return <UserContext.Provider value={  {UserLogin,setUserLogin,userMail,setuserMail,setuserpassword,userpassword}  }>
            {props.children}
    </UserContext.Provider>
}