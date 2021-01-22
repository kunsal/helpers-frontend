import React from 'react';
import logo from '../../images/helper-logo.png';

const Logo = ({width}) => {
  width = width === undefined ? 150 : width;
  return ( <img src={logo} width={width} alt="Logo" /> );
}
 
export default Logo;