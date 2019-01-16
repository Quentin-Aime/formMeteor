import peopleDB from '../../../imports/db/peopleDB';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mail: '',
            setup: true
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
        Meteor.call('editUser', id, this.state.name, this.state.mail, (error, result) => {
            console.debug(result);
        })
        this.props.history.push('/');
    }
    render() {
        const { user } = this.props;
        if (user && this.state.setup === true) {
            this.setState({
                name: user.name,
                mail: user.mail,
                setup: false
            })
        }
        return (
            <div>
                <Link to='/'>Home</Link>
                {user && (
                    <div>
                        <input onChange={this.changing('name')} value={this.state.name}></input>
                        <input onChange={this.changing('mail')} value={this.state.mail}></input>
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