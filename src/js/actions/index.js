// src/js/actions/index.js


// PAYLOADS MUST BE SINGLE ARITY ! esp because in 
// js/index.js a wrapper is used over these functions and 
// they are exported to global scope (window.dispatch) 

export function toggle_side_bar(payload) {
  return { type: "TOGGLE_SIDE_BAR", payload }
};


export function set_message(payload) { 
    return {type: "SET_MESSAGE" , payload } 
}


export function set_data_port(payload) { 
    return {type: "SET_DATA_PORT" , payload } 
}
