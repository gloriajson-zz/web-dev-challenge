import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchRepos, fetchTag, addRepo, removeRepo } from '../store/actions/search';

class Favourites extends Component{
  constructor(props){
    super(props);
    this.state = {
      favourites: [{id: 1, name: 'Test', language: 'C', tag: 'v1.0'}],
      repos: this.props.repos,
      tags: this.props.tags
    }
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(repo){
    console.log(repo);
    console.log(this.state.repos);
    //remove repo from favourites
    this.props.dispatch(removeRepo());
  }

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
        {this.state.favourites.map(data => {
          return(
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{data.language}</td>
              <td>{data.tag}</td>
              <td><button className='remove' value={data.id} onClick={() => this.handleRemove(data)}>Remove</button></td>
            </tr>);
        })}
        </tbody>
      </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tag: state.tags,
  repos: state.repos,
  favourites: state.favourites
}
)

export default connect(mapStateToProps)(Favourites);
