import { API_HOST } from "../../common"
import Link from "next/link"


const PostListPage = ({ postListData }) => {
    return  (
        <main>
            <div className='postTitle'>
                <h1>gxdxt</h1>
                <button className='postBtn' onClick = {() => {
                    window.location.href = "/posts/add"
                }}>post</button>
            </div>
            {
                postListData.length === 0 
                ?   (<div>data is empty</div>)
                :   (
                    <div>
                        <ul className='postUl'>
                            {
                                postListData.map(
                                    (postData) => (
                                        <li key = {postData.id} className = 'postLi'>
                                            <Link href={`/posts/${postData.id}`} >
                                                <a>
                                                    {postData.title}
                                                </a>
                                            </Link>
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

    return {
        props: {
            postListData
        }
    }
}

export default PostListPage