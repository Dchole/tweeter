import * as Yup from "yup"

export const initialValues = {
  email: "",
  password: ""
}

export type TValues = typeof initialValues

export const validationSchema = Yup.object({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).required().label("Password")
})
