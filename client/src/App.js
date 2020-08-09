import React, { useEffect } from "react";
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
import store from "./redux/store";
import UpdateCourse from "./pages/courses/UpdateCourse";
import PrivateRoute from "./components/core/PrivateRoute";

function App() {
  useEffect(() => {
    if (localStorage.DevCamper) {
      store.dispatch(fetchUser());
    }
  }, []);
  return (
    <div>
      <NavbarComponent />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/bootcamp/:name/:id" component={Bootcamp} />
        <Route path="/all/bootcamps" component={AllBootcamps} exact />
        <PrivateRoute path="/new/bootcamp" component={CreateBootcamp} exact />
        <PrivateRoute path="/manage/courses/:id" component={ManageCourses} exact />
        <PrivateRoute path="/manage/bootcamp/:id" component={ManageBootcamp} exact />
        <PrivateRoute path="/update/bootcamp/:id" component={UpdateBootcamp} exact />
        <PrivateRoute path="/update/course/:id" component={UpdateCourse} exact />
        <PrivateRoute path="/new/course/:id" component={AddCourse} exact />
      </Switch>
    </div>
  );
}

export default App;
