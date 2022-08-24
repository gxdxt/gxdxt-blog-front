import { API_HOST } from "../../common"
import { useState, useMemo } from "react"
import Link from "next/link"


const PostListPage = ({ postListData }) => {
    const [logo, setLogo] = useState('gxdxt.png');
    const [theme, setTheme] = useState('🌚')
    const changeColor = e => {
      if (document.querySelector('body').dataset.theme == 'light') {
          delete document.querySelector('body').dataset.theme
          setLogo('gxdxt.png');
          setTheme('🌚')
      } else {
          document.querySelector('body').dataset.theme = 'light' 
          setLogo('gxdxt_light.png');
          setTheme('🌝')
      }
  }
    const [tagList, setTagList] = useState([]);
    const [tagCntList, setTagCntList] = useState({});
    const [content, setContent] = useState(postListData)
   

    const getAllTags = useMemo(() => {
        postListData.map((post) => (
            post.tags.map((tag) => (
                tagList.push(tag)
            ))
        ))
        console.log(tagList);
        tagCntList['All'] = postListData.length
        tagList.map((tag) => (
            !tagCntList[tag]
            ? tagCntList[tag] = 1
            : tagCntList[tag] += 1
        ))
        console.log(tagCntList)
    }, [])

    const searchTag = async param =>  {
        console.log(param);
        const res = await fetch(`${API_HOST}/posts?tag=`+param);
        const tagListData = await res.json();
        console.log('searchTag', tagListData);
        if (tagListData.length === 1){}
        else{
        (tagListData.sort( (a, b) => {
            if (a.createTime < b.createTime) return 1;
            if (a.createTime > b.createTime) return -1;
        }))}
        setContent(tagListData);
    }
    const Header = () => {
        return (
            <div className = "header">
                <div className = "header-logo-div">
                <img className = "header-logo" src={logo} onClick = {() => {
                  window.location.href = "/"
                }}></img>
                <a className="theme-btn" onClick={changeColor}>{theme}</a> 
                </div>          
            </div>
        )
    }
    return  (
        <main>
            <title>방명록</title>
            <Header></Header>
            <div className='post-title'>
                <div className='post-div'>
                    <button className='post-btn' onClick = {() => {
                    window.location.href = "/posts/add"
                    }}>post</button>         
                </div>
                <div>
                    {
                    tagList.length === 0
                    ? (<div>tag doesn't exist</div>)
                    : (
                        <div>
                            <ul className='tag-ul'>
                                {
                                Object.entries(tagCntList).map(
                                    (tag, idx) => (
                                        <li key={idx} className="tagAll-li">
                                            <span onClick={
                                            () => searchTag(tag[0])
                                        }>{tag[0]}</span> <span className="tag-cnt">{tag[1]}</span>
                                        </li>       
                                    )
                                )
                                }
                            </ul>
                        </div>
                    )
                    }
                </div>
            </div>
            {
                content.length === 0 
                ?   (<div>data is empty</div>)
                :   (
                    <div>
                        <ul className='post-ul'>
                            {
                                content.map(
                                    (postData) => (
                                        <li key = {postData.id} className = 'post-li'>
                                            <Link href={`/posts/${postData.id}`} >
                                                <a>
                                                    {postData.title}
                                                </a>
                                            </Link>
                                            <div className="tag-div">
                                                {
                                                        postData.tags.map((tag,index)=> (
                                                        <span key={index} className="tag-li">
                                                            #{tag}
                                                        </span>
                                                        ))
                                                }
                                            </div>
                                            <div className="post-timestamp">
                                                {postData.createTime.slice(0,10)}
                                            </div>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    )
            }
        </main>
    )
}

export const getServerSideProps = async () => {
    
    const res = await fetch(`${API_HOST}/posts`);
    const postListData = await res.json();
    postListData.sort( (a, b) => {
        if (a.createTime < b.createTime) return 1;
        if (a.createTime > b.createTime) return -1;
    })
    
    return {
        props: {
            postListData
        }
    }
}

export default PostListPage