import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from './App.jsx';


Meteor.startup(() => {
    Meteor.subscribe('peopleDB');
    Meteor.subscribe('exerciseDB');
    render(<App />,  document.getElementById('react-target'));
});
