import React, {Component} from 'react';
import PropTypes from 'prop-types';

const s = {
    tab:{
        height:'22px',
        fontFamily:'Open Sans',
        fontSize:'16px',
        fontWeight:'600',
        textAlign:'center',
        color: '#8aa0a9',
        userSelect:'none', 
        cursor:'pointer',
        marginLeft:'15px',
        marginRight:'15px'
    },
    wrapper:{
        display:'flex',
        flexDirection:'row',
        height:'22px'
    }
}

class AppTabs extends Component {
    constructor(props) {
        super(props) ; 
        this.state = {
            value:this.props.value
        }
    }
    handleSelect(value) {
        this.setState({value}) ;
        this.props.onChange(value) ; 
    }
    style_tab(value){
        if(this.state.value === value)
            return {...s.tab,borderBottom:'2px solid #0abffe',color:'#0abffe'} ;
        return s.tab ;
    }
    render() {
        const tabs = this.props.tabs.map(tab => {
            return (
                <div className='AppTabs_tab'
                    key={tab} 
                    style={this.style_tab(tab)}
                    onClick={this.handleSelect.bind(this,tab)}>
                    <div className='AppTabs_content_tab'>
                        {tab}
                    </div>
                </div>  
            ) ;
        });
        return ( <div style={s.wrapper}>
            {tabs}
        </div>);
    }
}

AppTabs.propTypes = {
    tabs: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
}; 
  

export { AppTabs } ;