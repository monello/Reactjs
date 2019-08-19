import React, {Component} from 'react';
import { Route } from "react-router-dom";
import axios from "axios";

import Post from '../../../components/Post/Post';
import FullPost from "../FullPost/FullPost";

import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    // This does an Ajax call (HTTP GET request)
    // As it is an Asynchronous request React will continue on to the next line of code so that the Application
    // does not have to freeze and become non-interactive while the data is being fetched, which is a benefit, BUT
    // this also means that the axios.get() function cannot return data into a variable.
    // To get to the return data you have to have a separate process that sits and waits for it until it returns while
    // the rest of the application continues.
    // This is done through JS promises and the axios-function for using this promise (waiting for the returned data)
    // is the "then()" function, which is simply chained to the .get() function
    // The .then() function automatically receives a JSON data object, which you can name anything, but is commonly
    // named "response"
    // This response JSON object must then be passed into a function as a parameter so you can do what you need to with it
    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        )
    }
}

export default Posts;