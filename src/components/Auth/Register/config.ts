import * as Yup from "yup"

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
}

export type TValues = typeof initialValues

export const validationSchema = Yup.object({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).required().label("Password")
})
