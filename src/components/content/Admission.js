import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';
import React, { useState } from 'react';
import './Admission.css';
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
  flex: {
    ...theme.shape.flex,
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  notification: {
    display: 'flex',
    alignItems: 'center',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className={classes.notification}>
        <InfoIcon />
        <Typography variant='h6'>{children}</Typography>
        {onClose ? (
          <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const Admission = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function addAdmission(admission) {
    ipcRenderer.send('admission:add', admission);
  }
  ipcRenderer.on('notify:admission-saved', (e) => {
    openDialog();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const photoObject = formData.get('photo');
    const photoBuffer = fs.readFileSync(photoObject.path);
    const photoBase64String = photoBuffer.toString('base64');
    const admissionNo = formData.get('admissionNo');
    const studentName = formData.get('studentName');
    const admissionData = {
      admissionNo: admissionNo,
      studentName: studentName,
      fatherName: formData.get('fatherName'),
      motherName: formData.get('motherName'),
      dateOfBirth: formData.get('dateOfBirth'),
      aadhar: formData.get('aadhar'),
      caste: formData.get('caste'),
      mobile: formData.get('mobile'),
      address: formData.get('address'),
      photoName: admissionNo + '_' + studentName.replace(/ /g, '') + path.extname(photoObject.name),
      photoType: photoObject.type,
      photoBase64String: photoBase64String,
    };
    addAdmission(admissionData);
  };
  return (
    <div className={classes.container}>
      <div className='form-group content__heading'>Admission Form</div>
      <div className='admission-form'>
        <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            Notification
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>Addmission Form successfully Saved</Typography>
          </DialogContent>
        </Dialog>
        <div className=''>
          <form onSubmit={handleSubmit}>
              <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Admission Number</label>
              <div className='col-sm-8'>
                <input type='number' className='form-control' name='admissionNo' id='admissionNo' />
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Student Name</label>
              <div className='col-sm-8'>
                <input type='text' className='form-control' name='studentName' id='studentName' placeholder='Student Name' />
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Father Name</label>
              <div className='col-sm-8'>
                <input type='text' className='form-control' name='fatherName' id='fatherName' placeholder='Father Name' />
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Mother Name</label>
              <div className='col-sm-8'>
                <input type='text' className='form-control' name='motherName' id='motherName' placeholder='Mother Name' />
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Date Of Birth</label>
              <div className='col-sm-8'>
                <input type='date' name='dateOfBirth' id='dateOfBirth' placeholder='DOB' />
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Aadhar Card No</label>
              <div className='col-sm-8'>
                <input type='number' className='form-control' name='aadhar' id='aadhar' placeholder='Enter Aadhar Card No' />
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Caste</label>
              <div className='col-sm-8'>
                <select className='form-control' name='caste' id='caste'>
                  <option value='0'>--Select--</option>
                  <option value='SC'>SC</option>
                  <option value='ST'>ST</option>
                  <option value='OBC'>OBC</option>
                  <option value='General'>General</option>
                </select>
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Mobile</label>
              <div className='col-sm-8'>
                <input type='number' className='form-control' name='mobile' id='mobile' placeholder='Mobile' />
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Address</label>
              <div className='col-sm-8'>
                <textarea className='form-control' flexs='3' name='address' id='address' placeholder='Address'></textarea>
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <label className='col-sm-4 control-label'>Photo</label>
              <div className='col-sm-8'>
                <input type='file' className='form-control' name='photo' id='photo' />
              </div>
            </div>
            <div className={`form-group ${classes.flex}`}>
              <div className='col-sm-12 center'>
                <input type='submit' className='btn btn-info' name='submit' value='Save' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admission;
