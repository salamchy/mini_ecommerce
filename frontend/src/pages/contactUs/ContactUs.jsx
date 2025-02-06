import React, { useState } from 'react';
import { useSubmitMessageMutation } from '../../features/api/messageApi';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [submitMessage, { isLoading, isSuccess, isError, error }] = useSubmitMessageMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSending(true);
      try {
        const result = await submitMessage(formData).unwrap();
        setIsSubmitted(true);
      } catch (err) {
        console.error('Failed to send message:', err);
      } finally {
        setIsSending(false);
        setFormData({ name: '', email: '', message: '' });
      }
    }
  };

  return (
    <div className="font-sans leading-normal tracking-normal text-gray-900 bg-gradient-to-br from-indigo-50 via-gray-50 to-indigo-50 min-h-screen mt-16">
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-12">CONTACT US</h2>
          <div className="bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500 opacity-5 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-indigo-500 opacity-5 -z-10"></div>

            {isSubmitted ? (
              <div className="text-center text-green-600 space-y-4">
                <h2 className="text-3xl animate-bounce-in">Thank you for your message!</h2>
                <p className="text-lg animate-fade-in">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-full bg-gray-50 border border-gray-300 shadow-sm focus:ring-indigo-300 focus:border-indigo-300 focus:ring-opacity-50 focus:ring-2 p-3  ${errors.name ? 'border-red-500' : ''} outline-none`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-full bg-gray-50 border border-gray-300 shadow-sm focus:ring-indigo-300 focus:border-indigo-300 focus:ring-opacity-50 focus:ring-2 p-3  ${errors.email ? 'border-red-500' : ''} outline-none`}
                    placeholder="Your Email"
                  />
                  {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`mt-1 block w-full rounded-2xl bg-gray-50 border border-gray-300 shadow-sm focus:ring-indigo-300 focus:border-indigo-300 focus:ring-opacity-50 focus:ring-2 p-3 outline-none ${errors.message ? 'border-red-500' : ''} outline-none`}
                    placeholder="Your Message"
                  />
                  {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 border border-transparent rounded-full shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                    disabled={isSending || isLoading}
                  >
                    {isSending || isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                  {isError && <p className="text-red-500 text-xs italic mt-2">{error?.data?.message || 'An error occurred while sending the message.'}</p>}
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;