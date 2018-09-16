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
        marginRight:'10px'
    }
}

class ShowAppList extends Component {
    render() {
        return ( <div style={s.wrapper}>
            <div style={s.card}>
                <ShowAppCard/>
            </div>
            <div style={s.card}>
                <ShowAppCard/>
            </div>
            <div style={s.card}>
                <ShowAppCard/>
            </div>
            <div style={s.card}>
                <ShowAppCard/>
            </div>
            <div style={s.card}>
                <ShowAppCard/>
            </div>
            <div style={s.card}>
                <ShowAppCard/>
            </div>
            <div style={s.card}>
                <ShowAppCard/>
            </div>
            <div style={s.card}>
                <ShowAppCard/>
            </div>
        </div>);
    }
}

export { ShowAppList } ;