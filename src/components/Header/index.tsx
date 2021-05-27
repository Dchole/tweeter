import dynamic from "next/dynamic"
import Image from "next/image"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import useStyles from "./useStyles"
import { useState } from "react"

const Menu = dynamic(() => import("@/components/Menu"))

const Header = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar variant="outlined" color="inherit">
      <Toolbar className={classes.toolbar}>
        <Image src="/tweeter.svg" alt="Tweeter Logo" width={125} height={30} />
        <div className={classes.user}>
          <Avatar variant="square">
            <Image src="/devchallenges.png" alt="Username" layout="fill" />
          </Avatar>
          <Typography>User name</Typography>
          <IconButton aria-label="menu" onClick={handleOpen}>
            <ArrowDownIcon />
          </IconButton>
        </div>
      </Toolbar>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </AppBar>
  )
}

export default Header
