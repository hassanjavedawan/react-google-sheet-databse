import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Categories", to: "/categories" },
  { name: "Deals", to: "/deals" },
  { name: "Brands", to: "/brands" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  return (
    <header className="relative bg-white/30 backdrop-blur-md border-b border-cyan-200/30 shadow-2xl z-30 futuristic-card">
      {/* Animated Glowing Gradient Bar at Top */}
      <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-500 animate-gradient-move z-40"></div>
      <nav className="container mx-auto flex items-center justify-between py-3 px-2 md:px-6 relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="assets/images/logo.png" alt="" className="w-20 h-20 drop-shadow-xl" />
        </Link>
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-8 max-w-xl">
          <input
            type="text"
            placeholder="Search products, brands and more..."
            className="w-full px-4 py-2 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-200/60 bg-white/60 backdrop-blur-md"
          />
          <button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-4 py-2 rounded-r-lg font-semibold hover:from-cyan-400 hover:to-blue-600 transition-all">Search</button>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-blue-900 font-semibold futuristic-title hover:text-cyan-400 transition-all duration-200 drop-shadow-lg px-2 py-1 rounded-lg hover:bg-cyan-100/30"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/account" className="p-2 hover:bg-cyan-100/30 rounded-full"><FiUser size={22} className="text-blue-900 hover:text-cyan-400 transition-colors" /></Link>
          <Link to="/cart" className="p-2 hover:bg-cyan-100/30 rounded-full relative">
            <FiShoppingCart size={22} className="text-blue-900 hover:text-cyan-400 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-cyan-400 text-white text-xs rounded-full px-1.5 border border-white">2</span>
          </Link>
        </div>
        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={toggleMenu} aria-label="Open menu">
          <FiMenu size={28} className="text-blue-900" />
        </button>
      </nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={toggleMenu}>
          <div className="absolute top-0 left-0 w-64 bg-white/90 backdrop-blur-md h-full shadow-lg flex flex-col p-6 z-50 border-r border-cyan-200/40">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center gap-2" onClick={toggleMenu}>
                <span className="font-extrabold text-lg text-blue-700 tracking-widest futuristic-title">MegaMart</span>
              </Link>
              <button onClick={toggleMenu} className="p-1"><IoIosClose size={32} className="text-blue-900" /></button>
            </div>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-blue-900 font-semibold futuristic-title hover:text-cyan-400 text-lg transition-all duration-200 px-2 py-1 rounded-lg hover:bg-cyan-100/30"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/account" className="flex items-center gap-2 py-2 hover:text-cyan-400" onClick={toggleMenu}><FiUser size={22} /> Account</Link>
              <Link to="/cart" className="flex items-center gap-2 py-2 relative hover:text-cyan-400" onClick={toggleMenu}>
                <FiShoppingCart size={22} /> Cart
                <span className="absolute -top-1 -right-3 bg-cyan-400 text-white text-xs rounded-full px-1.5 border border-white">2</span>
              </Link>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;