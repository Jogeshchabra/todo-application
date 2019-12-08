import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from './Button';

const Header = props => {
  if (props.location.pathname === '/') return null;
  return (
    <Button
      onClick={() => props.history.push('/')}
      style={{
        position: 'fixed',
        right: '0rem',
        margin: '10px',
        top: 0
      }}
    >
      Logout
    </Button>
  );
};

export default withRouter(Header);
