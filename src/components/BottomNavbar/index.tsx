import { useState } from "react"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import HomeIcon from "@material-ui/icons/Home"
import ExploreIcon from "@material-ui/icons/Explore"
import BookmarkIcon from "@material-ui/icons/Bookmark"
import useStyles from "./useStyles"

const BottomNav = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
      <BottomNavigationAction label="Bookmarks" icon={<BookmarkIcon />} />
    </BottomNavigation>
  )
}

export default BottomNav
