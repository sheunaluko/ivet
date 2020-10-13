import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Button, Dropdown } from 'semantic-ui-react' 
import * as ui from "../js/ui.js" 


function click(t) { 
    console.log("Got click! :: " + t ) 
    
    switch (t) { 
    case 'raw' : 
	ui.set_data_mode(t)
	return 
	
    case 'percent' :  
	ui.set_data_mode(t)	
	return 
    }
    
}


function Settings() { 
    
    return ( 
<Menu compact inverted className="settingsMenu">
    <Dropdown text='Menu' pointing className='link item'>
      <Dropdown.Menu >
	    
        <Dropdown.Item>
          <Dropdown direction="left" text='Data'>
            <Dropdown.Menu>
              <Dropdown.Header>Format</Dropdown.Header>
            <Dropdown.Item onClick={()=>click("raw")}>Raw Values</Dropdown.Item>
              <Dropdown.Item onClick={()=>click("percent")}>Percentage Change</Dropdown.Item>
              <Dropdown.Divider />
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
	    
        <Dropdown.Divider />
	    
	
        <Dropdown.Item direction="left">
          <Dropdown direction="left" text='Info'>
            <Dropdown.Menu>
            <Dropdown.Item onClick={()=>click("Instructions")}>Instructions</Dropdown.Item>
              <Dropdown.Item onClick={()=>click("Home")}>Home Page</Dropdown.Item>
              <Dropdown.Divider />
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>	


	    
      </Dropdown.Menu>
    </Dropdown>
  </Menu>	
    )
}


export default Settings 
