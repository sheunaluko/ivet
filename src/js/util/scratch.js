
export function submit() {
  db.collection("test").add({
      text: "foo", 
      time: "bar",
  }).then( console.log("Added data!") ) 

}

export function retrieve_docs() { 
    db.collection("test")
}


export function foo() { 
    console.log("!") 
}

export function go() { 
    console.log("!!") 
}

export function add_doc(d) { 
    db.collection("test").add({
	data : d , 
    })
    .then(function(docRef) {
	console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
	console.error("Error adding document: ", error);
    });    
}


export async function read_test() { 
    console.log("retrieving: ") 
    let d = await db.collection("test").get()
    d.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    })
} 
