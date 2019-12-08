import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from './components/Button';
import Input from './components/Input';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(
      item =>
        item.email === this.state.email && item.password === this.state.password
    );
    if (user) {
      this.props.history.replace('/todos/' + this.state.email);
    } else {
      this.setState({ error: 'Login is not correct ' });
    }
  };

  render() {
    return (
      <div
        className='container-fluid'
        style={{
          height: '100vh',
          marginTop: '50px'
        }}
      >
        <h1>Todo App</h1>

        <Input
          type='text'
          placeholder='email'
          name='email'
          onChange={this.onChange}
          value={this.state.email}
        />
        <Input
          type='password'
          placeholder='password'
          name='password'
          onChange={this.onChange}
          value={this.state.password}
        />
        {this.state.error && (
          <div className='alert alert-danger'>{this.state.error}</div>
        )}
        <Button onClick={this.login}>Login</Button>
      </div>
    );
  }
}

export default withRouter(Login);
