import React from 'react';
//import './ .css';

import { Dropdown } from 'semantic-ui-react'
import { useSelector , useDispatch } from 'react-redux'
import * as res from '../js/resources.js' 
import util from '../js/util/index.js' 



function UiUtil() { 
    return 
    
}





export function select_and_load_data_for_entity(e) { 
    dispatch( { type : "ENTITY_SELECTION" , payload : el.value } ) 
	
	
	//dispatch a request to load the apppropriate data 
	//within this function, when the data is retrieved the redux store will be updated at the corresponding port 
	//assuming there is a plot component that is subscribing to that port, it will automatically graph the data 
	let opts = { 
	    name_id : el.value, 
	    port    : "1" 
	}

	var _ =  await util.req.request_data_load_to_port(opts) 
	
	
}
