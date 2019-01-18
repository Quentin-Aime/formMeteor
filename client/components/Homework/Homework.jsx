import peopleDB from '../../../imports/db/peopleDB';
import React, { Component } from 'react';
// import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import { Session } from 'meteor/session';

class HomeWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            explanation: '',
        };
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    submit = () => {
        if (this.state.title === '' || this.state.explanation === '') {
            console.error('Missing fields for exercise');
        }
        else {
            Meteor.call('createExercise', this.state.title, this.state.explanation, (error, result) => {
                if (error) {
                    console.error(error.reason);
                    this.setState({
                        title: '',
                        explanation: ''
                    })
                }
                else {
                    this.props.history.push('/');
                }
            })
        }
    }
    render() {
        return (
            <div>
                <label>Intitulé</label>
                <input onChange={this.handleChange} name='title' value={this.state.title}></input>
                <label>Explication</label>
                <input onChange={this.handleChange} name='explanation' value={this.state.explanation} type="textarea"></input>
                <button onClick={this.submit}>submit</button>      
            </div>
        );
    }
}
export default HomeWork;