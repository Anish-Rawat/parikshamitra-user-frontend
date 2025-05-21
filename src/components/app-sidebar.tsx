"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Brain,
  Home,
  PenTool,
  Settings,
  Share2,
  ChevronDown,
} from "lucide-react";
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/slices/authentication/auth.slice";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const userSelector = useAppSelector((state: RootState) => state.auth.user);
  const isActive = (path: string) => pathname === path;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openLogoutBtn = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const accessTokenSelector = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
  );

  const logoutSelector = useAppSelector(
    (state: RootState) => state.auth.logout
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async() => {
    handleMenuClose();
    if (logoutSelector.loading) return;
    try {
      const res = await dispatch(
        logoutUser({ accessToken: accessTokenSelector ?? "" })
      ).unwrap();

      if (res.success) {
        await signOut({ callbackUrl: "/signIn" });
      } else {
        toast.error(res.message ?? "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong during logout.");
    }
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#F4F5F7", // Light background
          color: "#4B5563", // Text color
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Header */}
      <div style={{ padding: "16px", display: "flex", alignItems: "center" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              height: "40px",
              width: "40px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              backgroundColor: "#0000FF",
              color: "white",
            }}
          >
            <Brain style={{ height: "24px", width: "24px" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              style={{ color: "#0000FF", fontSize: "16px" }}
            >
              Pariksha-Mitra
            </Typography>
            <Typography variant="caption" style={{ color: "#A1A1AA" }}>
              Exam Preparation Partner
            </Typography>
          </div>
        </Link>
        <IconButton onClick={() => setOpen(!open)} sx={{ ml: 1 }}>
          <ChevronDown size={16} />
        </IconButton>
      </div>

      {/* Divider */}
      <Divider />

      {/* Sidebar menu */}
      <List>
        {[
          { href: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
          {
            href: "/preparation",
            icon: <BookOpen size={20} />,
            label: "Preparation",
          },
          {
            href: "/start-test",
            icon: <PenTool size={20} />,
            label: "Start Test",
          },
          {
            href: "/create-test",
            icon: <Share2 size={20} />,
            label: "Create Test",
          },
          {
            href: "/settings",
            icon: <Settings size={20} />,
            label: "Settings",
          },
        ].map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={isActive(item.href)}
              sx={{
                pl: 2,
                pr: 2,
                borderRadius: "8px",
                bgcolor: isActive(item.href) ? "#E4D9FF" : "transparent",
                color: "#4B5563",
              }}
            >
              {item.icon}
              <Typography variant="body2" sx={{ ml: 2 }}>
                {item.label}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Divider */}
      <Divider />

      {/* Footer */}
      <div style={{ padding: "16px" }}>
        <Button
          variant="text"
          fullWidth
          onClick={handleMenuOpen}
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            textTransform: "none",
          }}
        >
          <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
            {userSelector?.userName?.charAt(0).toUpperCase() || "U"}
          </Avatar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "500" }}>
              {userSelector.userName ?? ""}
            </Typography>
            <Typography variant="caption" sx={{ color: "#A1A1AA" }}>
              {userSelector.email ?? ""}
            </Typography>
          </div>
          <ChevronDown size={16} style={{ marginLeft: "auto" }} />
        </Button>

        {/* Menu for Logout */}
        <Menu
          anchorEl={anchorEl}
          open={openLogoutBtn}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </Drawer>
  );
}
