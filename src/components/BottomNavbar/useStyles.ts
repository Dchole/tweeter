import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: 0
    }
  })
)

export default useStyles
