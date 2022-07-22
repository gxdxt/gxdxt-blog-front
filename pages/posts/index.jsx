import { API_HOST } from "../../common"
import Link from "next/link"

const PostListPage = ({ postListData }) => {
    return  (
        <main>
            <h1>universe of gxdxt</h1>
            {
                postListData.length === 0 
                ?   (<div>data is empty</div>)
                :   (
                        <ul>
                            {
                                postListData.map(
                                    (postData) => (
                                        <li key = {postData.id}>
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