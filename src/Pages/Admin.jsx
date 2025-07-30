import { useState } from 'react';

const Admin = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    businessName: '',
    ownershipType: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const sheetId = import.meta.env.VITE_ADMIN_POST_SHEET_ID;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      await fetch(
        `https://script.google.com/macros/s/${sheetId}/exec`,
        
        {
          method: 'POST',
          body: JSON.stringify(form),
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('Form submitted successfully!');
      setForm({
        fullName: '',
        email: '',
        password: '',
        businessName: '',
        ownershipType: '',
        phone: '',
      });
    } catch (error) {
      setMessage('Failed to submit form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 futuristic-title drop-shadow-lg text-center">Admin - Registration Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="px-4 py-2 rounded border border-cyan-200" required />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="px-4 py-2 rounded border border-cyan-200" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="px-4 py-2 rounded border border-cyan-200" required />
          <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="Business Name" className="px-4 py-2 rounded border border-cyan-200" required />
          <select name="ownershipType" value={form.ownershipType} onChange={handleChange} className="px-4 py-2 rounded border border-cyan-200" required>
            <option value="">Select Ownership Type</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="Corporation">Corporation</option>
            <option value="LLC">LLC</option>
            <option value="Other">Other</option>
          </select>
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="px-4 py-2 rounded border border-cyan-200" required />
          <button type="submit" disabled={submitting} className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide">
            {submitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
        {message && <div className="mt-4 text-center text-blue-800 font-semibold">{message}</div>}
      </div>
    </div>
  );
};

export default Admin; 