import React, {Component} from 'react';
import './ComboMenu.css'

const s = {
    listItem: {
        cursor: 'pointer',
        height: '32px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        marginLeft: '15px',
        fontSize: '12px',
        color: '#687b82'
    },
    wrapper: {
        position:'absolute',
        userSelect: 'none',
        backgroundColor: '#ffffff',
        borderRadius: '2px',
        boxShadow: '0 2px 4px 0 rgba(130, 130, 130, 0.5)',
        maxHeight:'300px',
        overflowY:'scroll',
    }
}

class ComboMenu extends Component {
    constructor(props) {
        super(props) ; 
        this.menu_wrapper = {...s.wrapper,width:this.props.width+'px'} ;
    }
    handleSelect(value){
        this.props.onItemSelect(value) ; 
    }
    style_listItem(listItem){
        if(listItem !== this.props.selected)
            return {...s.content} ; 
        return {...s.content,fontWeight:'800'} ; 
    }
    render() {
        const menu = this.props.menu.map((listItem,index) => {
            return (
                <div className='combo_box_menu_listItem' ref={listItem}
                    key={index} 
                    style={s.listItem}
                    onClick={this.handleSelect.bind(this,listItem)}>
                    <div style={this.style_listItem(listItem)} >
                        {listItem}
                    </div>
                </div>  
            ) ;
        });
        return ( <div style={this.menu_wrapper} >
            {menu}
        </div>);
    }
}

export { ComboMenu } ; 