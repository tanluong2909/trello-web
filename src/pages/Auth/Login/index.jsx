import {useState} from 'react'
import {TextField, Button, Stack, Box} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { styleTextField } from '../../../utils/formatters'
import VisibilityIcon from '@mui/icons-material/Visibility'

export const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const nav = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues:{
            userName: '',
            password: '',
        }
    })
    const onSubmit = (data) => {
        console.log(data)
        submitSuccess()
    }

    const submitSuccess = () => nav('/page/board') 

  return (
    <Box 
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#2c3e50" : "#01167fcc",
        }}
    >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} width={500} sx={{
                
            }}>
                 <TextField 
                    label="Username" 
                    type='text'
                    {...register('userName', {
                        required: 'Username is required',
                        pattern: {
                            value: /^([a-zA-Z0-9]){6,16}$/,
                            message: 'Invalid username format'
                        }
                    })}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                    sx={styleTextField}
                />
                 <TextField 
                    label="Password" 
                    type={passwordShown ? "text" : "password"}{...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                            message: 'Invalid email format'
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
            </Stack>
        </form>
    </Box>
  )
}
