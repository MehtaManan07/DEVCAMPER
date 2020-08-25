import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavbarComponent = () => {
  const user = useSelector((state) => state.user);
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
      <li className="nav-item">
        <Link className="nav-link" to="/all/bootcamps">
          Browse Bootcamps
        </Link>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="/#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
        >
          <i className="fas fa-user"></i> Account
        </a>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/manage-bootcamp">
            Manage Bootcamps
          </Link>
          <Link className="dropdown-item" to="/manage-reviews">
            Manage Reviews
          </Link>
          <Link className="dropdown-item" to="/manage/account">
            Manage Account
          </Link>
          <Link className="dropdown-item" to="/new/bootcamp">
            Add bootcamp
          </Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/login">
            <i className="fas fa-sign-out-alt"></i> Logout
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
          <ul className="navbar-nav ml-auto">
            {user.isAuth ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
