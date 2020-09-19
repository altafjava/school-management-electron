import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudents } from '../../redux/student/studentActions';
import './index.css';
import './Student.css';

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
  link: {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  },
  flex: {
    ...theme.shape.flex,
  },
  flex__column: {
    ...theme.shape.flex__column,
  },
}));
const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const admissionNumber = parseInt(data.get('admissionNumber'));
  console.log('admissionNumber=', admissionNumber);
};

const Student = ({ fetchStudentsProp, studentsProp }) => {
  const classes = useStyles();
  useEffect(() => {
    fetchStudentsProp();
  }, []);
  return (
    <div className={classes.container}>
      <div className='form-group content__heading'>Student Search</div>
      <div className={classes.flex__column}>
        <form onSubmit={handleSubmit} className='box'>
          <div className={`form-group ${classes.flex}`}>
            <label className='col-sm-4 control-label'>Enter Admission Number</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' name='admissionNumber' id='sname' />
            </div>
          </div>
          <div className={`form-group ${classes.flex__column}`}>
            <input type='submit' className='btn btn-info' name='submit' value='Search' />
          </div>
        </form>
      </div>
      <hr />
      <div className='form-group'>
        <table>
          <thead>
            <tr>
              <td className='heading'>Admission No</td>
              <td className='heading'>Student Name</td>
              <td className='heading'>Father Name</td>
              <td className='heading'>Mother Name</td>
              <td className='heading'>Date of Birth</td>
              <td className='heading'>Aadhar</td>
              <td className='heading'>Caste</td>
              <td className='heading'>Mobile</td>
              <td className='heading'>Address</td>
            </tr>
          </thead>
          <tbody>
            {studentsProp.students.map((student) => (
              <tr key={student.admissionNo}>
                <td>
                  <Link to={`student-details/${student.admissionNo}`} className={classes.link}>
                    {student.admissionNo}
                  </Link>
                </td>
                <td>{student.studentName}</td>
                <td>{student.fatherName}</td>
                <td>{student.motherName}</td>
                <td>{student.dateOfBirth}</td>
                <td>{student.aadhar}</td>
                <td>{student.caste}</td>
                <td>{student.mobile}</td>
                <td>{student.address.length > 30 ? student.address.substring(0, 30) + '...' : student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    studentsProp: state.studentState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentsProp: () => dispatch(fetchStudents()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Student);
