import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";

import Selector from "./SelectorNew.js";
import AssaySelector from "./AssaySelector.js";

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
      document.querySelector("#TabDiv div a").click(); //click first tab
      window.globals.set_search_state("");
      return;

    case "Instructions":
      let header = "iVET  Usage";
      let msg =
        'Select an assay using the dropdown menu to the left of the search bar, then use the search bar to select your entity of interest. After a selection is made, the application will display five box plots representing five different collection conditions. Use the tabs above the plot to switch between plasma/serum and stimulated/unstimulated data. The data format can be toggled between raw values and percentage change using the "Data Format" dropdown in the upper right hand corner.';

      window.globals.launch_modal({ header, msg });
  }
}

function DataSelector() {
  return (
    <Menu compact inverted>
      <Dropdown text="Data Format" direction="left" className="link item">
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => click("raw")}>Raw Values</Dropdown.Item>
          <Dropdown.Item onClick={() => click("percent")}>
            Percentage Change
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}

const MyHeader = () => (
  <div id="Header">
    <Menu inverted>
      <Menu.Item as="a" header onClick={() => click("Home")}>
        Immuno-analyte Variance Estimation Tool [iVET]
      </Menu.Item>

      <Menu.Item>
        <AssaySelector />
      </Menu.Item>

      <Menu.Item style={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
        <Selector />
      </Menu.Item>

      <Menu.Item>
        <DataSelector />
      </Menu.Item>

      <Menu.Item onClick={() => click("Instructions")}>Instructions</Menu.Item>
      <Menu.Item onClick={() => click("Home")}>Home</Menu.Item>
    </Menu>
  </div>
);

export default MyHeader;
