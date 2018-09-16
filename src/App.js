import React, { Component } from 'react';
// import logo from './logo.svg';
import { AppBar } from "./components/AppBar";
import ComboBox from './components/ComboBox' ; 
import { ShowAppSearch } from "./components/ShowAppSearch";
import { ShowAppList } from "./components/ShowAppList";
import './App.css' ;

const s = {
    body:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    app_wrapper:{
        width:'100%'
    },
    filters:{
        display:'flex',
        flexDirection:'row'
    },
    header:{
        paddingTop:'45px',
        paddingBottom:'30px'
    },
    headerContent:{
        marginLeft:'42px',
        marginRight:'42px',
        fontFamily: 'Open Sans',
        fontSize: '16px',
        fontWeight: '600',
        color: '#687b82',
    },
    listWrapper:{
        display:'flex', 
        justifyContent:'center',
        flexDirection:'collumn',
        marginTop:'20px',
        marginBottom:'86px'
    },
}

class App extends Component {
    constructor(props) {
        super(props) ; 
        this.state = {
            tab:'Movies',
            genreFilter:'',
            yearFilter:'',
            query:'',
            updated:false,
            yearFilterDisabled:false,
            genreFilterDisabled:false
        }
        this.genres = [{
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
        ] 
        this.years = [] ; 
        for(let i = 1970 ; i < 2019 ; i ++ )
            this.years.push({id:i,name:i}) ; 
    }
    componentWillMount(){
        let mq_medium = matchMedia('(min-width:520px)') ; 
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
    handleGenreFilter(genreFilter){
        if(genreFilter !== this.state.genreFilter)
            this.setState({genreFilter,updated:false}) ;
    }
    handleYearFilter(yearFilter){
        if(yearFilter !== this.state.yearFilter)
            this.setState({yearFilter,updated:false}) ;
    }
    handleSubmitSearch(query){
        if(query.length === 0) { 
            this.setState({query,
                updated:false,yearFilterDisabled:false,genreFilterDisabled:false}) ;
        }
        else {
            this.setState({query,
                updated:false,genreFilterDisabled:true,yearFilterDisabled:false}) ;
        }
    }
    handleTabSelect(tab){
        if(tab !== this.state.tab && tab !== 'Favorites') { 
            this.setState({tab,
                yearFilterDisabled:false,
                genreFilterDisabled:false,
                genreFilter:'',
                yearFilter:'',
                query:'',
                updated:false}) ;
        }
        else if (tab !== this.state.tab) {
            this.setState({tab,
                yearFilterDisabled:true,
                genreFilterDisabled:true,
                genreFilter:'',
                yearFilter:'',
                query:'',
                updated:false}) ;
        }
    }
    handleUpdate(){
        this.setState({
            updated:true,
        })
    }
    handleSearchInputChange(query) {
        if(query.length === 0) { 
            this.setState({query,
                yearFilterDisabled:false,genreFilterDisabled:false}) ;
        }
        else {
            this.setState({query,
                genreFilterDisabled:true,yearFilterDisabled:false}) ;
        }
    }
    style_yearFilter(){
        if(this.state.inMobile)
            return {marginLeft:'30px'}
        return {marginLeft:'42px'} ; 
    }
    style_genreFilter(){
        if(this.state.inMobile)
            return {marginLeft:'30px'}
        return {marginLeft:'69px'} ; 
    }
    style_filters(){
        if(this.state.inMobile)
            return {...s.filters,flexDirection:'column'}
        return {...s.filters} ; 
    }
    render() {
        return (<div >
            <div style={s.body}>
                <div style={s.app_wrapper}>
                    <AppBar onChange={this.handleTabSelect.bind(this)}/>
                    <ShowAppSearch onUpdateSearchInput={this.handleSearchInputChange.bind(this)} value={this.state.query} onSubmit={this.handleSubmitSearch.bind(this)}/>
                    <div style={s.header}>
                        <div style={s.headerContent}>
                            Descubra nuevas películas y programas de televisión
                        </div>
                    </div>
                    <div style={this.style_filters()}>
                        <div style={this.style_yearFilter()}>
                            <ComboBox disabled={this.state.yearFilterDisabled} title='Year' width='120' height='30' 
                            value={this.state.yearFilter}
                            onChange={this.handleYearFilter.bind(this)} 
                            menu={this.years} />
                        </div>
                        <div style={this.style_genreFilter()}>
                            <ComboBox disabled={this.state.genreFilterDisabled}  style={{marginLeft:'14px'}} title='Genre' width='238' height='30' 
                                value={this.state.genreFilter}
                                onChange={this.handleGenreFilter.bind(this)} 
                                menu={this.genres} />
                        </div>
                    </div>
                    <div style={s.listWrapper}>
                        <ShowAppList 
                            onUpdate={this.handleUpdate.bind(this)}
                            updated={this.state.updated}
                            tab={this.state.tab}
                            genreFilter={this.state.genreFilter}
                            yearFilter={this.state.yearFilter}
                            query={this.state.query}/>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default App;
