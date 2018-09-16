import React, {Component} from 'react';

const s = {
    wrapper:{
        height:'37px',
        width:'100%',
        backgroundColor:'#f3f6f7',
        display:'flex',
        borderRadius:'4px',
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
        this.state = {
            inMobile:false
        } ; 
    }
    componentDidMount(){
        let mq_medium = matchMedia('(min-width:550px)') ; 
        mq_medium.addListener(this.changeSize.bind(this)) ; 
        this.changeSize(mq_medium) ; 
    }
    changeSize(mql) {
        if(mql.matches){
            this.setState({inMobile:false}) ;
            // document.body.style.backgroundColor = 'red' ; 
        }
        else{
            this.setState({inMobile:true}) ;
            // document.body.style.backgroundColor = 'blue' ; 
        }
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
    // --------------- styles ----------------------
    style_input(){
        if(this.state.inMobile)
            return {...s.input,width:'80%'}
        return {...s.input} ; 
    }
    style_icon(){
        if(this.state.inMobile)
            return {...s.icon,marginLeft:'25px',marginRight:'20px'} ; 
        return {...s.icon} ; 
    }
    render() {
        return ( <div style={s.wrapper}>
            <img style={this.style_icon()} onClick={this.submit.bind(this)}  height='17.5px' width='17.5px' src='img/search.svg' />
            <input  style={this.style_input()}  value={this.props.value} onChange={this.handleInputChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} className='show_app_search_bar' type='text' placeholder='Search for a movie, series and videos'/>
            <div style={s.text}>  </div>
        </div>);
    }
}

export { ShowAppSearch } ;