import {useContext} from 'react'
import { AuthContext } from './auth-context'
import { Navigate } from 'react-router-dom';
import React from 'react'
const RedLogin=(props)=> {
    const authValue = useContext(AuthContext);
    const loggedIn= !!authValue.userInfo.isLoggedIn;

    return (
        <React.Fragment>
            {loggedIn&&props.children}
            {!loggedIn&&<Navigate to={"/signin"} />}
        </React.Fragment>
    )
}

export default RedLogin;