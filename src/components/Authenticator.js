import React from "react";
import "./Authenticator.css";
import { Button, Form } from "semantic-ui-react";
import MyModal from "./Modal.js";

function onSubmit(e, { formData }) {
  e.preventDefault();
  console.log("Form submitted");

  let pass = document.getElementById("auth_pass").value;

  console.log("Got password: " + pass);

  let hash = window.globals.MD5(pass);

  if (hash == "da7373a147bc86d282ff4a4d93320e52") {
    console.log("Correct password!");

    window.Dispatch({ type: "AUTHENTICATE", payload: { password: pass } });
  } else {
    console.log("Incorrect password!");
    window.globals.launch_modal({
      msg: "Sorry, that password is not correct. Please try again."
    });
  }

  window.globals.debug = pass;
}

// - >
function App() {
  return (
    <div className="center">
      <Form onSubmit={onSubmit}>
        <h3>
          Immuno-analyte Variance Estimation Tool (iVET) , Habtezion et al. 2020{" "}
        </h3>
        <Form.Field>
          <label>Please enter the password to continue: </label>
          <input type="password" id="auth_pass" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
      <MyModal />
    </div>
  );
}

export default App;
