import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Admission from '../content/Admission';
import CheckDues from '../content/CheckDues';
import CheckPayments from '../content/CheckPayments';
import Class from '../content/Class';
import Dashboard from '../content/Dashboard';
import FeeDetails from '../content/FeeDetails';
import SetFees from '../content/SetFees';
import Student from '../content/Student';
import StudentDetail from '../content/StudentDetail';
import Header from '../layout/Header';
import Navigation from '../layout/Navigation';

const Main = () => {
  return (
    <HashRouter>
      <Header />
      <Navigation />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/admission' component={Admission} />
        <Route exact path='/search-student' component={Student} />
        <Route exact path='/student-details/:admissionNo' component={StudentDetail} />
        <Route exact path='/fee-details' component={FeeDetails} />
        <Route exact path='/set-fees' component={SetFees} />
        <Route exact path='/check-payments' component={CheckPayments} />
        <Route exact path='/check-dues' component={CheckDues} />
        <Route exact path='/add-class' component={Class} />
      </Switch>
    </HashRouter>
  );
};

export default Main;
