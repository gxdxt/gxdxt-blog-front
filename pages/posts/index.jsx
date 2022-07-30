import { API_HOST } from "../../common"
import Link from "next/link"


const PostListPage = ({ postListData }) => {
    const Header = () => {
        return (
            <div className = "header">
                <div className = "header-logo-div">
                <img className = "header-logo" src="gxdxt.png" onClick = {() => {
                  window.location.href = "/"
                }}></img>
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
            </div>
            {
                postListData.length === 0 
                ?   (<div>data is empty</div>)
                :   (
                    <div>
                        <ul className='post-ul'>
                            {
                                postListData.map(
                                    (postData) => (
                                        <li key = {postData.id} className = 'post-li'>
                                            <Link href={`/posts/${postData.id}`} >
                                                <a>
                                                    {postData.title}
                                                </a>
                                            </Link>
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