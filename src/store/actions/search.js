import axios from 'axios';

const reposAPI = "https://api.github.com/search/repositories?q=";
//dfdd76d4b9cca39eff5c86c230313c25d6e0732b
export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_TAG = 'FETCH_TAG';
export const ADD_REPO = 'ADD_REPO';
export const REMOVE_REPO = 'REMOVE_REPO';

export const fetchRepos = (repoName, callback) => dispatch => {
  let url = reposAPI+repoName+"&per_page=10";

  axios.get(url).then(res => {
    //let { repos } = res.data;
    console.log(res.data.items);
    return dispatch({
      type: FETCH_REPOS,
      payload: res.data.items
    });
  }).catch(err => {
    console.log(err);
  });
}

export const fetchTag = (tagURL, callback) => dispatch => {
  let url = tagURL+"?per_page=1";
  axios.get(url).then(res => {
    console.log(res.data);
    let { tag } = res.data;
    return dispatch({
      type: FETCH_TAG,
      payload: tag
    });
  }).catch(err => {
    console.log(err);
  });
}

export const addRepo = (repo) => dispatch =>{
  return{
    type: ADD_REPO,
    payload: repo
  }
}

export const removeRepo = (repo) => dispatch => {
  return{
    type: REMOVE_REPO,
    payload: repo
  }
}
