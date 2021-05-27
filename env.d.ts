declare namespace NodeJS {
  interface ProcessEnv {
    REALM_PUBLIC_KEY: string
    REALM_PRIVATE_KEY: string
    NEXT_PUBLIC_REALM_APP_ID: string
    NEXT_PUBLIC_REALM_SERVICE_NAME: string
    NEXT_PUBLIC_DB_NAME: string
  }
}
