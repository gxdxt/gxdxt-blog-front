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
                content
            })
        })

        alert('This Post is published!');
        router.push('/posts');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type = "text" id = "title" value = {title} onChange={handleTitle}/>
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <Container>
                    <textarea  id = "content" cols = "30" rows = "10" onChange={handleContent} defaultValue={content} />
                    <div dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
                </Container>
            </div>
            <button>publish</button>
        </form>
    )
}

export default PostAddPage;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh
`