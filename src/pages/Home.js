import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm';

const Home = (props) => {
    const [ posts, setPosts ] = useState([]);
    const [limit, setLimit]=useState(5)

    const [editingPost, setEditingPost]= useState({
        title: '',
        body: '',
        id: null,
    })

	useEffect(() => {
		axios
			.get('/posts')
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
			})
			.catch((err) => console.log(err));
    }, []);

    
    const editPost = (whatever) => {
        setEditingPost(whatever)
    }

    const deletePost = (id) => {
       axios.delete(`/post/${id}`)
       .then(()=>{
           const postUpdated = posts.filter(p =>  p.id !== id)
           setPosts(postUpdated)
       })
    }

    const addPost=(post)=>{
        if(post.find(p => p.id === post.id)){
            const index = post.findIndex(p => p.id === post.id)
            const postsUpdated = [...posts]
            postsUpdated.splice(index, 1,post)
            setPosts(postsUpdated)
        }else{
            const postsUpdated=[post, ...posts];
            setPosts(postsUpdated)
        }
    }


    const getNumberOfPost =()=> {
        axios.get(`/posts/${limit}`)
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
    }



	return (
		<div>
            <div className="row">
                <div className="col s6">
                    <PostForm addPost={addPost} editingPost={editingPost} />
                </div>
                <div className="col s3 push-in">
                    <p>Limit number of post</p>
                    <input type="number" 
                        value={limit}
                        onChange={e => setLimit(e.target.value)}
                    />
                    <button onClick={getNumberOfPost} className="waves-effect waves-light btn "> Set</button>
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
