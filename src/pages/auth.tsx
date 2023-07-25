import Head from 'next/head'
import Auth from 'src/components/auth'

const auth = () => {
  return (
    <>
      <Head>
        <title>Log In</title>
        <meta
          name="description"
          content="To watch movies you should login to site"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth />
    </>
  )
}

export default auth
