import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InfoIcon from '@material-ui/icons/Info';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ipcRenderer } from 'electron';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { EIGHT, FIVE, FOUR, LKG, NINE, NURSERY, ONE, SEVEN, SIX, TEN, THREE, TWO, UKG } from '../../constant/class';
import fs from 'fs';
import path from 'path';
import React, { useState } from 'react';
import * as Yup from 'yup';
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
  const [image, setImage] = useState({});
  const [photo, setPhoto] = useState({});
  const [isPhotoValid, setPhotoValid] = useState(true);
  const [photoErrorMessage, setPhotoErrorMessage] = useState('');
  const PHOTO_SIZE = 500000;
  const PHOTO_SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

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

  const handleSubmit = (data) => {
    const photoObject = data.photo;
    const photoBuffer = fs.readFileSync(photoObject.path);
    const photoBase64String = photoBuffer.toString('base64');
    const photoName = data.admissionNo + '_' + data.studentName.replace(/ /g, '') + path.extname(photoObject.name);
    const photoType = photoObject.type;
    data.photoName = photoName;
    data.photoType = photoType;
    delete data.photo;
    delete data.photoObject;
    data.photoBase64String = photoBase64String;
    console.log(photoBase64String);
    addAdmission(data);
  };

  const onChangePhoto = (file) => {
    const size = file.size;
    const type = file.type;
    let flag = true;
    if (size > PHOTO_SIZE) {
      flag = false;
      setPhotoValid(false);
      setPhotoErrorMessage('Photo size should not greater than ' + PHOTO_SIZE / 1000 + ' KB');
    }
    if (!PHOTO_SUPPORTED_FORMATS.includes(type)) {
      flag = false;
      setPhotoValid(false);
      setPhotoErrorMessage('Only JPG & PNG are allowed');
    }
    if (flag) {
      setPhotoValid(true);
      setImage(URL.createObjectURL(file));
      setPhoto(file);
    }
  };
  const uploadClick = () => {
    var inputTypeFilePhoto = document.getElementById('inputTypeFilePhoto');
    inputTypeFilePhoto.click();
  };
  const currentYear = new Date().getFullYear();
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
          <Formik
            initialValues={{
              admissionNo: '',
              studentName: '',
              fatherName: '',
              motherName: '',
              dateOfBirth: '',
              class: '',
              session: currentYear + '-' + (currentYear + 1),
              aadhar: '',
              caste: '',
              mobile: '',
              address: '',
              photo: '',
            }}
            validationSchema={Yup.object().shape({
              admissionNo: Yup.number().positive('Admission No should not be negative').required('Addmission No is required'),
              studentName: Yup.string()
                .min(3, 'Name cannot be less than 3 characters')
                .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                .required('Student Name is required'),
              fatherName: Yup.string()
                .min(3, 'Name cannot be less than 3 characters')
                .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                .required('Father Name is required'),
              motherName: Yup.string()
                .min(3, 'Name cannot be less than 3 characters')
                .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                .required('Mother Name is required'),
              dateOfBirth: Yup.date().required('Date of Birth is required'),
              class: Yup.string().required('Class is required'),
              session: Yup.string().required('Session is required'),
              aadhar: Yup.string()
                .matches(/^[0-9]*$/, 'Aadhar must be numeric only')
                .length(12, 'Aadhar must be 12 digits only')
                .required('Aadhar is required'),
              caste: Yup.string().required('Caste is required'),
              mobile: Yup.string()
                .matches(/^[6789]\d{9}$/, 'Mobile no is not valid')
                .required('Mobile is required'),
              address: Yup.string().min(10, 'Address cannot be less than 10 characters').required('Address is required'),
              photo: Yup.mixed().required('Photo is required'),
            })}
            onSubmit={(fields) => {
              console.log('onsubmit=', fields);
              if (isPhotoValid) handleSubmit(fields);
            }}
          >
            {({ errors, touched, dirty, isSubmitting, handleReset, setFieldValue }) => (
              <Form>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Admission Number</label>
                  <div className='col-sm-8'>
                    <Field
                      id='admissionNo'
                      name='admissionNo'
                      type='number'
                      className={'form-control' + (errors.admissionNo && touched.admissionNo ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name='admissionNo' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Student Name</label>
                  <div className='col-sm-8'>
                    <Field
                      id='studentName'
                      name='studentName'
                      type='text'
                      className={'form-control' + (errors.studentName && touched.studentName ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name='studentName' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Father Name</label>
                  <div className='col-sm-8'>
                    <Field
                      id='fatherName'
                      name='fatherName'
                      type='text'
                      className={'form-control' + (errors.fatherName && touched.fatherName ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name='fatherName' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Mother Name</label>
                  <div className='col-sm-8'>
                    <Field
                      id='motherName'
                      name='motherName'
                      type='text'
                      className={'form-control' + (errors.motherName && touched.motherName ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name='motherName' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Date Of Birth</label>
                  <div className='col-sm-8'>
                    <Field
                      id='dateOfBirth'
                      name='dateOfBirth'
                      type='date'
                      className={'form-control' + (errors.dateOfBirth && touched.dateOfBirth ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name='dateOfBirth' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Class</label>
                  <div className='col-sm-8'>
                    <Field
                      id='class'
                      name='class'
                      as='select'
                      className={'form-control' + (errors.class && touched.class ? ' is-invalid' : '')}
                    >
                      <option value='0'>--Select--</option>
                      <option value={NURSERY}>{NURSERY}</option>
                      <option value={LKG}>{LKG}</option>
                      <option value={UKG}>{UKG}</option>
                      <option value={ONE}>{ONE}</option>
                      <option value={TWO}>{TWO}</option>
                      <option value={THREE}>{THREE}</option>
                      <option value={FOUR}>{FOUR}</option>
                      <option value={FIVE}>{FIVE}</option>
                      <option value={SIX}>{SIX}</option>
                      <option value={SEVEN}>{SEVEN}</option>
                      <option value={EIGHT}>{EIGHT}</option>
                      <option value={NINE}>{NINE}</option>
                      <option value={TEN}>{TEN}</option>
                    </Field>
                    <ErrorMessage name='class' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Session</label>
                  <div className='col-sm-8'>
                    <Field
                      id='session'
                      name='session'
                      type='text'
                      className={'form-control' + (errors.session && touched.session ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name='session' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Aadhar Card No</label>
                  <div className='col-sm-8'>
                    <Field
                      id='aadhar'
                      name='aadhar'
                      type='text'
                      className={'form-control' + (errors.aadhar && touched.aadhar ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name='aadhar' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Caste</label>
                  <div className='col-sm-8'>
                    <Field
                      id='caste'
                      name='caste'
                      as='select'
                      className={'form-control' + (errors.caste && touched.caste ? ' is-invalid' : '')}
                    >
                      <option value='0'>--Select--</option>
                      <option value='SC'>SC</option>
                      <option value='ST'>ST</option>
                      <option value='OBC'>OBC</option>
                      <option value='General'>General</option>
                    </Field>
                    <ErrorMessage name='caste' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Mobile</label>
                  <div className='col-sm-8'>
                    <Field
                      id='mobile'
                      name='mobile'
                      type='text'
                      className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name='mobile' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Address</label>
                  <div className='col-sm-8'>
                    <Field
                      id='address'
                      name='address'
                      as='textarea'
                      className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')}
                    />
                    <ErrorMessage name='address' component='div' className='invalid-feedback' />
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <label className='col-sm-4 control-label'>Photo</label>
                  <div className='col-sm-8'>
                    <div className={isPhotoValid ? 'photo__container' : 'photo__container error-border'}>
                      <div className='photo__upload' onClick={uploadClick}>
                        <CloudUploadIcon />
                        <p>Choose Photo</p>
                      </div>
                      <div className='photo__details'>
                        <table>
                          <tbody>
                            <tr>
                              <td className='align-right'>Name :</td>
                              <td>{photo.name}</td>
                            </tr>
                            <tr>
                              <td className='align-right'>Size :</td>
                              {photo.size && <td>{`${photo.size / 1000} KB`}</td>}
                            </tr>
                            <tr>
                              <td className='align-right'>Type :</td>
                              <td>{photo.type}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='photo__image'>
                        {Object.keys(image).length === 0 && image.constructor === Object ? (
                          <AccountBoxIcon style={{ fontSize: 130 }} />
                        ) : (
                          <img src={image} alt='photo' />
                        )}
                      </div>
                    </div>
                    <div className={isPhotoValid ? 'hide' : 'photo__validation'}>{photoErrorMessage}</div>
                    <ErrorMessage name='photo' component='div' className='invalid-feedback' />
                    <div className='hide'>
                      <input
                        id='inputTypeFilePhoto'
                        type='file'
                        onChange={(e) => {
                          onChangePhoto(e.currentTarget.files[0]);
                          setFieldValue('photo', e.currentTarget.files[0]);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className={`form-group ${classes.flex}`}>
                  <div className='col-sm-12 center'>
                    <input type='submit' className='btn btn-info' name='submit' value='Save' disabled={!dirty && isSubmitting} />
                    <input type='button' className='btn btn-danger' name='reset' value='Reset' disabled={!dirty} onClick={handleReset} />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Admission;
