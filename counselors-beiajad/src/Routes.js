import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthContextProvider  from './contexts/AuthContext'
import Home from "./Pages/Home/Home";
import Login from "./Components/Users/Login.jsx";
import Logout from "./Components/Users/Logout.jsx";
import Signup from "./Components/Users/Signup.jsx";
import ScheduleList from "./Components/ScheduleList/ScheduleList.jsx"; 
import Faq from './Pages/Faq/Faq';
import SignupDoctor from "./Components/Users/SignupDoctor.jsx";
import SignupAdmin from "./Components/Users/SignupAdmin.jsx";
import UsersList from "./Components/UsersList/UsersList.jsx";
import DoctorsList from "./Components/UsersList/DoctorsList.jsx";
import AdminsList from "./Components/UsersList/AdminsList.jsx";
import AllList from "./Components/UsersList/AllList.jsx";


function Routes() {
  return (
    <BrowserRouter>
     <AuthContextProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/signupdoctor" component={SignupDoctor} />
        <Route exact path="/signupadmin" component={SignupAdmin} />
        <Route exact path="/userslist" component={UsersList} />
        <Route exact path="/doctorslist" component={DoctorsList} />
        <Route exact path="/adminslist" component={AdminsList} />
        <Route exact path="/alllist" component={AllList} />
        <Route exact path="/schedule" component={ScheduleList} />
        <Route exact path="/faq" component={Faq} />
      </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;
