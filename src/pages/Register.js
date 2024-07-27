import React, { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import Logo from '../components/Logo'
import FormRow from '../components/FormRow'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialstate = {
    name: '',
    email: '',
    password: '',
    isMember: true
}

function Register() {
    const [values, setValues] = useState(initialstate)
    const { user, isLoading } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password, name, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            toast.error('Please Fill Out All Fields');
            return
        }
        if (isMember) {
            dispatch(loginUser({ email: email, password: password }))
            return
        }
        dispatch(registerUser({ name, email, password }))

    }
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    useEffect(()=>{
    if(user){
        navigate('/')
    }
    },[user,navigate])
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {!values.isMember && (<FormRow
                    type="text"
                    name="name"
                    value={values.name}
                    handleChange={handleChange}
                />)}
                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type='submit' className='btn btn-block' disabled={isLoading}>
                  { isLoading ? "is loading...." : "Submit"}
                  </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register