import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';


class Favourites extends Component{
  constructor(props){
    super(props);
    this.state = {
      favourites: [],
      repos: this.props.repos,
      tags: this.props.tags
    }
  }
//full_name, html_url, language, tags_url
  render(){
    return(
      <div className='fav'>
      <table class='table table-borderless'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Language</th>
            <th>Latest tag</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        <tr><td>Example</td><td>C</td><td>v1.0</td><td><button className='remove'>Remove</button></td></tr>
        </tbody>
      </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

}
)

export default Favourites;//connect(mapStateToProps, mapDispatchToProps)(Favourites);
