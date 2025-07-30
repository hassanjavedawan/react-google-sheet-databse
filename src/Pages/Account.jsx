import { useState, useEffect } from 'react';

const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFOCPSI-OUeTL-UcZeBjErcMVXwy8rv7UT-Q&s';

const Account = () => {
  const [form, setForm] = useState({
    productName: '',
    storage: '',
    color: '',
    discount: '',
    currentPrice: '',
    oldPrice: '',
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const username = localStorage.getItem('loggedInUser');

  useEffect(() => {
    // Check if user is logged in
    const checkLogin = () => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      setIsLoggedIn(!!loggedInUser);
    };
    checkLogin();
    window.addEventListener('authChange', checkLogin);
    return () => window.removeEventListener('authChange', checkLogin);
    
  }, []);

  const sheetId = import.meta.env.VITE_POST_SHEET_ID;

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (!file) return;
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result }));
        setImagePreview(reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    
    const data = {
      admin: username, 
      productName: form.productName,
      storage: form.storage,
      color: form.color,
      discount: form.discount,
      currentPrice: form.currentPrice,
      oldPrice: form.oldPrice,
      imageUrl: form.imageUrl,
    };
    console.log(data);
    try {
      await fetch(
          `https://script.google.com/macros/s/${sheetId}/exec`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Product submitted successfully!');
      setForm({
        productName: '',
        storage: '',
        color: '',
        discount: '',
        currentPrice: '',
        oldPrice: '',
        imageUrl: '',
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit product.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
        <div className="w-full max-w-xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card text-center">
          <h1 className="text-3xl font-extrabold text-blue-900 mb-8 futuristic-title drop-shadow-lg">Account</h1>
          <p className="text-lg text-blue-800">You must be logged in to view this page. Please log in first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 futuristic-title drop-shadow-lg text-center">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {['productName', 'storage', 'color', 'discount', 'currentPrice', 'oldPrice'].map((field) => (
            <div className="flex flex-col gap-2" key={field}>
              <label className="font-semibold text-blue-900 futuristic-title">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
              </label>
              <input
                type={['discount', 'currentPrice', 'oldPrice'].includes(field) ? 'number' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
              />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-900 futuristic-title">Product Image</label>
            <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none" />
            {uploading && <p className="text-sm text-blue-700">Encoding image...</p>}
            <img
              src={imagePreview || DEFAULT_IMAGE}
              alt="Preview"
              className="mt-2 rounded-xl shadow-lg max-h-40 mx-auto border-2 border-cyan-200/60"
            />
          </div>
          <button type="submit" disabled={uploading || submitting} className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide">
            {uploading ? 'Encoding...' : submitting ? 'Processing...' : 'Submit Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
