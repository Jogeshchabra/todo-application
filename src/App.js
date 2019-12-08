import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Todos from './Todos';
import Login from './Login';
import Todo from './Todo';
import Header from './components/Header';
import data from './users.json';

class App extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(data));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path='/todos/:email'>
            <Todos></Todos>
          </Route>
          <Route path='/edit/:id'>
            <Todo></Todo>
          </Route>
          <Route path='/'>
            <Login></Login>
          </Route>
          <Route path='*'>
            <h1>404 not found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
