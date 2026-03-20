import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react';
import '../../styles/shop/Cart.css';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <div className="empty-cart">
                        <ShoppingBag className="empty-cart-icon" size={80} />
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything yet. Every purchase supports our community programs.</p>
                        <Link to="/shop" className="continue-shopping-btn">
                            <ArrowLeft size={18} /> Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <p>{cart.reduce((t, i) => t + i.quantity, 0)} item(s) in your cart</p>
                </div>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <Link to={`/shop/product/${item.id}`}>
                                    <img
                                        src={item.images?.[0]?.src || 'https://via.placeholder.com/120'}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                </Link>

                                <div className="cart-item-details">
                                    <Link to={`/shop/product/${item.id}`} className="cart-item-title">
                                        {item.name}
                                    </Link>
                                    <div className="cart-item-price">${item.price}</div>
                                    {item.stock_status === 'instock' ? (
                                        <div className="cart-item-stock">In Stock</div>
                                    ) : (
                                        <div className="cart-item-stock out-of-stock">Out of Stock</div>
                                    )}
                                    
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                            className="quantity-btn"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                            className="quantity-btn"
                                            disabled={item.stock_quantity && item.quantity >= item.stock_quantity}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="cart-item-total">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)} 
                                        className="remove-btn"
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        
                        <div className="summary-row">
                            <span>Subtotal ({cart.reduce((t, i) => t + i.quantity, 0)} items)</span>
                            <span className="summary-value">${getCartTotal().toFixed(2)}</span>
                        </div>
                        
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="summary-value">Free</span>
                        </div>
                        
                        <div className="summary-row total">
                            <span>Total</span>
                            <span className="summary-value">${getCartTotal().toFixed(2)}</span>
                        </div>

                        <button
                            onClick={() => navigate('/shop/checkout')}
                            className="checkout-btn"
                        >
                            Proceed to Checkout
                            <ArrowRight size={18} />
                        </button>

                        <Link to="/shop" className="continue-shopping-link">
                            <ArrowLeft size={14} /> Continue Shopping
                        </Link>

                        <div className="security-badge">
                            <ShieldCheck className="security-icon" size={16} />
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
