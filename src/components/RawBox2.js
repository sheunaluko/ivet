import React from "react";
import Plot from "react-plotly.js";

import { useSelector } from "react-redux";
import { Message } from "semantic-ui-react";

//define some profiles (which are maps of functions )
let profiles = {
  cytokines: {
    title: (n, t) => "Luminex " + t + " " + n,
    y_name: {
      raw: (n, t) => "MFI (log2)",
      percent: (n, t) => "MFI Change (%)"
    },
    x_name: () => "Temperature/Time Since Collection"
  },
  cytof: {
    title: (n, t) => t + " PBMC CyTOF " + n.split(" | ")[0],
    y_name: {
      raw: (n, t) => n.split(" | ")[1],
      percent: (n, t) => n.split(" | ")[1] + " Change (%)"
    },
    x_name: () => "Temperature/Time Since Collection"
  },
  profiling: {
    title: (n, t) => t + " PBMC CyTOF_Astrolabe_Profiling " + n,
    y_name: {
      raw: (n, t) => "Freq. of Live Singlets",
      percent: (n, t) => "Freq. of Live Singlets Change (%)"
    },
    x_name: () => "Temperature/Time Since Collection"
  },
  assignment: {
    title: (n, t) => t + " PBMC CyTOF_Astrolabe_Assignment " + n,
    y_name: {
      raw: (n, t) => "Freq. of Live Singlets",
      percent: (n, t) => "Freq. of Live Singlets Change (%)"
    },
    x_name: () => "Temperature/Time Since Collection"
  },
  rna: {
    title: (n, t) => "Whole Blood Microarray " + n,
    y_name: {
      raw: (n, t) => "Expression Value (log2)",
      percent: (n, t) => "Expression Change (%)"
    },
    x_name: () => "Temperature/Time Since Collection"
  }
};

function wrapBold(t) {
  return "<b>" + t + "<b>";
}

function get_graph_info({ name_id, profile, mode, tab }) {
  //should return
  //  var {title,y_name,x_name}

  let title = profiles[profile].title(name_id, tab);
  let y_name = profiles[profile].y_name[mode](name_id, tab); //notice mode
  let x_name = profiles[profile].x_name(name_id, tab);

  return { title, y_name, x_name };
}

function RawBox(props) {
  var opts = useSelector(state => state.data_ports[props.id]);
  var mode = useSelector(state => state.data_mode);

  if (opts) {
    return (
      <Plot
        style={{ width: "100%" }}
        data={build_data(opts[mode])}
        layout={build_layout({ opts, mode })}
        id="PlotlyPlot"
      />
    );
  } else {
    return (
      <Message style={{ width: "100%" }}>
        <Message.Header>No data is currently selected.</Message.Header>
      </Message>
    );
  }
}


/* 
   Mon Oct 12 21:54:37 PDT 2020
   Andres requested update for color of bar graphs. 
   
   "Basically: make the control condition (10min) green, then 2hr RT orange,
   5hr RT red, and 5hr 4C blue, and 15hr 4C purple. Then the temperatures match
   the color coding and the control is green (neutral)." 
   
   
 */

var box_plot_color_sequence = ["green", "#ff8080", "#b32400" , "#4da6ff" , "#0055ff" ] 


function build_data({ xs, ys }) {
  var xData = xs;
  var yData = ys;

  var data = [];
  for (var i = 0; i < xData.length; i++) {
      //each loop for each box plot 
      
    var result = {
      type: "box",
      y: yData[i],
      name: xData[i],
      boxpoints: "all",
      jitter: 0.2,
      whiskerwidth: 0.2,
      fillcolor: "cls",
      pointpos: 0,
      marker: {
          size: 6, 
	  color : box_plot_color_sequence[i] , 
      },
      line: {
        width: 1
      }
    };
    data.push(result);
  }
  return data;
}

var layout_sizes = {
  title: 36,
  y: 32,
  x: 32,
  x_tick: 26
};

function get_layout_size(s) {
  return layout_sizes[s];
}

window.set_layout_size = function(s, sz) {
  layout_sizes[s] = sz;
};

function build_layout({ opts, mode }) {
  var title_size = get_layout_size("title");
  var y_size = get_layout_size("y");
  var x_size = get_layout_size("x");
  var x_tick_size = get_layout_size("x_tick");

  //window.debug = [title_size, y_size, x_size, x_tick_size];

  var { name_id, profile, tab } = opts;

  var { title, y_name, x_name } = get_graph_info({
    name_id,
    profile,
    mode,
    tab
  });

  let customizable_fonts = false; //can change to true to enable user modification of font sizes

  if (!customizable_fonts) {
    return {
      title: wrapBold(title),
      yaxis: {
        title: wrapBold(y_name),
        autorange: true,
        showgrid: true,
        zeroline: true,
        //dtick: 5,
        gridcolor: "rgb(255, 255, 255)",
        gridwidth: 1,
        zerolinecolor: "rgb(255, 255, 255)",
        zerolinewidth: 2
      },
      xaxis: {
        title: wrapBold(x_name)
      },
      margin: {
        l: 80,
        r: 30,
        b: 80,
        t: 100
      },
      autosize: true,
      paper_bgcolor: "rgb(243, 243, 243)",
      plot_bgcolor: "rgb(243, 243, 243)",
      showlegend: false
    };
  } else {
    return {
      title: wrapBold(title),

      titlefont: {
        size: title_size
      },
      yaxis: {
        title: wrapBold(y_name),
        titlefont: {
          size: y_size
        },

        autorange: true,
        showgrid: true,
        zeroline: true,
        //dtick: 5,
        gridcolor: "rgb(255, 255, 255)",
        gridwidth: 1,
        zerolinecolor: "rgb(255, 255, 255)",
        zerolinewidth: 2
      },
      xaxis: {
        title: wrapBold(x_name),
        titlefont: { size: x_size },
        tickfont: {
          size: x_tick_size
        }
      },
      margin: {
        l: 80,
        r: 30,
        b: 80,
        t: 100
      },
      autosize: true,
      paper_bgcolor: "rgb(243, 243, 243)",
      plot_bgcolor: "rgb(243, 243, 243)",
      showlegend: false
    };
  }
}

export default RawBox;
