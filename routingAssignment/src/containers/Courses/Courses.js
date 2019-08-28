import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import './Courses.css';
import Course from "../Course/Course";

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    render () {
        let courses = this.state.courses.map( course => {
            return <Link to={'/courses/' + course.id}  key={course.id}><article className="Course">{course.title}</article></Link>;
        });
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {courses}
                </section>
                <Route path="/courses/:id" exact component={Course} />
            </div>
        );
    }
}

export default Courses;