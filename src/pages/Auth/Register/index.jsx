import  { useState } from 'react'
import {TextField, Button, Stack, Box} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { styleTextField } from '../../../utils/formatters'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { toast } from 'react-toastify'
import { createNewUSerAPI } from '../../../apis' 
import { useDispatch } from 'react-redux'
import { setUserAccess } from '../../../redux/auth'

export const Register = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [cpasswordShown, setCpasswordShown] = useState(false);
    const [user, setUser] = useState([])
    const dispatch = useDispatch()
    // useEffect(() => {
    //     createNewUSerAPI()
    //     setUser(user)
    // }, [user])
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const toggleCpasswordVisiblity = () => {
        setCpasswordShown(cpasswordShown ? false : true);
    };
    const nav = useNavigate()
    const { register, handleSubmit, formState: {errors}, watch} = useForm({
        defaultValues:{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })
    const onSubmit = (data) => {
        // console.log('data ',JSON.stringify(data))
        setUser([...user],
            [{
                username: data.username,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword
            }]
            )
        createNewUSerAPI(data)
        dispatch(setUserAccess({user: data}))
        // console.log('user' ,user)
        toast.success('Success user', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            theme: "light",
            })
        // setTimeout(() => submitSuccess(), 2000)
        submitSuccess()
    }
    const submitSuccess = () => nav('/page/login') 
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
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            noValidate
            // onSuccess={() => {
            //     alert("Your application is updated.")
            //   }}
            // onError={() => {
            //     alert("Submission has failed.")
            //   }}
        >
            <Stack spacing={2} width={500} sx={{
                
            }}>
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
                    label="Email" 
                    type='email'{...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@gmail.com)$/gmi,
                            message: 'Invalid email format'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                <TextField
                     label="Password password" 
                     type={cpasswordShown ? "text" : "password"}{...register('confirmPassword', {
                         required: 'Password password is required',
                         validate: (val) => {
                            if (watch('password') != val) {
                              return "Your passwords do no match";
                            }
                          },
                     })}
                     error={!!errors.confirmPassword}
                     helperText={errors.confirmPassword?.message}
                     sx={styleTextField}
                     InputProps={{
                        endAdornment: (<VisibilityIcon onClick={toggleCpasswordVisiblity} sx={{
                            cursor: 'pointer'
                        }}/>)
                    }}
                />
                <Button
                    //  onClick={submitSuccess}     
                     type="submit"
                     variant="contained" 
                >
                    Register
                </Button>
            </Stack>
        </form>
    </Box>
  )
}
