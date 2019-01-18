import { Meteor } from 'meteor/meteor';
import peopleDB from "../imports/db/peopleDB";
import exerciseDB from "../imports/db/exerciseDB";

Meteor.startup(() => {
    // code to run on server at startup
    if (peopleDB.find().count() <= 0) {
        peopleDB.insert({
            name: "Maël",
            mail: "truc@gmail.com",
            isATeacher: false,
            password: "Maël",
        });
        peopleDB.insert({
            name: "Alex",
            mail: "machin@hotmail.com",
            isATeacher: false,
            password: "Alex",
        });
    }
});

Meteor.publish('peopleDB', () => {
    return peopleDB.find();
});
Meteor.publish('exerciseDB', () => {
    return exerciseDB.find();
});

Meteor.methods({
    createExercise(title, explanation) {
        exerciseDB.insert({
            title: title,
            explanation: explanation,
            grades: {}
        });
    },
    registerGrade(exercises) {
        console.debug(exercises);
        let exercise = exerciseDB.findOne({
            _id: exercises.selectedExerciseID,
        });
        exerciseDB.update({_id:exercises.selectedExerciseID}, {
            title: exercise.title,
            explanation: exercise.explanation,
            grades: exercises.selectedExerciseGrade
        });
        exercise = exerciseDB.findOne({
            _id: exercises.selectedExerciseID,
        });
        console.debug(exercise);
    },
    addUser(name, mail, pwd, level) {
        peopleDB.insert({
            name: name,
            mail: mail,
            password: pwd,
            isATeacher: level
        });
    },
    deleteUser(loggedUserID, id) {
        if (loggedUserID === undefined) {
            throw new Meteor.Error('Unauthorized', 'You are not logged in');
        }
        let admin = peopleDB.findOne({
            _id: loggedUserID,
        });
        if (admin === undefined || (admin.isATeacher === false && admin._id != id)) {
            throw new Meteor.Error('Unauthorized', 'Either you\'re not a teacher, or you are not that person');
        }
        peopleDB.remove({
            _id: id
        });
        return 'user deleted';
    },
    login(name, pwd) {  
        let user = peopleDB.findOne({
            name: name,
            password: pwd
        });
        console.debug(peopleDB.find().fetch());
        console.debug(name, pwd, user);
        if (user === undefined) {
            throw new Meteor.Error('Credential error', 'Wrong credentials');
        }
        return {id: user._id, level: user.isATeacher};
    },
    editUser(loggedUserID, id, name, mail, password, level) {
        if (loggedUserID === undefined) {
            throw new Meteor.Error('Unauthorized', 'You are not logged in');
        }
        let admin = peopleDB.findOne({
            _id: loggedUserID,
        });
        if (admin === undefined || (admin.isATeacher === false && admin._id != id)) {
            throw new Meteor.Error('Unauthorized', 'Either you\'re not a teacher, or you are not that person');
        }
        peopleDB.update({_id: id}, {
            name: name,
            mail: mail,
            password: password,
            isATeacher: level,
        });
        return 'user edited';
    }
});