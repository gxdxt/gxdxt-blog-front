import { useState } from "react";
import { API_HOST } from "../../common";
import { useRouter } from "next/router";
import { marked } from "marked";
import styled from "@emotion/styled";

const PostAddPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleTitle = e => {
        setTitle(e.target.value);
    }

    const handleContent = e => {
        setContent(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await fetch(`${API_HOST}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                createTime : new Date()
            })
        })

        alert('This Post is published!');
        router.push('/posts');
    }
    

    return (
        <>
        
        <form onSubmit={handleSubmit}>
            <div className="postTitle">
                <input placeholder="title" type = "text" id = "title" value = {title} onChange={handleTitle}/>
            </div>
            <div className="addContent">
                
                <Container>
                    <textarea placeholder="Write a story" id = "content" cols = "10" rows = "10" onChange={handleContent} defaultValue={content} />
                    <div />
                    <div dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
                </Container>
            </div>
            <div className="addFooter">
                <div className="backDiv">
                    <a className="backAnchor" onClick = {() => {
                            window.location.href = "/posts"
                    }}>back</a>
                </div>
                <div className="publishDiv">
                    <button className="publishBtn" type="submit">publish</button>
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
    grid-template-columns: 45% 10% 45%;
    height: 100vh
`