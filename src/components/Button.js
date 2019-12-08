import React from 'react';

const Button = props => {
  return (
    <button onClick={props.onClick} className='btn btn-dark' {...props}>
      {props.children}
    </button>
  );
};

export default Button;
