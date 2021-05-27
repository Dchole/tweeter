import { useRealmApp } from "@/components/RealmContext"
import { FormikHelpers } from "formik"
import { useEffect, useState } from "react"
import { TValues } from "./config"
import handleAuthenticationError from "../handle-auth-error"
import { useMongoDB } from "@/components/MongoDBContext"
import { useRouter } from "next/router"

const useRegister = () => {
  const { replace } = useRouter()
  const [errorAlert, setErrorAlert] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { register, user } = useRealmApp()
  const [userData, setUserData] = useState({ firstName: "", lastName: "" })
  const { db } = useMongoDB()

  const handleToggle = () => setShowPassword(!showPassword)

  const handleSubmit = (
    { email, password, ...rest }: TValues,
    { setSubmitting, setErrors }: FormikHelpers<TValues>
  ) => {
    setUserData(rest)
    register(email, password)
      .catch(err => {
        const { message, key } = handleAuthenticationError(err)
        console.log(err)

        !key && setErrorAlert(message)

        key === "email"
          ? setErrors({ email: message })
          : setErrors({ password: message })
      })
      .finally(() => setSubmitting(false))
  }

  const clearError = () => setErrorAlert("")

  useEffect(() => {
    db?.collection("users")
      .insertOne({ userID: user?.id, ...userData })
      .then(() => {
        replace("/dashboard")
      })
      .catch(err => console.log(err.message))
  }, [db])

  return { errorAlert, clearError, handleSubmit, showPassword, handleToggle }
}

export default useRegister
