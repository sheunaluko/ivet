import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import Box from "./RawBox2.js";
import { useSelector } from "react-redux";
import { Message } from "semantic-ui-react";

var log = console.log;

const TabbedGraph = function(props) {
  const [index, setIndex] = useState(0);

  var data_ports = useSelector(state => state.data_ports);
  var handleTabChange = (e, { activeIndex }) => setIndex(activeIndex);

  //provide global access to index
  window.globals.setGraphIndex = function(i) {
    log("Setting graph to index: " + i);
    setIndex(i);
  };

  var tab1 = useSelector(state => {
    let d = state.data_ports["1"];
    return d ? d.tab : null;
  });
  var tab2 = useSelector(state => {
    let d = state.data_ports["2"];
    return d ? d.tab : null;
  });

  var tab3 = "Tab 3";

  function make_panes(tab1, tab2) {
    let panes = [
      {
        menuItem: tab1 || "Tab 1",
        render: () => (
          <Tab.Pane id="Tab1">
            <Box id={"1"} /> 
          </Tab.Pane>
        )
      },
      {
        menuItem: tab2 || "Tab 2",
        render: () => (
          <Tab.Pane>
            <Box id={"2"} />
          </Tab.Pane>
        )
      }
      //{ menuItem: (tab3 || 'Tab 3'), render: () => <Tab.Pane><Box id={"3"}/></Tab.Pane> },
    ];

    if (tab2) {
      return panes;
    } else {
      //if tab 2 is null then dont show it !
      return [panes[0]];
    }
  }

  if (Object.keys(data_ports).length >= 1) {
    return (
      <Tab
        id="TabDiv"
        menu={{ fluid: true, vertical: false, tabular: true }}
        panes={make_panes(tab1, tab2)}
        onTabChange={handleTabChange}
        activeIndex={index}
      />
    );
  } else {
    log("No data selected, displaying welcome message");

    return (
      <Message style={{ width: "100%" }}>
        <Message.Header>Welcome!</Message.Header>

        <img
          src="graphic_final.svg"
          style={{ width: "60%", marginTop: "5px" }}
        />
      </Message>
    );
  }
};

export default TabbedGraph;
