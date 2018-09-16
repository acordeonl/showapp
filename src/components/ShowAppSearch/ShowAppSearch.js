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
        width: '65%',
        height: '19px',
        fontFamily: 'Open Sans',
        fontSize: '14px',
        marginTop:'2px',
        color:'#595f61',
        background: 'transparent',
        border: 'none',
        outline: 'none'
    }
}

class ShowAppSearch extends Component {
    constructor(props) {
        super(props) ; 
    }
    submit() {  
        this.props.onSubmit(this.props.value) ;
    }
    handleInputChange(event) {
        this.props.onUpdateSearchInput(event.target.value) ;
    }
    handleKeyDown(event){
        if(event.keyCode === 13)
            this.submit() ; 
    }   
    render() {
        return ( <div style={s.wrapper}>
            <img onClick={this.submit.bind(this)} style={s.icon} height='17.5px' width='17.5px' src='img/search.svg' />
            <input value={this.props.value} onChange={(event) => this.handleInputChange(event)} className='show_app_search_bar' style={s.input} type='text' placeholder='Search for a movie, series and videos'/>
            <div style={s.text}>  </div>
        </div>);
    }
}

export { ShowAppSearch } ;