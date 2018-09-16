import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ComboMenu } from './ComboMenu'

const s = {
    title: {
        marginLeft: '3px',
        width: '43px',
        height: '17px',
        fontFamily: 'Open Sans',
        fontSize: '12px',
        fontWeight: '600',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'center',
        color: '#687b82',
        marginBottom: '11px',
        userSelect: 'none'
    },
    wrapper: {
        userSelect: 'none',
        cursor: 'pointer'
    },
    value:{
        fontSize: '12px',
        color: '#687b82',
        marginLeft: '16px',
        userSelect: 'none',
        height:'100%',
        display:'flex',
        alignItems:'center'
    },
    selector:{
        borderRadius: '3px',
        border: 'solid 1px #e8eef1',
        display: '-webkit-flex',
        alignItems: 'center',
        marginBottom: '9px'
    },
    close: {
        height: '30px',
        width: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    italic: {
        fontStyle: 'italic'
    }
}

class ComboBox extends Component {
    constructor(props) {
        super(props) ; 
        this.state = {id:-1,value:'', open:false,disabled:false} ; 
        this.cb_value = {...s.value,width:(this.props.width-30-16)+'px'} ; 
        this.cb_selector = {...s.selector,height:this.props.height-2+'px',width:this.props.width-2+'px'}
        this.cb_wrapper = {...s.wrapper,width:this.props.width+'px'} ; 
        this.myRef = React.createRef();
        document.addEventListener('click', this.handleClickOutside, true);
    }
// --------------- state ----------------------
    enable(){
        this.setState({disabled:false}) ;
    }
    disable(){
        this.setState({disabled:true}) ;
    }
    toggleMenu(){
        this.setState({open:!this.state.open}) ; 
    }
    displayText(){
        if(this.props.value === '')
            return 'Filtrar por ...' ; 
        for(let i = 0 ; i < this.props.menu.length ; i ++ ){
            if(this.props.menu[i].id === this.props.value)
                return this.props.menu[i].name ; 
        }
    }
    resetValue(value){
        this.setState({value,open:false}) ; 
        this.props.onChange(value); 
    }
// --------------- handlers ----------------------
    handleClickOutside = (event) => {
        const domNode = ReactDOM.findDOMNode(this.myRef.current);
        if ( (!domNode || !domNode.contains(event.target) ) && this.state.open ) 
            this.setState({open:false}) ; 
    }
    handleSelect (id,name) {
        this.setState({value:id,id,open:false}) ; 
        this.props.onChange(id); 
    }
// --------------- styles ----------------------
    style_displayText(){
        if(this.state.value === '')
            return {...this.cb_value,fontStyle:'italic'} ; 
        return this.cb_value ; 
    }
    style_wrapper(){
        if(this.props.disabled)
            return {...this.cb_wrapper,opacity:'0.5',pointerEvents:'none'} ; 
        return this.cb_wrapper ; 
    }
// -----------------------------------------
    render() {
        return (<div style={this.style_wrapper()} >
            <div style={s.title} > {this.props.title} </div>
            <div ref={this.myRef}>
                <div style={this.cb_selector} >
                    <div style={this.style_displayText()} 
                        onClick={this.toggleMenu.bind(this)}> {this.displayText()} </div>
                    <div style={s.close} onClick={this.resetValue.bind(this,'')}>
                        <img height='7px' width='7px' style={s.icon} src='img/close.svg' />
                    </div>
                </div>
                <div style={{display:this.state.open?'block':'none'}} >
                    <ComboMenu 
                        selected={this.state.value} 
                        key='menu' {...this.props} 
                        onItemSelect={this.handleSelect.bind(this)} /> 
                </div>
            </div>
        </div>);
    }
}

export default ComboBox ;