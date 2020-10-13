import store from "./store/index.js" 
import util from "./util/index.js"


export async function select_and_load_data_for_entity({entity, assay}) { 
    
    store.dispatch( { type : "ENTITY_SELECTION" , payload : entity} ) 
    
    //dispatch a request to load the apppropriate data 
    //within this function, when the data is retrieved the redux store will be updated at the corresponding port 
    //assuming there is a plot component that is subscribing to that port, it will automatically graph the data 

    let opts = { 
	name_id : entity,
	assay   : assay  , 
	
    }
    
    var _ =  await util.req.request_data_load(opts) 
    
    // will also make sure that first tab is selected 
    // this fixes a bug that occured when transitioned from 2nd tab on luminex/cytof to RNA and 
    // getting a blank tab 
    window.globals.setGraphIndex(0) 
	
	
}


export function set_data_mode(m) { 
    store.dispatch( {type :"SET_DATA_MODE" , payload : m } ) 
}

export function reset_data() { 
    store.dispatch( { type : "RESET_DATA"  }) 
}
