import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({type: '', text: ''});

  const sheetId = import.meta.env.VITE_CONTACT_SHEET_ID;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({type: '', text: ''});
  
    try {
       await fetch(`https://script.google.com/macros/s/${sheetId}/exec`, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
  
      setMessage({type: 'success', text: 'Your message was sent successfully!' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
     
      
    } catch (error) {
      console.error("API Error:", error);
      setMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4 futuristic-title drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-blue-700/80 text-lg">
            Get in touch with us for any inquiries
          </p>
        </div>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            message.type === 'success' 
              ? 'bg-green-100/80 border border-green-300 text-green-800' 
              : 'bg-red-100/80 border border-red-300 text-red-800'
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900 futuristic-title">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900 futuristic-title">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900 futuristic-title">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none transition-all duration-200"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900 futuristic-title">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none transition-all duration-200"
                placeholder="What is this about?"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-900 futuristic-title">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none transition-all duration-200 resize-none"
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact