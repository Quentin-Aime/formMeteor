import React from 'react';
import Form from '../Form/form.jsx';
import List from '../List/List.jsx';
import {Link} from 'react-router-dom';
import {Session} from 'meteor/session';

const Home = () => (
    <div>
        <Link to="/login"><button>Login</button></Link>
        <Form></Form>
        <List></List>

        {Session.get('loggedUserIsATeacher') === true && (
            <div>
                <Link to ="homework"><button>Create exercise</button></Link>
                <Link to ="createGrade"><button>Put a grade</button></Link>
            </div>
        )}
    </div>
);

export default Home;