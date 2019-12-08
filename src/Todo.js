import React from 'react';
import { withRouter } from 'react-router-dom';

import Input from './components/Input';
import Button from './components/Button';

class Todo extends React.Component {
  state = {
    value: '',
    description: '',
    checked: false
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const todo = todos.find(todo => todo.id === this.props.match.params.id);
    if (todo && !this.state.value && !this.state.description) {
      this.setState({
        value: todo.value,
        description: todo.description,
        checked: todo.checked
      });
    }
  }

  changeText = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeChecked = event => {
    this.setState({ checked: event.target.checked });
  };

  goBack = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todo = todos.find(todo => todo.id === this.props.match.params.id);
    this.props.history.push('/todos/' + todo.email);
  };

  saveTodo = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    let todo = todos.find(todo => todo.id === this.props.match.params.id);
    const todoIndex = todos.findIndex(
      todo => todo.id === this.props.match.params.id
    );
    todo = {
      ...todo,
      value: this.state.value,
      description: this.state.description,
      checked: this.state.checked
    };
    todos.splice(todoIndex, 1, todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.goBack();
  };

  render() {
    return (
      <div
        className='container-fluid'
        style={{
          marginTop: '50px'
        }}
      >
        <h1>Edit Todo</h1>
        <div class='input-group mb-3'>
          <div class='input-group-prepend'>
            <div class='input-group-text'>
              <input
                type='checkbox'
                checked={this.state.checked}
                onChange={this.changeChecked}
              />
            </div>
          </div>
        </div>
        <Input
          type='text'
          value={this.state.value}
          onChange={this.changeText}
          name='value'
        />
        <Input
          type='textarea'
          value={this.state.description}
          onChange={this.changeText}
          name='description'
        />
        <Button onClick={this.saveTodo} style={{ marginRight: '10px' }}>
          Save
        </Button>
        <Button onClick={this.goBack}>Go Back</Button>
      </div>
    );
  }
}

export default withRouter(Todo);
