import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const useAuth = ()=>{

    const { user } = useSelector((state) => state.authSlice)
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        if(user){
            setUserAuth(true);
        }else{
            setUserAuth(null)
        }
    }, [user]);

    return userAuth;

}

export default useAuth;