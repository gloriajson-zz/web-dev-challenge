import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchRepos, fetchTag, addRepo } from '../store/actions/search';
import axios from 'axios';

class SearchPage extends Component{
  constructor(props){
    console.log("constructor");
    super(props);
    this.state = {
      repos: [],
      tags: {},
      favourites: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleSubmit(event){
    //get repo data and update state
    const reposAPI = "https://api.github.com/search/repositories?q=";
    console.log("HANDLE SUBMIT");
    event.preventDefault();
    axios.get(reposAPI+this.textInput.value+"&per_page=10")
    .then((res) => {
      console.log("fetch repos");
      this.props.dispatch(fetchRepos(this.textInput.value));
      this.setState({repos: res.data.items});
    }).then(() => {
      console.log("fetch tags");
      let html_tags = this.state.repos;
      let list = this.state.tags;
      for(let i=0; i<10; ++i){
        axios.get(html_tags[i].tags_url + '?per_page=1').then((tagres) => {
          if(tagres.data[0]){
            list[html_tags[i].id] = tagres.data[0].name;
            this.setState({tags: list});
          }
        })
      }
    })
  }

  checkInputChange = (e) => {
    //check when search input field is cleared and clear list of results
    if(e.target.value == ''){
      this.setState({repos: [], tags: []});
    }
  }

 handleAdd = (repo) => {
   //add repo to the store
   console.log(JSON.stringify(repo));
   console.log("Add repo "+repo.id+"to favourites");
   let repoToAdd = {
     id: repo.id,
     name: repo.full_name,
     language: repo.language,
     tag: this.state.tags[repo.id]
   }
   this.props.dispatch(addRepo(repoToAdd));
 }

  render(){
    console.log("render");
    const { repos } = this.state;
    return(
      <div class='formWrap'>
        <form class='form-inline' onSubmit={this.handleSubmit}>
          <div class='form-group col-xs-8'>
          <FormControl inputRef={input => this.textInput = input} onChange={this.checkInputChange} class='searchBar col-xs-8' type="text" placeholder="Search Repos"/>
          </div>
          <p class='col-xs-1'/>
          <Button className='btn' bsStyle="custom" type="submit">Search</Button>
        </form>
        <div class='tableWrap'>
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
            {this.state.repos.map(data => {

              return(
                <tr key={data.id}>
                  <td>{data.full_name}</td>
                  <td>{data.language}</td>
                  <td>{this.state.tags[data.id]}</td>
                  <td><button className='add' value={data.id} onClick={() => this.handleAdd(data)}>Add</button></td>
                </tr>);
            })}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tag: state.tag,
  repos: state.repos,
  favourites: state.favourites
});

export default connect(mapStateToProps)(SearchPage);
