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
        this.page = 0 ;
        this.movies = [] ;
        this.loadedAll = false ; 
        this.state = {
            loadingMore:false
        }
        document.addEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = (evt) => {
        if( (window.innerHeight + window.scrollY) >= document.body.offsetHeight-400 && !this.state.loadingMore)  {
            if(!this.loadedAll)
                this.setState({loadingMore:true}) ;
        }
    };

    async fetchData(tab,query,genreFilter,yearFilter){
        console.log('fetching data');
        var sleep = n => new Promise(resolve => setTimeout(resolve, n));
        await sleep(4000);
        let response = [
            { 
                title:"DC's Legends of Tomorrow.",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"Spiderman",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"Batman",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"DC's Legends of Tomorrow.",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"Batman",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"DC's Legends of Tomorrow.",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"Batman",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"DC's Legends of Tomorrow.",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"Batman",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"DC's Legends of Tomorrow.",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"Batman",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            },
            { 
                title:"DC's Legends of Tomorrow.",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            }
        ]  ;
        if(response.length === 0)
            this.loadedAll = true ; 
        this.movies = this.movies.concat(response) ; 
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
            this.loadingMore = false; 
            this.loadedAll = false ; 
            this.page = 0  ; 
            this.movies = [] ; 
            this.fetchData(this.props.tab,this.props.query,this.props.genreFilter,this.props.yearFilter) ; 
            return (<div style={s.updated}>
                Loading ... 
            </div>); 
        }
    }
}

export { ShowAppList } ;