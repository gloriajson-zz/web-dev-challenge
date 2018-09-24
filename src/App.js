import React, { Component } from 'react';
import './App.css';
import './css/favourites.css';
import './css/search.css'
import Header from './components/header';
import SearchPage from './components/search';
import Favourites from './components/favourites';
//
class App extends Component {
  render() {
    console.log("MAIN");
    console.log(this.props.repos);
    return(
      <div class='body'>
        <Header />

        <div class='col-xs-6 col-md-6 col-lg-6'>
          <SearchPage />
        </div>
        <div class='col-xs-6 col-md-6 col-lg-6'>
          <Favourites />
        </div>

      </div>
    );
  }
}

export default App;
