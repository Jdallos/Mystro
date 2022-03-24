import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";

import SavedRecommendation from "./SavedRecommendation";

interface Props {
  saved: any[];
  setSaved: React.Dispatch<React.SetStateAction<any[]>>;
  setPlaying: React.Dispatch<any>;
}

const drawerWidth = 400;

// REQUIRED FOR RESPONSE 'MAIN' SECTION
// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create("margin", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginRight: -drawerWidth,
//   ...(open && {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginRight: 0,
//   }),
// }));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const PersistentDrawerRight: React.FC<Props> = ({
  saved,
  setSaved,
  setPlaying,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        open={open}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: "none" }), marginLeft: "80%",
        color: "#3cb371",
      fontSize: "1.5em" }}
        >
          Playlist
          <MenuIcon />
        </IconButton>
      </AppBar>
      {/* <Main open={open}>
        INSERT HERE IF WANT MAIN PAGE TO SHRINK WHEN DRAW OPEN...
      </Main> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#FFCC99EE"
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography sx= {{ color: "#3cb371", fontSize: "1.5em" }}>Your Playlist</Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {saved.length ? (
            saved.map((rec) => (
              // With state management can add in getInfo discovery
              <ListItem>
                <SavedRecommendation
                  recommendation={rec.recommendation}
                  key={rec.id}
                  saved={saved}
                  setSaved={setSaved}
                  setPlaying={setPlaying}
                />
                <Divider />
              </ListItem>
            ))
          ) : (
            <Typography>You haven't saved anything</Typography>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default PersistentDrawerRight;