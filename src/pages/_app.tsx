import "@fontsource/roboto"
import "@fontsource/nunito-sans/600.css"

import Head from "next/head"
import { AppProps } from "next/app"
import { useEffect } from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "@/lib/theme"
import RealmApp from "@/components/RealmContext"
import MongoDB from "@/components/MongoDBContext"
import Layout from "@/components/Layout"

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RealmApp>
          <MongoDB>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MongoDB>
        </RealmApp>
      </ThemeProvider>
    </>
  )
}

export default MyApp
