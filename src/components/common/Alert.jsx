import React, { useState, useEffect } from 'react';

const Alert = ({messageclasses, message}) => {
  messageclasses += ' alert-dismissible fade show';
 let [show, setShow] = useState(false);
 let [content, setContent] = useState('');
 useEffect(() => {
   setContent(message);
   if (content !== '') {
     setShow(true);
   } else {
     setShow(false);
     message = '';
   }
 })
  
  return ( 
    show && 
    <div className={messageclasses}>
      {content}
      <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => {
        setContent('')
      }} aria-label="Close"></button>
    </div>
   );
}
 
export default Alert;