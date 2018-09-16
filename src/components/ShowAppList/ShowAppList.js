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
        fontFamily: 'Open Sans',
        fontSize: '20px',
        marginTop:'80px',
        color:'#595f61',
        opacity:'0.6',
        display:'flex',
        alignItems:'center'
    }
}

class ShowAppList extends Component {
    constructor(props) {
        super(props) ; 
        this.movies = [] ;
    }
    async fetchData(tab,query,genreFilter,yearFilter){
        console.log('fetching');
        console.log(tab,'-',query,'-',genreFilter,'-',yearFilter);
        var sleep = n => new Promise(resolve => setTimeout(resolve, n));
        await sleep(1000);
        this.movies = [
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
                title:"DC's Legends of Tomorrow.",
                score:7.5,
                duration:'2h 16min',
                date:'5 May 2017 (USA)',
                genre:'Acción y Aventura',
                description:'Cuando los héroes por sí solos no son  suficientes. El mundo necesita leyendas. Después de haber visto el futuro ...',
                imageUrl:'img/favorite.svg'
            }
        ]  ;
        this.props.onUpdate() ; 
        console.log('got data');
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
            return ( <div style={s.wrapper}>
                {data}
            </div>);
        }
        else {
            this.fetchData(this.props.tab,this.props.query,this.props.genreFilter,this.props.yearFilter) ; 
            return (<div style={s.updated}>
                Loading ... 
            </div>); 
        }
    }
}

export { ShowAppList } ;