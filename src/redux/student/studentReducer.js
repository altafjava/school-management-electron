import { GET_STUDENT, GET_STUDENTS } from './studentTypes';

const initialState = {
  students: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENT:
      return {
        ...state,
        student: action.payload,
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
