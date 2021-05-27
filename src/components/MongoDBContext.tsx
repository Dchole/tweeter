import { createContext, useContext, useEffect, useState } from "react"
import { useRealmApp } from "./RealmContext"

interface IMongoDBContextProps {
  db: Realm.Services.MongoDBDatabase | null
}

const MongoDBContext = createContext({} as IMongoDBContextProps)

const MongoDB: React.FC = ({ children }) => {
  const { user } = useRealmApp()
  const [db, setDb] = useState<null | Realm.Services.MongoDBDatabase>(null)

  useEffect(() => {
    if (user) {
      const realmService = user.mongoClient(
        process.env.NEXT_PUBLIC_REALM_SERVICE_NAME
      )
      setDb(realmService.db(process.env.NEXT_PUBLIC_DB_NAME))
    }
  }, [user])

  return (
    <MongoDBContext.Provider value={{ db }}>{children}</MongoDBContext.Provider>
  )
}

export const useMongoDB = () => {
  const mdbContext = useContext(MongoDBContext)

  if (!mdbContext) {
    throw new Error("useMongoDB() called outside of a MongoDB?")
  }

  return mdbContext
}

export default MongoDB
