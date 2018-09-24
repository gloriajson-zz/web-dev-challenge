import { FETCH_TAG, FETCH_REPOS, ADD_REPO, REMOVE_REPO } from '../actions/search';

const initialState = {
  repos: [],
  tag: [],
  favourites: [],
}

export default function(state = initialState, action){
  console.log(action.payload);
  switch(action.type){
    case FETCH_REPOS:
      return {
        ...state,
        repos: action.payload
      }
    case FETCH_TAG:
      return {
        ...state,
        tag: action.payload
      }
    case ADD_REPO:
      console.log("reducer add repo");
      console.log(action.payload);
      return {
        ...state,
        favourites: action.payload
      }
    case REMOVE_REPO:
      return {
        ...state,
        favourites: action.payload
      }
    default:
      return state;
  }
}
