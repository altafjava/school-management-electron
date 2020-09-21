import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../../redux/student/studentActions';
import './index.css';

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.outline.container,
  },
  container__heading: {
    ...theme.shape.container__heading,
  },
  heading__h2: {
    ...theme.shape.heading__h2,
  },
  detailsContainer: {
    width: '80%',
    margin: 'auto',
    border: '1px solid #ddd',
  },
  photo: {
    width: '180px',
    height: '200px',
    border: '1px solid black',
  },
  flex: {
    ...theme.shape.flex,
  },
}));

const StudentDetail = ({ fetchStudentProp, studentState, match }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchStudentProp(parseInt(match.params.admissionNo));
  }, []);

  let photoBase64;
  let Photo;
  const student = studentState.student;
  if (student) {
    photoBase64 = student.photoBase64String;
    Photo = () => (
      <img
        src={`data:${student.photoType};base64,${photoBase64}`}
        alt='student-photo'
        width='100%'
        height='100%'
        className={classes.photo}
      />
    );
  }

  return (
    <div className={classes.container}>
      <div className='form-group content__heading'>Student Details</div>
      <div className={classes.detailsContainer}>
        <div className={classes.flex}>
          <div className='col-sm-8'>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5 control-label align-right'>Admission Number</label>
              <label className='col-sm-7 control-label align-left'>{student && student.admissionNo}</label>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5 control-label align-right'>Student Name</label>
              <label className='col-sm-7 control-label align-left'>{student && student.studentName}</label>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5 control-label align-right'>Father Name</label>
              <label className='col-sm-7 control-label align-left'>{student && student.fatherName}</label>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5 control-label align-right'>Mother Name</label>
              <label className='col-sm-7 control-label align-left'>{student && student.motherName}</label>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5 control-label align-right'>Date of Birth</label>
              <label className='col-sm-7 control-label align-left'>{student && student.dateOfBirth}</label>
            </div>
          </div>
          <div className='col-sm-4'>{Photo && <Photo data={photoBase64} />}</div>
        </div>
        <hr />
        <div className={classes.flex}>
          <div className='col-sm-4'>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label align-right'>Aadhar :</label>
              <label className='col-sm-8 control-label align-left'>{student && student.aadhar}</label>
            </div>
          </div>
          <div className='col-sm-4'>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label align-right'>Caste :</label>
              <label className='col-sm-8 control-label align-left'>{student && student.caste}</label>
            </div>
          </div>
          <div className='col-sm-4'>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label align-right'>Mobile :</label>
              <label className='col-sm-8 control-label align-left'>{student && student.mobile}</label>
            </div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <div className='col-sm-12'>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-2 control-label align-left'>Address :</label>
              <label className='col-sm-10 control-label align-left'>{student && student.address}</label>
            </div>
          </div>
        </div>
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
