import { useState, useEffect } from "react";
import { API_HOST } from "../../common";
import { useRouter } from "next/router";
import { marked } from "marked";
import styled from "@emotion/styled";

const ProfileEditPage = ({profileData}) => {
    const [content, setContent] = useState(profileData[0].content);
    const router = useRouter();

    useEffect(() => {
        if (window.localStorage.getItem('theme') == "\"light\"") {
            console.log('light 모드로 진입');
            document.querySelector('body').dataset.theme = 'light'
        } else {
            console.log('dark 모드로 진입');  
            delete document.querySelector('body').dataset.theme
        }
      
      }, []);


    const handleContent = e => {
        setContent(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await fetch(`${API_HOST}/profile?profileId=VIlJwV3M8pk9Qiw9HGHh`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
            })
        })
        alert('This Post is edited!');
        router.push('/profile');
    }

    return (
        <>
        <title>수정하기</title>
        <form onSubmit={handleSubmit}>
            <div className="addContent">
                <Container>
                    <div>
                    <div className = "post-publish-content">
                        <textarea placeholder="Write a story" id = "content" onChange={handleContent} defaultValue={content} />
                    </div>
                    </div>
                    <div className="post-display-div">
                        <div className="post-display-div-content" dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
                    </div>
                </Container>
            </div>
            <div className="post-footer">
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
    const response = await fetch(`${API_HOST}/profile?profileId=VIlJwV3M8pk9Qiw9HGHh`)
    const profileData = await response.json();

    return {
        props: {
            profileData
        }
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    height: 100vh;
    width: 100%;
`


export default ProfileEditPage;