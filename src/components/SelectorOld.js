import React from "react";
//import './ .css';

import { Dropdown } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import * as res from "../js/resources.js";
import util from "../js/util/index.js";
import * as ui from "../js/ui.js";

import Select from "react-select";

function option_row(text) {
  return {
    key: text.replace(" ", "_"),
    value: text,
    text
  };
}

function option_row2(text) {
  return {
    key: text.replace(" ", "_"),
    value: text,
    label: text
  };
}

const Selector = function() {
  const dispatch = useDispatch();
  var selected = useSelector(state => state.selected_entity);
  //also need to pass the selected class for the appropriate data to be loaded
  //we can retrieve this info from redux
  var active_assay = useSelector(state => state.assay);

  var on_change = async function(_, el) {
    //el.value will contain the selection
    console.log("Chose: " + el.value);

    if (!active_assay) {
      // if they user has not chosen the assay, then we will ask them to before
      //proceeding
      window.globals.launch_modal({
        header: "Please select an assay before searching.",
        msg: "The dropdown menu is to the left of the search bar."
      });

      return;
    }

    ui.select_and_load_data_for_entity({
      entity: el.value,
      assay: active_assay
    });
  };

  //build the options based on the active_assay
  //if none is selected then we will show cytof
  let cytokine_options = [...res.classes.cytokine].sort();
  let cytof_options = [...res.classes.cytof].sort();
  let rnaex_options = res.classes.rnaex;
  // in above line -- important to copy the array or else it will MUTATE the other module !
  var all_options = null;
  switch (active_assay) {
    case "Luminex":
      all_options = cytokine_options;
      break;
    case "CyTOF":
      all_options = cytof_options;
      break;
    case "Microarray":
      all_options = rnaex_options;
      break;
    default:
      all_options = cytokine_options;
  }

  return (
    <Dropdown
      placeholder={
        selected ||
        "Search for entity..." ||
        "Select Cytokine, Cell, or Gene of Interest"
      }
      search
      selection
      fluid
      value={selected}
      options={all_options.map(option_row)}
      onChange={on_change}
    />
  );
};

export default Selector;
