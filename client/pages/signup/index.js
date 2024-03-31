import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import Validation from '../../../client/pages/signup/SignupValidation';

export default function Signup() {
    // const router = useRouter();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '' // Add confirmPassword field
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
            // Proceed with signup
            console.log('Signup successful');
            // Redirect to homepage
            // router.push('/');
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            name='name'
                            value={values.name}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            value={values.email}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            name='password'
                            value={values.password}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='confirmPassword'><strong>Confirm Password</strong></label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            value={values.confirmPassword}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Sign Up</strong></button>
                    <p></p>
                    <Link legacyBehavior href='/login'>
                        <a className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Already have an account? Login</a>
                    </Link>
                </form>
            </div>
        </div>
    );
}
