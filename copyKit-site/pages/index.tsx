import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CopyKit from '../components/copyKit'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CopyKit // AI generated Marjeting</title>
        <meta name="description" content="Generated branding snippets for your product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CopyKit />      
    </div>
  )
}

export default Home
