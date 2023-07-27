import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { Header, Hero, Modal, Row, SubscriptionPlan } from 'src/components'
import { AuthContext } from 'src/context/auth.context'
import { IMovie, Product } from 'src/interfaces/app.interface'
import { API_REQUEST } from 'src/services/api.service'
import { useInfoStore } from 'src/store'

export default function Home({
  trending,
  topRated,
  tvTopRated,
  popular,
  documentary,
  family,
  history,
  comedy,
  products,
}: HomeProps): JSX.Element {
  const { modal } = useInfoStore()
  const { isLoading } = useContext(AuthContext)
  const subscription = true

  if (isLoading) return <>{null}</>

  if (!subscription) return <SubscriptionPlan products={products} />

  return (
    <div
      className={`relative min-h-screen ${
        modal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Home - Sammi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Hero trending={trending} />
        <section>
          <Row title="Top Rated" movies={topRated} />
          <Row title="Tv Show" movies={tvTopRated} isBig={true} />
          <Row title="Popular" movies={popular} isBig={true} />
          <Row title="Documentary" movies={documentary.reverse()} />
          <Row title="History" movies={history} />
          <Row title="Family" movies={family} />
          <Row title="Comedy" movies={comedy.reverse()} />
        </section>
      </main>
      {modal && <Modal />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const [
    trending,
    topRated,
    tvTopRated,
    popular,
    documentary,
    comedy,
    family,
    history,
    products,
  ] = await Promise.all([
    fetch(API_REQUEST.trending).then((res) => res.json()),
    fetch(API_REQUEST.top_rated).then((res) => res.json()),
    fetch(API_REQUEST.tv_top_rated).then((res) => res.json()),
    fetch(API_REQUEST.popular).then((res) => res.json()),
    fetch(API_REQUEST.documentary).then((res) => res.json()),
    fetch(API_REQUEST.comedy).then((res) => res.json()),
    fetch(API_REQUEST.family).then((res) => res.json()),
    fetch(API_REQUEST.history).then((res) => res.json()),
    fetch(API_REQUEST.products_list).then((res) => res.json()),
  ])

  return {
    props: {
      trending: trending.results,
      topRated: topRated.results,
      tvTopRated: tvTopRated.results,
      popular: popular.results,
      documentary: documentary.results,
      comedy: comedy.results,
      family: family.results,
      history: history.results,
      products: products.products.data,
    },
  }
}

interface HomeProps {
  trending: IMovie[]
  topRated: IMovie[]
  tvTopRated: IMovie[]
  popular: IMovie[]
  documentary: IMovie[]
  comedy: IMovie[]
  family: IMovie[]
  history: IMovie[]
  products: Product[]
}
