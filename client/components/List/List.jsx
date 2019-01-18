import peopleDB from '../../../imports/db/peopleDB';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';
import {Session} from 'meteor/session';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mail: '',
        };
    }
    delete = (id, e) => {
        e.preventDefault();
        Meteor.call('deleteUser', Session.get('loggedUserID'), id, (error, result) => {
            if (error) {
                console.error(error.reason);
            }
        })
        if (id === Session.get('loggedUserID')) {
            Session.set('loggedUserID', undefined)
            Session.set('loggedUserIsATeacher', undefined)
        }
    }
    isDisable() {
        if (Session.get('loggedUserID') === undefined){
            return true;
        }
        return false;
    }
    render() {
        const { users } = this.props;
        console.debug(users);
        const type = {false: 'élève', true: 'prof'}
        console.debug(Session.get('loggedUserID'));
        return (
            <div>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                                <Link to={'/edit/' + user._id}><button disabled={this.isDisable()}>Editer</button></Link>
                            <button disabled={this.isDisable()} onClick={(e) => this.delete(user._id, e)}>X</button>
                            {user.name} {user.mail} type: {type[user.isATeacher]}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default withTracker(() => {
    return {
        users: peopleDB.find().fetch()
    };
})(List);