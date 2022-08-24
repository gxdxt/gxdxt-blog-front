import { API_HOST } from "../../common"
import { useState, useMemo } from "react"
import { marked } from "marked";


const ProfilePage = ({ profileData }) => {
    const [logo, setLogo] = useState('gxdxt.png');
    const [theme, setTheme] = useState('🌚')
    const changeColor = e => {
      if (document.querySelector('body').dataset.theme == 'light') {
          delete document.querySelector('body').dataset.theme
          setLogo('gxdxt.png');
          setTheme('🌚')
      } else {
          document.querySelector('body').dataset.theme = 'light' 
          setLogo('gxdxt_light.png');
          setTheme('🌝')
      }
  }
    console.log(profileData);
    const profileContent = profileData[0].content;

    console.log(profileContent);
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