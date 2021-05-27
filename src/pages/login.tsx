import Head from "next/head"
import LoginForm from "@/components/Auth/Login"
import Wrapper from "@/components/Auth/Wrapper"

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Wrapper path="login">
        <LoginForm />
      </Wrapper>
    </>
  )
}

export default Login
