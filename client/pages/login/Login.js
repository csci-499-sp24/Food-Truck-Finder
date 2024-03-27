import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({}); // Corrected typo: errors, not error

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); // Corrected syntax
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with login
            console.log('Login successful');
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form action="" onSubmit={handleSubmit}>
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
                        {errors.email && <span className='text-danger'>{errors.email}</span>} {/* Corrected variable name */}
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
                        {errors.password && <span className='text-danger'>{errors.password}</span>} {/* Corrected variable name */}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Login</strong></button>
                    <p></p>
                    <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Don't have an account? Signup</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
