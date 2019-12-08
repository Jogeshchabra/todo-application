import React from 'react';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';

import Input from './components/Input';
import Button from './components/Button';

class Todos extends React.Component {
  state = {
    todos: [],
    value: '',
    description: ''
  };

  changeText = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addTodo = () => {
    if (!this.state.value) return;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todo = {
      id: uuid(),
      value: this.state.value,
      description: this.state.description,
      checked: false,
      email: this.props.match.params.email
    };
    this.setState({ todos: [...this.state.todos, todo] });
    localStorage.setItem('todos', JSON.stringify([...todos, todo]));
    this.setState({ value: '', description: '' });
  };

  deleteTodo = id => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos });
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (storedTodos.length > 0) {
      const updatedTodos = storedTodos.filter(todo => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  checkValue = (event, id, index) => {
    const todos = this.state.todos;
    const todo = todos.find(todo => todo.id === id);
    todo['checked'] = event.target.checked;
    todos.splice(index, 1, todo);
    this.setState({ todos });
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.find(todo => todo.id === id)['checked'] = event.target.checked;
    localStorage.setItem('todos', JSON.stringify(storedTodos));
  };

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(
      item => item.email === this.props.match.params.email
    );
    if (!user) {
      this.props.history.push('/');
    }
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    if (todos.length > 0) {
      const userTodos = todos.filter(
        todo => todo.email === this.props.match.params.email
      );
      if (this.state.todos.length === 0) {
        this.setState({ todos: userTodos });
      }
    }
  }

  render() {
    return (
      <div className='container-fluid' style={{ marginTop: '50px' }}>
        <h1>Enter a todo</h1>
        <Input
          type='text'
          value={this.state.value}
          onChange={this.changeText}
          placeholder='add todo'
          name='value'
        />
        <Input
          type='textarea'
          value={this.state.description}
          onChange={this.changeText}
          placeholder='enter description'
          name='description'
        />
        <Button onClick={this.addTodo}>Submit</Button>

        <div style={{ margin: '20px' }}>
          {this.state.todos.map((todo, index) => (
            <div
              key={todo.id}
              style={{
                border: '1px solid black',
                padding: '10px',
                marginBottom: '5px'
              }}
            >
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <input
                      type='checkbox'
                      checked={todo.checked}
                      onChange={event => this.checkValue(event, todo.id, index)}
                    />
                  </div>
                </div>
                <h4 style={{ marginLeft: '20px' }}>{todo.value}</h4>
              </div>
              <Button
                onClick={() => this.props.history.push('/edit/' + todo.id)}
                style={{
                  margin: '10px',
                  marginLeft: 0
                }}
              >
                Edit
              </Button>
              <Button onClick={() => this.deleteTodo(todo.id)}>Delete</Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Todos);
