import { API_HOST } from "../../common"
import { useState, useEffect } from "react"
import { marked } from "marked";


const ProfilePage = ({ profileData }) => {
    const profileContent = profileData[0].content;
    const [logo, setLogo] = useState('gxdxt.png');
    const [theme, setTheme] = useState('https://cdn-icons-png.flaticon.com/512/6559/6559240.png')
    const changeColor = e => {
      if (document.querySelector('body').dataset.theme === 'light') {
          delete document.querySelector('body').dataset.theme
          setLogo('gxdxt.png');
          setTheme('https://cdn-icons-png.flaticon.com/512/6559/6559240.png');
          window.localStorage.setItem('theme', JSON.stringify('dark'));
      } else {
          document.querySelector('body').dataset.theme = 'light' 
          setLogo('gxdxt_light.png');
          setTheme('https://cdn-icons-png.flaticon.com/512/7649/7649635.png');
          window.localStorage.setItem('theme', JSON.stringify('light'));
      }
    }
    useEffect(() => {
      if (window.localStorage.getItem('theme') == "\"light\"") {
          console.log('light 모드로 진입');
          document.querySelector('body').dataset.theme = 'light'
          setLogo('gxdxt_light.png');
          setTheme('https://cdn-icons-png.flaticon.com/512/7649/7649635.png');
      } else {
          console.log('dark 모드로 진입');  
          delete document.querySelector('body').dataset.theme
          setLogo('gxdxt.png');
          setTheme('https://cdn-icons-png.flaticon.com/512/6559/6559240.png');
      }
  
    }, []);
  
    
    const Header = () => {
      
      return (
          <div className = "header">
              <div className = "header-logo-div">
                  <a className = "header-logo" onClick = {() => {
                    window.location.href = "/"
                  }}>gxdxt</a>
              <div className="theme-btn-div">
                <a className="theme-btn" onClick={changeColor}><img src={theme} className="theme-btn-icon"></img></a>
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
    
    return {
        props: {
            profileData
        }
    }
}

export default ProfilePage
