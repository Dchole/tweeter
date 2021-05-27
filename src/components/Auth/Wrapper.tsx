import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Link from "../Link"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      placeItems: "center",
      minHeight: "100vh",

      "& .MuiPaper-root": {
        width: "100%",
        padding: theme.spacing(2)
      }
    }
  })
)

interface IWrapperProps {
  path: "register" | "login"
}

const Wrapper: React.FC<IWrapperProps> = ({ path, children }) => {
  const classes = useStyles()
  const { breakpoints } = useTheme()
  const mobile = useMediaQuery(breakpoints.down("xs"))
  const onLoginPage = path === "login"

  return (
    <Container maxWidth="xs" disableGutters={mobile} className={classes.root}>
      <Paper>
        <Typography variant="h4" component="h1" align="center">
          {onLoginPage ? "Sign In" : "Sign Up"}
        </Typography>
        {children}
        <Grid alignItems="center" justify="space-between" container>
          {onLoginPage ? (
            <Link href="/forgot-password">Forgot Password</Link>
          ) : (
            <div></div>
          )}
          <Link href={onLoginPage ? "/register" : "/login"}>
            {onLoginPage
              ? "Create an account"
              : "Already have an account? Login here"}
          </Link>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Wrapper
