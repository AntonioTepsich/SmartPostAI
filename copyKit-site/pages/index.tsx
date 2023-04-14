import type { NextPage } from 'next'
import Head from 'next/head'
import CopyKit from '../components/copyKit'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SmartPostAI</title>
        <meta name="description" content="Asistente de Instagram con IA, generador de hashtags y pie de Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CopyKit />      
    </div>
  )
}

export default Home
