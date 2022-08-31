import { useState, useEffect } from "react";
import { API_HOST } from "../../common";
import { useRouter } from "next/router";
import { marked } from "marked";
import styled from "@emotion/styled";

const LearnEditPage = ({learnData}) => {
    const id = learnData.id;

    const [title, setTitle] = useState(learnData.title);
    const [tags, setTags] = useState(learnData.tags);
    const [tag, setTag] = useState('');
    const [content, setContent] = useState(learnData.content);
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


    const handleTitle = e => {
        setTitle(e.target.value);
    }

    const handleTag = e => {
        setTag(e.target.value);
    }

    const handleContent = e => {
        setContent(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await fetch(`${API_HOST}/learn?learnId=`+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                tags,
                content,
            })
        })
        alert('This Post is edited!');
        router.push('/learn/'+id);
    }
    const storeTag = e => {
        const filterTag = tag.slice(0,tag.length-1)
        if (!tags.includes(filterTag)) {
            setTags(prev => (
                [...prev, filterTag]
            ))    
        };
        setTag('');
    }

    const TagDisplay = () => {
        console.log('tags', tags);
        console.log('여기 안들어와?');
        return (
            tags.map((tag) => (
                <span key={tag} className="post-publish-tag">
                    {tag}
                    <span onClick={()=>{
                        console.log(tags.indexOf(tag));
                        const filtered = tags.filter(item=> item != tag)
                        console.log('filtered', filtered);
                        setTags(filtered);
                    }} className="tag-remove-btn">x</span>
                </span>
            ))
        )
    }

    return (
        <>
        <title>수정하기</title>
        <form onSubmit={handleSubmit}>
            <div className="addContent">
                <Container>
                    <div>
                    <div className="post-publish-title">
                        <input placeholder="title" type = "text" id = "title" value = {title} onChange={handleTitle}/>
                    </div>
                    <div>
                        <span className="post-div-tag">
                            {
                                tags.length === 0
                                ? (<div></div>)
                                : (
                                <TagDisplay></TagDisplay>  
                                )}
                        <textarea placeholder="tag" type = "text" id = "tag" value = {tag} onChange={handleTag} onKeyUp={ (e) => {
                            console.log('onkeypress', e.key);
                            if (e.key == 'Enter' || e.key == ',') {
                                storeTag()
                            }
                        }} onFocus={()=>{
                            console.log('focus!');
                        }} autoComplete="off"></textarea>
                        </span>
                        
                    </div>
                    <div className = "post-publish-content">
                        <textarea placeholder="Write a story" id = "content" onChange={handleContent} defaultValue={content} />
                    </div>
                    </div>
                    <div className="post-display-div">
                        <br></br>
                        <div className="post-display-div-title" dangerouslySetInnerHTML={{__html: marked.parse('# '+title)}} />
                        <br></br>
                        <div className="post-display-div-content" dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
                    </div>
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
    const {learnId} = context.query; 
    const response = await fetch(`${API_HOST}/learn?learnId=${learnId}`)
    const learnData = await response.json();

    return {
        props: {
            learnData
        }
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    height: 100vh;
    width: 100%;
`

export default LearnEditPage;