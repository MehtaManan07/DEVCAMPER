import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/Users";
import { Modal, Alert, Button } from "react-bootstrap";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    user.error.length === undefined ? setShow(false) : setShow(true);
  };
  return (
    <>
      <section className="container mt-5">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              {user.error.length > 0 && (
                <Alert variant="danger"> {user.error} </Alert>
              )}
              <div className="card-body">
                <a href="login.html">Back to login</a>
                <h1 className="mb-2">Reset Password</h1>
                <p>
                  Use this form to reset your password using the registered
                  email address.
                </p>
                <form>
                  <div className="form-group">
                    <label>Enter Email</label>
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      onClick={submitHandler}
                      value="Reset Password"
                      className="btn btn-dark btn-block"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            Email with reset link is sent to {email}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResetPassword;
