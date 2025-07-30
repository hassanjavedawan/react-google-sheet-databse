import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchProducts from '../utils/fetchProducts';

const ProductDetail = () => {
  const { title } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const products = await fetchProducts();
      const found = products.find(p => p.title === title);
      setProduct(found);
      setLoading(false);
    };
    getProduct();
  }, [title]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-xl text-blue-700">Loading...</div>;
  if (!product) return <div className="min-h-[60vh] flex items-center justify-center text-xl text-red-600">Product not found.</div>;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.title === product.title);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartChange'));
    alert('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white/60 rounded-2xl shadow-xl p-8">
        <img src={product.image} alt={product.title} className="w-64 h-64 object-cover rounded-xl border border-cyan-200" />
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl text-cyan-600 font-bold mb-2">${product.price}</div>
          {product.discount > 0 && (
            <div className="text-sm text-green-600 font-semibold mb-2">{product.discount}% OFF</div>
          )}
          {product.admin && (
            <div className="text-xs text-gray-500 mb-2">Added by: {product.admin}</div>
          )}
          <button onClick={handleAddToCart} className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 