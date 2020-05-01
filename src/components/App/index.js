import React from 'react';
import { withAuthentication } from '../Session';
import {BrowserRouter as Router,Route,} from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import ListingBrief from '../Home';
import AccountPage from '../Account';
import AddProjet from '../Account/addProjet';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';


const App = () => (

  <Router>
    <div>
    <Navigation />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={ListingBrief} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADDPROJET} component={AddProjet} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      {/* <Footer /> */}
    </div>
  </Router>
);
export default withAuthentication(App);
