import dynamic from "next/dynamic"
import { useState } from "react"
import { Form, Formik, FormikErrors } from "formik"
import { initialValues, TValues, validationSchema } from "../config"
import Step from "@material-ui/core/Step"
import Stepper from "@material-ui/core/Stepper"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import StepContent from "./StepContent"
import useStyles from "./useStyles"
import useRegister from "../useRegister"

const Banner = dynamic(() => import("@/components/Banner"))

const steps = ["Full Name", "Account Details"]

const MultiStepForm = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const { errorAlert, clearError, handleSubmit } = useRegister()

  const handleNextStep = (
    setFieldTouched: (field: string) => void,
    errors: FormikErrors<TValues>
  ) => {
    const fields = ["firstName", "lastName"]
    fields.forEach(field => setFieldTouched(field))

    if (!Object.keys(errors).some(field => fields.includes(field))) {
      activeStep < 2 && setActiveStep(activeStep + 1)
    }
  }
  const handlePrevStep = () => setActiveStep(activeStep - 1)

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldTouched, errors }) => (
          <Form>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              classes={{ root: classes.stepper }}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <StepContent step={activeStep} />
            <div className={classes.actions}>
              <Button
                color="primary"
                variant="outlined"
                disabled={activeStep === 0 || isSubmitting}
                onClick={handlePrevStep}
                fullWidth
              >
                Previous
              </Button>
              <Button
                type={activeStep > 1 ? "submit" : undefined}
                color="primary"
                variant="contained"
                onClick={() => handleNextStep(setFieldTouched, errors)}
                disabled={isSubmitting}
                disableElevation={isSubmitting}
                aria-busy={isSubmitting}
                fullWidth
              >
                {activeStep === 0 ? (
                  "Next"
                ) : isSubmitting ? (
                  <CircularProgress size={25} />
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
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

export default MultiStepForm
