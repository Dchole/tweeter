import clsx from "clsx"
import dynamic from "next/dynamic"
import { useState } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import { TValues, initialValues, validationSchema } from "./config"
import useStyles from "../useStyles"
import { useRealmApp } from "@/components/RealmContext"
import handleAuthenticationError from "@/components/Auth/handle-auth-error"
import { useRouter } from "next/router"

const Banner = dynamic(() => import("@/components/Banner"))

const LoginForm = () => {
  const classes = useStyles()
  const { replace } = useRouter()
  const { logIn } = useRealmApp()
  const [showPassword, setShowPassword] = useState(false)
  const [errorAlert, setErrorAlert] = useState("")

  const handleToggle = () => setShowPassword(!showPassword)
  const handleSubmit = (
    { email, password }: TValues,
    { setSubmitting, setErrors }: FormikHelpers<TValues>
  ) => {
    logIn(email, password)
      .then(() => replace("/dashboard"))
      .catch(err => {
        const { message, key } = handleAuthenticationError(err)

        !key
          ? setErrorAlert(message)
          : key === "email"
          ? setErrors({ email: message })
          : setErrors({ password: message })
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form id="sign-in" name="sign-in">
            <Field
              error={Boolean(errors.email) && touched.email}
              helperText={errors.email}
              component={TextField}
              variant="outlined"
              id="email"
              type="email"
              name="email"
              label="Email"
              margin="normal"
              className={classes.input}
              fullWidth
              aria-required
            />
            <Field
              error={Boolean(errors.password) && touched.password}
              helperText={errors.password}
              component={TextField}
              variant="outlined"
              id="current-password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              className={classes.input}
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
              fullWidth
              aria-required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              disabled={isSubmitting}
              disableElevation={isSubmitting}
              fullWidth
            >
              Login {isSubmitting && <CircularProgress size={20} />}
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

export default LoginForm
