// src/js/reducers/index.js

import produce from "immer"


export const initialState = {
    authenticated : false, 
    show_side_bar : true, 
    message : "Hey there" , 
    selected_entity : null , 
    data_ports : {} , 
    data_mode : "percent" , 
    assay : "Luminex",   // also called class 
};


export const  rootReducer = produce((state, action) => { 
    switch(action.type) { 
	    
    case "TOGGLE_SIDE_BAR" : 
	state.show_side_bar = !state.show_side_bar 
	return state
	
    case "SET_DATA_MODE" : 
	state.data_mode = action.payload 
	return state 
	    
    case "SET_MESSAGE" : 
	state.message = action.payload
	return state 
	
    case "ENTITY_SELECTION" : 
	//ui.js is actually the glue that connects app state 
	state.selected_entity = action.payload 
	return state 

    case "ASSAY_SELECTION" : 
	state.assay = action.payload 
	return state 

	
    case "SET_DATA_PORT" :  
	state.payload = action.payload
	state.data_ports[action.payload.port] = action.payload.data 
	return state 
	
    case "RESET_DATA" :  
	state.data_ports = {}
	return state 

    case "AUTHENTICATE" :  
	let hash = window.globals.MD5(action.payload.password);	
	if (hash == "da7373a147bc86d282ff4a4d93320e52") {
	    console.log("The redux store validated password");
	    state.authenticated = true 
	} else {
	    console.log("The redux store failed validaton");
	}
	return state 
    }
    
    
})



			     
			     
