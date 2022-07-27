// detail page
import { useRouter } from "next/router"
import { API_HOST } from "../../common";
import { marked } from "marked";

const PostDetailPage = ({postData}) => {
    const {id, title, content} = postData;
    const router = useRouter();
    const handleDelete = async e => {
        if (confirm('do you really want to delete this post?')) {
            e.preventDefault();
            const result = await fetch(`${API_HOST}/posts?postId=`+id, {
                method: 'DELETE',
            })
            alert('This Post is deleted!');
            router.push('/posts');
        } else {
            alert('??');
        }
        
    }

    return (
        <article id = {id}> 
            <h1 className = "postTitle">{title}</h1>
            <div className = "SectionDiv">
            <section className = "postSection" dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
            </div>
            <div className="addFooter">
                <div className="backDiv">
                    <a className="backAnchor" onClick = {() => {
                        window.location.href = "/posts"
                    }}>back</a>
                </div>
                <div>
                    <a className="deleteAnchor" onClick = {handleDelete}>delete</a>
                </div>
            </div>
        </article>
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

export default PostDetailPage