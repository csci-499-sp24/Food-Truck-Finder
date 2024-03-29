
import { expect, test, } from '@jest/globals';
import { checkLogin, checkSignup } from './database';


test('Login - Correct Info', async() => {
    const result = await checkLogin({email: 'testEmail@email.com', password: 'testpassword'});
    expect(result).toBe(true);
});
test('Login - Wrong Email', async() => {
    const result = await checkLogin({email: 'email.com', password: 'testpassword'});
    expect(result).toBe(false);
});
test('Login - Wrong Password', async() => {
    const result = await checkLogin({email: 'testEmail@email.com', password: 'password'});
    expect(result).toBe(false);
});
test('Signup - Email Exist', async() => {
    const result = await checkSignup({email: 'testEmail@email.com', password: 'testpassword'});
    expect(result).toBe(false);
});
test('Signup - Email Doesnt Exist', async() => {
    const result = await checkSignup({email: 'Email@email.com', password: 'testpassword'});
    expect(result).toBe(true);
});

afterAll(() => {
    return;
  });

