import peopleDB from '../../../imports/db/peopleDB';
import exerciseDB from "../../../imports/db/exerciseDB";
import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


const Grades = ({exerciseId, users, changeGrade, getGrade, registerGrade}) => (
    <div>
        { exerciseId !== null && (
            <div>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <label>{user.name}</label>
                            <input onChange={changeGrade(user._id)} value={getGrade(user._id)}></input>
                        </li>
                    ))}
                </ul>
                <button onClick={() => {registerGrade();}}>Submit grades</button>                    
            </div>
        )}
    </div>
)

Grades.propTypes = {
    exerciseId: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
    changeGrade: PropTypes.func.isRequired,
    getGrade: PropTypes.func.isRequired,
    registerGrade: PropTypes.func.isRequired

}

export default Grades;