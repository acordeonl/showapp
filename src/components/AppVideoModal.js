import React, { Component } from 'react';

const s = {
    backdrop: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        margin: '0px',
        width: '100vw',
        height: '100vh',
        opacity: '0.63',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor:'pointer'
    },
    videoWrapper: {
        top: '0px',
        left: '0px',
        margin: '0px',
        zIndex: '100',
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    video: {
        borderRadius: '3px',
        height: '340px',
        width: '500px'
    },
    icon: {
        cursor:'pointer',
        height: '20px',
        width: '20px',
        backgroundColor: 'blue',
        float: 'right'
    }
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

class AppVideoModal extends Component {
    close() {
        this.props.onClose() ; 
    }
    render() {
        return (<div >
            <div style={s.backdrop} >
            </div>
            <div style={s.videoWrapper} onClick={this.close.bind(this)}>
                <div style={s.video}>
                    <div style={s.icon} onClick={this.close.bind(this)}>
                    </div>
                     <iframe 
                        width={this.props.width}
                        height={this.props.height} 
                        src={this.props.src}
                         frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
            </div>
        </div>);
    }
}

export { AppVideoModal };