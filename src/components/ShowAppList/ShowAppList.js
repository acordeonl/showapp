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
    }
}

class ShowAppList extends Component {
    render() {
        let movies = [
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
        ] ; 

        const data = movies.map(movie => {
            return (
                <div style={s.card}>
                    <ShowAppCard {...movie} />
                </div>
            ) ;
        });
        return ( <div style={s.wrapper}>
            {data}
        </div>);
    }
}

export { ShowAppList } ;