import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Button, Dropdown } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import "./SideBar.css"

import Selector from './Selector.js' 
import SubscribingBoxPlot from './SubscribingBoxPlot.js' 
import RawBox from './RawBox2.js' 

import Mmenu from "./VerticalMenu.js" 

import * as res from "../js/resources.js" 
import * as ui from "../js/ui.js" 
import TabbedGraph from "./TabbedGraph.js" 

import Settings from "./Settings.js" 

function MenuItem(props) { 
    
    const dispatch = useDispatch()     	    

    var items = props.items.map( function(x) {
	
	return ( 
	    <Menu.Item as="a" name={x}  key={x} onClick={function(){ 
		ui.select_and_load_data_for_entity({entity: x}) 
	    }}  /> 
	) 
    })
    
    return ( 
	<Menu.Item>
        <Menu.Header>{props.title}</Menu.Header>
        <Menu.Menu>
	    {items}
	</Menu.Menu>
        </Menu.Item>
    ) 
}

//let testA = [ "A", "B", "C", "D" , "E", "F"] 
//let testB = [ "FOO", "BAR", "YEE", "BOY" ] 

const MySidebar = () => {

    var visible = useSelector(state => state.show_side_bar) 

    return (
	<Sidebar.Pushable as={Segment}  >
	
	<Sidebar
	as={Segment} 
        animation='push'
	onHide={() => console.log("Need to handle on HIDE!") } 
        visible={visible}
	inverted
	>
	
	<Menu vertical inverted> 
	
	<Selector/> 
	
	<MenuItem title="Cytokines" items={res.classes.cytokine} /> 
	
	<MenuItem title="Cytof" items={res.classes.cytof}  /> 

	<MenuItem title="RNA Expression" items={["Please use the search bar at the top of this panel to uery ~80,000 RNA expression results"]}  /> 
	
	
	</Menu> 
	
	</Sidebar>

	<Sidebar.Pusher>
        
	<Segment >
        <div>

	<TabbedGraph   />
	</div>
        </Segment>
	

	
	
	<Settings className="settings" /> 
	
	
	</Sidebar.Pusher>
	</Sidebar.Pushable>
	


    )
}

export default MySidebar
