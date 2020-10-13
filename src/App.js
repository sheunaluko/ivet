import React from "react";
import AppLayout from "./components/AppLayout.js";
import Authenticator from "./components/Authenticator.js";
import { useSelector } from "react-redux";

// - >
function App() {
    
  //uncomment below to enable password protection (and comment following line) 
  //var authenticated = useSelector(state => state.authenticated);
  var authenticated = true 

  if (!authenticated) {
    return <Authenticator />;
  } else {
    return <AppLayout />;
  }
}

export default App;
