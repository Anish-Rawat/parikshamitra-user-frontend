'use client'

import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

export function SignUpForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup form submitted:', form)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Box>
        <Typography variant="body1" component="label" htmlFor="username" gutterBottom>
          Username
        </Typography>
        <TextField
          fullWidth
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          variant="outlined"
        />
      </Box>

      <Box>
        <Typography variant="body1" component="label" htmlFor="email" gutterBottom>
          Email
        </Typography>
        <TextField
          fullWidth
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          variant="outlined"
        />
      </Box>

      <Box>
        <Typography variant="body1" component="label" htmlFor="password" gutterBottom>
          Password
        </Typography>
        <TextField
          fullWidth
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          variant="outlined"
        />
      </Box>

      <Button type="submit" variant="contained" fullWidth>
        Sign Up
      </Button>
    </Box>
  )
}
