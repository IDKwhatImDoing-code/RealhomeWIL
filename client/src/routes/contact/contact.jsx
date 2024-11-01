import { useState } from 'react';
import './contact.scss';
import apiRequest from '../../lib/apiRequest';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await apiRequest.post('/contact', {
        name,
        email,
        message
      });

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="contactPage">
      <h1>Contact Us</h1>
      {success && <p className="success">Your message has been sent!</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="messageTextarea"
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;