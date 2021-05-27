import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>
  createStyles({
    toolbar: {
      justifyContent: "space-between",
      alignItems: "center"
    },
    list: {
      display: "flex",
      gap: theme.spacing(2),

      "& .MuiListItem-root": {
        "& a": {
          color: theme.palette.text.secondary,
          textDecoration: "none"
        }
      }
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
