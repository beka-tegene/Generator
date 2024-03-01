import React, { useState } from 'react'
import Input from '../Components/Input'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setLoginData } from '../Store/Hook/AuthHook';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.AuthHook.isLoading);
    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(setLogin({ data: { email, password } }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(setLoginData());
    }
    return (
        <div className='flex items-start justify-start p-[5%] h-screen max-xl:justify-center'>
            <ToastContainer />
            <div className='flex-grow-[0.6] overflow-hidden relative h-full flex items-start justify-center flex-col max-xl:hidden'>
                <div className='w-[300px] h-[300px] rounded-[50%] border-[#776B5D] border-[3px] absolute -top-[10%] -left-[7%] shadow-md'></div>
                <div className='w-[150px] h-[2px]  border-[#776B5D] border-[3px] absolute top-[60%] left-[0%] shadow-md'></div>
                <div className='w-[50px] h-[50px] absolute top-[20%] left-[60%] shadow-md rotate-12' style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', background: "linear-gradient(35deg,#776B5D 0%,#EBE3D5 100%) repeat scroll" }}></div>
                <h1 style={{ padding: "12% 0 0 20%" }} className=' font-medium text-[50px]'>Great to have you back!</h1>
                <p style={{ padding: " 0 0 0 20%" }}>You can sign in to GeneratorX with your existing GeneratorX account.</p>
            </div>
            <div className='flex-grow-[0.3] max-sm:flex-grow-[0.5] max-xl:flex-grow-[0.2] bg-[#F3EEEA] h-full rounded flex items-center justify-start flex-col'>
                <div className='flex items-center justify-center flex-col gap-2'>
                    <img src={logo} alt="logo" className='w-[100px]' />
                    <h1 className='text-[32px] font-medium'>Sign In</h1>
                    <p className='text-[16px]'>Please enter your email and password.</p>
                </div>
                <form
                    className='w-[90%] m-auto flex items-center justify-start flex-col gap-2'
                    onSubmit={submitHandler}
                >
                    <div className='flex flex-col items-start justify-start w-full'>
                        <label htmlFor="email" className='text-[18px]'>Email </label>
                        <Input
                            name={'email'}
                            id={'email'}
                            data={email}
                            setData={setEmail}
                            placeholder={"Enter your email"}
                            type={"email"}
                        />
                    </div>
                    <div className='flex flex-col items-start justify-start w-full'>
                        <label htmlFor="password" className='text-[18px]'>Password </label>
                        <Input
                            name={'password'}
                            id={'password'}
                            data={password}
                            setData={setPassword}
                            placeholder={"Enter your password"}
                            type={"password"}
                        />
                    </div>
                    <div className='flex items-center justify-start w-full'>
                        <div className='flex items-center justify-start gap-2'>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Remember me</label>
                        </div>
                        <div className='flex-grow'></div>
                        <Link href="" className='text-[18px] text-[#FCA402]'>Forgot password?</Link>
                    </div>
                    <div className='w-full'>
                        <button type="submit" className='w-full p-2 bg-[#776B5D] text-[#F3EEEA] font-medium rounded-[5px]' > {isLoading ? 'loading ...' : 'Sign in'} </button>
                    </div>
                    <div className=' text-center w-full'>
                        Don't have an account?<Link href="" className='text-[18px] text-[#FCA402]'>sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login