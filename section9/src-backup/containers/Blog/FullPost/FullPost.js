import React, {Component} from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // In order to avoid an infinite loop, we need to ensure taht we only update the component state if we have a NEW
        // post to load. if we don't do this check, we will update the state regardless of what post we received.
        // EAch time we update the state the componentDidUpdate() function (the function we are now in) will be called, and
        // this function updates the state, which will call this hook again... infintely.
        // By doing some checks like below we ensure that we only update the state if it is a post id that is not currently
        // the state.loadedPost.id (ie. a NEW post) we update the state which does 2 things:
        // - updates he UI to display the new post and
        // - re-calls the componentDidUpdate() hook again, but this time the id will be the same, so it wont repeat
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('/posts/' + this.props.id)
                    .then(response => {
                        console.log(response);
                        this.setState({loadedPost: response.data});
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response);
                // this.setState({loadedPost: null});
            });
    }

    render() {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;