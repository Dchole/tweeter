import Alert from "@material-ui/lab/Alert"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Slide } from "@material-ui/core"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",

      "& .MuiPaper-root": {
        padding: theme.spacing(0.75, 2)
      },

      "& .MuiAlert-message": {
        textTransform: "capitalize"
      }
    }
  })
)

interface IBannerProps {
  severity: "success" | "info" | "warning" | "error"
  open: boolean
  message: string
  handleClose: () => void
}

const Banner: React.FC<IBannerProps> = ({
  open,
  message,
  severity,
  handleClose
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Slide in={open}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Slide>
    </div>
  )
}

export default Banner
