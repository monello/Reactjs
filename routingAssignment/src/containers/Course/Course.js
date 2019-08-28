import React, { Component } from 'react';

class Course extends Component {
    state = {
        course_id: null
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate");
        this.loadData();
    }

    loadData = () => {
        if ( this.props.match.params.id ) {
            if (!this.state.course_id || (this.state.course_id && this.state.course_id !== +this.props.match.params.id)) {
                this.setState({
                    course_id: +this.props.match.params.id
                });
            }
        }
    }

    render () {
        return (
            <div>
                <h1>_COURSE_TITLE_</h1>
                <p>You selected the Course with ID: {this.state.course_id}</p>
            </div>
        );
    }
}

export default Course;