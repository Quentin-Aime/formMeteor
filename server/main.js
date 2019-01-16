import { Meteor } from 'meteor/meteor';
import peopleDB from "../imports/db/peopleDB";

Meteor.startup(() => {
    // code to run on server at startup
    if (peopleDB.find().count() <= 0) {
        peopleDB.insert({
            name: "Maël",
            mail: "truc@gmail.com",
        });
        peopleDB.insert({
            name: "Alex",
            mail: "machin@hotmail.com",
        });
    }
});

Meteor.publish('peopleDB', () => {
    return peopleDB.find();
});

Meteor.methods({
    addUser(name, mail) {
        peopleDB.insert({
            name: name,
            mail: mail
        });
    },
    deleteUser(id) {
        peopleDB.remove({
            _id: id
        });
        return 'user deleted';
    },
    editUser(id, name, mail) {
        peopleDB.update({_id: id}, {
            name: name,
            mail: mail,
        });
        return 'user edited'

    }
});