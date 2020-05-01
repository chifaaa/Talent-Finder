import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <AuthUserContext.Consumer>
  {authUser =>
    authUser ? <NavigationAuth /> : <NavigationNonAuth />
  }
</AuthUserContext.Consumer>
);
const NavigationAuth = () => (
  <ul className='navauth'>
    {/* <li className='navauthli'>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li> */}
    {/* <li className='navauthli'style={{float:'left'}}>
    <h1 className='title'>Talent Finder</h1>
    </li> */}
    <li className='navauthli' style={{marginLeft:'40px'}}>
      <SignOutButton />
    </li>
    <li className='navauthli'>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li className='navauthli'>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li className='navauthli'>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
  </ul>
);
const NavigationNonAuth = () => (
  <ul className='navnonauth'>
    {/* <li className='navnonauthli'>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li> */}
    <li className='navnonauthli'style={{float:'left'}}>
    <h1 className='title'>Talent Finder</h1>
    </li>
    <li className='navnonauthli' > 
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);
export default Navigation;