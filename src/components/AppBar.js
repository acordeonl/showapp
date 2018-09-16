import React, {Component} from 'react';
import { AppTabs } from "./AppTabs/AppTabs";

const s = {
    wrapper:{
        display:'flex',
        flexDirection:'row',
        widht:'100%',
        height:'64px',
        alignItems:'center',
        justifyContent:'space-between'
    },
    logo:{
        marginLeft:'42px',
        userSelect:'none',
        pointerEvents: 'none'
    },
    tabs:{
        marginRight:'50px'
    }
}

class AppBar extends Component {
    constructor(props) {
        super(props) ; 
        this.state ={
            selectedTab:'Movies'
        }
    }
    handleTabAction(selectedTab) {
        this.props.onChange(selectedTab) ;
    }
    render() {
        return ( <div style={s.wrapper}>
            <img style={s.logo} height='27px' width='165px' src='img/group-2.svg' />
            <div style={s.tabs}>
                <AppTabs value={this.state.selectedTab} 
                    onChange={this.handleTabAction.bind(this)} 
                    tabs={['Movies','TV Shows','Favorites']}/>
            </div>
        </div>);
    }
}

export { AppBar } ;