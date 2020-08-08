import React from "react";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavbarComponent = () => {
  const user = useSelector(state => state.user)
  const guestLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </li>
      <li className="nav-item d-none d-sm-block">
        <Link className="nav-link" to="#">
          |
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/all/bootcamps">
          Browse Bootcamps
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
        >
          <i class="fas fa-user"></i> Account
        </a>
        <div class="dropdown-menu">
          <Link class="dropdown-item" href="manage-bootcamp.html">
            Manage Bootcamp
          </Link>
          <Link class="dropdown-item" href="manage-reviews.html">
            Manage Reviews
          </Link>
          <Link class="dropdown-item" href="manage-account.html">
            Manage Account
          </Link>
          <div class="dropdown-divider"></div>
          <Link class="dropdown-item" href="login.html">
            <i class="fas fa-sign-out-alt"></i> Logout
          </Link>
        </div>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-laptop-code"></i> DevCamper
        </Link>
        <Button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">{user.isAuth ? authLinks : guestLinks}</ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
