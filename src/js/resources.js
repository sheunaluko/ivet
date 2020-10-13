import cytokine_classes from "./resources/cytokines.json"
import    cytof_classes from "./resources/cytof_populations.json"
import    rna_classes from "./resources/rna.json"

import profiling_classes from "./resources/astrolabe_profiling_populations.json"
import assignment_classes from "./resources/astrolabe_assignment_populations.json"


import * as  gen_util from "./util/js_util.js" 




export var classes = { cytokines : cytokine_classes ,
		       cytokine  : cytokine_classes, 
		       Luminex : cytokine_classes , 
		       CyTOF   : cytof_classes , 
		       cytof : cytof_classes  , 
		       
		       CyTOF_Astrolabe_Assignment : assignment_classes , 
		       CyTOF_Astrolabe_Profiling : profiling_classes , 
		       
		       astrolabe_assignment  : assignment_classes, 
		       astrolabe_profiling  : profiling_classes, 
		       
		       Microarray : rna_classes , 		       
		       rnaex   : rna_classes }  //redundancy for a reason ;) 


export var id_info = { 
    cytokine : ["cytokines_" , 2 ] , 
    Luminex : ["cytokines_" ,  2 ] , 
    CyTOF   : ["cytof_" ,  3 ] , 
    cytof : ["cytof_" ,  3 ] , 
    Microarray : ["rnaex_" , 5 ] ,
    rnaex   :  ["rnaex_" , 5 ]  ,  
    
    CyTOF_Astrolabe_Assignment  : ["astrolabe_assignment_" , 2 ] ,
    CyTOF_Astrolabe_Profiling  : ["astrolabe_profiling_" , 3 ] , 
        
    
} //for calculating numeric ids [prefix, pad] 


export var class_accessors  = { 'cytof_unstim' : 'Population', 
				'cytof_stim' : 'Population', 
			        'cytokines_plasma' : 'Cytokine', 
				'cytokines_serum' : 'Cytokine' } 

//converts cytokine_00 to BDNF 
export function to_name_id(x) { 
    let tokens = x.split("_")  
    
    if (tokens.length == 2 ) { 
	var [_class,num]  = tokens 
    } else if (tokens.length == 3) { 
	var _class = tokens.slice(0,2).join("_")
	var num = tokens[2]
    } else { 
	throw("unsupported token length") 
    }
    let d = classes[_class] 
    return d[Number(num)] 
}

export function to_num_id(name,assay) { 
    // basically need to find the index of the name in the class 
    let _class = classes[assay] 

    // get the index 
    let i = gen_util.indexOfs(_class,name)     
    
    
    
    // build the id 
    if (i == -1 || i.length > 1) { 
	throw("Resources.js:: id (" + name +") missing or duplicated")
    } else { 
	i = i[0] //extract the num (which is the index) 
	
	//build the id here 
	//first get the pad len 
	let [prefix, pad]  = id_info[assay] 
	
	return prefix + gen_util.zero_pad(i,pad) 
    } 
    
}

export function num_id_to_class(x) { 
    for (var i of ["cytokines" , "cytof" , "rnaex", "astrolabe_assignment", "astrolabe_profiling" ] ) { 
	if (x.match(i) != null ) { 
	    return i 
	}
    }
    return null 
}


export function name_conversion_test() { 
    
    //CURRENTLY RNA IS OMITTED ! 
    let all_classes = [ cytokine_classes, cytof_classes, assignment_classes, profiling_classes ] ;     
    let class_names = [ "Luminex" , "CyTOF" , "CyTOF_Astrolabe_Assignment" , "CyTOF_Astrolabe_Profiling"]  ;     
    
    let counter  = 0 
    
    all_classes.forEach( function(c,i) { 
	
	console.log("Checking class num: " + i ) 
	
	for (var name of c) { 
	    
//	    console.log("Id check: " + name) 
	    
	    if (counter++ % 1000 == 0 ) { 
		console.log(counter)
	    }
	    
	    if ( name != to_name_id(to_num_id(name,class_names[i])) ) { 
		throw("Id conversion failed on: " + name)
	    }

	}
	
    })
    console.log("All id conversions passed!") 
}


