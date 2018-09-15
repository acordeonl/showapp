import React, {Component} from 'react';
import './ShowAppSearch.css'

const s = {
    wrapper:{
        height:'37px',
        width:'100%',
        backgroundColor:'#f3f6f7',
        display:'flex',
        alignItems:'center'
    },
    icon:{
        marginLeft:'45px',
        marginTop:'2px',
        marginRight:'30px',
        userSelect:'none',
        cursor:'pointer'
    },
    input:{
        width: '240px',
        height: '19px',
        opacity: '0.59',
        fontFamily: 'Open Sans',
        fontSize: '14px',
        marginTop:'2px',
        color:'#687b82',
        background: 'transparent',
        border: 'none',
        outline: 'none'
    }
}

class ShowAppSearch extends Component {
    constructor(props) {
        super(props) ; 
        this.state = {
            value:''
        }
    }
    submit() {  
        this.props.onSubmit(this.state.value) ;
    }
    handleInputChange(event) {
        this.setState({value:event.target.value}) ;
    }
    handleKeyDown(event){
        if(event.keyCode === 13)
            this.submit() ; 
    }   
    render() {
        return ( <div style={s.wrapper}>
            <img onClick={this.submit.bind(this)} style={s.icon} height='17.5px' width='17.5px' src='img/search.svg' />
            <input onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleInputChange.bind(this)} className='show_app_search_bar' style={s.input} type='text' placeholder='Search for a movie, series and videos'/>
            <div style={s.text}>  </div>
        </div>);
    }
}

export { ShowAppSearch } ;