import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Avatar, Menu, MenuItem } from '@mui/material'

const navigation = [
  { name: 'Dashboard', href: '#', current: false},
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          new StartUp
        </Typography>

        {/* Desktop links */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          {navigation.map((item) => (
            <Button key={item.name} color={item.current ? 'secondary' : 'inherit'} href={item.href} sx={{ textTransform: 'none' }}>
              {item.name}
            </Button>
          ))}
        </Box>

        {/* Mobile menu button */}
        <Box sx={{ display: { xs: 'flex ', sm: 'none' } }}>
          <IconButton color="inherit" onClick={handleOpenNavMenu} aria-label="open navigation">
            <span style={{ fontSize: 20 }}>☰</span>
          </IconButton>
          <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} keepMounted>
            {navigation.map((item) => (
              <MenuItem key={item.name} onClick={handleCloseNavMenu} component="a" href={item.href}>
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Profile/avatar */}
        <IconButton onClick={handleOpenUserMenu} sx={{ ml: 1 }}>
          <Avatar
            alt="User"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
        </IconButton>
        <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} keepMounted>
          <MenuItem onClick={handleCloseUserMenu}>Your profile</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Sign out</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Sign in</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
