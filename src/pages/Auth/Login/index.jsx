import {useEffect, useState} from 'react'
import {TextField, Button, Stack, Box} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { styleTextField } from '../../../utils/formatters'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { styled } from '@mui/material'
import { fetchUSerAPI } from '../../../apis'
import { toast } from 'react-toastify'
import { setUserAccess } from '../../../redux/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"

export const Login = () => {
    // const dispatch = useDispatch()
    // const [user, setUser] = useState(null)
    const user = useSelector( state => state.auth.user)
    console.log(user);
    const [passwordShown, setPasswordShown] = useState(false);
    // const { userId } = useParams()
    // useEffect( () => {
    //     // const userId = '655ef357a91fae19af0c9ff1'
        
    //     fetchUSerAPI(userId).then(userLogin => {
    //         setUser(userLogin);
    //     })
    // }, [userId])
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const nav = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues:{
            username: '',
            password: '',
        }
    })
    const onSubmit = (data) => {
        data.username === user.username ? 
          (data.password === user.password ? submitSuccess() : toast.error('Wrong password'))
          : toast.error('Account does not exist')
        
        localStorage.setItem('user', JSON.stringify(user))
        // dispatch(setUserAccess({user: data}))
    }

    const submitSuccess = () => nav('/page/board') 

    const StackResponsive = styled(Stack)(({ theme }) => ({
        [theme.breakpoints.down("md")]: {
            
        },
        [theme.breakpoints.down("sm")]: {
            width: '300px'
        },
        [theme.breakpoints.up("lg")]: {

        },
      }))
  return (
    <Box 
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#2c3e50" : "#01167fcc",
            height: (theme) => `calc(100vh - ${theme.trello.appBarHeight})`
        }}
    >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <StackResponsive spacing={2} width={500}>
                 <TextField 
                    label="Username" 
                    type='text'
                    {...register('username', {
                        required: 'Username is required',
                        pattern: {
                            value: /^([a-zA-Z0-9]){6,16}$/,
                            message: 'Invalid username format'
                        }
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    sx={styleTextField}
                />
                 <TextField 
                    label="Password" 
                    type={passwordShown ? "text" : "password"}{...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                            message: 'Invalid password format'
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={styleTextField}
                    InputProps={{
                        endAdornment: (<VisibilityIcon onClick={togglePasswordVisiblity} sx={{
                            cursor: 'pointer'
                        }}/>)
                    }}
                />
                <Button 
                    type="submit" variant="contained" 
                >
                    Login
                </Button>
            </StackResponsive>
        </form>
    </Box>
  )
}
