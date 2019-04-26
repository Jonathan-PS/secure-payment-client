import React from "react";
import { Button, Modal } from "react-bootstrap";

const LogoutPage = props => {
  return (
    <div>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Logged out</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>You are now logged out.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
      ;{localStorage.removeItem("user_id")}
      {localStorage.removeItem("email")}
      {(window.location = "/")}
    </div>
  );
};

export default LogoutPage;
