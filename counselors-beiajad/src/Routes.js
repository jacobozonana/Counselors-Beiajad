import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthContextProvider  from './contexts/AuthContext'
//Views
import Home from "./Pages/Home/Home";
import Login from "./Components/Users/Login.jsx";
import Logout from "./Components/Users/Logout.jsx";
import Register from "./Components/Users/Signup.jsx";
import UsersList from "./Components/UsersList/UsersList.jsx";
import DoctorList from "./Components/UsersList/DoctorList.jsx";
import ScheduleList from "./Components/ScheduleList/ScheduleList.jsx"; 
import Faq from './Pages/Faq/Faq';
import SignupDoctor from "./Components/Users/SignupDoctor.jsx";
import SignupAdmin from "./Components/Users/SignupAdmin.jsx";
import AdminList from "./Components/UsersList/AdminList.jsx";

function Routes() {
  return (
    <BrowserRouter>
     <AuthContextProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/signupdoctor" component={SignupDoctor} />
        <Route exact path="/signupadmin" component={SignupAdmin} />
        <Route exact path="/users" component={UsersList} />
        <Route exact path="/doctors" component={DoctorList} />
        <Route exact path="/admins" component={AdminList} />
        <Route exact path="/schedule" component={ScheduleList} />
        <Route exact path="/faq" component={Faq} />
      </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;
