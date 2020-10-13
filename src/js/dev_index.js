import store from "../js/store/index";
import * as actions from "../js/actions/index" 
import util from "./util/index.js" 
import * as res  from "./resources.js" 
import MD5 from "./md5.js" 
//import * as rust from "../rust/test.rs" 
//import * as ru from "./util/req_util.js" 

//configure global env here
window.store = store
window.actions = actions 
window.util = util 
//window.ru = ru 
window.res  = res 
//window.rust = rust 
window.globals = {} 
window.globals.MD5 = MD5 
// - 
window.Dispatch = store.dispatch 

/* configure global dispatch fns */ 
window.dispatch = {
    'set_data_port' : function(payload) { 
	store.dispatch({type: "SET_DATA_PORT" , payload })
    } , 
    'toggle_side_bar' : function(payload) { 
	store.dispatch({type: "TOGGLE_SIDE_BAR" , payload  })	
    }
}


