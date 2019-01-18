import peopleDB from '../../../imports/db/peopleDB';
import React, { Component } from 'react';
// import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import { Session } from 'meteor/session';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: '',
        };
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    login = () => {
        if (this.state.name === '' || this.state.pwd === '') {
            console.error('Name or password is empty');
        }
        else {
            Meteor.call('login', this.state.name, this.state.pwd, (error, result) => {
                if (error) {
                    console.error(error.reason);
                    this.setState({
                        name: '',
                        pwd: ''
                    })
                }
                else {
                    console.debug(result);
                    Session.set({
                        loggedUserID: result.id,
                        loggedUserIsATeacher: result.level
                    })
                    this.props.history.push('/');
                }
            })
        }
    }
    render() {
        return (
            <div>
                <input onChange={this.handleChange} name='name' value={this.state.name}></input>
                <input onChange={this.handleChange} name='pwd' value={this.state.pwd}></input>
                <button onClick={this.login}>login</button>            
            </div>
        );
    }
}
export default Login;