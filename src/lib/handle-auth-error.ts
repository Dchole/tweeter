import parseAuthenticationError from "@/utils/parse-auth-error"

interface IError {
  message: string
  key: string
}

function handleAuthenticationError(err: Error): IError {
  const { status, message } = parseAuthenticationError(err)
  const errorType = message || status

  switch (errorType) {
    case "invalid username":
      return { message: "invalid email address", key: "email" }

    case "invalid username/password":
      return { message: "invalid email or password", key: "" }

    case "invalid password":
    case "401":
      return { message: "incorrect password", key: "password" }

    case "name already in use":
    case "409":
      return { message: "email already in use", key: "email" }

    case "password must be between 6 and 128 characters":
      return {
        message: "Password must be between 6 and 128 characters.",
        key: "password"
      }

    default:
      return { message, key: "" }
  }
}

export default handleAuthenticationError
