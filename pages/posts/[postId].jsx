// detail page
import { useRouter } from "next/router"

const PostDetailPage = ({postId}) => {

    console.log(postId);

    return (
        <div>
            <h1>Detail Page</h1>
            <p>Bonjour !</p>
        </div>
    )
}

// getSSR
export const getServerSideProps = async (context) => {
    const {postId} = context.query;

    return {
        props: {
            postId
        }
    }
}

export default PostDetailPage