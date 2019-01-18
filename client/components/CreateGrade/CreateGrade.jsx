import peopleDB from '../../../imports/db/peopleDB';
import exerciseDB from "../../../imports/db/exerciseDB";
import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import EnterGrades from './EnterGrades.jsx';

class HomeWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            explanation: '',
            selectedExerciseID: null,
            selectedExerciseGrade: {},
        };
        this.triggerChange = this.triggerChange.bind(this);
    }
    async triggerChange(grade) {
        await this.setState({
            selectedExerciseGrade: grade
        })
        return;
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    selectExercise = (exercise) => {
        console.debug(JSON.parse(JSON.stringify(this.state)));
        console.debug(exercise);
        if (!exercise.grades) {
            exercise.grades = {};
        }
        this.setState({
            selectedExerciseID: exercise._id,
            selectedExerciseGrade: exercise.grades,
        })
    }
    changeGrade = (userId) => (event) => {
        let grade = this.state.selectedExerciseGrade;
        console.debug(grade);
        grade[userId] = event.target.value;
        this.triggerChange(grade);
        this.setState({
            selectedExerciseGrade: grade
        },
        ()=>{console.debug(this.state);})
        window.setTimeout(() => {
            console.debug(this.state);
        }, 500)
    }
    registerGrade = () => {
        console.debug(JSON.parse(JSON.stringify(this.state)));
        console.debug({selectedExerciseID : this.state.selectedExerciseID, selectedExerciseGrade: this.state.selectedExerciseGrade});
        Meteor.call('registerGrade', {selectedExerciseID : this.state.selectedExerciseID, selectedExerciseGrade: this.state.selectedExerciseGrade}, (error, result) => {
            if (error) {
                console.error(error.reason);
            }
            else {
                this.setState({
                    selectedExerciseID: null
                })
            }
        })
    }
    getGrade = (id) => {
        if (this.state.selectedExerciseGrade) {
            return this.state.selectedExerciseGrade[id]
        }
    }
    render() {
        const { exercises } = this.props;
        const { users } = this.props;
        console.debug(exercises);
        return (
            <div>
                <ul>
                    {exercises.map(exercise => (
                        <li key={exercise._id}>
                            <button onClick={() => {this.selectExercise(exercise)}}>{exercise.title}</button>
                            <p>{exercise.explanation}</p>
                        </li>
                    ))}
                </ul>
                { this.state.selectedExerciseID !== null && (
                    <EnterGrades
                        exerciseId={this.state.selectedExerciseID}
                        users={users}
                        changeGrade={this.changeGrade}
                        getGrade={this.getGrade}
                        registerGrade={this.registerGrade}
                    ></EnterGrades>
                )}
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        exercises: exerciseDB.find().fetch(),
        users: peopleDB.find({
            isATeacher: false
        })
    };
})(HomeWork);