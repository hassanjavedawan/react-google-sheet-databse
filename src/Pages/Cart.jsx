import { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const getTotal = () => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleRemove = (title) => {
    const newCart = cart.filter(item => item.title !== title);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartChange'));
  };

  if (cart.length === 0) {
    return <div className="min-h-[60vh] flex items-center justify-center text-xl text-blue-700">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Your Cart</h1>
      <div className="bg-white/60 rounded-2xl shadow-xl p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Image</th>
              <th className="py-2">Title</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Total</th>
              <th className="py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2"><img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" /></td>
                <td className="py-2 font-semibold text-blue-900">{item.title}</td>
                <td className="py-2 text-cyan-700 font-bold">${item.price}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2 text-blue-900 font-bold">${(Number(item.price) * item.quantity).toFixed(2)}</td>
                <td className="py-2">
                  <button onClick={() => handleRemove(item.title)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-all text-xs font-bold">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right mt-6 text-2xl font-bold text-blue-900">
          Grand Total: ${getTotal().toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart; 