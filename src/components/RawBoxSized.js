import React from 'react';
import Plot from 'react-plotly.js';

import { useSelector } from 'react-redux'
import { withSize } from 'react-sizeme'


//define some profiles  
let profiles = { 
    'cytokines' : { 
	y_name : "Expression Level", 
	x_name : "Temperature/Time Since Collection"
    } , 
    'cytof' : { 
    } , 
    'rna' : { 
    } 
    
}



function RawBox(props) { 
    var  opts = useSelector(state => state.data_ports[props.id] ) 
			    
    if (opts) { 
	return (
		<Plot
            data={build_data(opts)}
            layout={build_layout(opts,props.size)}
	    style={{width: "100%" , height : "100%" }} 
		/>
	);
    } else { 
	return <h1> Plot data is missing! </h1> 
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
	    jitter: 0,
	    whiskerwidth: 0.2,
	    fillcolor: 'cls',
	    marker: {
		size: 2
	    },
	    line: {
		width: 1
	    } , 
	    


	};
	data.push(result);
    };   
    return data 
}

function build_layout(opts,size) {
    
    let {title,profile} = opts 
    profile = profiles[profile] //translate the profile string to the map 
    
    return {title, 
	    yaxis: {
		title: profile.y_name ,
		autorange: true,
		showgrid: true,
		zeroline: true,
		//dtick: 5,
		gridcolor: 'rgb(255, 255, 255)',
		gridwidth: 1,
		zerolinecolor: 'rgb(255, 255, 255)',
		zerolinewidth: 2
	    },
	    xaxis: { 
		title : profile.x_name  , 
	    }, 
	    margin: {
		l: 80,
		r: 30,
		b: 80,
		t: 100
	    },
	    width: size.width, 
	    paper_bgcolor: 'rgb(243, 243, 243)',
	    plot_bgcolor: 'rgb(243, 243, 243)',
	    showlegend: false}
}


export default withSize()(RawBox);
