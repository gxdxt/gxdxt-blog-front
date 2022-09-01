// detail page
import { useRouter } from "next/router"
import { API_HOST } from "../../common";
import { marked } from "marked";
import { useState, useEffect } from "react";

const LearnDetailPage = ({learnData}) => {
    const [logo, setLogo] = useState('gxdxt.png');
    const [theme, setTheme] = useState('https://cdn-icons-png.flaticon.com/512/6559/6559240.png')
    const changeColor = e => {
        if (document.querySelector('body').dataset.theme === 'light') {
            delete document.querySelector('body').dataset.theme
            setLogo('gxdxt.png');
            setTheme('https://cdn-icons-png.flaticon.com/512/6559/6559240.png');
            window.localStorage.setItem('theme', JSON.stringify('dark'));
        } else {
            document.querySelector('body').dataset.theme = 'light' 
            setLogo('gxdxt_light.png');
            setTheme('https://cdn-icons-png.flaticon.com/512/7649/7649635.png');
            window.localStorage.setItem('theme', JSON.stringify('light'));
        }
      }
    useEffect(() => {
        if (window.localStorage.getItem('theme') == "\"light\"") {
            console.log('light 모드로 진입');
            document.querySelector('body').dataset.theme = 'light'
            setLogo('gxdxt_light.png');
            setTheme('https://cdn-icons-png.flaticon.com/512/7649/7649635.png');
        } else {
            console.log('dark 모드로 진입');  
            delete document.querySelector('body').dataset.theme
            setLogo('gxdxt.png');
            setTheme('https://cdn-icons-png.flaticon.com/512/6559/6559240.png');
        }
    
      }, []);
      const Header = () => {
      
        return (
            <div className = "header">
                <div className = "header-logo-div">
                    <img className = "header-logo" src={`../${logo}`} onClick = {() => {
                      window.location.href = "/"
                    }}></img>
                </div>
                <div className='post-div'>
                      <button className='post-btn' onClick = {() => {
                      window.location.href = "/learn/add"
                      }}>post</button>         
              </div>
                <div className="theme-btn-div">
                  <a className="theme-btn" onClick={changeColor}><img src={theme} className="theme-btn-icon"></img></a>
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
    
    const {id, title, content, reply, tags} = learnData;
    const router = useRouter();
    const handleDelete = async e => {
        if (confirm('do you really want to delete this post?')) {
            e.preventDefault();
            const result = await fetch(`${API_HOST}/learn?learnId=`+id, {
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
    console.log('just before', tags);
    const Reply = () => {
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

    const Tag = () => {
        console.log('tag data rendering');
        const tagList = tags
        console.log('??',tagList);
        return (
            <ul className = 'tag-ul'>
                {
                    tagList.map((tag) => (
                        <li key={tag} className='tag-li'>
                            {tag}
                        </li>
                    ))
                }
            </ul>
        )
    }


    
    

    return (
        <>
        <Header></Header>
        <article id = {id}>
        <title>gxdxt</title>
        <div className="post-title-div">
            <h1 className="post-title">{title}</h1>
        </div>
        <div>
            {
                tags.length === 0
                ? (<div></div>)
                : (
                        <Tag></Tag>
                )
            }
        </div>
        <div className="post-tool">
            <a onClick = {() => {
                window.location.href = "/learn"
            }}>back</a>
            <a onClick = {() => {
                window.location.href = "/learn/edit?learnId="+id
            }}>edit</a>
            <a onClick = {
                handleDelete
            }>delete</a>
        </div>
        <div className = "section-div">
            <section className = "post-section" dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
        </div>
        </article>
        
        <div className = "reply-div">

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
    const {learnId} = context.query; 
    const response = await fetch(`${API_HOST}/learn?learnId=${learnId}`)
    const learnData = await response.json();
    console.log(learnData);
    learnData.reply = learnData.reply.reverse(); 
    return {
        props: {
            learnData,
        }
    }
}

export default LearnDetailPage