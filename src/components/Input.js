import React from 'react';

class Input extends React.Component {
  render() {
    const { type, placeholder, value, onChange, name } = this.props;
    if (type === 'textarea') {
      return (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className='form-control'
          style={{
            margin: '20px 0'
          }}
        />
      );
    }
    return (
      <input
        className='form-control'
        style={{
          margin: '20px 0'
        }}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    );
  }
}

export default Input;
