import RegisterForm from "@/components/Auth/Register"
import Wrapper from "@/components/Auth/Wrapper"
import Head from "next/head"

const Register = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <Wrapper path="register">
        <RegisterForm />
      </Wrapper>
    </>
  )
}

export default Register
