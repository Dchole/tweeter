import { useEffect, useState } from "react"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { initialValues, TValues, validationSchema } from "./config"
import { useRealmApp } from "@/components/RealmContext"
import handleAuthenticationError from "@/components/Auth/handle-auth-error"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import useStyles from "../useStyles"
import { useMongoDB } from "@/components/MongoDBContext"

const Banner = dynamic(() => import("@/components/Banner"))

const RegisterForm = () => {
  const classes = useStyles()
  const { replace } = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [errorAlert, setErrorAlert] = useState("")
  const [userData, setUserData] = useState({ firstName: "", lastName: "" })
  const { register, user } = useRealmApp()
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

  useEffect(() => {
    db?.collection("users")
      .insertOne({ userID: user?.id, ...userData })
      .then(() => {
        replace("/dashboard")
      })
      .catch(err => console.log(err.message))
  }, [db])

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form id="sign-up" name="sign-up">
            <Field
              component={TextField}
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              autoComplete="given-name"
              autoCapitalize="on"
              className={classes.input}
              autoFocus
              aria-required
              fullWidth
            />
            <Field
              component={TextField}
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              autoComplete="family-name"
              autoCapitalize="on"
              className={classes.input}
              aria-required
              fullWidth
            />
            <Field
              component={TextField}
              id="email"
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              autoComplete="email"
              className={classes.input}
              aria-required
              fullWidth
            />
            <Field
              component={TextField}
              id="new-password"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              variant="outlined"
              autoComplete="new-password"
              className={classes.input}
              aria-required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "hide password" : "show password"
                      }
                      onClick={handleToggle}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              disableElevation={isSubmitting}
              aria-busy={isSubmitting}
              className={classes.button}
              fullWidth
            >
              Sign Up {isSubmitting && <CircularProgress size={25} />}
            </Button>
          </Form>
        )}
      </Formik>
      <Banner
        open={Boolean(errorAlert)}
        message={errorAlert}
        severity="error"
        handleClose={() => setErrorAlert("")}
      />
    </>
  )
}

export default RegisterForm
