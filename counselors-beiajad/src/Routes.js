import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import Home from "./Pages/Home/Home";
import Logout from "./Components/Users/Logout.jsx";
import Signup from "./Components/Users/Signup.jsx";
import Faq from "./Pages/Faq/Faq";
import SignupDoctor from "./Components/Users/SignupDoctor.jsx";
import SignupAdmin from "./Components/Users/SignupAdmin.jsx";
import UsersList from "./Components/UsersList/UsersList.jsx";
import DoctorsList from "./Components/UsersList/DoctorsList.jsx";
import AdminsList from "./Components/UsersList/AdminsList.jsx";
import BlockList from "./Components/ScheduleList/BlockList";
import Eprofile from "./Components/Profile/Eprofile";
import UpMedia from "./Components/Media/UpMedia"
import Contact from "./Components/Contact/Contact"
import ContactList from "./Components/ContactList/ContactList"

function Routes() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/signupdoctor" component={SignupDoctor} />
          <Route exact path="/signupadmin" component={SignupAdmin} />
          <Route exact path="/userslist" component={UsersList} />
          <Route exact path="/blocklist" component={BlockList} />
          <Route exact path="/doctorslist" component={DoctorsList} />
          <Route exact path="/adminslist" component={AdminsList} />
          <Route exact path="/profile" component={Eprofile} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/files" component={UpMedia} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/contactlist" component={ContactList} />

        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;
