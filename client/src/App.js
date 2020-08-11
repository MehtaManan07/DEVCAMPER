import React from "react";
import { Switch, Route } from "react-router-dom";
import { fetchUser } from "./redux/actions/Users";
import NavbarComponent from "./components/core/Navbar";
import Landing from "./pages/core/Landing";
import AllBootcamps from "./pages/bootcamps/AllBootcamps";
import CreateBootcamp from "./pages/bootcamps/CreateBootcamp";
import AddCourse from "./pages/courses/AddCourse";
import Bootcamp from "./pages/bootcamps/Bootcamp";
import UpdateBootcamp from "./pages/bootcamps/UpdateBootcamp";
import ManageBootcamp from "./pages/bootcamps/ManageBootcamp";
import ManageCourses from "./pages/courses/ManageCourses";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ManageAccount from "./pages/auth/ManageAccount";
import store from "./redux/store";
import UpdateCourse from "./pages/courses/UpdateCourse";
import PrivateRoute from "./components/core/PrivateRoute";
import UpdatePassword from "./pages/auth/UpdatePassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ChangePassword from "./pages/auth/ChangePassword";

if (localStorage.DevCamper) {
  store.dispatch(fetchUser());
}
function App() {

  return (
    <div>
      <NavbarComponent />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset/password" component={ResetPassword} />
        <Route exact path="/bootcamp/:name/:id" component={Bootcamp} />
        <Route path="/all/bootcamps" component={AllBootcamps} exact />
        <PrivateRoute path="/new/bootcamp" component={CreateBootcamp} exact />
        <PrivateRoute path="/manage/courses/:id" component={ManageCourses} exact />
        <PrivateRoute path="/manage/bootcamp/:id" component={ManageBootcamp} exact />
        <PrivateRoute path="/manage/account" component={ManageAccount} exact />
        <PrivateRoute path="/update/password" component={UpdatePassword} exact />
        <PrivateRoute path="/update/bootcamp/:id" component={UpdateBootcamp} exact />
        <PrivateRoute path="/update/course/:id" component={UpdateCourse} exact />
        <PrivateRoute path="/new/course/:id" component={AddCourse} exact />
        <PrivateRoute path="/auth/password/reset/:token" component={ChangePassword} exact />
      </Switch>
    </div>
  );
}

export default App;
