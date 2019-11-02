import React,{useState, useEffect} from 'react';
import axios from 'axios';

const PostForm = ({addPost, editingPost},props) => {
    const [loading, setLoading]=useState(false)
    const [errors, setErrors]=useState({})
    const [post, setPost]=useState({
        title: '',
        body: '',
    })

    function validateForm(){
        const tempErrors = {};
        if(post.title.trim()=== ''){
            tempErrors.title= 'title must not be empty'
        }
        if(post.body.trim()=== ''){
            tempErrors.body= 'body must not be empty'
        }
        if(Object.keys(tempErrors).length > 0){
            setErrors(tempErrors)
            return(false)
        }
        return true
    }

    useEffect(()=> {
        setPost(editingPost)
    },[editingPost])




    const onChange= (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)

        ///validate the form 
        if(!validateForm()){
            setLoading(false)
            return 
        }
        
        if(post.id){
            axios
            .put(`/post/${post.id}`,post)
            .then(res=> {
                console.log(res.data)
                addPost(res.data)
                setPost({
                    title:"",
                    body: ""
                })
                setLoading(false)
            })
            .catch(err=> console.log(err))

        }else{
            axios
            .post('/post', post)
            .then(res=> {
                console.log(res.data)
                addPost(res.data)
                setPost({
                    title:"",
                    body: ""
                })
                setLoading(false)
            })
            .catch(err=> console.log(err))
        }
    }



    return (
        <>
         {!loading ? (
             <form className="push-in" onSubmit={onSubmit}>
                 <div className="input-field">
                     <label htmlFor="title">Title</label>
                     <input 
                        type='text'
                        name='title'
                        value={post.title}
                        onChange={onChange}
                        className={errors.title && 'invalid'}
                     />
                     <span className="helper-text">{errors.title}</span>
                    </div>
                    <div className="input-field">
                      <label htmlFor="body">Body</label> 
                     <input 
                        type='text'
                        name='body'
                        value={post.body}
                        onChange={onChange}
                        className={errors.body && 'invalid'}
                     />
                       <span className="helper-text">{errors.body}</span>
                 </div>
                 <button type="submit" className="waves-effect waves-light btn">{post.id? 'Update':'Add'}</button>
             </form>
         ):(
             <div className="progress">
                 <div className="indeterminate"></div>
             </div>
         )}   
        </>
    );
}

export default PostForm;
