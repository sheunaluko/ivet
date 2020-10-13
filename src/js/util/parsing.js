//Fri Oct 25 12:27:29 PDT 2019
//parsing utilities 

import * as gen from "./js_util.js" 

/* 
As a reminder to myself:  cytokines_serum | cytokines_plasma  | cytof_stim  | cytof_unstim     
ID : cytokines_%% , cytof_%% 

   */ 

let num_patients = 10 
let num_conditions = 5 



export function condition_to_name(c) { 
    let d = {
	1 : "RT_Baseline", 
	2 : "RT_2hr", 
	3 : "RT_5hr" , 
	4 : "4C_5hr" , 
	5 : "4C_15hr", 
    }
    return d[c] 
}


export function analyze_entity_by_condition(data) { 

    //data is a map that has keys HBP01-%% 
    //represents the value for that entity across all subjects and conditions  
    //this function generates relevant statistics 
    
    //would be nice to divide this into sub maps for each patient first 
    let patient_data = by_patient(data) 
    
    //first we will collect this above data into a format that is amenable for the box plots 
    //xs are the labels 
    let xs = [1,2,3,4,5].map(condition_to_name) 
    
    //ys is an array of arrays , where the array at each index is the array of values (accross pts) for that condition 
    let raw_ys = get_ys(patient_data) 
	
    let raw_opts = {xs : xs , ys : raw_ys } 
    
    // -- 
    
    //return raw_opts 
    
    
    // - will also write the code here to get the percent changes 
    let xs_p = [...xs]
    
    let ys_p = get_ys( calculate_percents(patient_data) ) 
    let opts_p = { xs : xs_p , ys : ys_p} 
    
    return { raw : raw_opts , 
	     percent : opts_p  } 

    
}



export function by_patient(data) { 
    //see analayze_entity_by_condition. Divides data for entity by patient 
    var ret = {} 
    //loop thru patients 
    for (var i=1; i<num_patients+1; i++) { 
	//loop through conditions 
	ret[i] = {} 
	for (var x=1; x <num_conditions + 1; x++) { 
	    var k  = "HBP" + gen.zero_pad(i,2) + "-" + String(x)
	    ret[i][x] = data[k] 
	}
    }
    
    return ret 
}



export function get_ys(pts) { 
    var ys = [ ] 
    //loop through conditions 
    for (var c=1; c <num_conditions + 1; c++) { 
	var y = [] 
	//loop thru patients 	
	for (var p=1; p<num_patients+1; p++) { 
	    y.push(pts[p][c])
	}
	//push 
	ys.push(y)
    }    
    return ys 
}

export function calculate_percents(pts) { 
    var ret = {} 
    //loop thru patients 
    for (var i=1; i<num_patients+1; i++) { 
	//loop through conditions 
	ret[i] = {} 
	for (var x=1; x <num_conditions + 1; x++) { 
	    ret[i][x] = 100 * (pts[i][x] - pts[i][1]) / (pts[i][1])
	}
    }
    
    return ret 
}
