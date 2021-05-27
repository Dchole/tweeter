import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import useStyles from "./useStyles"

interface IPageLayoutProps {
  leftSide?: React.FC
  rightSide?: React.FC
}

const PageLayout: React.FC<IPageLayoutProps> = ({
  children,
  leftSide,
  rightSide
}) => {
  const classes = useStyles()

  return (
    <Container
      component={Grid}
      className={classes.container}
      maxWidth="md"
      container
    >
      {leftSide && (
        <Grid component="aside" xs={4} item>
          {leftSide}
        </Grid>
      )}
      <Grid id="main-content" component="main" item xs>
        {children}
      </Grid>
      {rightSide && (
        <Grid component="aside" xs={4} item>
          {rightSide}
        </Grid>
      )}
    </Container>
  )
}

export default PageLayout
