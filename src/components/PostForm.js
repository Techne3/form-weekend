import React,{useState} from 'react';

const PostForm = () => {
    const [loading, setLoading]=useState(false)
    const [post, setPost]=useState({
        title: '',
        body: '',
    })

    const onChange= (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    return (
        <>
         {!loading ? (
             <form className="push-in">
                 <div className="input-field">
                     <label htmlFor="title">Title</label>
                     <input 
                        name='tile'
                        value={post.title}
                        onChange={onChange}
                        className='validate'
                     />
                     <label htmlFor="body">Body</label>
                     <input 
                        name='body'
                        value={post.body}
                        onChange={onChange}
                        className='validate'
                     />
                 </div>
             </form>
         ):(
             <div className="progress">
                 <div className="indetermine"></div>
             </div>
         )}   
        </>
    );
}

export default PostForm;
