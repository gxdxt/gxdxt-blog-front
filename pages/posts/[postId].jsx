// detail page
import { useRouter } from "next/router"
import { API_HOST } from "../../common";
import { marked } from "marked";

const PostDetailPage = ({postData}) => {
    const Header = () => {
        return (
            <div className = "header">
                <div className = "header-logo-div">
                    <img className = "header-logo" src="../gxdxt.png" onClick = {() => {
                      window.location.href = "/"
                    }}></img>
                </div>          
            </div>
        )
    }
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
        <>
        <Header></Header>
        <article id = {id}>
        <title>gxdxt</title>
        <div className="post-title-div">
            <h1 className="post-title">{title}</h1>
        </div>
            <div className = "SectionDiv">
                <section className = "post-section" dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
            </div>
            <div className="post-footer">
                <div className="post-back-div">
                    <a className="post-back-anchor" onClick = {() => {
                        window.location.href = "/posts"
                    }}>back</a>
                </div>
                <div className="post-delete-div">
                    <a className="post-delete-anchor" onClick = {() => {
                        window.location.href = "/posts/edit?postId="+id
                    }}>edit</a>
                </div>
                <div className="post-delete-div">
                    <a className="post-delete-anchor" onClick = {
                        handleDelete
                    }>delete</a>
                </div>
            </div>
        </article>
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

export default PostDetailPage