import React, {Component} from 'react';

const s = {
    toast:{
        height:'70px',
        display:'flex',
        alignItems:'center',
        backgroundColor:'#323232',
        position:'fixed',
        bottom:'30px',
        left:'40px',
        borderRadius:'5px',
        color:'white',
        boxShadow: `0 16px 24px 2px rgba(0, 0, 0, 0.14),
        0  6px 30px 5px rgba(0, 0, 0, 0.12),
        0  8px 10px -5px rgba(0, 0, 0, 0.4)`
    },
    content:{
        marginLeft:'30px',
        fontSize:'18px',
        marginRight:'30px'
    }
}

class AppToast extends Component {
    render() {
        return ( <div>
            <div style={s.toast}>
                <div style={s.content}>
                    {this.props.message}
                </div>
            </div>
            
        </div>);
    }
}

export { AppToast } ;