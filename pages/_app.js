// Minimal pages/_app.js - main site now uses App Router (app/)
// This file handles any legacy pages/ routes

import Head from 'next/head'
import '../styles/main.css'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
