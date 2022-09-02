import { useState, useRef, useEffect } from "react";
import { API_HOST } from "../../common";
import { useRouter } from "next/router";
import { marked } from "marked";
import styled from "@emotion/styled";

const LearnAddPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const router = useRouter();

    const titleInput = useRef();
    const contentInput = useRef();

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

    const handleContent = e => {
        var tmp = e.target.value;
        tmp = tmp.replace(/(?:\r\n|\r|\n)/g, '<br />\n');
        setContent(tmp);
    }

    const handleTag = e => {
        setTag(e.target.value);
    }

    const storeTagByComma = e => {
        const filterTag = tag.slice(0,tag.length-1)
        if (!tags.includes(filterTag)) {
            setTags(prev => (
                [...prev, filterTag]
            ))    
        };
        setTag('');
    }

    const storeTagByEnter = e => {
        tag = tag.trim();
        if (!tags.includes(tag) && tag != '\n') {

            setTags(prev => (
                [...prev, tag]
            ))
        };
        setTag('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if ((title.length != 0) && (content.length != 0)) {
            const result = await fetch(`${API_HOST}/learn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    tags: tags,
                    content,
                    reply : new Array(),
                    createdAt : new Date(),
                })
            })
            alert('This Post is published!');
            router.push('/learn');   

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

    const TagDisplay = () => {
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
    
    const TagHoverAnnounce = () => {
        console.log('');
        return (
            <div>쉼표를 입력하여 태그를 등록할 수 있습니다.</div>
        )
    }
    

    return (
        <>
        <title>새 글 작성</title>
        <form onSubmit={handleSubmit}>
            <div className="addContent">
                <Container>
                    <div>
                    <div className="post-publish-title">
                        <textarea ref = {titleInput} placeholder="title" type = "text" id = "title" value = {title} onChange={handleTitle}/>
                    </div>
                    <div className="post-div-tag">
                        <span className="post-span-tag">
                            {
                                tags.length === 0
                                ? (<div></div>)
                                : (
                                <TagDisplay></TagDisplay>  
                                )}
                        </span>
                        <textarea placeholder="tag" type = "text" id = "tag" value = {tag} onChange={handleTag} onKeyUp={ (e) => {
                            console.log('onkeypress', e.key);
                            if (e.key == 'Enter') {
                                storeTagByEnter()
                            } else if (e.key == ',') {
                                storeTagByComma()
                            }
                        }} onFocus={()=>{
                            console.log('focus!');
                        }} autoComplete="off"></textarea>
                    </div>
                    <div className = "post-publish-content">
                        <textarea ref = {contentInput} placeholder="Write a story" id = "content" onChange={handleContent} defaultValue={content} />
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

export default LearnAddPage;

const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    height: 100vh
`