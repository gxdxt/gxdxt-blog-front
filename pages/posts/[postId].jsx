// detail page
import { useRouter } from "next/router"
import { API_HOST } from "../../common";
import { marked } from "marked";

const PostDetailPage = ({postData}) => {
    const {id, title, content} = postData;
    console.log(postData);

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