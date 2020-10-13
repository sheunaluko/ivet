import React from 'react';

import Homepage from './components/homepage.js' 
import Selector from './components/Selector.js' 
import SubscribingBoxPlot from './components/SubscribingBoxPlot.js' 
import RawBox from './components/RawBox2.js' 
import * as data from './components/tmp.js' 
import AppLayout from './components/AppLayout.js'

let opts = { 
    xs : data.xData , 
    ys : data.yData ,
    title : "Plot test :)" 
}

window.test_data = opts 


function App() {

    return (
	    <AppLayout /> 

    )
}


export default App;
