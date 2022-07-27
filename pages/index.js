import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>gxdxt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my universe!
        </h1>

        <div className={styles.grid}>
          <a href="./posts" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>My Daily Life Journal</p>
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
            href="./posts"
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
  )
}
