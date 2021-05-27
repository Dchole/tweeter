import { useEffect, useState } from "react"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { initialValues, validationSchema } from "./config"
import dynamic from "next/dynamic"
import useStyles from "../useStyles"
import useRegister from "./useRegister"

const Banner = dynamic(() => import("@/components/Banner"))

const RegisterForm = () => {
  const classes = useStyles()
  const { errorAlert, clearError, handleSubmit, showPassword, handleToggle } =
    useRegister()

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
        handleClose={clearError}
      />
    </>
  )
}

export default RegisterForm
