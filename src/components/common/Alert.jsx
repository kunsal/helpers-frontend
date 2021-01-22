import React, { useState } from 'react';

const Alert = ({messageClasses, message, status}) => {
  messageClasses += ' alert-dismissible fade show';
  const [closed, setClose] = useState(status);

  return ( 
    !closed && 
    <div className={messageClasses} role="alert">
      {message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={() => setClose(true)} aria-label="Close"></button>
    </div>
   );
}
 
export default Alert;