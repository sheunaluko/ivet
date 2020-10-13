import React from "react";
import { Select } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

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

const Selector = () => {
  const selected = useSelector(state => state.assay);
  const dispatch = useDispatch();

  var title;
  if (selected) {
    title = selected;
  } else {
    title = "Select Assay";
  }

  function choose(t) {
    //dispatch change
    dispatch({ type: "ASSAY_SELECTION", payload: t });
    //also when a choice is made we will make sure to clear the search bar
    window.globals.set_search_state("");
  }

  function click(t) {
    console.log("Got click! :: " + t);
    choose(t);
  }

  var assays = [
    "Luminex",
    "CyTOF",
    "CyTOF_Astrolabe_Assignment",
    "CyTOF_Astrolabe_Profiling",
    "Microarray"
  ];

  return (
    <Menu compact inverted>
      <Dropdown text={title} direction="left" className="link item">
        <Dropdown.Menu>
          <Dropdown.Header>Select Assay</Dropdown.Header>
          {assays.map(a => {
            return (
              <Dropdown.Item key={a} onClick={() => click(a)}>
                {a}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default Selector;
