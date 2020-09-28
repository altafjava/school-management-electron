import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { fetchStudent } from '../../redux/student/studentActions';
import ComponentToPrint from './ComponentToPrint';
import './index.css';

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.outline.container,
  },
}));

const StudentDetail = ({ fetchStudentProp, studentState, match }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchStudentProp(parseInt(match.params.admissionNo));
  }, []);
  const student = studentState.student;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={classes.container}>
      <div className='content__heading'>Student Details</div>
      <div style={{ width: '90%', margin: '3rem auto' }}>
        <ComponentToPrint ref={componentRef} student={student} />
      </div>
      <div style={{ textAlign: 'center', margin: '1rem' }}>
        <button onClick={handlePrint}>Print this out!</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    studentState: state.studentState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentProp: (admissionNo) => dispatch(fetchStudent(admissionNo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);
