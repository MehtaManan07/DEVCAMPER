import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
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
import { fetchUser } from "./redux/actions/Users";
import UpdateCourse from "./pages/courses/UpdateCourse";

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
        <Route path="/new/bootcamp" component={CreateBootcamp} exact />
        <Route path="/manage/courses/:id" component={ManageCourses} exact />
        <Route path="/manage/bootcamp/:id" component={ManageBootcamp} exact />
        <Route path="/update/bootcamp/:id" component={UpdateBootcamp} exact />
        <Route path="/update/course/:id" component={UpdateCourse} exact />
        <Route path="/new/course/:id" component={AddCourse} exact />
      </Switch>
    </div>
  );
}

export default App;
