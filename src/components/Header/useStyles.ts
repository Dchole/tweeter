import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>
  createStyles({
    toolbar: {
      justifyContent: "space-between",
      alignItems: "center"
    },
    user: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(2),

      "& .MuiTypography-root": {
        fontWeight: 700
      }
    }
  })
)

export default useStyles
