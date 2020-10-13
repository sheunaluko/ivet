
import cytokine_classes from "./resources/cytokines.json"
import    cytof_classes from "./resources/cytof_populations.json"
//import    rna_classes from "./resources/rna.json"
import * as  gen_util from "./util/js_util.js" 


export var classes = { cytokine : cytokine_classes , // .map(x=>x+" (Cytokine)"), 
		       cytof : cytof_classes  , 
rnaex   : rna_classes } 





export var combined_classes = classes.cytokine.concat(classes.cytof) //.concat(classes.rnaex)
export var combined_classes_lookup = 
    classes.cytokine.map( (y,i) =>"cytokines_"+gen_util.zero_pad(i,2))
    .concat(classes.cytof.map( (y,i) =>"cytof_"+gen_util.zero_pad(i,3)))
//    .concat(classes.rnaex.map( (y,i) =>"rnaex_"+gen_util.zero_pad(i,5) ))


export var class_accessors  = { 'cytof_unstim' : 'Population', 
				'cytof_stim' : 'Population', 
			        'cytokines_plasma' : 'Cytokine', 
				'cytokines_serum' : 'Cytokine' } 

//converts cytokine_00 to BDNF 
export function to_name_id(x) { 
    let [_class,num]  = x.split("_") 
    let d = classes[_class] 
    return d[Number(num)] 
}

export function to_num_id(x) { 
    let i = gen_util.indexOfs(combined_classes,x) 
    if (i == -1 || i.length > 1) { 
	throw("Resources.js:: id (" + x +") duplicated or not present in combined_classes")
    } else { 
	i = i[0] //extract the num 
	return combined_classes_lookup[i]
    }
}

export function num_id_to_class(x) { 
    for (var i of ["cytokines" , "cytof" , "rnaex" ] ) { 
	if (x.match(i) != null ) { 
	    return i 
	}
    }
    return null 
}


export function name_conversion_test() { 
    for (var name of combined_classes) { 
	if ( name != to_name_id(to_num_id(name)) ) { 
	    throw("Id conversion failed on: " + name)
	}
	console.log("Id check: " + name + "++")
    }
    console.log("All id conversions passed!") 
}
