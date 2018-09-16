import React, {Component} from 'react';
import { ShowAppCard } from "../ShowAppCard";
import './ShowAppList.css'

const s = {
    wrapper:{
        width:'960px'
    },
    card:{
        display:'inline-block',
        marginLeft:'10px',
        marginRight:'10px',
        marginBottom:'10px',
        marginTop:'10px'
    },
    updated:{
        width:'100%',
        fontFamily: 'Open Sans',
        fontSize: '20px',
        marginTop:'80px',
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
        this.loadedAll = false ; 
        this.state = {
            loadingMore:false
        }
        document.addEventListener('scroll', this.trackScrolling);
        window.addEventListener('resize', this.windowResize);
    }

    windowResize = (evt) => {
        console.log(evt);
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
    getReleaseCountry(release_date,production_countries) { 
        let country = '' ; 
        if(production_countries[0])
            country = production_countries[0].iso_3166_1;
        return country ; 
        // return release_date+production_countries[0].iso_3166_1  ;
    }
    async getResponseDetails(elemId) {
        let response = await Promise.all([
            await(await fetch(
                `https://api.themoviedb.org/3/movie/${elemId}?api_key=${this.apiKey}`
            )).json(),
            await(await fetch(
                `https://api.themoviedb.org/3/movie/${elemId}/videos?api_key=${this.apiKey}`
            )).json()
        ] ) ; 
        let videoUrl = '' ; 
        if(response[1].results && response[1].results[0])
            videoUrl = 'https://youtube.com/watch?v='+response[1].results[0].key ; 
        let {vote_average,runtime,genres,title,id,release_date,overview,poster_path,production_countries} = response[0] ; 
        genres = genres.slice(0,2).map( el => el.name).toString().replace(',',', ');
        runtime = this.getDurationFormat(runtime) ; 
        let releaseCountry = this.getReleaseCountry(release_date,production_countries) ; 
        let release = release_date ; 
        if(releaseCountry.length > 0)
            release = `${release_date} (${releaseCountry})`  ; 
        return {vote_average,runtime,genres,title,id,overview,poster_path,release,videoUrl} ; 
    }
    async fetchData(tab,query,genreFilter,yearFilter){
        var sleep = n => new Promise(resolve => setTimeout(resolve, n));
        await sleep(1000);
        let queryParams = `sort_by=popularity.desc&api_key=${this.apiKey}&page=${this.page}`
        let api_response = (await(await fetch(
            `https://api.themoviedb.org/3/discover/movie?${queryParams}`
        )).json()).results ; 
        let result = await Promise.all(api_response.map( async (elem) => { return await this.getResponseDetails(elem.id)})) ; 
        if(result.length === 0)
            this.loadedAll = true ; 
        this.movies = this.movies.concat(result) ; 
        if(!this.state.loadingMore)
            this.props.onUpdate() ; 
        else 
            this.setState({loadingMore:false}) ;
    }
    render() {
        if(this.props.updated) {
            const data = this.movies.map((movie,index) => {
                return (
                    <div key={index} style={s.card}>
                        <ShowAppCard {...movie} />
                    </div>
                ) ;
            });
            if(!this.state.loadingMore){
                return ( <div style={s.wrapper}>
                    {data}
                </div>);
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