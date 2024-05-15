// // // ContactForm.js

// // import React from 'react';
// // import { useForm, ValidationError } from '@formspree/react';

// // function ContactForm() {
// //   const [state, handleSubmit] = useForm("mdoqpvka"); // Replace "mdoqpvka" with your Formspree form endpoint ID

// //   if (state.succeeded) {
// //     return <p>Thanks for joining!</p>;
// //   }

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <label htmlFor="email">Email Address</label>
// //       <input
// //         id="email"
// //         type="email"
// //         name="email"
// //       />
// //       <ValidationError 
// //         prefix="Email" 
// //         field="email"
// //         errors={state.errors}
// //       />

// //       <label htmlFor="message">Message</label>
// //       <textarea
// //         id="message"
// //         name="message"
// //       />
// //       <ValidationError 
// //         prefix="Message" 
// //         field="message"
// //         errors={state.errors}
// //       />

// //       <button type="submit" disabled={state.submitting}>
// //         Submit
// //       </button>
// //     </form>
// //   );
// // }

// // export default ContactForm;









// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useForm } from '@formspree/react';

// const ContactForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [formData, setFormData] = useState({ fullName: '', email: '', message: '' });
//   const [submitForm, handleSubmit] = useForm('your_formspree_form_id');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const { fullName, email, message } = formData;

//     // Handle Stripe payment or other actions
//     if (stripe && elements) {
//       // Implement Stripe payment or other actions
//     }

//     // Handle Formspree form submission
//     if (submitForm) {
//       await handleSubmit(e); // Submit Formspree form
//     }

//     // Reset form fields after submission
//     setFormData({ fullName: '', email: '', message: '' });
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" />
//       <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" />
//       <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message" />
//       {/* Stripe CardElement can be included here for payment processing */}
//       {/* Replace the below button with your custom submit button or use a different UX */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ContactForm;
