import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavbarComponent from './components/core/Navbar';
import Landing from './pages/core/Landing';
import AllBootcamps from './pages/bootcamps/AllBootcamps';
import CreateBootcamp from './pages/bootcamps/CreateBootcamp';
import AddCourse from './pages/courses/AddCourse';
import Bootcamp from './pages/bootcamps/Bootcamp';
import UpdateBootcamp from './pages/bootcamps/UpdateBootcamp';
import ManageBootcamp from './pages/bootcamps/ManageBootcamp';
import ManageCourses from './pages/courses/ManageCourses';

function App() {
  return (
    <div>
    <NavbarComponent />
      <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/bootcamp/:name/:id" component={Bootcamp} />
      <Route path="/all/bootcamps" component={AllBootcamps} exact />
      <Route path="/new/bootcamp" component={CreateBootcamp} exact />
      <Route path="/manage/courses/:id" component={ManageCourses} exact />
      <Route path="/manage/bootcamp/:id" component={ManageBootcamp} exact />
      <Route path="/update/bootcamp/:id" component={UpdateBootcamp} exact />
      <Route path="/new/course/:id" component={AddCourse} exact />
      </Switch>
    </div>
  );
}

export default App;
