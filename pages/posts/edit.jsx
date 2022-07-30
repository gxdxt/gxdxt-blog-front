import { useState } from "react";
import { API_HOST } from "../../common";
import { useRouter } from "next/router";
import { marked } from "marked";
import styled from "@emotion/styled";

const PostEditPage = ({postData}) => {
    const id = postData.id;

    const [title, setTitle] = useState(postData.title);
    const [content, setContent] = useState(postData.content);
    const router = useRouter();

    const handleTitle = e => {
        setTitle(e.target.value);
    }

    const handleContent = e => {
        setContent(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await fetch(`${API_HOST}/posts?postId=`+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
            })
        })
        alert('This Post is edited!');
        router.push('/posts/'+id);
    }
    return (
        <>
        
        <form onSubmit={handleSubmit}>
            <div className="post-publish-title">
                <input placeholder="title" type = "text" id = "title" value = {title} onChange={handleTitle}/>
            </div>
            <div className="addContent">
                
                <Container>
                    <textarea placeholder="Write a story" id = "content" cols = "10" rows = "10" onChange={handleContent} defaultValue={content} />
                    <div />
                    <div dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
                </Container>
            </div>
            <div className="post-footer">
                <div className="post-back-div">
                    <a className="post-back-anchor" onClick = {() => {
                            window.location.href = "/posts/"+id
                    }}>back</a>
                </div>
                <div className="post-edit-div">
                    <button className="post-edit-btn" type="submit">edit</button>
                </div>
            </div>
        </form>
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

const Container = styled.div`
    display: grid;
    margin: 10px;
    grid-template-columns: 45% 10% 45%;
    height: 100vh
`

export default PostEditPage;