import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {

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
                <img className = "header-logo" src={logo} onClick = {() => {
                  window.location.href = "/"
                }}></img>
            </div>
            <div className="theme-btn-div">
              <a className="theme-btn" onClick={changeColor}><img src={theme} className="theme-btn-icon"></img></a>
            </div>
        </div>
    )
  }
  return (
    <main>
      <Header>
      </Header>
      <title>
        gxdxt
      </title>
      <div className={styles.container}>
      <main className={styles.main}>

        <div className={styles.grid}>
          <a href="./books" className={styles.card}>
            <h3>Books &rarr;</h3>
            <p>My Book Review</p>
          </a>

          <a href="./posts" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Archive for what I Learned !</p>
          </a>
          
          <a
            href="./posts"
            className={styles.card}
          >
            <h3>Posts &rarr;</h3>
            <p>Leave a message to me!</p>
          </a>

          <a
            href="./profile"
            className={styles.card}
          >
            <h3>Profile &rarr;</h3>
            <p>My Profile</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a> */}
      </footer>
    </div>
    </main>
  )
}
