
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import peopleDB from '../../../imports/db/peopleDB';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mail: '',
            pwd: '',
            level: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    addGuyBtn = () => {
        if (this.state.name === '') {
            console.error('no name given, user wasn\'t register');
        }
        if (this.state.mail === '') {
            console.error('no mail given, user wasn\'t register');
        }
        Meteor.call('addUser', this.state.name, this.state.mail, this.state.pwd, this.state.level);
        this.setState({
            name: '',
            mail: '',
            pwd: '',
            level: false
        })
        
    }
    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    changeLevel = () => {
        let level = this.state.level;
        this.setState({
            level: !level,
        })
    }
    render () {
        return (
            <div>
                <label className="form_label_name" htmlFor="name">Name</label>
                <input onChange={this.handleChange} name="name" id="name" type="text" value={this.state.name}></input>
                <label className="form_label_name" htmlFor="mail">Mail</label>
                <input onChange={this.handleChange} name="mail" id="mail" type="text" value={this.state.mail}></input>
                <label className="form_label_name" htmlFor="pwd">Password</label>
                <input onChange={this.handleChange} name="pwd" id="pwd" type="text" value={this.state.pwd}></input>
                <label className="form_label_name" htmlFor="level">Teacher</label>
                <input onClick={this.changeLevel} name="level" id="mail" type="checkbox" value={this.state.level}></input>
                <button onClick={this.addGuyBtn}>Just do it !</button>
            </div>
        );
    }
}

export default Form;