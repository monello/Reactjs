import React, { Component } from 'react';

class Course extends Component {
    state = {
        course_id: null,
        course_title: null
    }

    componentDidMount() {
        console.log("componentDidMount - props: ", this.props);
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate - props: ", this.props);
        this.loadData();
    }

    loadData = () => {
        if ( this.props.match.params.id ) {
            if (!this.state.course_id || (this.state.course_id && this.state.course_id !== +this.props.match.params.id)) {
                const query = new URLSearchParams(this.props.location.search);
                this.setState({
                    course_id: +this.props.match.params.id,
                    course_title: query.get('title')
                });
            }
        }
    }

    render () {
        return (
            <div>
                <h1>{this.state.course_title}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;