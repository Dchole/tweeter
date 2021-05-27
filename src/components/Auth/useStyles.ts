import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>
  createStyles({
    input: {
      marginTop: theme.spacing(1),
      "& .MuiFormHelperText-root": {
        textTransform: "capitalize"
      }
    },

    button: {
      margin: theme.spacing(2, 0),

      "&:disabled": {
        cursor: "wait"
      },

      "& span": {
        display: "flex",
        gap: 8
      }
    }
  })
)

export default useStyles
