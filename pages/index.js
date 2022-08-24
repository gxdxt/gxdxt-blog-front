import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
  const [logo, setLogo] = useState('gxdxt.png');
  const [theme, setTheme] = useState('🌚')
  const changeColor = e => {
    if (document.querySelector('body').dataset.theme == 'light') {
        delete document.querySelector('body').dataset.theme
        setLogo('gxdxt.png');
        setTheme('🌚');
        window.localStorage.setItem('theme', 'dark');
    } else {
        document.querySelector('body').dataset.theme = 'light' 
        setLogo('gxdxt_light.png');
        setTheme('🌝');
        window.localStorage.setItem('theme', 'light');
    }
}
  
  const Header = () => {
    return (
        <div className = "header">
            <div className = "header-logo-div">
                <img className = "header-logo" src={logo} onClick = {() => {
                  window.location.href = "/"
                }}></img>
                <a className="theme-btn" onClick={changeColor}>{theme}</a>          
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
          <a href="./posts" className={styles.card}>
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
