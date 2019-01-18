import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Edit from './components/Edit/Edit.jsx';
import Login from './components/Login/Login.jsx';
import Homework from './components/Homework/Homework.jsx';
import CreateGrade from './components/CreateGrade/CreateGrade.jsx';

const App = () => (
    <div>
        <Router>
            <div>
                <Route exact path='/' component={Home} />
                <Route exact path='/edit/:uid' component={Edit} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/homework' component={Homework} />
                <Route exact path='/createGrade' component={CreateGrade} />
            </div>
        </Router>
    </div>
);

export default App;


// TODO passer par meteor.call (front)
// et passer par meteor.method (back)
