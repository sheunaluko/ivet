import React from "react";

import {
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Button,
  Dropdown
} from "semantic-ui-react";

import * as ui from "../js/ui.js";

function click(t) {
  console.log("Got click! :: " + t);

  switch (t) {
    case "raw":
      ui.set_data_mode(t);
      return;

    case "percent":
      ui.set_data_mode(t);
      return;

    case "Home":
      ui.reset_data();
      return;
  }
}

function Settings() {
  return (
    <Menu compact inverted>
      <Dropdown text="Menu" direction="left" className="link item">
        <Dropdown.Menu>
          <Dropdown.Header>Data Format</Dropdown.Header>
          <Dropdown.Item onClick={() => click("raw")}>Raw Values</Dropdown.Item>
          <Dropdown.Item onClick={() => click("percent")}>
            Percentage Change
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Header>Info</Dropdown.Header>
          <Dropdown.Item onClick={() => click("Instructions")}>
            Instructions
          </Dropdown.Item>
          <Dropdown.Item onClick={() => click("Home")}>Home</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}

export default Settings;
