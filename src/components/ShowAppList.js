import React, {Component} from 'react';
import { ShowAppCard } from "./ShowAppCard";
import { AppVideoModal } from "./AppVideoModal";
import { AppToast } from "./AppToast";

const s = {
    wrapper:{
        textAlign:'center'
    },
    card:{
        display:'inline-block',
        marginLeft:'10px',
        marginRight:'10px',
        marginBottom:'10px',
        marginTop:'10px',
    },
    updated:{
        width:'100%',
        fontFamily: 'Open Sans',
        fontSize: '20px',
        marginTop:'90px',
        color:'#595f61',
        opacity:'0.6',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
}

class ShowAppList extends Component {
    constructor(props) {
        super(props) ; 
        this.apiKey ='192895fc9eaa6b3efa11a86deae08542'
        this.page = 1 ;
        this.movies = [] ;
        this.entity = 'movie' ;
        this.loadedAll = false ; 
        this.state = {
            videoSrc:'',
            loadingMore:true,
            modalOpen:false,
            toastMessage:'',
            addingToFavorites:false
        }
        document.addEventListener('scroll', this.trackScrolling);
    }
    trackScrolling = (evt) => {
        if( (window.innerHeight + window.scrollY) >= document.body.offsetHeight-400 && !this.state.loadingMore)  {
            if(!this.loadedAll)
                this.setState({loadingMore:true}) ;
        }
    };
    getDurationFormat(time) {
        let hours = Math.floor(time/60) ;
        let minutes = time-hours*60 ; 
        return `${hours}h ${minutes}min` ;  
    }
    getReleaseCountry(production_countries) { 
        let country = '' ; 
        if(production_countries && production_countries[0])
            country = production_countries[0].iso_3166_1;
        return country ; 
    }
    getGenres(genres){
        if(!genres)
            return '' ; 
        if(genres.length > 1)
            genres = genres.slice(0,2).map( el => el.name).toString().replace(',',', ');
        else 
            genres = genres.map( el => el.name).toString() ;
        return genres ; 
    }
    async getResponseDetails(elemId) {
        let response = await Promise.all([
            await(await fetch(
                `https://api.themoviedb.org/3/${this.entity}/${elemId}?api_key=${this.apiKey}`
            )).json(),
            await(await fetch(
                `https://api.themoviedb.org/3/${this.entity}/${elemId}/videos?api_key=${this.apiKey}`
            )).json()
        ] ) ; 
        let videoUrl = '' ; 
        if(response[1].results && response[1].results[0])
            videoUrl = 'https://www.youtube.com/embed/'+response[1].results[0].key ; 
        if(this.entity === 'movie') {
            let {vote_average,runtime,genres,title,id,release_date,overview,poster_path,production_countries} = response[0] ; 
            genres = this.getGenres(genres) ; 
            runtime = this.getDurationFormat(runtime) ; 
            let releaseCountry = this.getReleaseCountry(production_countries) ; 
            let release = release_date ; 
            if(releaseCountry.length > 0)
                release = `${release_date} (${releaseCountry})`  ; 
            let poster_url = 'https://image.tmdb.org/t/p/w500'+poster_path;
            return {type:'movie',vote_average,runtime,genres,title,id,overview,poster_url,release,videoUrl} ; 
        }
        else{
            let {vote_average,episode_run_time,genres,name,id,first_air_date,overview,poster_path,origin_country} = response[0] ; 
            genres = this.getGenres(genres) ; 
            let runtime = (episode_run_time) ? this.getDurationFormat(episode_run_time[0]): this.getDurationFormat(0) ; 
            let releaseCountry = ''; 
            if(origin_country && origin_country[0])
                releaseCountry = origin_country[0] ; 
            let release = first_air_date ; 
            if(releaseCountry.length > 0)
                release = `${first_air_date} (${releaseCountry})`  ; 
            let poster_url = 'https://image.tmdb.org/t/p/w500'+poster_path;
            return {type:'tv',vote_average,runtime,genres,title:name,id,overview,poster_url,release,videoUrl} ; 
        }
    }
    async fetchData(tab,query,genreFilter,yearFilter){
        var sleep = n => new Promise(resolve => setTimeout(resolve, n));
        if(tab === 'Favorites'){
            let favorites = JSON.parse(localStorage.getItem('favorites')) ; 
            this.movies = this.movies.concat(favorites) ; 
            await sleep(100);
            this.props.onUpdate() ; 
            return ; 
        }
        this.entity = (tab === 'Movies')? 'movie':'tv' ;
        let endpoint = 'discover'; 
        let queryParams = `sort_by=popularity.desc&api_key=${this.apiKey}&page=${this.page}` ; 
        if(query.length > 0){
            endpoint = 'search' ; 
            queryParams += `&query=${query}` ; 
            queryParams = encodeURI(queryParams);
        }
        if(yearFilter !== '' && this.entity === 'movie')
            queryParams += `&year=${yearFilter}` ; 
        if(yearFilter !== '' && this.entity === 'tv')
            queryParams += `&first_air_date_year=${yearFilter}` ; 
        if(endpoint === 'discover' && genreFilter !== '')
            queryParams += `&with_genres=${genreFilter}` ; 
        let api_response = (await(await fetch(
            `https://api.themoviedb.org/3/${endpoint}/${this.entity}?${queryParams}`
        )).json()) ; 
        if(api_response && api_response.results) { 
            api_response = api_response.results ;
            let result = await Promise.all(api_response.map( async (elem) => { return await this.getResponseDetails(elem.id)})) ; 
            if(result.length === 0) 
                this.loadedAll = true ; 
            this.movies = this.movies.concat(result) ; 
        }
        else { 
            this.loadedAll = true ; 
        }
        if(!this.state.loadingMore)
            this.props.onUpdate() ; 
        else 
            this.setState({loadingMore:false}) ;

    }
    handleCloseModal() {
        this.setState({modalOpen:false,videoSrc:''}) ;
        document.body.style.overflowY = 'visible' ; 
    }
    onViewTrailer(videoSrc){
        document.body.style.overflowY = 'hidden' ; 
        this.setState({modalOpen:true,videoSrc}) ;
    }
    async doToast(toastMessage){
        var sleep = n => new Promise(resolve => setTimeout(resolve, n));
        this.setState({addingToFavorites:true,toastMessage}) ;
        this.currentMessage = toastMessage ;
        await sleep(4000);
        if(this.currentMessage === toastMessage)
            this.setState({addingToFavorites:false}) ; 
    }
    render() {
        if(this.props.updated) {
            const data = this.movies.map((movie,index) => {
                return (
                    <div key={index} style={s.card}>
                        <ShowAppCard onToast={this.doToast.bind(this)} onViewTrailer={this.onViewTrailer.bind(this)}  {...movie} />
                    </div>
                ) ;
            });
            if(!this.state.loadingMore || this.props.tab === 'Favorites'){
                if(data.length === 0) {
                    return (<div style={s.updated}>
                        Sorry no movies were found related to these criterias.
                    </div>) ;
                }
                else {
                    return ( <div style={s.wrapper}>
                        <div style={{display:this.state.addingToFavorites?'block':'none'}}>
                            <AppToast message={this.state.toastMessage}/>
                        </div>
                        <div style={{display:this.state.modalOpen?'block':'none'}}>
                            <AppVideoModal 
                                onClose={this.handleCloseModal.bind(this)}
                                src={this.state.videoSrc}/>
                        </div>
                        {data}
                    </div>);
                }
            }
            else{
                this.page ++  ; 
                this.fetchData(this.props.tab,this.props.query,this.props.genreFilter,this.props.yearFilter) ; 
                return ( <div style={s.wrapper}>
                    {data}
                    <div style={s.updated}>
                        Loading ... 
                    </div>
                </div>);
            }
        }
        else {
            this.loadedAll = false ; 
            this.page = 1  ; 
            this.movies = [] ; 
            this.fetchData(this.props.tab,this.props.query,this.props.genreFilter,this.props.yearFilter) ; 
            return (<div style={s.updated}>
                Loading ... 
            </div>); 
        }
    }
}

export { ShowAppList } ;