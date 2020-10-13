import React from 'react';
import Plot from 'react-plotly.js';

import { useSelector } from 'react-redux'


class RawBox extends React.Component {
    
  render() {
      var opts = this.props.opts       
      if (opts) { 
	  return (
		  <Plot
                     data={build_data(opts)}
                     layout={build_layout(opts)}
		  />
	  );
      } else { 
	  return <h1> Plot data is missing! </h1> 
      }
  }
}

function build_data({xs,ys}) { 
    var xData = xs
    var yData = ys
    
    var data = [];
    for ( var i = 0; i < xData.length; i ++ ) {
	var result = {
	    type: 'box',
	    y: yData[i],
	    name: xData[i],
	    boxpoints: 'all',
	    jitter: 0.5,
	    whiskerwidth: 0.2,
	    fillcolor: 'cls',
	    marker: {
		size: 2
	    },
	    line: {
		width: 1
	    }
	};
	data.push(result);
    };   
    return data 
}

function build_layout({title}) {
    return {title, 
	    yaxis: {
		autorange: true,
		showgrid: true,
		zeroline: true,
		dtick: 5,
		gridcolor: 'rgb(255, 255, 255)',
		gridwidth: 1,
		zerolinecolor: 'rgb(255, 255, 255)',
		zerolinewidth: 2
	    },
	    margin: {
		l: 40,
		r: 30,
		b: 80,
		t: 100
	    },
	    paper_bgcolor: 'rgb(243, 243, 243)',
	    plot_bgcolor: 'rgb(243, 243, 243)',
	    showlegend: false}
}


export default RawBox;
