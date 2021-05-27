import * as RealmWeb from "realm-web"

import React, { useContext, useState } from "react"

type TUser = null | RealmWeb.User

interface IRealmContextProps {
  register: (email: string, password: string) => Promise<TUser>
  logIn: (email: string, password: string) => Promise<TUser>
  logOut: () => void
  user: TUser
}

const RealmAppContext = React.createContext({} as IRealmContextProps)

const RealmApp: React.FC = ({ children }) => {
  const app = new RealmWeb.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID })
  const [user, setUser] = useState<TUser>(null)

  const register = async (email: string, password: string) => {
    const credentials = RealmWeb.Credentials.emailPassword(email, password)

    await app.emailPasswordAuth.registerUser(email, password)
    await app.logIn(credentials)
    setUser(app.currentUser)

    return app.currentUser
  }

  const logIn = async (email: string, password: string) => {
    const credentials = RealmWeb.Credentials.emailPassword(email, password)

    await app.logIn(credentials)
    setUser(app.currentUser)

    return app.currentUser
  }

  const logOut = () => {
    if (user) {
      app.currentUser?.logOut()
      setUser(null)
    }
  }

  return (
    <RealmAppContext.Provider
      value={{
        register,
        logIn,
        logOut,
        user
      }}
    >
      {children}
    </RealmAppContext.Provider>
  )
}

export const useRealmApp = () => {
  const realmContext = useContext(RealmAppContext)

  if (!realmContext) {
    throw new Error("useRealmApp() called outside of a RealmApp?")
  }

  return realmContext
}

export default RealmApp
