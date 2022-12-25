import {useState,createContext} from 'react';

const AuthContext = createContext();


const userInformation = {
    userId:"",
    token:"",
    userName: "",
    isLoggedIn: false,
}


const AuthProvider =(props) => {
    const [userInfo,setUserInfo] = useState(userInformation);
    const login = (email,pass,setOpen)=>{
        const url= "http://localhost:8080/api/auth";
        const loginData = {
            email:email,
            password:pass
        }
    
        const fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(loginData)
            
        }
    
        fetch(url,fetchOptions).then(response=>{
            if(response.status!=200)
            {
                setOpen(true);
                throw new Error("Something went wrong");
            }
            else
            {
                return response.json();
            }
        })
        .then(json=>{
            console.log(json);
            localStorage.setItem("token",json.token);
            const userInfo = {
                userId: json.id,
                token: json.token,
                userName: json.name,
                isLoggedIn: true
            }

            setUserInfo(userInfo);
        });
    
    }
    
    const logout= () => {
        localStorage.removeItem("token");
        setUserInfo(userInformation);
    }

    return (
    <AuthContext.Provider value={{userInfo,setUserInfo:setUserInfo,login:login,logout:logout}}>
        {props.children}
    </AuthContext.Provider>
    )
}

export  {AuthContext,AuthProvider};