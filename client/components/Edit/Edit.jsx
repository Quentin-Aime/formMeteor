import peopleDB from '../../../imports/db/peopleDB';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Link} from 'react-router-dom';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mail: '',
            level: false,
            setup: true,
            adminName:''
        };
    }
    changing = (value) => (event) => {
        if (value === 'name') {
            this.setState({
                name: event.target.value
            })
        }
        else {            
            this.setState({
                mail: event.target.value
            })
        }
    }
    submit = () => {
        let id = this.props.match.params.uid;
        Meteor.call('editUser', Session.get('loggedUserID'), id, this.state.name, this.state.mail, this.state.level, (error, result) => {
            if (error) {
                console.error(error.reason);
                this.props.history.push('/');
            }
            console.debug(result);
        })
        this.props.history.push('/');
    }
    changeLevel = () => {
        let level = this.state.level;
        this.setState({
            level: !level,
        })
    }
    render() {
        const { user } = this.props;
        console.debug(user);
        if (user && this.state.setup === true) {
            this.setState({
                name: user.name,
                mail: user.mail,
                level: user.isATeacher,
                setup: false
            })
        }
        return (
            <div>
                <Link to='/'>Home</Link>
                {user && (
                    <div>
                        <label>Name</label>
                        <input onChange={this.changing('name')} value={this.state.name}></input>
                        <label>Mail</label>
                        <input onChange={this.changing('mail')} value={this.state.mail}></input>
                        <label>Password</label>
                        <input onChange={this.changing('mail')} value={this.state.mail}></input>
                        <label>Teacher</label>
                        <input onClick={this.changeLevel} checked={this.state.level} type="checkBox"></input>
                        <button onClick={this.submit}>Submit</button>
                    </div>
                )}
            </div>
        );
    }
}
export default withTracker(() => {
    const pathname = this.location.pathname.split('/');
    const id = pathname[pathname.length - 1];
    return {
        user: peopleDB.findOne({'_id':id})
    };
})(Edit);