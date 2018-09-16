import React, {Component} from 'react';

const s = {
    wrapper:{
       width: '460px',
       height: '204px',
       backgroundColor: '#ffffff',
       boxShadow: '0 1px 4px 0 rgba(130, 130, 130, 0.5)',
       borderRadius:'3px'
    },
    layout:{
        display:'flex',
        flexDirection:'row'
    },
    info:{
        marginTop:'13px',
        marginLeft:'25px',
        height:'174px',
        width:'285px',
    },
    image:{
        userSelect:'none',
    },
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        height:'19px',
        width: '100%',
        height: '19px',
        fontFamily: 'Open Sans',
        fontSize: '14px',
        fontWeight: '600',
        color: '#687b82'
    },
    details:{
        width: '100%',
        height: '15px',
        fontFamily: 'Open Sans',
        fontSize: '11px',
        color: '#3d484c',
        display:'flex',
        flexDirection:'row',
        marginTop:'12px'
    },
    description:{
        width: '95%',
        height: '51px',
        fontFamily: 'Open Sans',
        fontSize: '12px',
        color: '#687b82',
        marginTop:'21px',
        textAlign:'left'
    },
    buttons:{
        marginTop:'25px',
        display:'flex',
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between'
    },
    watchTrailerButton:{
        width: '87px',
        height: '27px',
        borderRadius: '3px',
        border: 'solid 1px #00bdff',
        fontSize: '12px',
        color: '#00bdff',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer',
        userSelect:'none'
    },
    addToFavorites:{
        fontFamily: 'Open Sans',
        fontSize: '12px',
        color: '#87969c',
        display:'flex', 
        flexDirection:'row',
        userSelect:'none',
        cursor:'pointer',
        padding:'8px',
        marginTop:'-1px',
        borderRadius:'5px'
    },
    icon:{
        marginLeft:'2px',
        userSelect:'none',
    }
}

class ShowAppCard extends Component {
    constructor(props) {
        super(props) ; 
        this.state = {
            inMobile:false
        } ; 
    }
    componentDidMount(){
        let mq_medium = matchMedia('(min-width:550px)') ; 
        mq_medium.addListener(this.setDevice.bind(this)) ; 
        this.setDevice(mq_medium) ; 
    }
    setDevice(mql) {
        if(mql.matches){
            this.setState({inMobile:false}) ;
            // document.body.style.backgroundColor = 'red' ; 
        }
        else{
            this.setState({inMobile:true}) ;
            // document.body.style.backgroundColor = 'blue' ; 
        }
    }
    limitText(text,len) {
        if(!text)
            return '' ; 
        if(text.length > len)
            return text.substr(0,len)+'...'
        return text ; 
    }
    addToFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) ; 
        for(let i = 0 ; i < favorites.length ; i ++ ){
            if(favorites[i].title === this.props.title) { 
                this.props.onToast('Already in Favorites') ;
                return ; 
            }
        }
        favorites.push({...this.props,type:'favorite'}) ; 
        localStorage.setItem('favorites',JSON.stringify(favorites)) ; 
        this.props.onToast('Added '+this.props.title+' to Favorites') ; 
    }
    openTrailer() {
        this.props.onViewTrailer(this.props.videoUrl) ; 
    }
    // --------------- styles ----------------------
    style_wrapper(){
        if(this.state.inMobile)
            return {...s.wrapper,width:'90vw',height:'auto'} ; 
        return {...s.wrapper} ; 
    }
    style_info(){
        if(this.state.inMobile)
            return {...s.info,width:'92%',marginLeft:'5%',marginRight:'3%',height:'auto'} ; 
        return {...s.info} ; 
    }
    style_details(){
        if(this.state.inMobile)
            return {...s.details,height:'auto'} ; 
        return {...s.details} ; 
    }
    style_image(){
        if(this.state.inMobile)
            return {...s.image,width:'100px',height:'150px'} ; 
        return {...s.image} ; 
    }
    style_description(){
        if(this.state.inMobile)
            return {...s.description,height:'auto'} ; 
        return {...s.description} ; 
    }
    style_buttons(){
        if(this.state.inMobile)
            return {...s.buttons,marginTop:'5px',marginBottom:'5px'} ; 
        return {...s.buttons} ; 
    }
    style_addToFavorites(){
        if(this.state.inMobile)
            return {...s.addToFavorites,marginTop:'5px',marginBottom:'5px'} ; 
        return {...s.addToFavorites} ; 
    }
    render() {
        return ( <div style={this.style_wrapper()}>
            <div style={s.layout}>
                <img style={this.style_image()} width='136px' height='204px' src={this.props.poster_url}/>
                <div style={this.style_info()}>
                    <div style={s.header}>
                        <div style={s.title}>
                            <div style={{display:this.state.inMobile?'block':'none'}}>
                                {this.limitText(this.props.title,24)}
                            </div>
                            <div style={{display:this.state.inMobile?'none':'block'}}>
                                {this.limitText(this.props.title,32)}
                            </div>
                        </div>
                        <div style={s.score}>
                            {this.props.vote_average}    
                        </div>
                    </div>
                    <div style={this.style_details()}>
                        <div >
                            {this.props.runtime}
                        </div>
                        &nbsp;|&nbsp;
                        <div >
                            {this.props.release}
                        </div>
                        &nbsp;|&nbsp;
                        <div >
                            {this.limitText(this.props.genres,17)}
                        </div>
                    </div>
                    <div style={this.style_description()}>
                        {this.limitText(this.props.overview,130)}
                    </div>
                    <div style={this.style_buttons()}>
                        <div style={s.watchTrailerButton} className='app_card_trailer_button' onClick={this.openTrailer.bind(this)}>
                            <div >
                                Ver Trailer
                            </div>
                        </div>
                        <div style={{display:this.props.type === 'favorite' ?'none':'block'}}>                            
                            <div style={this.style_addToFavorites()} className='app_card_favorites_button' onClick={this.addToFavorites.bind(this)} style={this.style_addToFavorites()}>
                                <div style={{display:this.state.inMobile?'none':'block'}}>                            
                                    Agregar a favoritos
                                    &nbsp;
                                </div>
                                <img  style={s.icon} height='17.5px' width='17.5px' src='/img/favorite.svg' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>);
    }
}

export { ShowAppCard } ;