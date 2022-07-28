import { API_HOST } from "../../common"


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

    const footer = () => {
        return (
            <div>

            </div>
        )
    }


    const firstColor = () => {
        return (
            <div>
            </div>
        )
    }
    return  (
        <main>
            <Header></Header>
            <div style = {{
                margin: 'auto',
                padding: '30px',
            }}>
                color
                <div style = {{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#f37021'
                }}>#f37021</div>
                <div style = {{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#FFFAFA'
                }}>#FFFAFA</div>
                <div style = {{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#181818'
                }}>#181818</div>
                	
            </div>
            <div>
                button
            </div>
        </main>
    )
}

export default PostListPage