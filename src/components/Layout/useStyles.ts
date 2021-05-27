import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      margin: theme.spacing(8, "auto")
    }
  })
)

export default useStyles
