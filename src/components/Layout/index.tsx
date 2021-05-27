import Header from "../Header"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import BottomNavbar from "../BottomNavbar"
import { useRouter } from "next/router"

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const { breakpoints } = useTheme()
  const desktop = useMediaQuery(breakpoints.up("sm"))

  const isAuthPage = pathname === "/login" || pathname === "/register"

  return (
    <>
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && !desktop && <BottomNavbar />}
    </>
  )
}

export default Layout
