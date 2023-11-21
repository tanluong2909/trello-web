import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const nav = useNavigate()
  return (
    <Box>
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            height: (theme) => `calc(100vh - ${theme.trello.appBarHeight})`
        }}
        >
            <Button 
                onClick={() => nav('/page/register')}
                variant='contained'
                size='large'
                sx={{
                    fontSize: '1.5rem'
                }}
            >
                Register
            </Button>
            <Button 
                onClick={() => nav('/page/login')} 
                variant='outlined'
                size='large'
                sx={{
                    fontSize: '1.5rem'
                }}
            >
                Login
            </Button>
        </Box>
    </Box>
  )
}

export default Home