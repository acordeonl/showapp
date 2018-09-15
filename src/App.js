import React, { Component } from 'react';
// import logo from './logo.svg';
import ComboBox from './components/ComboBox'

const s = {
    filters:{
        display:'flex',
        flexDirection:'row'
    }
}

class App extends Component {
    constructor(props) {
        super(props) ; 
        this.state = {
            genreFilter:'',
            yearFilter:'',
            yearFilterDisabled:false
        }
    }
    genreFilter(genreFilter){
        this.setState({genreFilter}) ;
    }
    yearFilter(yearFilter){
        this.setState({yearFilter}) ;
    }
    render() {
        return (<div>
            <div style={s.filters}>
                <div style={{marginLeft:'42px'}}>
                    <ComboBox disabled={this.state.yearFilterDisabled} title='Year' width='120' height='30' 
                    onChange={this.yearFilter.bind(this)} 
                    menu={['2016', '2002', '2006']} />
                </div>
                <div style={{marginLeft:'69px'}}>
                    <ComboBox style={{marginLeft:'14px'}} title='Genre' width='238' height='30' 
                        onChange={this.genreFilter.bind(this)} 
                        menu={[
                            'Acción',
                            'Aventura', 
                            'Comedia',
                        ]} />
                </div>
            </div>
        </div>);
    }
}

export default App;
