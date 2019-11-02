import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm';

const Home = (props) => {
	const [ posts, setPosts ] = useState([]);

	useEffect(() => {
		axios
			.get('/posts')
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
			})
			.catch((err) => console.log(err));
    }, []);
    
    const editPost = (post) => {
        console.log(post)
    }

    const deletePost = (id) => {
       axios.delete(`/post/${id}`)
       .then(()=>{
           const postUpdated = posts.filter(p =>  p.id !== id)
           setPosts(postUpdated)
       })
    }

    const addPost=(post)=>{
        const postUpdated=[post, ...posts];
        setPosts(postUpdated)
    }


	return (
		<div>
            <div className="row">
                <div className="col s6">
                    <PostForm addPost={addPost} />
                </div>
            </div>
			<div className="row">
				{posts.map((post) => (
					<div className="col s6">
						<div className="card">
							<div className="card-content">
								<div className="card-title">{post.title}</div>
								<p className="timestamp">{post.createdAt}</p>
								<p>{post.body}</p>
							</div>
                            <div className="card-action">
                                <a href="#" onClick={editPost.bind(null, post)} >Edit</a>
                                <a href="#" onClick={deletePost.bind(null, post.id)}className="delete-btn">Delete</a>
                            </div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
