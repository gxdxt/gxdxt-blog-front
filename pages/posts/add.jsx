import { useState, useRef } from "react";
import { API_HOST } from "../../common";
import { useRouter } from "next/router";
import { marked } from "marked";
import styled from "@emotion/styled";

const PostAddPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const titleInput = useRef();
    const contentInput = useRef();

    const handleTitle = e => {
        setTitle(e.target.value);
    }

    const handleContent = e => {
        var tmp = e.target.value;
        tmp = tmp.replace(/(?:\r\n|\r|\n)/g, '<br />');
        setContent(tmp);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if ((title.length != 0) && (content.length != 0)) {
            const result = await fetch(`${API_HOST}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    createTime : new Date(),
                    reply: Array(),
                })
            })
            alert('This Post is published!');
            router.push('/posts');   

        } else {

            if (title.length == 0) {
                console.log(content);
                alert('Title is missing');
            }

            if (content.length == 0) {
                console.log('the content is empty!');
                alert('the content is obligatory');
            }
        }
    }
    

    return (
        <>
        <title>새 글 작성</title>
        <form onSubmit={handleSubmit}>
            <div className="addContent">
                <Container>
                    <div>
                    <div className="post-publish-title">
                        <input ref = {titleInput} placeholder="title" type = "text" id = "title" value = {title} onChange={handleTitle}/>
                    </div>
                    <div className = "post-publish-content">
                        <textarea ref = {contentInput} placeholder="Write a story" id = "content" onChange={handleContent} defaultValue={content} />
                    </div>
                    </div>
                    <div className="post-display-div">
                        <div className="post-display-div-title" dangerouslySetInnerHTML={{__html: marked.parse('# '+title)}} />
                        <div className="post-display-div-content" dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
                    </div>
                </Container>
            </div>
            <div className="post-footer">
                <div className="post-back-div">
                    <a className="post-back-anchor" onClick = {() => {
                            window.location.href = "/posts"
                    }}>back</a>
                </div>
                <div className="post-publish-div">
                    <button className="post-publish-btn" type="submit">publish</button>
                </div>
            </div>
        </form>
        </>
    )
}

export default PostAddPage;

const Container = styled.div`
    display: grid;
    margin: 10px;
    grid-template-columns: 50% 50%;
    height: 100vh
`