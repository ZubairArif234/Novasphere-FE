import { Button, PasswordInput, TextInput } from '@mantine/core'
import React from 'react'
import { useForm } from "@mantine/form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useShallow } from 'zustand/react/shallow';
const Login = () => {
    const { loading , login } = useAuthStore(
      useShallow((state) => state)
    );
const navigate = useNavigate()
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
    },
  });

  const handleSubmit = async (values) => {
   const res = await login(values)
   if(res){

     navigate("/dashboard")
   }
  };
  return (
      <div>
    <form  onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-4 p-8 justify-center h-screen'>
      <div className='mb-10'>

        <p className=' font-bold text-5xl text-center  bg-gradient-to-r from-zinc-500 to-cyan-500 bg-clip-text text-transparent'>Welcome Back!</p>
      <p className='text-center text-slate-500'>Don't have an account? <Link to={"/sign-up"} className='font-medium text-cyan-700'>Sign up</Link></p>
      </div>
      <TextInput variant='filled' placeholder='Email' size='lg' label="Enter Email"  {...form.getInputProps("email")}/>
      <PasswordInput variant='filled' placeholder='Password' size='lg' label="Enter Password"  {...form.getInputProps("password")}/>

      <Button loading={loading} type='submit' size='lg' color='cyan' className='mt-10'>
        Login
      </Button>
    </form>
    </div>
  )
}

export default Login