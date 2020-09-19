import Axios from 'axios';
import { GET_POSTS } from './postTypes';
import { GET_POST } from './postTypes';

const findAllPost = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};
export const fetchPosts = () => {
  return (dispatch) => {
    Axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      const posts = response.data;
      dispatch(findAllPost(posts));
    });
  };
};
const findSinglePost = (post) => {
  return {
    type: GET_POST,
    payload: post,
  };
};
export const fetchSinglePost = (id) => {
  console.log('id=', id);
  return (dispatch) => {
    Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((response) => {
      const post = response.data;
      dispatch(findSinglePost(post));
    });
  };
};
