"use client"

import * as React from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import Skeleton from "@mui/material/Skeleton"
import IconButton from "@mui/material/IconButton"
import PanelLeftIcon from "@mui/icons-material/VerticalSplit"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

// Custom styled components
const SidebarRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}))

const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => 
    !["state", "side", "variant", "collapsible"].includes(prop.toString()),
})(({ theme, state, side, variant, collapsible }) => ({
  display: "flex",
  height: "100vh",
  width: SIDEBAR_WIDTH,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(["width", "left", "right"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  position: "fixed",
  zIndex: 10,
  ...(side === "left" ? { left: 0 } : { right: 0 }),
  ...(state === "collapsed" && collapsible === "offcanvas" && 
    (side === "left" 
      ? { left: `calc(${SIDEBAR_WIDTH} * -1)` } 
      : { right: `calc(${SIDEBAR_WIDTH} * -1)` }
  )),
  ...(state === "collapsed" && collapsible === "icon" && {
    width: SIDEBAR_WIDTH_ICON,
  }),
  ...(side === "left" ? { borderRight: `1px solid ${theme.palette.divider}` } : { borderLeft: `1px solid ${theme.palette.divider}` }),
  ...(variant === "floating" && {
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
  }),
  ...(variant === "inset" && {
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  }),
}))

const SidebarContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "auto",
  gap: theme.spacing(1),
}))

const SidebarHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
}))

const SidebarFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
}))

const SidebarGroup = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  width: "100%",
  minWidth: 0,
  flexDirection: "column",
  padding: theme.spacing(1),
}))

const SidebarGroupLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "collapsible",
})(({ theme, collapsible }) => ({
  display: "flex",
  height: 32,
  flexShrink: 0,
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0, 1),
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.secondary,
  outline: "none",
  transition: theme.transitions.create(["margin", "opacity"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  "& > svg": {
    width: 16,
    height: 16,
    flexShrink: 0,
  },
  ...(collapsible === "icon" && {
    marginTop: -32,
    opacity: 0,
  }),
}))

const SidebarGroupAction = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "collapsible",
})(({ theme, collapsible }) => ({
  position: "absolute",
  right: theme.spacing(1.5),
  top: theme.spacing(1.75),
  display: "flex",
  aspectRatio: "1/1",
  width: 20,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  padding: 0,
  color: theme.palette.text.primary,
  outline: "none",
  "&:after": {
    position: "absolute",
    inset: theme.spacing(-1),
    content: '""',
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  "& > svg": {
    width: 16,
    height: 16,
    flexShrink: 0,
  },
  ...(collapsible === "icon" && {
    display: "none",
  }),
}))

const SidebarGroupContent = styled(Box)(({ theme }) => ({
  width: "100%",
  fontSize: theme.typography.body2.fontSize,
}))

const SidebarMenu = styled("ul")(({ theme }) => ({
  display: "flex",
  width: "100%",
  minWidth: 0,
  flexDirection: "column",
  gap: theme.spacing(0.5),
  padding: 0,
  margin: 0,
  listStyle: "none",
}))

const SidebarMenuItem = styled("li")(({ theme }) => ({
  position: "relative",
  listStyle: "none",
}))

const SidebarMenuButton = styled(Button, {
  shouldForwardProp: (prop) => 
    !["variant", "size", "active", "collapsible"].includes(prop.toString()),
})(({ theme, variant, size, active, collapsible }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  gap: theme.spacing(1),
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  textAlign: "left",
  fontSize: theme.typography.body2.fontSize,
  outline: "none",
  transition: theme.transitions.create(["width", "height", "padding"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  color: theme.palette.text.primary,
  justifyContent: "flex-start",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  "& > span:last-child": {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  "& > svg": {
    width: 16,
    height: 16,
    flexShrink: 0,
  },
  ...(active && {
    backgroundColor: theme.palette.action.selected,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
  }),
  ...(size === "default" && {
    height: 32,
  }),
  ...(size === "sm" && {
    height: 28,
    fontSize: theme.typography.caption.fontSize,
  }),
  ...(size === "lg" && {
    height: 48,
  }),
  ...(variant === "outline" && {
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 0 0 1px ${theme.palette.divider}`,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      boxShadow: `0 0 0 1px ${theme.palette.action.hover}`,
    },
  }),
  ...(collapsible === "icon" && {
    width: 32,
    height: 32,
    padding: theme.spacing(1),
  }),
}))

const SidebarMenuAction = styled(IconButton, {
  shouldForwardProp: (prop) => 
    !["showOnHover", "collapsible", "size"].includes(prop.toString()),
})(({ theme, showOnHover, collapsible, size }) => ({
  position: "absolute",
  right: theme.spacing(0.5),
  top: theme.spacing(0.75),
  display: "flex",
  aspectRatio: "1/1",
  width: 20,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  padding: 0,
  color: theme.palette.text.primary,
  outline: "none",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  "&:after": {
    position: "absolute",
    inset: theme.spacing(-1),
    content: '""',
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  "& > svg": {
    width: 16,
    height: 16,
    flexShrink: 0,
  },
  ...(size === "sm" && {
    top: theme.spacing(0.5),
  }),
  ...(size === "lg" && {
    top: theme.spacing(1.25),
  }),
  ...(collapsible === "icon" && {
    display: "none",
  }),
  ...(showOnHover && {
    [theme.breakpoints.up("md")]: {
      opacity: 0,
    },
    "$:focus-within, $:hover, &[data-state='open']": {
      opacity: 1,
    },
  }),
}))

const SidebarMenuBadge = styled(Box, {
  shouldForwardProp: (prop) => 
    !["collapsible", "size"].includes(prop.toString()),
})(({ theme, collapsible, size }) => ({
  position: "absolute",
  right: theme.spacing(0.5),
  display: "flex",
  height: 20,
  minWidth: 20,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0, 0.5),
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
  userSelect: "none",
  pointerEvents: "none",
  ...(size === "sm" && {
    top: theme.spacing(0.5),
  }),
  ...(size === "default" && {
    top: theme.spacing(0.75),
  }),
  ...(size === "lg" && {
    top: theme.spacing(1.25),
  }),
  ...(collapsible === "icon" && {
    display: "none",
  }),
}))

const SidebarMenuSub = styled("ul", {
  shouldForwardProp: (prop) => prop !== "collapsible",
})(({ theme, collapsible }) => ({
  marginLeft: theme.spacing(1.75),
  marginRight: theme.spacing(0),
  display: "flex",
  minWidth: 0,
  transform: "translateX(1px)",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  borderLeft: `1px solid ${theme.palette.divider}`,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(0),
  paddingTop: theme.spacing(0.25),
  paddingBottom: theme.spacing(0.25),
  ...(collapsible === "icon" && {
    display: "none",
  }),
}))

const SidebarMenuSubButton = styled(Button, {
  shouldForwardProp: (prop) => 
    !["active", "size", "collapsible"].includes(prop.toString()),
})(({ theme, active, size, collapsible }) => ({
  display: "flex",
  height: 28,
  minWidth: 0,
  transform: "translateX(-1px)",
  alignItems: "center",
  gap: theme.spacing(1),
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0, 1),
  color: theme.palette.text.primary,
  outline: "none",
  justifyContent: "flex-start",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  "& > span:last-child": {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  "& > svg": {
    width: 16,
    height: 16,
    flexShrink: 0,
    color: theme.palette.primary.main,
  },
  ...(active && {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.text.primary,
  }),
  ...(size === "sm" && {
    fontSize: theme.typography.caption.fontSize,
  }),
  ...(size === "md" && {
    fontSize: theme.typography.body2.fontSize,
  }),
  ...(collapsible === "icon" && {
    display: "none",
  }),
}))

const SidebarRail = styled(Box, {
  shouldForwardProp: (prop) => 
    !["side", "state", "collapsible"].includes(prop.toString()),
})(({ theme, side, state, collapsible }) => ({
  position: "absolute",
  insetBlock: 0,
  zIndex: 20,
  display: "none",
  width: 16,
  transform: "translateX(-50%)",
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  cursor: side === "left" ? "w-resize" : "e-resize",
  "&:after": {
    position: "absolute",
    insetBlock: 0,
    left: "50%",
    width: 2,
    content: '""',
  },
  "&:hover:after": {
    backgroundColor: theme.palette.divider,
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
  ...(side === "left" && {
    right: -16,
  }),
  ...(side === "right" && {
    left: 0,
  }),
  ...(state === "collapsed" && side === "left" && {
    cursor: "e-resize",
  }),
  ...(state === "collapsed" && side === "right" && {
    cursor: "w-resize",
  }),
  ...(collapsible === "offcanvas" && {
    transform: "translateX(0)",
    "&:after": {
      left: "100%",
    },
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  }),
  ...(collapsible === "offcanvas" && side === "left" && {
    right: -8,
  }),
  ...(collapsible === "offcanvas" && side === "right" && {
    left: -8,
  }),
}))

const SidebarInset = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  minHeight: "100vh",
  flex: 1,
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("md")]: {
    "&[data-variant='inset']": {
      minHeight: `calc(100vh - ${theme.spacing(2)})`,
      margin: theme.spacing(1),
      marginLeft: 0,
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.shadows[1],
      "&[data-state='collapsed']": {
        marginLeft: theme.spacing(1),
      },
    },
  },
}))

// Custom hook to detect mobile screens
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener
    window.addEventListener("resize", checkIsMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

// Context for sidebar state
type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Box> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, style, children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open],
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar based on its state.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <SidebarRoot
        ref={ref}
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </SidebarRoot>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Box> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(({ side = "left", variant = "sidebar", collapsible = "offcanvas", ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          height: "100%",
          width: SIDEBAR_WIDTH,
          flexDirection: "column",
          bgcolor: "background.paper",
          color: "text.primary",
        }}
        {...props}
      />
    )
  }

  if (isMobile) {
    return (
      <Drawer
        anchor={side}
        open={openMobile}
        onClose={() => setOpenMobile(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH_MOBILE,
            bgcolor: "background.paper",
            color: "text.primary",
            p: 0,
            "& > button": { display: "none" },
          },
        }}
        {...props}
      >
        <Box sx={{ display: "flex", height: "100%", width: "100%", flexDirection: "column" }}>
          {props.children}
        </Box>
      </Drawer>
    )
  }

  return (
    <Box
      ref={ref}
      sx={{ display: { xs: "none", md: "block" }, color: "text.primary" }}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      {/* This handles the sidebar gap on desktop */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: SIDEBAR_WIDTH,
          bgcolor: "transparent",
          transition: "width 0.2s linear",
          ...(collapsible === "offcanvas" && { width: 0 }),
          ...(collapsible === "icon" && 
            (variant === "floating" || variant === "inset"
              ? { width: `calc(${SIDEBAR_WIDTH_ICON} + 16px)` }
              : { width: SIDEBAR_WIDTH_ICON }
            )
          ),
          ...(side === "right" && { transform: "rotate(180deg)" }),
        }}
      />
      <SidebarContainer
        state={state}
        side={side}
        variant={variant}
        collapsible={collapsible}
        {...props}
      />
    </Box>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof IconButton>
>(({ onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <IconButton
      ref={ref}
      size="small"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <Box component="span" sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        Toggle Sidebar
      </Box>
    </IconButton>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof TextField>
>(({ ...props }, ref) => {
  return (
    <TextField
      ref={ref}
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 32,
          bgcolor: "background.default",
          "&:focus-visible": {
            outline: (theme) => `2px solid ${theme.palette.primary.main}`,
          },
        },
      }}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Box> & {
    showIcon?: boolean
  }
>(({ showIcon = false, sx, ...props }, ref) => {
  // Random width between 50 to 90%
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <Box
      ref={ref}
      sx={{
        borderRadius: 1,
        height: 32, 
        display: "flex", 
        gap: 1, 
        px: 1, 
        alignItems: "center",
        ...sx
      }}
      {...props}
    >
      {showIcon && <Skeleton variant="rectangular" width={16} height={16} sx={{ borderRadius: 1 }} />}
      <Skeleton 
        variant="text" 
        height={16} 
        width={width} 
        sx={{ flex: 1 }}
      />
    </Box>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

// Export all components
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarRail,
  Divider as SidebarSeparator,
  SidebarTrigger,
  useIsMobile,
  useSidebar,
}