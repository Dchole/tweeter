import Header from "../Header"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import BottomNavbar from "../BottomNavbar"

const Layout: React.FC = ({ children }) => {
  const { breakpoints } = useTheme()
  const desktop = useMediaQuery(breakpoints.up("sm"))

  return (
    <>
      <Header />
      {children}
      {!desktop && <BottomNavbar />}
    </>
  )
}

export default Layout
