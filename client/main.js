import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from './App.jsx';


Meteor.startup(() => {
    Meteor.subscribe('peopleDB');
    render(<App />,  document.getElementById('react-target'));
});
