import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: '',
    storage: '',
    color: '',
    discount: '',
    currentPrice: '',
    oldPrice: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch product data by id
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const sheetId = import.meta.env.VITE_SHEET_ID;
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        
        const headers = json.table.cols.map(col => col.label);
        const products = json.table.rows.map(row => {
          const obj = {};
          row.c.forEach((cell, i) => {
            obj[headers[i]] = cell?.v || "";
          });
          return obj;
        });

        // Find the product by index (since we're using array index as id)
        const productData = products[parseInt(id)];
        if (productData) {
          setProduct({
            productName: productData.productName || '',
            storage: productData.storage || '',
            color: productData.color || '',
            discount: productData.discount || '',
            currentPrice: productData.currentPrice || '',
            oldPrice: productData.oldPrice || '',
            imageUrl: productData.imageUrl || '',
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Update logic - you'll need to implement this based on your backend
      // For now, we'll just show a success message
      console.log('Updating product:', product);
      alert('Product updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setSubmitting(true);
      try {
        // Delete logic - you'll need to implement this based on your backend
        console.log('Deleting product with id:', id);
        alert('Product deleted successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 futuristic-title drop-shadow-lg text-center">
          Edit Product
        </h1>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          {[
            { name: 'productName', label: 'Product Name', type: 'text' },
            { name: 'storage', label: 'Storage', type: 'text' },
            { name: 'color', label: 'Color', type: 'text' },
            { name: 'discount', label: 'Discount (%)', type: 'number' },
            { name: 'currentPrice', label: 'Current Price', type: 'number', step: '0.01' },
            { name: 'oldPrice', label: 'Old Price', type: 'number', step: '0.01' },
            { name: 'imageUrl', label: 'Image URL', type: 'url' }
          ].map((field) => (
            <div className="flex flex-col gap-2" key={field.name}>
              <label className="font-semibold text-blue-900 futuristic-title">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={product[field.name]}
                onChange={handleChange}
                step={field.step}
                required
                className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
              />
            </div>
          ))}
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Product'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-pink-400 hover:to-red-600 transition-all duration-200 futuristic-btn text-lg tracking-wide disabled:opacity-50"
            >
              {submitting ? 'Deleting...' : 'Delete Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;