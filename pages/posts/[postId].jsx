// detail page
import { useRouter } from "next/router"
import { API_HOST } from "../../common";
import { marked } from "marked";
import { useState } from "react";

const PostDetailPage = ({postData}) => {


    const Header = () => {
        return (
            <div className = "header">
                <div className = "header-logo-div">
                    <img className = "header-logo" src="../gxdxt.png" onClick = {() => {
                      window.location.href = "/"
                    }}></img>
                </div>          
            </div>
        )
    }

    const Footer = () => {
        return (
            <div className = "footer">
                <div className = "footer-logo-div">

                </div>
            </div>
        )
    }
    
    const {id, title, content, reply} = postData;
    const router = useRouter();
    const handleDelete = async e => {
        if (confirm('do you really want to delete this post?')) {
            e.preventDefault();
            const result = await fetch(`${API_HOST}/posts?postId=`+id, {
                method: 'DELETE',
            })
            alert('This Post is deleted!');
            router.push('/posts');
        } else {
            alert('??');
        }
        
    }
    const [comment, setComment] = useState('');

    const handleComment = e => {
        setComment(e.target.value);
        console.log(comment);
    }

    const commentSubmitHandler = async e => {
        e.preventDefault();
        if (comment.length != 0) {
            const result = await fetch(`${API_HOST}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: id,
                    comment: comment,
                    createdAt: new Date(),
                })
            })
        }
        alert('This comment is published');
        router.push('/posts/'+id)
    }

    return (
        <>
        <Header></Header>
        <article id = {id}>
        <title>gxdxt</title>
        <div className="post-title-div">
            <h1 className="post-title">{title}</h1>
        </div>
        <div className="post-tool">
            <a onClick = {() => {
                window.location.href = "/posts"
            }}>back</a>
            <a onClick = {() => {
                window.location.href = "/posts/edit?postId="+id
            }}>edit</a>
            <a onClick = {
                handleDelete
            }>delete</a>
        </div>
        <div className = "SectionDiv">
            <section className = "post-section" dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
        </div>
        </article>
        
        <div className = "ReplyDiv">
            <div className = "reply-view-div">
{
                reply.length === 0 
                ?   (<div>reply is empty</div>)
                :   (
                    <div>
                        <ul className='reply-ul'>
                            {
                                reply.map(
                                    (reply) => (
                                        <li key = {reply.comment} className = 'reply-li'>
                                                <a>
                                                    {reply.comment}
                                                </a>
                                                <span>{reply.createdAt}</span>
                                                
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    )
        }
            </div>
            <form onSubmit={commentSubmitHandler}>
                <input placeholder="comment" type = "text" id = "comment" value = {comment} onChange={handleComment}/>
                <button type="submit">comment</button>
            </form>
        </div>
        <Footer></Footer>
        </>
    )
}

// getSSR
export const getServerSideProps = async (context) => {
    const {postId} = context.query; 
    const response = await fetch(`${API_HOST}/posts?postId=${postId}`)
    const postData = await response.json();


    return {
        props: {
            postData
        }
    }
}

export default PostDetailPage