import React from 'react';
import './homepage.css';
import { useSelector } from 'react-redux'

function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <p>
	  Immunology Dashboard Application, 2019 [development in process]
        </p>
	  
        <img src="/habtezion_lab.jpg" />
	  
	  <br></br>
        <a
          className="App-link"
          href="http://med.stanford.edu/habtezionlab.html"
          target="_blank"
          rel="noopener noreferrer"
        >
	  Habtezion Lab, Stanford University School of Medicine
        </a>
      </header>
    </div>
  );
}

export default App;
