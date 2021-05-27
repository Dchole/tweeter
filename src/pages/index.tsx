import Head from "next/head"
import PageLayout from "@/components/Layout/PageLayout"

export default function Home() {
  return (
    <>
      <Head>
        <title>Tweeter</title>
      </Head>

      <PageLayout>
        <h1>Homepage</h1>
      </PageLayout>
    </>
  )
}
