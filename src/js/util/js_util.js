



export function zero_pad(num, places) {
  return String(num).padStart(places, '0')
}

export function indexOfs(arr,val) {
    let result =  arr.reduce((a, e, i) => e === val ? a.concat(i) : a, []) 
    if (result.length == 0 ) { 	result  =  -1 } 
    return result 
}


