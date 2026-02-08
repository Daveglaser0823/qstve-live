import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Man & Machine</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #0a0a0a; }
          nav, header, footer, article { display: none !important; }
        `}</style>
      </Head>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <img 
          src="/man-and-machine.png" 
          alt="Man & Machine"
          style={{
            maxWidth: '100%',
            maxHeight: '100vh',
            objectFit: 'contain'
          }}
        />
      </div>
    </>
  )
}

Home.getLayout = (page) => page
