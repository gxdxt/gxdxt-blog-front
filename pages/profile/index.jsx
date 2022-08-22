import { API_HOST } from "../../common"
import { useState, useMemo } from "react"
import { marked } from "marked";


const ProfilePage = ({ profileData }) => {
    console.log(profileData);
    const profileContent = profileData[0].content;

    console.log(profileContent);
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
            <title>Profile</title>
            <Header></Header>
            <div className='profile'>
                <div className="post-display-div-content" dangerouslySetInnerHTML={{__html: marked.parse(profileContent)}} /> 
            </div>

        </main>
    )
}

export const getServerSideProps = async () => {
    const res = await fetch(`${API_HOST}/profile`);
    const profileData = await res.json();
    console.log(profileData);
    
    return {
        props: {
            profileData
        }
    }
}

export default ProfilePage