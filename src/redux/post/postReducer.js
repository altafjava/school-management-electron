import { GET_POST, GET_POSTS } from './postTypes';

const initialState = {
  post: {},
  posts: [],
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
