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
import { useSelector, useDispatch } from "react-redux";
import "./AppLayout.css";

import HeaderLayout from "./HeaderLayout.js";
import Selector from "./Selector.js";
import * as res from "../js/resources.js";
import * as ui from "../js/ui.js";
import TabbedGraph from "./TabbedGraph.js";
import MyModal from "./Modal.js";

const AppLayout = () => {
  return (
    <div id="AppLayout">
      <HeaderLayout />

      <Segment id="GraphSegment">
        <TabbedGraph />
      </Segment>

      <MyModal />
    </div>
  );
};

export default AppLayout;
