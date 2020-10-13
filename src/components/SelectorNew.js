import React, { Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import { escapeRegExp, filter, debounce, times } from "lodash";
import * as res from "../js/resources.js";
import { useSelector } from "react-redux";
import * as ui from "../js/ui.js";

const initialState = { isLoading: false, results: [], value: "" };

/* 
Note, when the user uses the assaySelector to select an assay, a dispatch is sent to the store which updates the selected assay. This componenet subscribes to that event and will re ender the search tab. Specifically,it listens for the seelcted assay then grabs the appropriate array from the all_classes var below. It then instantiates a search bar element where the search options are this array 
*/

//convert the classes into searchable format
var all_classes = {
  Luminex: res.classes.Luminex.map(x => {
    return { title: x, key: x.toLowerCase() };
  }),
  CyTOF: res.classes.CyTOF.map(x => {
    return { title: x, key: x.toLowerCase() };
  }),

  CyTOF_Astrolabe_Profiling: res.classes.astrolabe_profiling.map(x => {
    return { title: x, key: x.toLowerCase() };
  }),

  CyTOF_Astrolabe_Assignment: res.classes.astrolabe_assignment.map(x => {
    return { title: x, key: x.toLowerCase() };
  }),

  Microarray: res.classes.Microarray.map(x => {
    return { title: x, key: x.toLowerCase() };
  })
};

//window.allc = all_classes;

class MySearch extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    //and -->
    console.log("Chose: " + result.title);

    ui.select_and_load_data_for_entity({
      entity: result.title,
      assay: this.props.assay
    });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    var isMatch, delay;

    if (this.props.lib.length > 20000) {
      //when we are searching the RNA classes we need a more efficient a
      //algorithm
      //why not try just matching on first letters
      isMatch = result => {
        let num = this.state.value.length;
        return this.state.value.toLowerCase() == result.key.slice(0, num);
      };
      delay = 1000;
    } else {
      //const re = new RegExp(escapeRegExp(this.state.value), "i");
      //isMatch = result => re.test(result.title);
      isMatch = result => {
        //        if (result.key.indexOf(this.state.value.toLowerCase()) != -1) {
        if (new RegExp(this.state.value.toLowerCase()).test(result.key)) {
          return true;
        } else {
          return false;
        }
      };
      delay = 300;
    }

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);
      this.setState({
        isLoading: false,
        results: filter(this.props.lib, isMatch)
      });
      return 0;
    }, 1000);
  };

  render() {
    const { isLoading, value, results } = this.state;

    // -- provide a global function for setting state
    window.globals.set_search_state = function(s) {
      console.log("Setting state: " + s);
      this.setState({ value: s });
    }.bind(this);

    return (
      <Search
        input={{ fluid: true }}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={value}
        fluid
        id="EntitySelector"
        {...this.props}
      />
    );
  }
}

var SearchWrapper = () => {
  const assay = useSelector(state => state.assay);
  //this is the assay that will be searched
  var lib = all_classes[assay];
  return <MySearch assay={assay} lib={lib} />;
};

export default SearchWrapper;
