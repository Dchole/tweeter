import dynamic from "next/dynamic"
import Image from "next/image"
import { useState } from "react"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Avatar from "@material-ui/core/Avatar"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import useStyles from "./useStyles"
import Link from "../Link"

const Menu = dynamic(() => import("@/components/Menu"))

const Header = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const { breakpoints } = useTheme()
  const desktop = useMediaQuery(breakpoints.up("sm"))

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar variant="outlined" color="inherit">
      <Toolbar className={classes.toolbar}>
        <Image src="/tweeter.svg" alt="Tweeter Logo" width={125} height={30} />
        {desktop && (
          <nav>
            <List className={classes.list}>
              <ListItem>
                <Link href="/home" naked>
                  Home
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/explore" naked>
                  Explore
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/bookmarks" naked>
                  Bookmarks
                </Link>
              </ListItem>
            </List>
          </nav>
        )}
        <div className={classes.user}>
          <Avatar variant="square">
            <Image src="/devchallenges.png" alt="Username" layout="fill" />
          </Avatar>
          {desktop && <Typography>User name</Typography>}
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
