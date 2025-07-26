import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ProductCard = ({ image, title, description, price, discount, }) => {
  const discountedPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price;
  return (
    <Link to={`/product/${title}`} className="block h-full">
      <div className="relative bg-white/20 backdrop-blur-md border border-blue-200/40 rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] transition-transform duration-300 flex flex-col group futuristic-card h-full">
        {/* Discount Badge */}
        {discount ? (
          <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            -{discount}% OFF
          </span>
        ) : null}
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover object-center drop-shadow-xl bg-gradient-to-br from-blue-100/60 to-cyan-100/30 rounded-t-2xl"
        />
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-extrabold mb-1 text-blue-900 tracking-wide futuristic-title drop-shadow">{title}</h3>
          <p className="text-gray-700 text-xs mb-4 flex-1 futuristic-desc">{description}</p>
          <div className="flex items-end justify-between mt-auto">
            <div>
              {discount ? (
                <>
                  <span className="text-xl font-bold text-cyan-500 mr-2 drop-shadow">${discountedPrice}</span>
                  <span className="line-through text-gray-400 text-sm">${price}</span>
                </>
              ) : (
                <span className="text-xl font-bold text-blue-900">${price}</span>
              )}
            </div>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn mt-4 w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProductCard;

