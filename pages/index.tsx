import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import useSWR from "swr"
import fetcher from "@/utils/fetcher"
import { Location } from "@prisma/client"
import NextLink from "next/link"

const Home: NextPage = () => {
  const { data } = useSWR<Location[]>("/api/locations", fetcher)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {data?.map((location) => (
          <div key={location.id}>
            <NextLink href={`/locations/${location.id}`}>
              {location.name}
            </NextLink>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Home
