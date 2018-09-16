import React, {Component} from 'react';
import { AppTabs } from "./AppTabs";

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
        marginRight:'35px'
    }
}

class AppBar extends Component {
    constructor(props) {
        super(props) ; 
        this.state ={
            selectedTab:'Movies',
            inMobile:false
        }
    }
    componentDidMount(){
        let mq_medium = matchMedia('(min-width:600px)') ; 
        mq_medium.addListener(this.setDevice.bind(this)) ; 
        this.setDevice(mq_medium) ; 
    }
    setDevice(mql) {
        if(mql.matches)
            this.setState({inMobile:false}) ;
        else
            this.setState({inMobile:true}) ;
    }
    handleTabAction(selectedTab) {
        this.props.onChange(selectedTab) ;
    }
    // --------------- styles ----------------------
    style_wrapper(){
        if(this.state.inMobile)
            return {...s.wrapper,flexDirection:'column',height:'130px'}
        return {...s.wrapper} ; 
    }
    style_logo(){
        if(this.state.inMobile)
            return {...s.logo,marginLeft:'0px',marginTop:'25px'}
        return {...s.logo} ; 
    }
    style_tabs(){
        if(this.state.inMobile)
            return {...s.tabs,marginRight:'0px',marginBottom:'20px'}
        return {...s.tabs} ; 
    }
    render() {
        return ( <div style={this.style_wrapper()}>
            <img style={this.style_logo()} height='27px' width='165px' src='img/group-2.svg' />
            <div style={this.style_tabs()}>
                <AppTabs value={this.state.selectedTab} 
                    onChange={this.handleTabAction.bind(this)} 
                    tabs={['Movies','TV Shows','Favorites']}/>
            </div>
        </div>);
    }
}

export { AppBar } ;