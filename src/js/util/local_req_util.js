// Mon Oct  7 14:31:50 PDT 2019
// Utilities file / API  for handling all requests to the backend database 

// set up some handy vars 
import * as res from "../resources.js" 
import * as parse from "./parsing.js" 

//set up for local database dev2elopment (script tag is include in index.html) 
var firebase = window.firebase

export var log = (x) => { console.log("[req]:: " + x) } 

log("Loading!") 

export var db = firebase.initializeApp({ projectId: "immuno19" }).firestore();

//local dev 
db.settings({ host: "localhost:50051", ssl: false });

// collections available are as follows
// cytokines_serum , cytokines_plasma, cytof_stim , cytof_unstim 
// HBP{ID}-{cond}_{collection} 



/* 
 Q U E R Y | C A C H E | F U N C T I O N S ------------------------------ >
 -- 
 */ 

export var query_cache = {}
export function check_cache(opts) { 
    let {coll, id } = opts 
    if (query_cache[coll] && query_cache[coll][id]) {
	return query_cache[coll][id]
    } else { 
	return undefined 
    }
}

export function add_cache(opts) { 
    let {coll,id,result} = opts 
    if (query_cache[coll]) { 
	console.log(id)
	query_cache[coll][id] = result 
    }   else { 
	query_cache[coll] = {} 
	query_cache[coll][id] = result  
    }
}

export async function do_query(opts) { 
    
    let {coll,id} = opts
    if (id ==  "false" ) { 
	log("getting whole")
	let r = await db.collection(coll).get()
	console.log(r)
	return r.docs.map(d=>d.data())
    } else { 
	log("getting id..")
	let r = await db.collection(coll).doc(id).get()
	return r.data() 
    }
}

export async function query(coll,_id=false){ 
    

    // generic function for wrapping queries 
    // if no _id is passed then all elements in the collection are returned 
    // if _id is passed then the collection is searched for a document with the 
    // corresponding id and only that document is returned 
    
    let id = String(_id) //convert boolean to string if present (for map key)
    
    // first we check cache 
    let hit = check_cache({coll,id}) 
    if (hit != undefined) { log("Cache hit!") ; return hit  } 
    
    // if no hit then we add to the cache after performing the query
    
    let result = await do_query({coll,id}) 
    
    //add result to the cache now 
    add_cache({coll,id, result})
    
    //oh yea.. and return the result too ! 
    return result 
}


/* 
 E N D | Q U E R Y | C A C H E | F U N C T I O N S ------------------------------ >
 -- 
 */ 





/* 
   M O R E | F U N C T I O N S ------------------------------ >
*/ 

export async function request_data_load(opts) { 
    //first we have to load the data 
    let {name_id, assay  } = opts 
    
    log("Requesting data load for name,assay=" + name_id + "," + assay ) 
    
    //convert the name id to the number id 
    let num_id = res.to_num_id(name_id,assay) 
    
    //get the class (is it cytokines/cytof/rna) 
    let _class = res.num_id_to_class(num_id) 
    log("Handling data load for class:  " + _class )     

    
    //switch depending on the class 
    switch (_class) { 
	
    case 'cytokines' : 
	// two subclasses are cytokines_serum and cytokines_plasma 
	let raw_serum = await query("cytokines_serum", num_id) 
	let raw_plasma = await query("cytokines_plasma", num_id) 
	
	// parse the data for the graphs 
	var serum_data =  parse.analyze_entity_by_condition(raw_serum)
	var plasma_data =  parse.analyze_entity_by_condition(raw_plasma)	
	
	// prepare serum payload 
	serum_data.profile = "cytokines" 
	serum_data.name_id   = name_id 
	serum_data.tab     = "Serum" 
	let serum_payload = { port : "1" , data : serum_data } 
	
	// prepare plasma payload 
	plasma_data.profile = "cytokines" 
	plasma_data.name_id   = name_id
	plasma_data.tab     = "Plasma" 
	let plasma_payload = { port : "2" , data : plasma_data } 
	
	// and update the UI ! 
	window.dispatch.set_data_port(serum_payload) 
	window.dispatch.set_data_port(plasma_payload) 	
	
	return 
	
    case 'cytof' : 
	// two subclasses are cytof_stim and cytof_unstim  
	var raw_stim = await query("cytof_stim", num_id) 
	var raw_unstim = await query("cytof_unstim", num_id) 	
	
	//parse the data for the graphs 
	var stim_data =  parse.analyze_entity_by_condition(raw_stim)
	var unstim_data =  parse.analyze_entity_by_condition(raw_unstim)	
	
	// prepare stim payload 
	stim_data.profile = "cytof" 
	stim_data.name_id   = name_id 
	stim_data.tab     = "Stim" 
	var stim_payload = { port : "1" , data : stim_data } 
	
	// prepare unstim payload 
	unstim_data.profile = "cytof" 
	unstim_data.name_id   = name_id
	unstim_data.tab     = "Unstim" 	
	var unstim_payload = { port : "2" , data : unstim_data } 
	
	// and update the UI ! 
	window.dispatch.set_data_port(stim_payload) 
	window.dispatch.set_data_port(unstim_payload) 	
	
	return 
	
	
    case 'astrolabe_assignment' : 

	var raw_stim = await query("cytof_astrolabe_assignment_stim", num_id) 
	var raw_unstim = await query("cytof_astrolabe_assignment_unstim", num_id) 	
	
	//parse the data for the graphs 
	var stim_data =  parse.analyze_entity_by_condition(raw_stim)
	var unstim_data =  parse.analyze_entity_by_condition(raw_unstim)	
	
	// prepare stim payload
	var profile = "assignment"
	stim_data.profile = profile
	stim_data.name_id   = name_id 
	stim_data.tab     = "Stim" 
	var stim_payload = { port : "1" , data : stim_data } 
	
	// prepare unstim payload 
	unstim_data.profile =  profile
	unstim_data.name_id   = name_id
	unstim_data.tab     = "Unstim" 	
	var unstim_payload = { port : "2" , data : unstim_data } 
	
	// and update the UI ! 
	window.dispatch.set_data_port(stim_payload) 
	window.dispatch.set_data_port(unstim_payload) 	
	
	return 
	
	
    case 'astrolabe_profiling' : 

	var raw_stim = await query("cytof_astrolabe_profiling_stim", num_id) 
	var raw_unstim = await query("cytof_astrolabe_profiling_unstim", num_id) 	
	
	//parse the data for the graphs 
	var stim_data =  parse.analyze_entity_by_condition(raw_stim)
	var unstim_data =  parse.analyze_entity_by_condition(raw_unstim)	
	
	// prepare stim payload 
	var profile = "profiling"	
	stim_data.profile = profile
	stim_data.name_id   = name_id 
	stim_data.tab     = "Stim" 
	var stim_payload = { port : "1" , data : stim_data } 
	
	// prepare unstim payload 
	unstim_data.profile = profile
	unstim_data.name_id   = name_id
	unstim_data.tab     = "Unstim" 	
	var unstim_payload = { port : "2" , data : unstim_data } 
	
	// and update the UI ! 
	window.dispatch.set_data_port(stim_payload) 
	window.dispatch.set_data_port(unstim_payload) 	
	
	return 	
	
    case 'rnaex' : 
	
	// two subclasses are cytof_stim and cytof_unstim  
	let rnaex = await query("rnaex_expression", num_id) 
	
	//parse the data for the graphs 
	var rnaex_data =  parse.analyze_entity_by_condition(rnaex)
	
	// prepare rnaex payload 
	rnaex_data.profile = "rna"
	rnaex_data.name_id   = name_id
	rnaex_data.tab     = "Expression"
	let rnaex_payload =  { port : "1" , data : rnaex_data } 
	let rnaex_payload2 = { port : "2" , data : null } 	
	
	// and update the UI ! 
	window.dispatch.set_data_port(rnaex_payload) 
	
	// TODO :: load database with RNA data 
	// run stuff and test it 
	// if the RNA tab 2 is messed up uncomment below 
	// FIX the titles and stuff 
	// read through notes one more time 
	// fix the welcome message 
	
	window.dispatch.set_data_port(rnaex_payload2) 	
	
	return 
	
    }
    
    throw("Unrecognized class ! " + _class) 
    

}
