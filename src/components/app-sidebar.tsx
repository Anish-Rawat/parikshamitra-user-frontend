"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BookOpen, Brain, Home, PenTool, Settings, Share2, ChevronDown 
} from "lucide-react"
import { 
  Avatar, Drawer, List, ListItem, ListItemButton, Divider, Button, IconButton, Typography 
} from "@mui/material"

export function AppSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#F4F5F7", // Light background
          color: "#4B5563",           // Text color
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Header */}
      <div style={{ padding: "16px", display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", flexGrow: 1 }}>
          <div
            style={{
              display: "flex",
              height: "40px",
              width: "40px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              backgroundColor: "#6B21A8",
              color: "white",
            }}
          >
            <Brain style={{ height: "24px", width: "24px" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" style={{ color: "#6B21A8", fontSize: "16px" }}>
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
          { href: "/preparation", icon: <BookOpen size={20} />, label: "Preparation" },
          { href: "/start-test", icon: <PenTool size={20} />, label: "Start Test" },
          { href: "/create-test", icon: <Share2 size={20} />, label: "Create Test" },
          { href: "/settings", icon: <Settings size={20} />, label: "Settings" },
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
          sx={{ justifyContent: "flex-start", alignItems: "center", textTransform: "none" }}
        >
          <Avatar sx={{ width: 32, height: 32, mr: 2 }} src="/placeholder.svg" alt="User" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="body2" sx={{ fontWeight: "500" }}>
              User Name
            </Typography>
            <Typography variant="caption" sx={{ color: "#A1A1AA" }}>
              user@example.com
            </Typography>
          </div>
          <ChevronDown size={16} style={{ marginLeft: "auto" }} />
        </Button>
      </div>
    </Drawer>
  )
}
