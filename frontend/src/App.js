import {Route,Routes} from 'react-router-dom';
import './App.css';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Test from './components/test';
import RedLogin from './components/Redlogin';
import RedLoginR from './components/REdloginr'
import {AuthContext} from "./components/auth-context";
import Header from './components/header';
import Upload from './components/upload';
import ContainerPublic from "./components/containerpublic"
import ContainerPrivate from "./components/containerprivate";
import {useContext} from 'react';
function App() {

  const isLoggedIn=useContext(AuthContext).userInfo.isLoggedIn;
  return (
    <div>
      {!!isLoggedIn&&<Header />}
      <Routes>
        <Route path='/' element={<Test />} />
        <Route path="/signin" element={<RedLoginR><SignIn /></RedLoginR>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upload" element={<RedLogin><Upload /></RedLogin>} />
        <Route path="/public"  element={<RedLogin><ContainerPublic /></RedLogin>} />
        <Route path="/private" element={<RedLogin><ContainerPrivate /></RedLogin>} />
      </Routes>
    </div>
  );
}

export default App;
