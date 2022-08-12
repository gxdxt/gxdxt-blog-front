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
        e.preventDefault();
        setComment(e.target.value);
        console.log(comment);
    }
    console.log()
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
                    comment,
                    createdAt: new Date(),
                })
            })
        }
        alert('This comment is published');
        router.push('/posts/'+id);
        setComment('');
    }

    const countTimeDiff = (time) => {
        const start = new Date(time);
        const end = new Date();

        const diff = (end - start);

        const times = [
            { time: "분", milliSeconds: 1000 * 60 },
            { time: "시간", milliSeconds: 1000 * 60 * 60 },
            { time: "일", milliSeconds: 1000 * 60 * 60 * 24 },
            { time: "개월", milliSeconds: 1000 * 60 * 60 * 24 * 30 },
            { time: "년", milliSeconds: 1000 * 60 * 60 * 24 * 365 },
        ].reverse();

        // 년 단위부터 알맞는 단위 찾기
        for (const value of times) {
            const betweenTime = Math.floor(diff / value.milliSeconds);
            
        // 큰 단위는 0보다 작은 소수점 값이 나옴
            if (betweenTime > 0) {
            return `${betweenTime}${value.time} 전`;
            }
        }
        
        // 모든 단위가 맞지 않을 시
        return "방금 전";
    }
    console.log('rendering outside');
    const Reply = (postData) => {
        console.log('rendering in reply tag');
        return (
            <ul className='reply-ul'>
            {
                reply.map(
                    (reply) => (
                        <li key = {reply.comment} className = 'reply-li'>
                                <a>
                                    {reply.comment}
                                </a>
                                <div className="replyCreatedTime">
                                    {countTimeDiff(reply.createdAt)}
                                </div>
                                
                        </li>
                    )
                )
            }
        </ul>
        )
    };


    
    

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

            <span>{reply.length}개의 댓글</span>
            <div ><br/></div>
            <form onSubmit={commentSubmitHandler}>
                <textarea placeholder="comment" type = "text" id = "commentInput" value = {comment} onChange={handleComment}/>
                <button type="submit" className="reply-post-btn">comment</button>
            </form>
            <div className = "reply-view-div">
{
                reply.length === 0 
                ?   (<div>reply is empty</div>)
                :   (
                    <div>
                        <Reply></Reply>
                    </div>
                    )
        }
            </div>

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
    postData.reply = postData.reply.reverse() 
    return {
        props: {
            postData,
        }
    }
}

export default PostDetailPage