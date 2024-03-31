import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import Validation from '../../../client/pages/login/LoginValidation';

export default function Login() {
    // const router = useRouter();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with login
            console.log('Login successful');
            // Redirect to dashboard or desired page
            // router.push('/');
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
                        <Link legacyBehavior href='/signup'><a className='btn btn-link'>Don't have an account? Signup</a></Link>
                    </p>
                </form>
            </div>
        </div>
    );
}