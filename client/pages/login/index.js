import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { storeSession } from '@/components/lib';

export default function Login() {
    const router = useRouter();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});


    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const info = {
            email: values.email,
            password : values.password
        }
        try {
            const response = await fetch('/api/auth/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info)
            });
            
            const data = await response.json();
            console.log(data);
            if(!data.status)
                setErrors({email: "Email/Password Incorrect"});
            else{
                storeSession(data.data);
                // setCookie('email', data.data.email);
                // setCookie('password', data.data.password);
                // setCookie('name', data.data.name);
                //await storeSession(data);
                router.back();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='mb-3'>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            value={values.email}
                            onChange={handleInput}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        />
                        {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            name='password'
                            value={values.password}
                            onChange={handleInput}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Login</strong></button>
                    <p className='mt-3'>
                        <Link legacyBehavior href='/signup' replace={true}><a className='btn btn-linknpm'>{`Don't have an account? Signup`}</a></Link>
                    </p>
                </form>
            </div>
        </div>
    );
}