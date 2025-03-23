import { Button, PasswordInput, TextInput } from '@mantine/core'
import React from 'react'
import { useForm } from "@mantine/form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useShallow } from 'zustand/react/shallow';

const Register = () => {
 const { loading , register } = useAuthStore(
       useShallow((state) => state)
     );
     
     const navigate = useNavigate()
   const form = useForm({
     mode: "uncontrolled",
     initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
     },
 
     validate: {
      firstName: (value) =>
        !value ? "Please enter your first name." : null,
      lastName: (value) =>
        !value ? "Please enter your last name." : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
     },
   });
 
   const handleSubmit = async (values) => {
    const res = await register(values)
    if(res){
 form.reset()
      navigate("/")
    }
   };
   return (
       <div>
     <form  onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-4 p-8 justify-center h-screen'>
       <div className='mb-10'>
 
         <p className=' font-bold text-5xl text-center  bg-gradient-to-r from-zinc-500 to-cyan-500 bg-clip-text text-transparent'>Create Account!</p>
       <p className='text-center text-slate-500'>Already have an account? <Link to={"/"} className='font-medium text-cyan-700'>Sign in</Link></p>
       </div>
       <div className='grid grid-cols-2 gap-6'>

       <TextInput variant='filled' placeholder='First Name' size='lg' label="Enter First Name"  {...form.getInputProps("firstName")}/>
       <TextInput variant='filled' placeholder='Last Name' size='lg' label="Enter Last Name"  {...form.getInputProps("lastName")}/>
       </div>
       <TextInput variant='filled' placeholder='Email' size='lg' label="Enter Email"  {...form.getInputProps("email")}/>
       <PasswordInput variant='filled' placeholder='Password' size='lg' label="Enter Password"  {...form.getInputProps("password")}/>
       <PasswordInput variant='filled' placeholder='Confirm Password' size='lg' label="Confirm Password"  {...form.getInputProps("confirmPassword")}/>
 
       <Button loading={loading} type='submit' size='lg' color='cyan' className='mt-10'>
         Sign up
       </Button>
     </form>
     </div>
   )
  
}

export default Register