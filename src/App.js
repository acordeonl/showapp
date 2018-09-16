import React, { Component } from 'react';
// import logo from './logo.svg';
import { AppBar } from "./components/AppBar";
import ComboBox from './components/ComboBox' ; 
import { ShowAppSearch } from "./components/ShowAppSearch/ShowAppSearch";
import { ShowAppList } from "./components/ShowAppList/ShowAppList";

const s = {
    body:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    app_wrapper:{
        width:'1024px'
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
        width: '408px',
        height: '22px',
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
    }
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
            yearFilterDisabled:false
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
        if(query !== this.state.query)
            this.setState({query,updated:false}) ;
    }
    handleTabSelect(tab){
        if(tab !== this.state.tab)
            this.setState({tab,updated:false}) ;
    }
    handleUpdate(){
        this.setState({
            updated:true
        })
    }
    render() {
        return (<div style={s.body}>
            <div style={s.app_wrapper}>
                <AppBar onChange={this.handleTabSelect.bind(this)}/>
                <ShowAppSearch onSubmit={this.handleSubmitSearch.bind(this)}/>
                <div style={s.header}>
                    <div style={s.headerContent}>
                        Descubra nuevas películas y programas de televisión
                    </div>
                </div>
                <div style={s.filters}>
                    <div style={{marginLeft:'42px'}}>
                        <ComboBox disabled={this.state.yearFilterDisabled} title='Year' width='120' height='30' 
                        onChange={this.handleYearFilter.bind(this)} 
                        menu={['2016', '2002', '2006']} />
                    </div>
                    <div style={{marginLeft:'69px'}}>
                        <ComboBox style={{marginLeft:'14px'}} title='Genre' width='238' height='30' 
                            onChange={this.handleGenreFilter.bind(this)} 
                            menu={[
                                'Acción',
                                'Aventura', 
                                'Comedia',
                            ]} />
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
        </div>);
    }
}

export default App;
