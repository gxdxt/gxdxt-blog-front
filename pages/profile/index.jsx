import { API_HOST } from "../../common"
import { useState, useEffect } from "react"
import { marked } from "marked";


const ProfilePage = ({ profileData }) => {
    const [logo, setLogo] = useState('gxdxt.png');
    const [theme, setTheme] = useState('🌚')
    const changeColor = e => {
        if (document.querySelector('body').dataset.theme === 'light') {
            delete document.querySelector('body').dataset.theme
            setLogo('gxdxt.png');
            setTheme('🌚');
            window.localStorage.setItem('theme', JSON.stringify('dark'));
        } else {
            document.querySelector('body').dataset.theme = 'light' 
            setLogo('gxdxt_light.png');
            setTheme('🌝');
            window.localStorage.setItem('theme', JSON.stringify('light'));
        }
    }
      useEffect(() => {
        if (window.localStorage.getItem('theme') == "\"light\"") {
            console.log('light 모드로 진입');
            document.querySelector('body').dataset.theme = 'light'
            setLogo('gxdxt_light.png');
            setTheme('🌝');
        } else {
            console.log('dark 모드로 진입');  
            delete document.querySelector('body').dataset.theme
            setLogo('gxdxt.png');
            setTheme('🌚');
        }
      
      }, []);
    const profileContent = profileData[0].content;
    const Header = () => {
        return (
            <div className = "header">
                <div className = "header-logo-div">
                <img className = "header-logo" src={logo} onClick = {() => {
                  window.location.href = "/"
                }}></img>
                <div className="theme-div">
                 <a className="theme-btn" onClick={changeColor}>{theme}</a> 
                 </div>
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