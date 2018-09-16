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
        float: 'right',
        marginTop:'-32px',
        marginLeft:'-14px'
    }
}

class AppVideoModal extends Component {
    close() {
        this.props.onClose() ; 
        this.state = {
            inMobile:false, 
            inTablet:false
        }
    }
    componentDidMount(){
        let small = matchMedia('(max-width:600px)') ; 
        small.addListener(this.setMobile.bind(this)) ; 
        this.setMobile(small) ; 

        let medium = matchMedia('(min-width: 601px) and (max-width: 1024px) ') ; 
        medium.addListener(this.setTablet.bind(this)) ; 
        this.setTablet(medium) ; 
    }
    setMobile(mql) {
        if(mql.matches){
            this.setState({inMobile:true}) ;
            // document.body.style.backgroundColor = 'red' ; 
        }
        else{
            this.setState({inMobile:false}) ;
            // document.body.style.backgroundColor = 'blue' ; 
        }
    }
    setTablet(mql) {
        if(mql.matches){
            this.setState({inTablet:true}) ;
            // document.body.style.backgroundColor = 'yellow' ; 
        }
        else{
            this.setState({inTablet:false}) ;
            // document.body.style.backgroundColor = 'purple' ; 
        }
    }
    render() {
        let videoWidth = '800' ; 
        let videoHeight = '500' ;
        if(this.state){
            if(this.state.inTablet){
                videoWidth = '500' ; 
                videoHeight = '312' ; 
            }
            if(this.state.inMobile) {
                videoWidth = '380' ; 
                videoHeight = '237' ; 
            }
        }
             
        return (<div >
            <div style={s.backdrop} >
            </div>
            <div style={s.videoWrapper} onClick={this.close.bind(this)}>
                <div style={{width:this.props.width,height:this.props.height}}>
                    <img style={s.icon} onClick={this.close.bind(this)} height='14px' width='14px' src='/img/close-white.svg' />
                     <iframe 
                        width={videoWidth}
                        height={videoHeight} 
                        src={this.props.src}
                         frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
            </div>
        </div>);
    }
}

export { AppVideoModal };