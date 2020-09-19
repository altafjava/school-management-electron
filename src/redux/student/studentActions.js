import fs from 'fs';
import { GET_STUDENT, GET_STUDENTS } from './studentTypes';

const findAllStudents = (students) => {
  return {
    type: GET_STUDENTS,
    payload: students,
  };
};
const findStudent = (student) => {
  return {
    type: GET_STUDENT,
    payload: student,
  };
};

export const fetchStudents = () => {
  return (dispatch) => {
    const userDataPath = localStorage.getItem('userDataPath');
    const fileName=userDataPath+'/admission.json'
    let students = [];
    try {
      students = JSON.parse(fs.readFileSync(fileName));
    } catch (error) {
      console.log(error);
    }
    dispatch(findAllStudents(students));
  };
};

export const fetchStudent = (admissionNo) => {
  return (dispatch) => {
    const userDataPath = localStorage.getItem('userDataPath');
    const fileName=userDataPath+'/admission.json'
    let studentObject = {};
    try {
      const students = JSON.parse(fs.readFileSync(fileName));
      studentObject = students.filter((student) => student.admissionNo === admissionNo)[0];
    } catch (error) {
      console.log(error);
    }
    dispatch(findStudent(studentObject));
  };
};
