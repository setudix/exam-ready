"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import QuizIcon from "@mui/icons-material/Quiz";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import ViewListIcon from "@mui/icons-material/ViewList";

import { signOut } from "next-auth/react";
import { ListItemIcon, ListItemText, Stack } from "@mui/material";

import { Account, SessionContext } from "@toolpad/core";
import Link from "next/link";
import routes from "@/app/routes";

const LoggedInAvatar = ({ session }: { session: any }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={session.user.image} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px", maxWidth: "200px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem divider={true} sx={{ justifyContent: "center" }}>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            noWrap
          >
            {session.user.name}
          </Typography>
        </MenuItem>

        <MenuItem>
          <Link href={routes.fe_examHistory}>
            <Stack direction="row">

            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography  textAlign="justify">
                Exam History
              </Typography>
            </ListItemText>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography   textAlign="justify">
              Sign Out
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LoggedInAvatar;
