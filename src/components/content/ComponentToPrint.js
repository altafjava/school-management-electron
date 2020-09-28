import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import schoolLogo from '../../../assets/school-logo.png';
import './ComponentToPrint.css';

const styles = (theme) => ({
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
    margin: 'auto',
    background: 'white',
  },
  photo: {
    width: '180px',
    height: '200px',
    border: '1px solid black',
  },
  flex: {
    ...theme.shape.flex,
  },
  schoolHeading: {
    textAlign: 'center',
    padding: '2rem 4rem',
    borderBottom: '1px solid #781414',
  },
  schoolName: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    color: '#781414',
  },
  admissionReceipt: {
    marginTop: '1rem',
  },
  logoPosition: {
    position: 'absolute',
    marginTop: '12px',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ComponentToPrint extends Component {
  render() {
    const { classes, student } = this.props;
    let photoBase64;
    let Photo;
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
    const date = new Date();
    const currentDate = date.getDate() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getFullYear();
    return (
      <div className={classes.detailsContainer}>
        <div className={classes.schoolHeading}>
          <div className={classes.logoPosition}>
            <img src={schoolLogo} alt='school-logo' width='100px' />
          </div>
          <div>
            <h1 className={classes.schoolName}>AMERICAN DREAM PLAY SCHOOL</h1>
            <h4>Burmu, Ray Road, Ranchi Jharkhand – 835214</h4>
            <h6 className={classes.admissionReceipt}>ADMISSION RECEIPT</h6>
          </div>
        </div>
        <div className='box1'>
          <div className='box1__container--width'>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5  align-right'>Admission Date</label>
              <label className='col-sm-7  align-left'>{currentDate}</label>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5  align-right'>Admission Number</label>
              <label className='col-sm-7  align-left'>{student && student.admissionNo}</label>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5  align-right'>Student Name</label>
              <label className='col-sm-7  align-left'>{student && student.studentName}</label>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5  align-right'>Father Name</label>
              <label className='col-sm-7  align-left'>{student && student.fatherName}</label>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-5  align-right'>Mother Name</label>
              <label className='col-sm-7  align-left'>{student && student.motherName}</label>
            </div>
          </div>
          <div>{Photo && <Photo data={photoBase64} />}</div>
        </div>
        <hr></hr>
        <div className='box2'>
          <div className='box2__container'>
            <div className='box2__container--width'>
              <div className={`form-group ${classes.flex}`}>
                <label className='col-sm-5  align-right'>Gender</label>
                <label className='col-sm-7  align-left'>{student && student.gender}</label>
              </div>
              <div className={`form-group ${classes.flex}`}>
                <label className='col-sm-5  align-right'>Class</label>
                <label className='col-sm-7  align-left'>{student && student.class}</label>
              </div>
              <div className={`form-group ${classes.flex}`}>
                <label className='col-sm-5  align-right'>Religion</label>
                <label className='col-sm-7  align-left'>Islam</label>
              </div>
              <div className={`form-group ${classes.flex}`}>
                <label className='col-sm-5  align-right'>Aadhar</label>
                <label className='col-sm-7  align-left'>{student && student.aadhar}</label>
              </div>
            </div>
            <div className='box2__container--width'>
              <div className={`form-group ${classes.flex}`}>
                <label className='col-sm-5  align-right'>Date of Birth</label>
                <label className='col-sm-7  align-left'>{student && student.dateOfBirth}</label>
              </div>
              <div className={`form-group ${classes.flex}`}>
                <label className='col-sm-5  align-right'>Session</label>
                <label className='col-sm-7  align-left'>{student && student.session}</label>
              </div>
              <div className={`form-group ${classes.flex}`}>
                <label className='col-sm-5  align-right'>Category</label>
                <label className='col-sm-7  align-left'>{student && student.caste}</label>
              </div>
              <div className={`form-group ${classes.flex}`}>
                <label className='col-sm-5  align-right'>Mobile</label>
                <label className='col-sm-7  align-left'>{student && student.mobile}</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={`form-group ${classes.flex}`}>
            <label className='box3__container--padding address-width1 align-right'>Address</label>
            <label className='box3__container--padding address-width2 align-left'>
              G-44, First Floor, Sector 3, Noida, Uttar Pradesh, Pin Code, Noida, Uttar Pradesh 201301
            </label>
          </div>
        </div>
        <hr></hr>
        <div id='admission-fee-table'>
          <table style={{ width: '100%' }}>
            <thead className='table-heading'>
              <tr>
                <td className='sr'>Sr.#</td>
                <td>Particulars</td>
                <td style={{ textAlign: 'right', paddingRight: '2rem' }}>Amount</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='sr'>1</td>
                <td className='particulars'>Admission Fee</td>
                <td className='amount'>5000.00</td>
              </tr>
              <tr>
                <td className='sr'>2</td>
                <td className='particulars'>Annual Charges</td>
                <td className='amount'>3000.00</td>
              </tr>
              <tr>
                <td className='sr'>3</td>
                <td className='particulars'>Development Fund</td>
                <td className='amount'>1000.00</td>
              </tr>
              <tr>
                <td className='sr'>4</td>
                <td className='particulars'>Registeration Fee</td>
                <td className='amount'>300.00</td>
              </tr>
              <tr>
                <td className='sr'>5</td>
                <td className='particulars'>Tution Fee</td>
                <td className='amount'>700.00</td>
              </tr>
              <tr>
                <td className='sr'></td>
                <td className='net-amount-payable'>Net Amount Payable</td>
                <td className='amount net-amount'>{'\u20B9'}10000.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='box4__container'>
          <div className='form-group box4__container--margin'>Signature of the Headmaster</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ComponentToPrint);
