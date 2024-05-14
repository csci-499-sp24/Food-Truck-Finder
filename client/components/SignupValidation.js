function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^[a-zA-Z\d@#$%^&*!]{8,}$/;

    if (values.name === "") {
        error.name = "Name should not be empty";
    } else {
        error.name = "";
    }

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email format";
    } else {
        error.email = "";
    }

    // Additional Email Validation: Check if the email is already registered
    // Implement this check based on your backend/database logic

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must be at least 8 characters long";
    } else {
        error.password = "";
    }

    // Additional Password Confirmation Validation
    if (values.confirmPassword === "") {
        error.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
        error.confirmPassword = "Passwords do not match";
    } else {
        error.confirmPassword = "";
    }

    return error;
}

export default Validation;
