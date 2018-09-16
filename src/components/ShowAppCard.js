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
        width:'287px'
    },
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        height:'19px',
        width:'287px',
        width: '287px',
        height: '19px',
        fontFamily: 'Open Sans',
        fontSize: '14px',
        fontWeight: '600',
        color: '#687b82'
    },
    details:{
        width: '267px',
        height: '15px',
        fontFamily: 'Open Sans',
        fontSize: '11px',
        color: '#3d484c',
        display:'flex',
        flexDirection:'row',
        marginTop:'12px'
    },
    description:{
        width: '278px',
        height: '51px',
        fontFamily: 'Open Sans',
        fontSize: '12px',
        color: '#687b82',
        marginTop:'21px'
    },
    buttons:{
        marginTop:'25px',
        display:'flex',
        flexDirection:'row',
        width:'287px',
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
        userSelect:'none'
    },
    icon:{
        cursor:'pointer',
        marginLeft:'2px',
        userSelect:'none'
    }
}

class ShowAppCard extends Component {
    limitText(text,len) {
        if(text.length > len)
            return text.substr(0,len)+'...'
        return text ; 
    }
    addToFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) ; 
        for(let i = 0 ; i < favorites.length ; i ++ ){
            if(favorites[i].title === this.props.title)
                return ; 
        }
        favorites.push({...this.props,type:'favorite'}) ; 
        localStorage.setItem('favorites',JSON.stringify(favorites)) ; 
    }
    style_addToFavorites(){
        if(this.props.type === 'favorite')
            return {...s.addToFavorites,display:'none'}
        return {...s.addToFavorites} ; 
    }
    render() {
        return ( <div style={s.wrapper}>
            <div style={s.layout}>
                <img widht='136px' height='204px' style={s.image} src={this.props.poster_url}/>
                <div style={s.info}>
                    <div style={s.header}>
                        <div style={s.title}>
                            {this.limitText(this.props.title,35)}
                        </div>
                        <div style={s.score}>
                            {this.props.vote_average}    
                        </div>
                    </div>
                    <div style={s.details}>
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
                    <div style={s.description}>
                        {this.limitText(this.props.overview,130)}
                    </div>
                    <div style={s.buttons}>
                        <div style={s.watchTrailerButton}>
                            <div >
                                Ver Trailer
                            </div>
                        </div>
                        <div style={this.style_addToFavorites()}>
                            Agregar a favoritos
                            &nbsp;
                            <img onClick={this.addToFavorites.bind(this)}  style={s.icon} height='17.5px' width='17.5px' src='/img/favorite.svg' />
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>);
    }
}

export { ShowAppCard } ;