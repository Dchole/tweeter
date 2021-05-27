import Head from "next/head"
import RegisterForm from "@/components/Auth/Register"
import MultiStepForm from "@/components/Auth/Register/MultiStepForm"
import Wrapper from "@/components/Auth/Wrapper"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

export const getServerSideProps: GetServerSideProps<{
  deviceType: "mobile" | "desktop"
}> = async ({ req }) => {
  const userAgent = req.headers["user-agent"]

  const deviceType = userAgent.toLowerCase().includes("mobi")
    ? "mobile"
    : "desktop"

  return {
    props: {
      deviceType
    }
  }
}

const Register: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ deviceType }) => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <Wrapper path="register">
        {deviceType === "mobile" ? <MultiStepForm /> : <RegisterForm />}
      </Wrapper>
    </>
  )
}

export default Register
